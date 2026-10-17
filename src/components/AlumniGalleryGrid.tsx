"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { AlumniStoryItem } from "@/types";
import {
  Camera,
  Heart,
  PlusCircle,
  Search,
  Filter,
  GraduationCap,
  Quote,
  Calendar,
  MapPin,
  Briefcase,
  Share2,
  Sparkles,
  ArrowRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowLeftRight,
  X,
} from "lucide-react";
import Modal from "./Modal";
import AlumniUploadForm from "./AlumniUploadForm";
import { normalizeBatchYear, toBanglaDigits, toEnglishDigits } from "@/lib/image-compression";

interface AlumniGalleryGridProps {
  initialStories?: AlumniStoryItem[];
}

export default function AlumniGalleryGrid({ initialStories = [] }: AlumniGalleryGridProps) {
  const { isBn } = useLanguage();

  const [stories, setStories] = useState<AlumniStoryItem[]>(initialStories);
  const [selectedDecade, setSelectedDecade] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<AlumniStoryItem | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Fetch stories on mount from API and merge with local cache
  useEffect(() => {
    const EXCLUDED_IDS = new Set([
      "test-check-connection",
      "alumni-1792104318857-3edll",
      "alumni-1792104703795-aibab",
      "alumni-2014-04",
      "alumni-2005-03",
      "alumni-1996-02",
      "alumni-1982-01",
    ]);

    async function loadStories() {
      // 1. Read locally cached submissions
      let localStories: AlumniStoryItem[] = [];
      try {
        const cached = localStorage.getItem("mhs_alumni_stories_cache");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            localStories = parsed.filter((s: AlumniStoryItem) => !EXCLUDED_IDS.has(s.id));
            localStorage.setItem("mhs_alumni_stories_cache", JSON.stringify(localStories));
          }
        }
      } catch {}

      try {
        const res = await fetch("/api/alumni");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.stories)) {
            const combinedMap = new Map<string, AlumniStoryItem>();
            localStories.forEach((s) => {
              if (!EXCLUDED_IDS.has(s.id)) combinedMap.set(s.id, s);
            });
            data.stories.forEach((s: AlumniStoryItem) => {
              if (!EXCLUDED_IDS.has(s.id)) combinedMap.set(s.id, s);
            });

            // Deduplicate by batch + title to avoid duplicate submissions
            const seen = new Set<string>();
            const unique: AlumniStoryItem[] = [];
            for (const s of combinedMap.values()) {
              const k = `${s.batch.trim()}_${s.titleBn.trim().toLowerCase()}`;
              if (seen.has(k)) continue;
              seen.add(k);
              unique.push(s);
            }

            unique.sort(
              (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
            );
            setStories(unique);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load alumni stories:", err);
      }

      if (localStories.length > 0) {
        setStories((prev) => {
          const map = new Map<string, AlumniStoryItem>();
          localStories.forEach((s) => map.set(s.id, s));
          prev.forEach((s) => map.set(s.id, s));
          return Array.from(map.values()).filter((s) => !EXCLUDED_IDS.has(s.id));
        });
      }
    }
    loadStories();
  }, []);

  const handleLike = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedIds.has(id)) return;

    // Optimistic update
    setLikedIds((prev) => new Set(prev).add(id));
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, likes: (s.likes || 0) + 1 } : s))
    );

    try {
      await fetch("/api/alumni", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // ignore
    }
  };

  const handleUploadSuccess = (newStory: AlumniStoryItem) => {
    setStories((prev) => {
      const filtered = prev.filter((s) => s.id !== newStory.id);
      return [newStory, ...filtered];
    });
    setIsUploadOpen(false);
  };

  // Filter by decade/batch
  const filterByDecade = (story: AlumniStoryItem, decade: string) => {
    if (decade === "all") return true;
    const cleanYear = normalizeBatchYear(story.batch);
    const year = parseInt(cleanYear, 10);
    if (isNaN(year)) return true;

    if (decade === "70s-80s") return year < 1990;
    if (decade === "90s") return year >= 1990 && year < 2000;
    if (decade === "00s") return year >= 2000 && year < 2010;
    if (decade === "10s") return year >= 2010 && year < 2020;
    if (decade === "20s") return year >= 2020;
    return true;
  };

  const filteredStories = stories.filter((story) => {
    // 1. Decade matching
    const matchesDecade = selectedDecade === "all" || filterByDecade(story, selectedDecade);

    // 2. Search matching
    const trimmedQ = searchQuery.trim().toLowerCase();
    if (!trimmedQ) return matchesDecade;

    // Batch normalization in both English & Bangla numerals
    const cleanBatchEn = normalizeBatchYear(story.batch);
    const shortBatchEn = cleanBatchEn.slice(-2);

    // General text corpus (names, professions, locations, titles, story narratives)
    const generalCorpus = [
      story.nameBn,
      story.nameEn,
      story.titleBn,
      story.titleEn,
      story.storyBn,
      story.storyEn,
      story.professionBn || "",
      story.professionEn || "",
      story.locationBn || "",
      story.locationEn || "",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    // Query tokens: each word/numeral in search query
    const tokens = trimmedQ.split(/\s+/).filter(Boolean);
    const matchesSearch = tokens.every((token) => {
      const cleanToken = token.replace(/['’]/g, "");
      const tokenEn = toEnglishDigits(cleanToken);
      const tokenBn = toBanglaDigits(cleanToken);

      // Check if this token is a 4-digit batch year like 2014, 2019, 2008 (in English or Bangla)
      const is4DigitYear = /^(?:19|20)\d{2}$/.test(tokenEn);
      if (is4DigitYear) {
        // MUST match the alumnus's actual SSC graduation batch year!
        return cleanBatchEn === tokenEn;
      }

      // Check if this token is a 2-digit batch year like '14, '19, ’১৯
      const is2DigitYear =
        /^\d{2}$/.test(tokenEn) &&
        (token.startsWith("'") || token.startsWith("’") || tokens.length === 1);
      if (is2DigitYear) {
        return shortBatchEn === tokenEn;
      }

      // Check if it's a batch keyword filler like "ব্যাচ", "batch", "সাল", "ssc", "এসএসসি"
      const isBatchKeyword = /^(ব্যাচ|ব্যাচের|ব্যাচে|batch|সাল|সালে|সালের|year|ssc|এসএসসি)$/i.test(token);
      if (isBatchKeyword) {
        // If part of a combined query (like "2014 ব্যাচ"), the keyword is satisfied
        return true;
      }

      // General text token: search in names, titles, profession, location, and story narrative
      return (
        generalCorpus.includes(token) ||
        generalCorpus.includes(tokenEn) ||
        generalCorpus.includes(tokenBn)
      );
    });

    return matchesDecade && matchesSearch;
  });

  const decades = [
    { id: "all", labelBn: "সকল ব্যাচের স্মৃতি", labelEn: "All Batches" },
    { id: "70s-80s", labelBn: "১৯৭০ ও ১৯৮০-এর দশক", labelEn: "1970s & 80s" },
    { id: "90s", labelBn: "১৯৯০-এর দশক", labelEn: "1990s" },
    { id: "00s", labelBn: "২০০০-এর দশক", labelEn: "2000s" },
    { id: "10s", labelBn: "২০১০-এর দশক", labelEn: "2010s" },
    { id: "20s", labelBn: "সাম্প্রতিক ব্যাচ", labelEn: "2020s" },
  ];

  return (
    <section id="alumni-gallery" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2 font-sans">
              <Camera size={14} className="text-amber-600" />
              <span>{isBn ? "প্রাক্তনীদের স্মৃতিচারণ ও ছবির অ্যালবাম" : "Alumni Photo & Story Gallery"}</span>
            </div>
            <h2 className="font-bangla-serif text-3xl sm:text-4xl font-extrabold text-[#064e3b]">
              {isBn ? "মুছাপুরের স্মৃতি: ছবির পেছনের গল্প" : "Stories Behind the Lens: MHS Alumni Memories"}
            </h2>
            <p className="font-bangla text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {isBn
                ? "মুছাপুর উচ্চ বিদ্যালয়ের প্রাক্তন শিক্ষার্থীদের তোলা ঐতিহাসিক মুহূর্ত, পুনর্মিলনী ও ফেলে আসা সোনালী দিনের স্মৃতি।"
                : "A living archive of nostalgic photographs and stories contributed by generations of proud MHS alumni."}
            </p>
          </div>

          {/* Action CTA: Share Memory */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#064e3b] to-[#0d5c4a] hover:from-[#042f24] hover:to-[#064e3b] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/15 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle size={16} className="text-amber-300" />
              <span className="font-bangla">{isBn ? "আপনার ছবি ও স্মৃতি যোগ করুন" : "Share Your Photo & Story"}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Decade Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 notice-scrollbar">
            <Filter size={14} className="text-slate-400 shrink-0 ml-1 mr-1" />
            {decades.map((dec) => (
              <button
                key={dec.id}
                type="button"
                onClick={() => setSelectedDecade(dec.id)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition font-bangla ${
                  selectedDecade === dec.id
                    ? "bg-[#064e3b] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {isBn ? dec.labelBn : dec.labelEn}
              </button>
            ))}
          </div>

          {/* Search Box & Navigation Controls */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim() && selectedDecade !== "all") {
                    setSelectedDecade("all");
                  }
                }}
                placeholder={isBn ? "স্মৃতি বা ব্যাচ খুঁজুন (যেমন: ২০১৯)..." : "Search memory or batch (e.g. 2019)..."}
                className="w-full pl-8 pr-8 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 bg-slate-50 font-bangla"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  title={isBn ? "মুছুন" : "Clear"}
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Slider Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#064e3b] text-slate-700 hover:text-white transition shadow-2xs border border-slate-200/80 active:scale-95 cursor-pointer"
                title={isBn ? "বামে স্ক্রোল করুন" : "Scroll left"}
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#064e3b] text-slate-700 hover:text-white transition shadow-2xs border border-slate-200/80 active:scale-95 cursor-pointer"
                title={isBn ? "ডানে স্ক্রোল করুন" : "Scroll right"}
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Cards Single-Row Horizontal Carousel */}
        <div className="relative">
          {/* Left Floating Arrow (desktop) */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#064e3b] items-center justify-center shadow-lg border border-slate-200 transition transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Single Row Horizontal Scroll/Swipe Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 px-1 scroll-smooth snap-x snap-mandatory notice-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filteredStories.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedStory(item)}
                className="w-[285px] sm:w-[320px] lg:w-[340px] shrink-0 snap-start bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-500 transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={isBn ? item.titleBn : item.titleEn}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-108"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-85 transition" />

                    {/* Batch Year Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-amber-300 text-[10px] font-bold border border-amber-400/40 shadow-xs font-mono">
                        <GraduationCap size={11} />
                        <span>
                          {isBn
                            ? `এসএসসি ’${toBanglaDigits(normalizeBatchYear(item.batch).slice(-2)) || toBanglaDigits(item.batch)}`
                            : `SSC '${normalizeBatchYear(item.batch).slice(-2) || item.batch}`}
                        </span>
                      </span>
                    </div>

                    {/* Zoom button on hover */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition p-1.5 rounded-full bg-slate-900/70 text-white">
                      <Maximize2 size={13} />
                    </div>

                    {/* Photo Title Overlay */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <h4 className="font-bangla-serif text-sm font-bold line-clamp-1 group-hover:text-amber-300 transition">
                        {isBn ? item.titleBn : item.titleEn}
                      </h4>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-3">
                    {/* Alumnus Identity */}
                    <div className="space-y-0.5 pb-2 border-b border-slate-100">
                      <h5 className="font-bangla font-bold text-slate-900 text-sm">
                        {isBn ? item.nameBn : item.nameEn}
                      </h5>
                      {item.professionBn && (
                        <p className="text-[11px] text-slate-500 font-bangla flex items-center gap-1">
                          <Briefcase size={11} className="text-emerald-700 shrink-0" />
                          <span className="truncate">{isBn ? item.professionBn : item.professionEn}</span>
                        </p>
                      )}
                      {item.locationBn && (
                        <p className="text-[10px] text-slate-400 font-bangla flex items-center gap-1">
                          <MapPin size={10} className="text-amber-600 shrink-0" />
                          <span className="truncate">{isBn ? item.locationBn : item.locationEn}</span>
                        </p>
                      )}
                    </div>

                    {/* Story Quotation Snippet */}
                    <div className="relative">
                      <Quote size={14} className="text-amber-400/40 absolute -top-1 -left-1" />
                      <p className="font-bangla text-xs text-slate-600 line-clamp-3 leading-relaxed pl-3 italic">
                        "{isBn ? item.storyBn : item.storyEn}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Likes & Read More */}
                <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={(e) => handleLike(item.id, e)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                      likedIds.has(item.id)
                        ? "bg-rose-50 text-rose-600 border border-rose-200"
                        : "text-slate-500 hover:text-rose-600 hover:bg-slate-200/50"
                    }`}
                    title="Like this memory"
                  >
                    <Heart
                      size={13}
                      className={likedIds.has(item.id) ? "fill-rose-500 text-rose-500" : ""}
                    />
                    <span>{item.likes || 0}</span>
                  </button>

                  <span className="font-bangla text-xs font-bold text-[#064e3b] group-hover:text-[#0d5c4a] flex items-center gap-1">
                    <span>{isBn ? "স্মৃতি পড়ুন" : "Read Story"}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Floating Arrow (desktop) */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#064e3b] items-center justify-center shadow-lg border border-slate-200 transition transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Swipe Hint Indicator */}
        <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-500 font-bangla">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ArrowLeftRight size={13} className="text-emerald-700" />
            <span>{isBn ? "ডানে-বামে সুইপ করে বা স্ক্রোল করে সকল স্মৃতি দেখুন" : "Swipe left or right to view all memories"}</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {filteredStories.length} {isBn ? "টি স্মৃতি প্রদর্শিত" : "stories shared"}
          </span>
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 mt-6 p-8">
            <Camera size={40} className="mx-auto mb-3 text-slate-300" />
            <h4 className="font-bangla-serif text-lg font-bold text-slate-700">
              {searchQuery.trim()
                ? isBn
                  ? `"${searchQuery}" এর জন্য কোনো স্মৃতি খুঁজে পাওয়া যায়নি`
                  : `No memories found matching "${searchQuery}"`
                : isBn
                ? "এই ব্যাচের কোনো স্মৃতি এখনো যুক্ত করা হয়নি"
                : "No memories found for this batch"}
            </h4>
            <p className="font-bangla text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {searchQuery.trim()
                ? isBn
                  ? "বানান বা ব্যাচের সাল (যেমন: ২০১৯ বা 2019) সঠিক কিনা দেখে নিন অথবা সকল স্মৃতি দেখতে রিসেট করুন।"
                  : "Check the spelling or batch year (e.g. 2019), or reset search to view all stories."
                : isBn
                ? "আপনি কি এই ব্যাচের প্রাক্তন শিক্ষার্থী? আপনার স্কুলের সোনালী স্মৃতি ও ছবি সবার সাথে প্রথম শেয়ার করুন।"
                : "Are you an alumnus from this era? Be the first to share your golden school memories."}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDecade("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition font-bangla cursor-pointer"
                >
                  {isBn ? "সকল স্মৃতি দেখুন" : "View All Stories"}
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#0d5c4a] text-white text-xs font-bold transition cursor-pointer"
              >
                <PlusCircle size={15} />
                <span>{isBn ? "ছবি ও স্মৃতি যোগ করুন" : "Upload Memory Now"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: UPLOAD STORY & PHOTO FORM MODAL */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title={isBn ? "প্রাক্তনীদের স্মৃতি ও ছবি শেয়ার করুন" : "Share Your School Memory & Photo"}
        subtitle={isBn ? "মুছাপুর উচ্চ বিদ্যালয় অ্যালামনাই অ্যালবাম • EIIN 107335" : "MHS Alumni Photo & Memory Portal"}
        maxWidth="xl"
      >
        <AlumniUploadForm
          onSuccess={handleUploadSuccess}
          onCancel={() => setIsUploadOpen(false)}
        />
      </Modal>

      {/* MODAL 2: FULL STORY & PHOTO READER MODAL */}
      {selectedStory && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedStory(null)}
          title={isBn ? selectedStory.titleBn : selectedStory.titleEn}
          subtitle={`এসএসসি ${selectedStory.batch} ব্যাচ • ${
            isBn ? selectedStory.nameBn : selectedStory.nameEn
          }`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            {/* Big High-Res Photo */}
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
              <Image
                src={selectedStory.image}
                alt={isBn ? selectedStory.titleBn : selectedStory.titleEn}
                fill
                className="object-contain"
                priority
                unoptimized={true}
              />
            </div>

            {/* Author Profile Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-xs font-mono mb-1">
                  {isBn
                    ? `এসএসসি ব্যাচ: ${toBanglaDigits(selectedStory.batch)}`
                    : `SSC Batch: ${selectedStory.batch}`}
                </span>
                <h4 className="font-bangla-serif text-base font-bold text-slate-900">
                  {isBn ? selectedStory.nameBn : selectedStory.nameEn}
                </h4>
                {selectedStory.professionBn && (
                  <p className="text-xs text-slate-600 font-bangla mt-0.5">
                    {isBn ? selectedStory.professionBn : selectedStory.professionEn}
                    {selectedStory.locationBn && ` • ${isBn ? selectedStory.locationBn : selectedStory.locationEn}`}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => handleLike(selectedStory.id, e)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  likedIds.has(selectedStory.id)
                    ? "bg-rose-50 text-rose-600 border border-rose-200"
                    : "bg-white border border-slate-200 text-slate-700 hover:text-rose-600"
                }`}
              >
                <Heart
                  size={14}
                  className={likedIds.has(selectedStory.id) ? "fill-rose-500 text-rose-500" : ""}
                />
                <span>{selectedStory.likes || 0} {isBn ? "পছন্দ" : "Likes"}</span>
              </button>
            </div>

            {/* Full Story Paragraphs */}
            <div className="space-y-3 font-bangla text-slate-800 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
              <h5 className="font-bold text-[#064e3b] flex items-center gap-1.5 text-sm">
                <Sparkles size={15} className="text-[#d97706]" />
                <span>{isBn ? "ছবির পেছনের স্মৃতিচারণ:" : "Story Behind the Photo:"}</span>
              </h5>
              <p className="whitespace-pre-line text-slate-700">
                {isBn ? selectedStory.storyBn : selectedStory.storyEn}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-sans border-t border-slate-100">
              <span>Musapur High School Alumni Archive (Estd. 1972)</span>
              <span>EIIN: 107335</span>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

