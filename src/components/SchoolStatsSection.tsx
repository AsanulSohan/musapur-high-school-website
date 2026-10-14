"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SCHOOL_STATS } from "@/data/school-data";
import { Landmark, Users, GraduationCap, Award, MapPin, Sparkles } from "lucide-react";

export default function SchoolStatsSection() {
  const { isBn } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "landmark":
        return <Landmark size={24} className="text-amber-400" />;
      case "users":
        return <Users size={24} className="text-emerald-400" />;
      case "graduation-cap":
        return <GraduationCap size={24} className="text-amber-300" />;
      case "award":
        return <Award size={24} className="text-emerald-300" />;
      case "map-pin":
        return <MapPin size={24} className="text-amber-400" />;
      case "sparkles":
      default:
        return <Sparkles size={24} className="text-amber-400" />;
    }
  };

  return (
    <section id="stats" className="py-12 sm:py-16 bg-[#042f24] text-white border-b border-emerald-950 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-radial from-emerald-800/20 via-transparent to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1 font-sans">
            {isBn ? "সাফল্যের খতিয়ান ও পরিসংখ্যান" : "Our Institutional Legacy"}
          </p>
          <h2 className="font-bangla-serif text-2xl sm:text-3xl font-extrabold text-white">
            {isBn ? "এক নজরে মুছাপুর উচ্চ বিদ্যালয়ের গৌরবময় অর্জন" : "Musapur High School in Key Figures"}
          </h2>
        </div>

        {/* 6 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SCHOOL_STATS.map((stat) => (
            <div
              key={stat.id}
              className="bg-emerald-950/60 rounded-2xl border border-emerald-700/50 p-4 text-center hover:border-amber-400/80 transition duration-200 group"
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-emerald-900/80 border border-emerald-700/60 flex items-center justify-center transition group-hover:scale-110">
                {getIcon(stat.icon)}
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-sans tracking-tight">
                {isBn ? stat.numberBn : stat.numberEn}
              </p>
              <h4 className="font-bangla text-xs font-bold text-white mt-1 leading-snug">
                {isBn ? stat.labelBn : stat.labelEn}
              </h4>
              <p className="text-[10px] text-slate-400 font-bangla mt-0.5">
                {isBn ? stat.subtextBn : stat.subtextEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

