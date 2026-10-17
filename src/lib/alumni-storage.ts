import fs from "fs";
import path from "path";
import os from "os";
import { AlumniStoryItem } from "@/types";
import { getSupabase } from "./supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "alumni-stories.json");
const TMP_DATA_FILE_PATH = path.join(os.tmpdir(), "mhs-alumni-stories.json");

// In-memory cache for serverless runtimes when disk writes are restricted
const memoryStoriesCache: AlumniStoryItem[] = [];

// IDs to explicitly exclude from displaying (test stories, duplicates, and removed mock/dummy stories)
export const EXCLUDED_STORY_IDS = new Set([
  "test-check-connection",
  "alumni-1792104318857-3edll",
  "alumni-1792104703795-aibab", // duplicate Anwar Hossain (keeps clean local one)
  "alumni-2014-04",
  "alumni-2005-03",
  "alumni-1996-02",
  "alumni-1982-01",
]);

/**
 * Reads initial static stories from the bundled JSON file.
 */
function getStaticStories(): AlumniStoryItem[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed: AlumniStoryItem[] = JSON.parse(fileContent);
      if (Array.isArray(parsed)) return parsed.filter((s) => !EXCLUDED_STORY_IDS.has(s.id));
    }
  } catch (error) {
    console.warn("Could not read base stories file:", error);
  }
  return [];
}

/**
 * Deduplicates stories by identity (name, batch, title) and sorts latest first.
 */
function processAndDeduplicate(stories: AlumniStoryItem[]): AlumniStoryItem[] {
  const seenKeys = new Set<string>();
  const result: AlumniStoryItem[] = [];

  for (const s of stories) {
    if (EXCLUDED_STORY_IDS.has(s.id)) continue;
    // Normalize key: batch + title
    const key = `${s.batch.trim()}_${s.titleBn.trim().toLowerCase()}`;
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    result.push(s);
  }

  return result.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

/**
 * Reads all alumni stories from persistent storage (Supabase / JSON / /tmp / Memory).
 */
export async function getAlumniStories(): Promise<AlumniStoryItem[]> {
  const supabase = getSupabase();

  // 1. If Supabase is connected, fetch from cloud database
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("alumni_stories")
        .select("*")
        .order("submittedAt", { ascending: false });

      if (!error && Array.isArray(data)) {
        const storiesMap = new Map<string, AlumniStoryItem>();
        // Add cloud stories
        data.forEach((item: any) => {
          if (EXCLUDED_STORY_IDS.has(item.id)) return;
          storiesMap.set(item.id, {
            id: item.id,
            nameBn: item.nameBn || item.name_bn || "",
            nameEn: item.nameEn || item.name_en || item.nameBn || "",
            batch: item.batch || "",
            professionBn: item.professionBn || item.profession_bn || undefined,
            professionEn: item.professionEn || item.profession_en || undefined,
            locationBn: item.locationBn || item.location_bn || undefined,
            locationEn: item.locationEn || item.location_en || undefined,
            titleBn: item.titleBn || item.title_bn || "",
            titleEn: item.titleEn || item.title_en || item.titleBn || "",
            storyBn: item.storyBn || item.story_bn || "",
            storyEn: item.storyEn || item.story_en || item.storyBn || "",
            image: item.image || "/logo.png",
            submittedAt: item.submittedAt || item.submitted_at || new Date().toISOString(),
            likes: Number(item.likes) || 1,
          });
        });

        // Merge baseline static stories so the initial school memories are always present
        const staticStories = getStaticStories();
        staticStories.forEach((s) => {
          if (!storiesMap.has(s.id) && !EXCLUDED_STORY_IDS.has(s.id)) {
            storiesMap.set(s.id, s);
          }
        });

        return processAndDeduplicate(Array.from(storiesMap.values()));
      }
    } catch (sbErr) {
      console.warn("Supabase query failed, falling back to local storage:", sbErr);
    }
  }

  // 2. Fallback: Read from local JSON, /tmp, and in-memory cache
  const storiesMap = new Map<string, AlumniStoryItem>();

  const staticStories = getStaticStories();
  staticStories.forEach((s) => {
    if (!EXCLUDED_STORY_IDS.has(s.id)) storiesMap.set(s.id, s);
  });

  try {
    if (fs.existsSync(TMP_DATA_FILE_PATH)) {
      const tmpContent = fs.readFileSync(TMP_DATA_FILE_PATH, "utf-8");
      const parsedTmp: AlumniStoryItem[] = JSON.parse(tmpContent);
      if (Array.isArray(parsedTmp)) {
        parsedTmp.forEach((s) => {
          if (!EXCLUDED_STORY_IDS.has(s.id)) storiesMap.set(s.id, s);
        });
      }
    }
  } catch (error) {
    console.warn("Could not read tmp stories file:", error);
  }

  memoryStoriesCache.forEach((s) => {
    if (!EXCLUDED_STORY_IDS.has(s.id)) storiesMap.set(s.id, s);
  });

  return processAndDeduplicate(Array.from(storiesMap.values()));
}

