"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Modal from "./Modal";
import AlumniUploadForm from "./AlumniUploadForm";
import { normalizeBatchYear } from "@/lib/image-compression";

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

  // Fetch stories on mount from API and merge with local cache
  useEffect(() => {
    async function loadStories() {
      // 1. Read locally cached submissions
      let localStories: AlumniStoryItem[] = [];
      try {
        const cached = localStorage.getItem("mhs_alumni_stories_cache");
        if (cached) {
          localStories = JSON.parse(cached);
        }
      } catch {}

      try {
        const res = await fetch("/api/alumni");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.stories)) {
            const combinedMap = new Map<string, AlumniStoryItem>();
            localStories.forEach((s) => combinedMap.set(s.id, s));
            data.stories.forEach((s: AlumniStoryItem) => combinedMap.set(s.id, s));
            const merged = Array.from(combinedMap.values()).sort(
              (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
            );
            setStories(merged);
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
          return Array.from(map.values());
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
    const matchesDecade = filterByDecade(story, selectedDecade);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      story.nameBn.toLowerCase().includes(q) ||
      story.nameEn.toLowerCase().includes(q) ||
      story.batch.includes(q) ||
      story.titleBn.toLowerCase().includes(q) ||
      story.storyBn.toLowerCase().includes(q) ||
      (story.professionBn && story.professionBn.toLowerCase().includes(q));

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

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? "স্মৃতি বা ব্যাচ খুঁজুন..." : "Search memory or batch..."}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 bg-slate-50 font-bangla"
            />
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStories.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedStory(item)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-500 transition duration-300 flex flex-col justify-between cursor-pointer group"
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
                      <span>SSC &apos;{normalizeBatchYear(item.batch).slice(-2) || item.batch}</span>
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

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 mt-6 p-8">
            <Camera size={40} className="mx-auto mb-3 text-slate-300" />
            <h4 className="font-bangla-serif text-lg font-bold text-slate-700">
              {isBn ? "এই ব্যাচের কোনো স্মৃতি এখনো যুক্ত করা হয়নি" : "No memories found for this batch"}
            </h4>
            <p className="font-bangla text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {isBn
                ? "আপনি কি এই ব্যাচের প্রাক্তন শিক্ষার্থী? আপনার স্কুলের সোনালী স্মৃতি ও ছবি সবার সাথে প্রথম শেয়ার করুন।"
                : "Are you an alumnus from this era? Be the first to share your golden school memories."}
            </p>
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#0d5c4a] text-white text-xs font-bold transition"
            >
              <PlusCircle size={15} />
              <span>{isBn ? "ছবি ও স্মৃতি যোগ করুন" : "Upload Memory Now"}</span>
            </button>
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
                  SSC Batch: {selectedStory.batch}
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

