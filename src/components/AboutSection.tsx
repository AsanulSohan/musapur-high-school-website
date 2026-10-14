"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  History,
  Target,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
} from "lucide-react";

export default function AboutSection() {
  const { isBn } = useLanguage();

  const values = [
    {
      titleBn: "জ্ঞান ও আধুনিকতা",
      titleEn: "Knowledge & Modernity",
      descBn: "বিজ্ঞান ও তথ্যপ্রযুক্তিভিত্তিক সৃজনশীল শিক্ষার বিস্তার。",
      descEn: "Fostering STEM and modern digital competencies.",
    },
    {
      titleBn: "শৃঙ্খলা ও চরিত্র গঠন",
      titleEn: "Discipline & Character",
      descBn: "নীতিনৈতিকতা, সময়ানুবর্তিতা ও মানবিক মূল্যবোধের অনুশীলন。",
      descEn: "Instilling moral integrity, punctuality, and ethics.",
    },
    {
      titleBn: "দেশপ্রেম ও সেবা",
      titleEn: "Patriotism & Service",
      descBn: "১৯৭১-এর মুক্তিযুদ্ধের চেতনায় দেশসেবায় আত্মনিবেদন。",
      descEn: "Dedication to national welfare inspired by 1971.",
    },
  ];

  return (
    <section id="about" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Visual Archive Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-800 shadow-xl bg-slate-900 group">
              <div className="relative h-72 sm:h-80 w-full">
                <Image
                  src="/gallery/01-historic-campus-1972.svg"
                  alt="Musapur High School Foundation Archive 1972"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent text-white space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold uppercase tracking-wider font-sans">
                    ESTD 1972 • HISTORIC ARCHIVE
                  </span>
                  <span className="text-emerald-400 font-mono">EIIN: 107335</span>
                </div>
                <h4 className="font-bangla-serif text-base font-bold text-white">
                  {isBn ? "ঐতিহাসিক ভিত্তিপ্রস্তর ও আদি ক্যাম্পাস (১৯৭২)" : "Historic Foundation & Heritage (1972)"}
                </h4>
                <p className="font-bangla text-xs text-slate-300">
                  {isBn
                    ? "নোয়াখালীর কোম্পানীগঞ্জের মুছাপুরে মহান স্বাধীনতা পরবর্তী সময়ে প্রতিষ্ঠিত。"
                    : "Founded in Companiganj, Noakhali during the dawn of independent Bangladesh."}
                </p>
              </div>
            </div>

            {/* Quick Fact Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <Award size={26} className="text-[#064e3b] shrink-0" />
              <div>
                <p className="font-bangla font-bold text-[#064e3b] text-sm">
                  {isBn ? "পাঁচ দশকেরও বেশি ঐতিহ্যের আলোকবর্তিকা" : "Over 5 Decades of Educational Service"}
                </p>
                <p className="font-bangla text-xs text-slate-600">
                  {isBn
                    ? "হাজারো কৃতি গ্র্যাজুয়েট আজ দেশ-বিদেশে প্রতিষ্ঠিত。"
                    : "Alumni proudly serving the nation and global communities."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d97706] mb-1.5 block font-sans">
                {isBn ? "আমাদের ইতিহাস ও ঐতিহ্য" : "Our Heritage & Identity"}
              </span>
              <h2 className="font-bangla-serif text-3xl sm:text-4xl font-extrabold text-[#064e3b] leading-tight">
                {isBn ? (
                  <>
                    মুছাপুর উচ্চ বিদ্যালয়: <br />
                    <span className="text-slate-800">শিক্ষার আলোয় আলোকিত পাঁচ দশক</span>
                  </>
                ) : (
                  <>
                    Musapur High School: <br />
                    <span className="text-slate-800">5 Decades of Academic Brilliance</span>
                  </>
                )}
              </h2>
            </div>

            <div className="space-y-3 font-bangla text-sm text-slate-700 leading-relaxed">
              <p>
                {isBn
                  ? "১৯৭১ সালের রক্তক্ষয়ী মহান মুক্তিযুদ্ধে বিজয় অর্জনের পর, যুদ্ধবিধ্বস্ত বাংলাদেশে একটি শিক্ষিত ও আত্মমর্যাদাশীল ভবিষ্যৎ প্রজন্ম গড়ার মহান ব্রত নিয়ে ১৯৭২ সালে নোয়াখালী জেলার কোম্পানীগঞ্জ উপজেলার মুছাপুরে প্রতিষ্ঠিত হয় ‘মুছাপুর উচ্চ বিদ্যালয়’। স্থানীয় শিক্ষানুরাগী, সমাজসেবক ও বিদোৎসাহী ব্যক্তিত্বদের ঐকান্তিক প্রচেষ্টায় ২.২৪ একর ভূমির ওপর বিদ্যালয়টি যাত্রা শুরু করে।"
                  : "Following Bangladesh's victory in the 1971 Liberation War, visionary educationists and patriots founded Musapur High School in 1972 on a 2.24-acre green campus in Companiganj, Noakhali. Their mission was to eliminate rural illiteracy and nurture a generation of enlightened citizens."}
              </p>
              <p>
                {isBn
                  ? "আজ এটি কুমিল্লা শিক্ষা বোর্ডের অধীনে নোয়াখালী অঞ্চলের অন্যতম শ্রেষ্ঠ মাধ্যমিক শিক্ষাপ্রতিষ্ঠান হিসেবে সুপরিচিত। সহস্রাধিক নিয়মিত শিক্ষার্থী, সুদক্ষ শিক্ষক মণ্ডলী, অত্যাধুনিক বিজ্ঞানাগার, শেখ রাসেল ডিজিটাল ল্যাব ও সুবিশাল খেলার মাঠ নিয়ে প্রতিষ্ঠানটি এগিয়ে চলেছে স্মার্ট বাংলাদেশের প্রত্যয়ে।"
                  : "Affiliated with the Comilla Education Board, MHS has evolved into a premier secondary institution. With over 1,200 active students, dedicated subject specialists, well-stocked laboratories, the Sheikh Russell Digital Lab, and comprehensive co-curricular programs, we continuously empower our learners."}
              </p>
            </div>

            {/* Core Values 3 Cards */}
            <div className="grid sm:grid-cols-3 gap-3.5 pt-2">
              {values.map((val, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#064e3b] font-bold text-xs font-bangla">
                    <Sparkles size={14} className="text-[#d97706]" />
                    <span>{isBn ? val.titleBn : val.titleEn}</span>
                  </div>
                  <p className="font-bangla text-[11px] text-slate-600 leading-snug">
                    {isBn ? val.descBn : val.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Accreditation Badge */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 font-sans">
              <span className="flex items-center gap-1 font-semibold text-emerald-800">
                <ShieldCheck size={15} /> EIIN: 107335
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-800">
                <Calendar size={15} /> Founded: 1972
              </span>
              <span>•</span>
              <span className="font-semibold text-slate-700">Comilla Board School Code: 5124</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