/**
 * Saves a new alumni story to persistent storage (Supabase or local fallback).
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

  const supabase = getSupabase();

  // 1. If Supabase is connected, save directly to Supabase cloud
  if (supabase) {
    try {
      let finalImageUrl = newStory.image;

      // If image is a base64 string, optionally upload to Supabase Storage bucket
      if (finalImageUrl.startsWith("data:image/")) {
        try {
          const match = finalImageUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
          if (match) {
            const mimeType = match[1];
            const base64Data = match[2];
            const buffer = Buffer.from(base64Data, "base64");
            const ext = mimeType.split("/")[1] || "jpg";
            const storageFileName = `alumni/${newStory.id}.${ext}`;

            const { error: uploadError } = await supabase.storage
              .from("alumni-photos")
              .upload(storageFileName, buffer, {
                contentType: mimeType,
                upsert: true,
              });

            if (!uploadError) {
              const { data: publicUrlData } = supabase.storage
                .from("alumni-photos")
                .getPublicUrl(storageFileName);
              if (publicUrlData?.publicUrl) {
                finalImageUrl = publicUrlData.publicUrl;
              }
            }
          }
        } catch (storageErr) {
          console.warn("Storage upload warning, saving base64 in row:", storageErr);
        }
      }

      newStory.image = finalImageUrl;

      // Insert row into database table
      const { error: insertError } = await supabase.from("alumni_stories").insert([
        {
          id: newStory.id,
          nameBn: newStory.nameBn,
          nameEn: newStory.nameEn,
          batch: newStory.batch,
          professionBn: newStory.professionBn || null,
          professionEn: newStory.professionEn || null,
          locationBn: newStory.locationBn || null,
          locationEn: newStory.locationEn || null,
          titleBn: newStory.titleBn,
          titleEn: newStory.titleEn,
          storyBn: newStory.storyBn,
          storyEn: newStory.storyEn,
          image: newStory.image,
          submittedAt: newStory.submittedAt,
          likes: newStory.likes,
        },
      ]);

      if (!insertError) {
        return newStory;
      } else {
        console.warn("Supabase insert error, falling back to local:", insertError);
      }
    } catch (sbErr) {
      console.warn("Supabase save exception:", sbErr);
    }
  }

  // 2. Fallback: Save to memory and local/tmp files
  memoryStoriesCache.unshift(newStory);

  let savedToLocal = false;
  try {
    const existing = await getAlumniStories();
    const updated = [newStory, ...existing.filter((s) => s.id !== newStory.id)];
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
    savedToLocal = true;
  } catch {
    // Expected on Vercel read-only filesystem (EROFS)
  }

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
 * Increments like counter for a story in Supabase or local storage.
 */
export async function incrementAlumniLike(id: string): Promise<number> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data } = await supabase
        .from("alumni_stories")
        .select("likes")
        .eq("id", id)
        .single();

      const newLikes = (Number(data?.likes) || 0) + 1;

      await supabase
        .from("alumni_stories")
        .update({ likes: newLikes })
        .eq("id", id);

      return newLikes;
    } catch (err) {
      console.warn("Supabase like update failed:", err);
    }
  }

  try {
    const stories = await getAlumniStories();
    const story = stories.find((s) => s.id === id);
    if (!story) return 0;

    story.likes = (story.likes || 0) + 1;

    const memIdx = memoryStoriesCache.findIndex((s) => s.id === id);
    if (memIdx >= 0) {
      memoryStoriesCache[memIdx].likes = story.likes;
    }

    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(stories, null, 2), "utf-8");
    } catch {
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
