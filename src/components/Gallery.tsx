"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

type GalleryCategory = "all" | "campus" | "sports" | "cultural" | "national";

type GalleryItem = {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  src: string;
  type: "image" | "video";
  alt: string;
};

const categories: { id: GalleryCategory; label: string; english: string }[] = [
  { id: "all", label: "সব", english: "All" },
  { id: "campus", label: "ক্যাম্পাস", english: "Campus" },
  { id: "sports", label: "ক্রীড়া", english: "Sports" },
  { id: "cultural", label: "সাংস্কৃতিক", english: "Cultural" },
  { id: "national", label: "জাতীয় দিবস", english: "National Days" },
];

// Add each new file to this manifest. Files are served from public/gallery/ at /gallery/.
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "বিদ্যালয় প্রাঙ্গণ",
    category: "campus",
    src: "/gallery/school-campus.jpg",
    type: "image",
    alt: "Musapur High School campus",
  },
  {
    id: 2,
    title: "সবুজে ঘেরা আমাদের ক্যাম্পাস",
    category: "campus",
    src: "/gallery/campus-greenery.jpg",
    type: "image",
    alt: "Greenery around the school campus",
  },
  {
    id: 3,
    title: "আন্তঃশ্রেণি ফুটবল প্রতিযোগিতা",
    category: "sports",
    src: "/gallery/football-match.mp4",
    type: "video",
    alt: "Students playing football on the school field",
  },
  {
    id: 4,
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    category: "sports",
    src: "/gallery/annual-sports.jpg",
    type: "image",
    alt: "Annual sports competition at school",
  },
  {
    id: 5,
    title: "সাংস্কৃতিক অনুষ্ঠান",
    category: "cultural",
    src: "/gallery/cultural-program.jpg",
    type: "image",
    alt: "Students performing at a cultural program",
  },
  {
    id: 6,
    title: "শিক্ষার্থীদের মিলনমেলা",
    category: "cultural",
    src: "/gallery/students-gathering.jpg",
    type: "image",
    alt: "Students gathered together at school",
  },
  {
    id: 7,
    title: "স্বাধীনতা দিবস উদযাপন",
    category: "national",
    src: "/gallery/independence-day.jpg",
    type: "image",
    alt: "Independence Day celebration at school",
  },
  {
    id: 8,
    title: "ভাষা দিবসের প্রভাতফেরি",
    category: "national",
    src: "/gallery/language-day-procession.mp4",
    type: "video",
    alt: "Students taking part in a Language Day procession",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const visibleItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const selectedIndex = selectedImage ? visibleItems.findIndex((item) => item.id === selectedImage.id) : -1;

  function showPrevious() {
    if (selectedIndex < 0) return;
    setSelectedImage(visibleItems[(selectedIndex - 1 + visibleItems.length) % visibleItems.length]);
  }

  function showNext() {
    if (selectedIndex < 0) return;
    setSelectedImage(visibleItems[(selectedIndex + 1) % visibleItems.length]);
  }

  return (
    <section id="gallery" className="border-y border-[#dce7df] bg-white px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e77945]">Moments at Musapur</p>
            <h2 id="gallery-title" className="bangla mt-3 text-3xl font-bold tracking-tight sm:text-4xl">ফটো গ্যালারি <span className="font-sans text-[#0d5c4a]">/ Photo Gallery</span></h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#62736b]">আমাদের ক্যাম্পাস, আনন্দ, সাফল্য ও স্মরণীয় আয়োজনের কিছু মুহূর্ত</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Gallery categories">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-left text-xs font-bold transition ${activeCategory === category.id ? "border-[#0d5c4a] bg-[#0d5c4a] text-white" : "border-[#dce7df] bg-[#f5f7f2] text-[#62736b] hover:border-[#0d5c4a] hover:text-[#0d5c4a]"}`}
              >
                <span className="bangla">{category.label}</span>
                <span className="ml-1.5 font-normal opacity-70">/ {category.english}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {visibleItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item)}
              className={`group relative overflow-hidden rounded-2xl bg-[#dce7df] text-left outline-none ring-[#b7d84b] transition focus-visible:ring-4 ${index === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"}`}
              aria-label={`Open ${item.type}: ${item.title}`}
            >
              {item.type === "video" ? (
                <video src={item.src} aria-label={item.alt} muted loop autoPlay playsInline className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <img src={item.src} alt={item.alt} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-[#17261f]/80 via-transparent to-transparent opacity-80" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white">
                <span className="bangla text-sm font-semibold leading-6">{item.title}</span>
                <Maximize2 size={16} className="mb-1 shrink-0 opacity-0 transition group-hover:opacity-100" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#17261f]/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedImage(null)} className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 text-[#17261f] transition hover:bg-white" aria-label="Close image viewer"><X size={20} /></button>
            {selectedImage.type === "video" ? (
              <video src={selectedImage.src} aria-label={selectedImage.alt} controls autoPlay className="max-h-[75vh] w-full rounded-2xl object-contain" />
            ) : (
              <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[75vh] w-full rounded-2xl object-contain" />
            )}
            <div className="mt-4 flex items-center justify-between gap-3 text-white">
              <div><h3 id="lightbox-title" className="bangla text-lg font-bold">{selectedImage.title}</h3><p className="mt-1 text-xs text-white/60">{selectedIndex + 1} / {visibleItems.length}</p></div>
              <div className="flex gap-2"><button type="button" onClick={showPrevious} className="rounded-full border border-white/20 p-2 transition hover:bg-white/10" aria-label="Previous image"><ChevronLeft size={20} /></button><button type="button" onClick={showNext} className="rounded-full border border-white/20 p-2 transition hover:bg-white/10" aria-label="Next image"><ChevronRight size={20} /></button></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}