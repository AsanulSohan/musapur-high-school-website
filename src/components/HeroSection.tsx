"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { INSTITUTIONAL_FACTS } from "@/data/school-data";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";

export default function HeroSection() {
  const { isBn } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#064e3b] via-[#0d5c4a] to-[#042f24] text-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b7d84b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Text & Institutional Pride */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Motto Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles size={14} className="text-amber-400" />
              <span>{isBn ? INSTITUTIONAL_FACTS.mottoBn : INSTITUTIONAL_FACTS.mottoEn}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-emerald-300 text-sm sm:text-base font-semibold tracking-wider uppercase font-sans">
                {isBn ? "মুছাপুরের ঐতিহ্যবাহী বিদ্যাপীঠ" : "Historic Center of Excellence in Noakhali"}
              </p>
              <h2 className="font-bangla-serif text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {isBn ? (
                  <>
                    জ্ঞানের আলোয় উদ্ভাসিত <br />
                    <span className="text-amber-300">একটি আলোকিত ভবিষ্যৎ</span>
                  </>
                ) : (
                  <>
                    Illuminating Minds, <br />
                    <span className="text-amber-300">Inspiring Tomorrow</span>
                  </>
                )}
              </h2>
            </div>

            {/* Historical Overview Text */}
            <p className="font-bangla text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isBn
                ? "১৯৭২ সালে মহান মুক্তিযুদ্ধের বিজয়ের গৌরবময় প্রত্যুষে নোয়াখালীর কোম্পানীগঞ্জ উপজেলার মুছাপুরে প্রতিষ্ঠিত হয় এই প্রাচীন বিদ্যাপীঠ। দীর্ঘ পাঁচ দশকেরও বেশি সময় ধরে নৈতিক মূল্যবোধ, শৃঙ্খলা, বিজ্ঞানমনস্কতা ও মানসম্মত শিক্ষার মাধ্যমে আলোকিত প্রজন্ম গড়ে তোলাই আমাদের ব্রত।"
                : "Established in 1972 following Bangladesh's independence, Musapur High School has served as a beacon of progressive secondary education in Companiganj, Noakhali. For over five decades, we have fostered academic distinction, character, and civic leadership."}
            </p>

            {/* Key Institutional Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-xs text-slate-200">
                <ShieldCheck size={15} className="text-amber-400" />
                <span>EIIN: <strong>{INSTITUTIONAL_FACTS.eiin}</strong></span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-xs text-slate-200">
                <Calendar size={15} className="text-emerald-400" />
                <span>{isBn ? "প্রতিষ্ঠা: ১৯৭২ খ্রিষ্টাব্দ" : "Founded: 1972"}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-xs text-slate-200">
                <Award size={15} className="text-amber-400" />
                <span>{isBn ? "কুমিল্লা শিক্ষা বোর্ড" : "Comilla Board"}</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#notices"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{isBn ? "সর্বশেষ নোটিশ দেখুন" : "View Notice Board"}</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-white font-semibold text-sm border border-emerald-600 transition"
              >
                <BookOpen size={16} className="text-emerald-300" />
                <span>{isBn ? "বিদ্যালয়ের ইতিহাস" : "School History"}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (Building & Historic Crest) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-500 opacity-30 blur-lg" />

              {/* Card Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-emerald-950 to-[#042f24] border border-emerald-600/50 p-5 sm:p-6 shadow-2xl text-left space-y-5">
                {/* Visual Banner Photo */}
                <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-emerald-700/60 shadow-inner group">
                  <Image
                    src="/gallery/02-academic-building-front.svg"
                    alt="Musapur High School Main Campus Building"
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">ESTD 1972</span>
                      <h4 className="font-bangla font-bold text-sm sm:text-base">মুছাপুর উচ্চ বিদ্যালয় ক্যাম্পাস</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-800/90 text-amber-200 text-[10px] font-bold border border-emerald-600">
                      EIIN: 107335
                    </span>
                  </div>
                </div>

                {/* Quick Info Grid inside Hero Card */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-700/40">
                    <p className="text-[11px] text-emerald-300 font-semibold">{isBn ? "শিক্ষা শাখা" : "School Level"}</p>
                    <p className="font-bangla font-bold text-white text-sm mt-0.5">
                      {isBn ? "৬ষ্ঠ হতে ১০ম শ্রেণি" : "Grades 6 to 10"}
                    </p>
                    <p className="text-[10px] text-slate-400">{isBn ? "সহশিক্ষা (দিবা শাখা)" : "Co-ed (Day Shift)"}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-700/40">
                    <p className="text-[11px] text-emerald-300 font-semibold">{isBn ? "শিক্ষা বোর্ড" : "Affiliation"}</p>
                    <p className="font-bangla font-bold text-white text-sm mt-0.5">
                      {isBn ? "কুমিল্লা বোর্ড" : "Comilla Board"}
                    </p>
                    <p className="text-[10px] text-slate-400">{isBn ? "সরকারি এমপিওভুক্ত" : "MPO Enlisted"}</p>
                  </div>
                </div>

                {/* Historical Highlight Quote */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30">
                  <GraduationCap size={22} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-100 font-bangla leading-relaxed">
                    {isBn
                      ? "সুবিশাল ২.২৪ একর নিজস্ব ক্যাম্পাস, সুসজ্জিত বিজ্ঞানাগার, শেখ রাসেল ডিজিটাল ল্যাব ও মনোরম খেলার মাঠ।"
                      : "Expansive 2.24-acre green campus, modern science laboratories, Sheikh Russell Digital Lab & sprawling sports field."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

