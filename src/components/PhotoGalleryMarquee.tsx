"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { GalleryItem } from "@/types";
import {
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Pause,
  Play,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface PhotoGalleryMarqueeProps {
  initialItems: GalleryItem[];
}

export default function PhotoGalleryMarquee({ initialItems }: PhotoGalleryMarqueeProps) {
  const { isBn } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");

  // Dynamically fetch any new additions from the public/gallery API endpoint
  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.items) && data.items.length > 0) {
            setItems(data.items);
          }
        }
      } catch (err) {
        console.error("Gallery sync err:", err);
      }
    }
    fetchGallery();
  }, []);

  const categories = [
    { id: "all", labelBn: "সকল চিত্রমালা", labelEn: "All Photos" },
    { id: "historic", labelBn: "ঐতিহাসিক ১৯৭২", labelEn: "Historic 1972" },
    { id: "campus", labelBn: "ক্যাম্পাস ও ভবন", labelEn: "Campus & Building" },
    { id: "lab", labelBn: "আইসিটি ও কম্পিউটার", labelEn: "ICT & Digital Lab" },
    { id: "academic", labelBn: "গবেষণাগার ও বিজ্ঞান", labelEn: "Science & Lab" },
    { id: "sports", labelBn: "বার্ষিক ক্রীড়া", labelEn: "Annual Sports" },
    { id: "cultural", labelBn: "সাংস্কৃতিক ও স্কাউট", labelEn: "Cultural & Scouts" },
    { id: "national", labelBn: "জাতীয় দিবস ও একুশে", labelEn: "National Days" },
  ];

  const filteredItems =
    activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory);

  const selectedIndex = selectedImage
    ? filteredItems.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const showPrevious = () => {
    if (selectedIndex < 0) return;
    const prev = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prev]);
  };

  const showNext = () => {
    if (selectedIndex < 0) return;
    const next = (selectedIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[next]);
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-slate-900 text-white overflow-hidden relative border-y border-slate-800">
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 relative z-10">
        {/* Gallery Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 font-sans">
              <Camera size={13} className="text-amber-400" />
              <span>{isBn ? "স্মৃতির দর্পণে মুছাপুর উচ্চ বিদ্যালয়" : "Memories & Historical Archives"}</span>
            </div>
            <h2 className="font-bangla-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {isBn ? "ফটোগ্যালারি ও ঐতিহাসিক আর্কাইভ" : "Photo Gallery & Campus Archives"}
            </h2>
            <p className="font-bangla text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl">
              {isBn
                ? "১৯৭২ সালের ঐতিহাসিক সূচনা থেকে শুরু করে বর্তমান ডিজিটাল যুগের ক্লাসরুম, বার্ষিক ক্রীড়া, বিজ্ঞান মেলা ও স্কাউট সমাবেশের স্থিরচিত্র।"
                : "From our 1972 founding archives to smart digital classrooms, sports championships, and cultural triumphs."}
            </p>
          </div>

          {/* Controls: Pause Marquee / View Toggle */}
          <div className="flex items-center gap-2.5 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
              title={isPaused ? "Play Marquee" : "Pause Marquee"}
            >
              {isPaused ? <Play size={13} className="text-emerald-400" /> : <Pause size={13} className="text-amber-400" />}
              <span>{isPaused ? (isBn ? "চালু করুন" : "Resume") : (isBn ? "থামান" : "Pause")}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode(viewMode === "marquee" ? "grid" : "marquee")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/70 hover:bg-emerald-800 text-xs font-semibold text-amber-300 border border-emerald-700/70 transition"
            >
              <Layers size={13} />
              <span>
                {viewMode === "marquee"
                  ? isBn
                    ? "গ্রিড ভিউ"
                    : "Grid View"
                  : isBn
                  ? "স্লাইডার ভিউ"
                  : "Marquee View"}
              </span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-6 notice-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition font-bangla ${
                activeCategory === cat.id
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
              }`}
            >
              {isBn ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: AUTO-SCROLLING RIGHT-TO-LEFT INFINITE MARQUEE */}
      {viewMode === "marquee" ? (
        <div className="relative w-full py-4 overflow-hidden group">
          {/* Edge Blur Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track: Right-to-Left Infinite Loop with Hover Pause */}
          <div
            className="marquee-rtl-track flex items-center gap-5 sm:gap-6"
            style={{ animationPlayState: isPaused ? "paused" : undefined }}
          >
            {/* Duplicate the items array for seamless 0 to -50% infinite translation */}
            {[...filteredItems, ...filteredItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedImage(item)}
                className="relative w-72 sm:w-88 h-56 sm:h-64 rounded-2xl overflow-hidden shrink-0 bg-slate-800 border-2 border-slate-700/80 hover:border-amber-400/90 shadow-xl cursor-pointer transition transform hover:-translate-y-1 group/card"
              >
                {/* Image */}
                <Image
                  src={item.src}
                  alt={isBn ? item.titleBn : item.titleEn}
                  fill
                  className="object-cover transition duration-500 group-hover/card:scale-108"
                  sizes="(max-width: 640px) 288px, 352px"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover/card:opacity-95 transition" />

                {/* Top Badge: Year & Category */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold border border-amber-400/30">
                    <Calendar size={10} />
                    <span>{item.year}</span>
                  </span>

                  <span className="p-1 rounded-full bg-slate-900/70 text-slate-300 opacity-0 group-hover/card:opacity-100 transition">
                    <Maximize2 size={13} />
                  </span>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-3 left-3 right-3 z-10 space-y-1">
                  <h4 className="font-bangla-serif text-sm sm:text-base font-bold text-white group-hover/card:text-amber-300 transition line-clamp-1">
                    {isBn ? item.titleBn : item.titleEn}
                  </h4>
                  <p className="font-bangla text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {isBn ? item.descriptionBn : item.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Marquee Helper Notice */}
          <div className="text-center mt-4 text-[11px] text-slate-400 font-sans">
            <span className="font-bangla">
              {isBn
                ? "💡 ছবির ওপর মাউস রাখলে অটো-স্ক্রোল থেমে যাবে। ক্লিক করে বড় আকারে দেখুন।"
                : "💡 Hovering pauses the auto-scroll. Click any photo to view full size."}
            </span>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: RESPONSIVE GRID VIEW */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="relative h-60 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-400 cursor-pointer shadow-lg transition transform hover:-translate-y-1 group"
              >
                <Image
                  src={item.src}
                  alt={isBn ? item.titleBn : item.titleEn}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95" />

                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                    {item.year}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <h4 className="font-bangla-serif text-sm font-bold text-white group-hover:text-amber-300 line-clamp-1">
                    {isBn ? item.titleBn : item.titleEn}
                  </h4>
                  <p className="font-bangla text-[10px] text-slate-300 line-clamp-1">
                    {isBn ? item.descriptionBn : item.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title and Close */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                  {selectedImage.year}
                </span>
                <h3 className="font-bangla-serif text-base sm:text-lg font-bold text-white">
                  {isBn ? selectedImage.titleBn : selectedImage.titleEn}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                aria-label="Close photo viewer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Visual Display */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-slate-950 flex items-center justify-center p-2">
              <Image
                src={selectedImage.src}
                alt={isBn ? selectedImage.titleBn : selectedImage.titleEn}
                fill
                className="object-contain"
                priority
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-3 p-2.5 rounded-full bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white transition border border-white/10"
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 p-2.5 rounded-full bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white transition border border-white/10"
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Caption & Details */}
            <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
              <div className="space-y-0.5 max-w-2xl">
                <p className="font-bangla text-slate-200 text-sm">
                  {isBn ? selectedImage.descriptionBn : selectedImage.descriptionEn}
                </p>
                <p className="text-[11px] text-slate-500 font-sans">
                  {selectedImage.filename} • Musapur High School Gallery (EIIN: 107335)
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-slate-400 font-mono text-[11px]">
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-semibold text-[10px]">
                  {selectedImage.category.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

