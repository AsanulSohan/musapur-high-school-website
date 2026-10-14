import fs from "fs";
import path from "path";
import { GalleryItem } from "@/types";

// Metadata mapping for known school historical and event gallery images
const GALLERY_METADATA_MAP: Record<string, Omit<GalleryItem, "id" | "filename" | "src">> = {
  "01-historic-campus-1972.svg": {
    titleBn: "ভিত্তিপ্রস্তর স্থাপন ও আদি ক্যাম্পাস (১৯৭২)",
    titleEn: "Foundation Stone & Original Campus (1972)",
    category: "historic",
    year: "1972",
    descriptionBn: "মুছাপুর উচ্চ বিদ্যালয়ের ঐতিহাসিক ভিত্তিপ্রস্তর ও স্বাধীনতা পরবর্তী সূচনালগ্ন।",
    descriptionEn: "Historic foundation ceremony and post-liberation establishment of Musapur High School.",
  },
  "02-academic-building-front.svg": {
    titleBn: "প্রধান একাডেমিক ভবন ও সুপ্রশস্ত প্রাঙ্গণ",
    titleEn: "Main Academic Building & Lush Campus",
    category: "campus",
    year: "2024",
    descriptionBn: "আধুনিক সুযোগ-সুবিধা সম্পন্ন ৩ তলা বিশিষ্ট প্রধান একাডেমিক ভবন।",
    descriptionEn: "Three-storied modern academic facility with airy classrooms and greenery.",
  },
  "03-sheikh-russell-digital-lab.svg": {
    titleBn: "শেখ রাসেল ডিজিটাল কম্পিউটার ল্যাব",
    titleEn: "Sheikh Russell Digital Computer Lab",
    category: "lab",
    year: "2023",
    descriptionBn: "উচ্চগতির ইন্টারনেট ও আধুনিক কম্পিউটার সম্বলিত স্মার্ট তথ্যপ্রযুক্তি ল্যাব।",
    descriptionEn: "Equipped with high-speed internet and modern computers for ICT literacy.",
  },
  "04-science-fair-practical-lab.svg": {
    titleBn: "বিজ্ঞান গবেষণাগার ও বার্ষিক বিজ্ঞান মেলা",
    titleEn: "Modern Science Lab & Annual Science Fair",
    category: "academic",
    year: "2025",
    descriptionBn: "পদার্থ, রসায়ন ও জীববিজ্ঞানের সমৃদ্ধ ব্যবহারিক যন্ত্রপাতি ও শিক্ষার্থীদের উদ্ভাবন।",
    descriptionEn: "Well-equipped practical apparatus for Physics, Chemistry, Biology and student innovations.",
  },
  "05-annual-sports-meet.svg": {
    titleBn: "বার্ষিক ক্রীড়া ও অ্যাথলেটিকস প্রতিযোগিতা",
    titleEn: "Annual Athletics & Sports Championship",
    category: "sports",
    year: "2025",
    descriptionBn: "বিদ্যালয়ের সুবিশাল খেলার মাঠে শিক্ষার্থীদের বার্ষিক দৌড় ও বিভিন্ন ক্রীড়া ইভেন্ট।",
    descriptionEn: "Thrilling track events and sports tournaments on the expansive school playground.",
  },
  "06-shaheed-minar-prabhat-feri.svg": {
    titleBn: "অমর একুশে ও প্রভাতফেরি শ্রদ্ধাঞ্জলি",
    titleEn: "Language Day & Prabhat Feri Observance",
    category: "national",
    year: "2026",
    descriptionBn: "বিদ্যালয় প্রাঙ্গণে অবস্থিত শহীদ মিনারে শিক্ষক ও শিক্ষার্থীদের পুষ্পস্তবক অর্পণ।",
    descriptionEn: "Homage to language martyrs at the school Shaheed Minar during Prabhat Feri.",
  },
  "07-scouts-and-red-crescent.svg": {
    titleBn: "এমএইচএস বাংলাদেশ স্কাউট ও রেড ক্রিসেন্ট ইউনিট",
    titleEn: "MHS Bangladesh Scouts & Red Crescent Unit",
    category: "cultural",
    year: "2025",
    descriptionBn: "শৃঙ্খলা, সমাজসেবা ও নেতৃত্ব বিকাশে সক্রিয় স্কাউট ক্যাম্প ও প্যারেড।",
    descriptionEn: "Active scout camping, disaster response drills, and character building.",
  },
  "08-merit-award-ceremony.svg": {
    titleBn: "এসএসসি কৃতি শিক্ষার্থী সংবর্ধনা ও মেধা পুরস্কার",
    titleEn: "SSC Achievers Felicitation & Merit Award",
    category: "academic",
    year: "2025",
    descriptionBn: "এসএসসি পরীক্ষায় জিপিএ ৫.০০ প্রাপ্ত কৃতি শিক্ষার্থীদের সংবর্ধনা ও বৃত্তি প্রদান।",
    descriptionEn: "Celebrating top SSC achievers with honorary shields, medals, and scholarships.",
  },
};

/**
 * Dynamically reads image files from the public/gallery directory on the filesystem.
 */
export function getGalleryItemsFromDisk(): GalleryItem[] {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    if (!fs.existsSync(galleryDir)) {
      return [];
    }

    const files = fs.readdirSync(galleryDir);
    const validExtensions = [".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"];

    const items: GalleryItem[] = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return validExtensions.includes(ext);
      })
      .map((filename, index) => {
        const metadata = GALLERY_METADATA_MAP[filename];
        const cleanName = path.parse(filename).name.replace(/^[\d-]+/, "").replace(/-/g, " ");
        const titleFallback = cleanName
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        return {
          id: `gallery-${index + 1}-${filename}`,
          filename,
          src: `/gallery/${filename}`,
          titleBn: metadata?.titleBn || titleFallback,
          titleEn: metadata?.titleEn || titleFallback,
          category: metadata?.category || "campus",
          year: metadata?.year || "Historic",
          descriptionBn: metadata?.descriptionBn || "মুছাপুর উচ্চ বিদ্যালয়ের স্মরণীয় মুহূর্ত।",
          descriptionEn: metadata?.descriptionEn || "Memorable moment at Musapur High School.",
        };
      });

    return items;
  } catch (error) {
    console.error("Error reading gallery files from disk:", error);
    return [];
  }
}

