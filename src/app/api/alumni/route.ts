import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAlumniStories, saveAlumniStory, incrementAlumniLike } from "@/lib/alumni-storage";

export async function GET() {
  try {
    const stories = await getAlumniStories();
    return NextResponse.json({
      success: true,
      count: stories.length,
      stories,
    });
  } catch (error) {
    console.error("GET /api/alumni error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load alumni stories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let nameBn = "";
    let nameEn = "";
    let batch = "";
    let titleBn = "";
    let titleEn = "";
    let storyBn = "";
    let storyEn = "";
    let professionBn = "";
    let professionEn = "";
    let locationBn = "";
    let locationEn = "";
    let imageUrl = "/alumni/alumni-1982-batch.svg"; // Default fallback

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      nameBn = (formData.get("nameBn") as string) || (formData.get("name") as string) || "";
      nameEn = (formData.get("nameEn") as string) || nameBn;
      batch = (formData.get("batch") as string) || "";
      titleBn = (formData.get("titleBn") as string) || (formData.get("title") as string) || "";
      titleEn = (formData.get("titleEn") as string) || titleBn;
      storyBn = (formData.get("storyBn") as string) || (formData.get("story") as string) || "";
      storyEn = (formData.get("storyEn") as string) || storyBn;
      professionBn = (formData.get("professionBn") as string) || (formData.get("profession") as string) || "";
      professionEn = (formData.get("professionEn") as string) || professionBn;
      locationBn = (formData.get("locationBn") as string) || (formData.get("location") as string) || "";
      locationEn = (formData.get("locationEn") as string) || locationBn;

      const file = formData.get("photo") as File | null;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize file extension
        const originalName = file.name || "photo.jpg";
        const ext = path.extname(originalName).toLowerCase() || ".jpg";
        const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
        const safeExt = allowedExts.includes(ext) ? ext : ".jpg";

        const fileName = `alumni-${Date.now()}-${Math.random().toString(36).substring(2, 6)}${safeExt}`;
        const uploadDir = path.join(process.cwd(), "public", "alumni");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        imageUrl = `/alumni/${fileName}`;
      }
    } else {
      // JSON payload
      const body = await req.json();
      nameBn = body.nameBn || body.name || "";
      nameEn = body.nameEn || nameBn;
      batch = body.batch || "";
      titleBn = body.titleBn || body.title || "";
      titleEn = body.titleEn || titleBn;
      storyBn = body.storyBn || body.story || "";
      storyEn = body.storyEn || storyBn;
      professionBn = body.professionBn || body.profession || "";
      professionEn = body.professionEn || professionBn;
      locationBn = body.locationBn || body.location || "";
      locationEn = body.locationEn || locationBn;
      imageUrl = body.image || imageUrl;
    }

    // Validation
    if (!nameBn.trim()) {
      return NextResponse.json(
        { success: false, error: "Alumnus name is required." },
        { status: 400 }
      );
    }
    if (!batch.trim()) {
      return NextResponse.json(
        { success: false, error: "SSC Batch year is required." },
        { status: 400 }
      );
    }
    if (!storyBn.trim()) {
      return NextResponse.json(
        { success: false, error: "Story/memory description is required." },
        { status: 400 }
      );
    }

    const savedStory = await saveAlumniStory({
      nameBn: nameBn.trim(),
      nameEn: nameEn.trim(),
      batch: batch.trim(),
      titleBn: titleBn.trim() || `স্মৃতিচারণ • এসএসসি ${batch.trim()} ব্যাচ`,
      titleEn: titleEn.trim() || `Memories • SSC Batch ${batch.trim()}`,
      storyBn: storyBn.trim(),
      storyEn: storyEn.trim(),
      professionBn: professionBn.trim() || undefined,
      professionEn: professionEn.trim() || undefined,
      locationBn: locationBn.trim() || undefined,
      locationEn: locationEn.trim() || undefined,
      image: imageUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Alumni story uploaded successfully!",
      story: savedStory,
    });
  } catch (error) {
    console.error("POST /api/alumni error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit alumni story." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }
    const newLikes = await incrementAlumniLike(id);
    return NextResponse.json({ success: true, likes: newLikes });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to like" }, { status: 500 });
  }
}

