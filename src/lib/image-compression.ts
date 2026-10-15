/**
 * Utility for client-side image compression and batch year normalization.
 * Prevents Vercel 4.5MB payload limit errors and speeds up uploads on mobile/slow networks.
 */

export interface CompressionResult {
  file: File;
  dataUrl: string;
  originalSizeKB: number;
  compressedSizeKB: number;
}

/**
 * Normalizes user input for SSC batch year.
 * Handles Bengali numerals (e.g., '২০১৯' -> '2019')
 * and extracts 4-digit years from strings like 'ব্যাচ : ২০১৯' or 'Batch 2019'.
 */
export function normalizeBatchYear(input: string): string {
  if (!input) return "";

  const bnToEnMap: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  // Convert any Bengali numerals to English digits
  let str = input.replace(/[০-৯]/g, (digit) => bnToEnMap[digit] || digit);

  // Extract 4-digit year like 1982, 1999, 2019, 2025
  const yearMatch = str.match(/(?:19|20)\d{2}/);
  if (yearMatch) return yearMatch[0];

  // Fallback to any 4 consecutive digits
  const any4Digits = str.match(/\d{4}/);
  if (any4Digits) return any4Digits[0];

  // Fallback to all digits found or trimmed input
  const digits = str.replace(/[^\d]/g, "");
  return digits || input.trim();
}

/**
 * Compresses an image file in the browser using HTML5 Canvas.
 * Resizes the image so that max dimension (width or height) is <= maxDimension,
 * and encodes to JPEG with specified quality.
 * Reduces 5MB-15MB phone camera pictures to ~100KB-220KB instantly.
 */
export async function compressImage(
  file: File,
  maxDimension = 1600,
  quality = 0.85
): Promise<CompressionResult> {
  const originalSizeKB = Math.round(file.size / 1024);

  // Return original if running in SSR or not an image
  if (typeof window === "undefined" || !file.type.startsWith("image/")) {
    return {
      file,
      dataUrl: "",
      originalSizeKB,
      compressedSizeKB: originalSizeKB,
    };
  }

  // If SVG, no canvas compression needed
  if (file.type === "image/svg+xml") {
    const text = await file.text();
    const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(text)))}`;
    return {
      file,
      dataUrl,
      originalSizeKB,
      compressedSizeKB: originalSizeKB,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.onload = (e) => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Failed to load image into browser"));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Downscale while preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context is unavailable"));
          return;
        }

        // Draw white background for transparency conversion
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to data URL
        const dataUrl = canvas.toDataURL("image/jpeg", quality);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create compressed image blob"));
              return;
            }
            const cleanBaseName = file.name.replace(/\.[^/.]+$/, "");
            const compressedFile = new File([blob], `${cleanBaseName}.jpg`, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            resolve({
              file: compressedFile,
              dataUrl,
              originalSizeKB,
              compressedSizeKB: Math.round(blob.size / 1024),
            });
          },
          "image/jpeg",
          quality
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

