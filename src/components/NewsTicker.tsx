"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { NOTICES_DATA } from "@/data/school-data";
import { Megaphone, ChevronRight } from "lucide-react";

export default function NewsTicker() {
  const { isBn } = useLanguage();

  return (
    <div className="bg-[#fef3c7] border-b border-amber-200/80 text-amber-950 overflow-hidden text-xs py-2 px-3 sm:px-6 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Ticker Title Badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#064e3b] text-white font-bold text-[11px] sm:text-xs z-10 shadow-xs mr-3">
          <Megaphone size={13} className="text-amber-400 animate-bounce" />
          <span className="font-bangla">{isBn ? "জরুরি বিজ্ঞপ্তি" : "Latest Updates"}</span>
        </div>

        {/* Scrolling Announcements */}
        <div className="relative overflow-hidden w-full whitespace-nowrap flex items-center">
          <div className="animate-news-ticker inline-flex items-center gap-8 text-[12px] font-medium text-slate-800">
            {NOTICES_DATA.map((notice, idx) => (
              <a
                key={notice.id}
                href="#notices"
                className="inline-flex items-center gap-1.5 hover:text-[#064e3b] transition group"
              >
                <span className="inline-block px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900 font-bold text-[10px]">
                  {isBn ? notice.dateBn : notice.dateEn}
                </span>
                <span className="font-bangla font-semibold group-hover:underline">
                  {isBn ? notice.titleBn : notice.titleEn}
                </span>
                <ChevronRight size={13} className="text-amber-600 inline" />
                {idx < NOTICES_DATA.length - 1 && <span className="text-amber-400 font-bold mx-2">★</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

