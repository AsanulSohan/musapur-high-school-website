import fs from "fs";
import path from "path";
import os from "os";
import { AlumniStoryItem } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "alumni-stories.json");
const TMP_DATA_FILE_PATH = path.join(os.tmpdir(), "mhs-alumni-stories.json");

// In-memory cache for serverless runtimes when disk writes are restricted
const memoryStoriesCache: AlumniStoryItem[] = [];

/**
 * Reads all alumni stories from persistent storage (JSON, /tmp, or in-memory cache).
 */
export async function getAlumniStories(): Promise<AlumniStoryItem[]> {
  const storiesMap = new Map<string, AlumniStoryItem>();

  // 1. Read base stories from src/data/alumni-stories.json
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed: AlumniStoryItem[] = JSON.parse(fileContent);
      if (Array.isArray(parsed)) {
        parsed.forEach((s) => storiesMap.set(s.id, s));
      }
    }
  } catch (error) {
    console.warn("Could not read base stories file:", error);
  }

  // 2. Read ephemeral serverless stories from os.tmpdir()
  try {
    if (fs.existsSync(TMP_DATA_FILE_PATH)) {
      const tmpContent = fs.readFileSync(TMP_DATA_FILE_PATH, "utf-8");
      const parsedTmp: AlumniStoryItem[] = JSON.parse(tmpContent);
      if (Array.isArray(parsedTmp)) {
        parsedTmp.forEach((s) => storiesMap.set(s.id, s));
      }
    }
  } catch (error) {
    console.warn("Could not read tmp stories file:", error);
  }

  // 3. Read in-memory cached stories
  memoryStoriesCache.forEach((s) => storiesMap.set(s.id, s));

  // Convert to array and sort latest first
  const allStories = Array.from(storiesMap.values());
  return allStories.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

/**
 * Saves a new alumni story to persistent storage.
 * Gracefully handles read-only filesystems (like Vercel serverless functions).
 */
export async function saveAlumniStory(
  data: Omit<AlumniStoryItem, "id" | "submittedAt" | "likes">
): Promise<AlumniStoryItem> {
  const newStory: AlumniStoryItem = {
    ...data,
    id: `alumni-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toISOString(),
    likes: 1,
  };

  // Keep in memory
  memoryStoriesCache.unshift(newStory);

  // Try saving to project data directory (works on local dev and dedicated servers)
  let savedToLocal = false;
  try {
    const existing = await getAlumniStories();
    const updated = [newStory, ...existing.filter((s) => s.id !== newStory.id)];
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
    savedToLocal = true;
  } catch (fsErr) {
    // Expected on Vercel read-only filesystem (EROFS)
    // console.info("Local filesystem is read-only (Vercel). Falling back to /tmp storage.");
  }

  // Fallback to /tmp if local filesystem write failed
  if (!savedToLocal) {
    try {
      let tmpStories: AlumniStoryItem[] = [];
      if (fs.existsSync(TMP_DATA_FILE_PATH)) {
        tmpStories = JSON.parse(fs.readFileSync(TMP_DATA_FILE_PATH, "utf-8"));
      }
      tmpStories = [newStory, ...tmpStories.filter((s) => s.id !== newStory.id)];
      fs.writeFileSync(TMP_DATA_FILE_PATH, JSON.stringify(tmpStories, null, 2), "utf-8");
    } catch (tmpErr) {
      console.warn("Could not write to tmpdir:", tmpErr);
    }
  }

  return newStory;
}

/**
 * Increments like counter for a story.
 */
export async function incrementAlumniLike(id: string): Promise<number> {
  try {
    const stories = await getAlumniStories();
    const story = stories.find((s) => s.id === id);
    if (!story) return 0;

    story.likes = (story.likes || 0) + 1;

    // Update in memory cache
    const memIdx = memoryStoriesCache.findIndex((s) => s.id === id);
    if (memIdx >= 0) {
      memoryStoriesCache[memIdx].likes = story.likes;
    }

    // Try saving locally
    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(stories, null, 2), "utf-8");
    } catch {
      // Fallback to tmp
      try {
        fs.writeFileSync(TMP_DATA_FILE_PATH, JSON.stringify(stories, null, 2), "utf-8");
      } catch {}
    }

    return story.likes;
  } catch (error) {
    console.error("Error updating likes:", error);
    return 0;
  }
}
