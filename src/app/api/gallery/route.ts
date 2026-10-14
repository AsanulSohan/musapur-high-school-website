import { NextResponse } from "next/server";
import { getGalleryItemsFromDisk } from "@/lib/gallery-service";

export async function GET() {
  try {
    const items = getGalleryItemsFromDisk();
    return NextResponse.json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to load gallery items from public/gallery" },
      { status: 500 }
    );
  }
}

