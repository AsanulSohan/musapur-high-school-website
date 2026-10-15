-- ==============================================================================
-- Musapur High School (MHS) - Supabase Database Schema for Alumni Stories
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- 1. Go to https://supabase.com -> Select your project
-- 2. Click on "SQL Editor" in the left sidebar -> Click "New query"
-- 3. Paste this entire code and click "Run" ( সবুজ রঙের RUN বাটনে ক্লিক করুন )
-- ==============================================================================

-- 1. Create alumni_stories table
CREATE TABLE IF NOT EXISTS alumni_stories (
  id TEXT PRIMARY KEY,
  "nameBn" TEXT NOT NULL,
  "nameEn" TEXT,
  batch TEXT NOT NULL,
  "professionBn" TEXT,
  "professionEn" TEXT,
  "locationBn" TEXT,
  "locationEn" TEXT,
  "titleBn" TEXT NOT NULL,
  "titleEn" TEXT,
  "storyBn" TEXT NOT NULL,
  "storyEn" TEXT,
  image TEXT NOT NULL,
  "submittedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  likes INTEGER DEFAULT 1
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE alumni_stories ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to view stories
CREATE POLICY "Allow public read alumni_stories" ON alumni_stories
  FOR SELECT USING (true);

-- 4. Allow alumni to submit stories
CREATE POLICY "Allow public insert alumni_stories" ON alumni_stories
  FOR INSERT WITH CHECK (true);

-- 5. Allow users to like stories
CREATE POLICY "Allow public update likes" ON alumni_stories
  FOR UPDATE USING (true);

-- 6. Create Storage Bucket for photos (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('alumni-photos', 'alumni-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage Policies: Allow public view & upload
CREATE POLICY "Allow public read alumni photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'alumni-photos');

CREATE POLICY "Allow public upload alumni photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'alumni-photos');

