import fs from "fs";
import path from "path";
import { AlumniStoryItem } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "alumni-stories.json");

/**
 * Reads all alumni stories from persistent storage (JSON / Supabase).
 */
export async function getAlumniStories(): Promise<AlumniStoryItem[]> {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const parsed: AlumniStoryItem[] = JSON.parse(fileContent);
    // Return latest stories first
    return parsed.sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  } catch (error) {
    console.error("Error reading alumni stories:", error);
    return [];
  }
}

/**
 * Saves a new alumni story to persistent storage.
 */
export async function saveAlumniStory(
  data: Omit<AlumniStoryItem, "id" | "submittedAt" | "likes">
): Promise<AlumniStoryItem> {
  const stories = await getAlumniStories();

  const newStory: AlumniStoryItem = {
    ...data,
    id: `alumni-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toISOString(),
    likes: 1,
  };

  const updatedStories = [newStory, ...stories];

  // Save to JSON file
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updatedStories, null, 2), "utf-8");

  return newStory;
}

/**
 * Toggles or increments like counter for a story.
 */
export async function incrementAlumniLike(id: string): Promise<number> {
  try {
    const stories = await getAlumniStories();
    const story = stories.find((s) => s.id === id);
    if (!story) return 0;

    story.likes = (story.likes || 0) + 1;
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(stories, null, 2), "utf-8");
    return story.likes;
  } catch (error) {
    console.error("Error updating likes:", error);
    return 0;
  }
}

