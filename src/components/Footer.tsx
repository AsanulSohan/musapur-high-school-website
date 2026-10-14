"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { INSTITUTIONAL_FACTS } from "@/data/school-data";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowUp,
  ExternalLink,
  Heart,
  Globe,
} from "lucide-react";

export default function Footer() {
  const { isBn } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#021d16] text-white border-t border-emerald-950 pt-12 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-emerald-900/60">
          {/* Column 1: School Identity & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 rounded-full p-1 border border-amber-400/40">
                <Image
                  src="/mhs-logo.svg"
                  alt="Musapur High School Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bangla-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                  {INSTITUTIONAL_FACTS.nameBn}
                </h3>
                <p className="text-xs uppercase tracking-wider text-amber-400 font-bold font-sans">
                  {INSTITUTIONAL_FACTS.nameEn}
                </p>
              </div>
            </div>

            <p className="font-bangla text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isBn
                ? "১৯৭২ সালে প্রতিষ্ঠিত নোয়াখালীর কোম্পানীগঞ্জ উপজেলার স্বনামধন্য মাধ্যমিক শিক্ষা প্রতিষ্ঠান। জ্ঞান, নৈতিকতা ও মানবিকতার দীক্ষায় শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ গড়তে আমরা প্রতিজ্ঞাবদ্ধ।"
                : "Established in 1972, Musapur High School is a premier secondary educational institution in Companiganj, Noakhali, dedicated to academic distinction and ethical leadership."}
            </p>

            {/* Geographical details */}
            <div className="space-y-2 text-xs text-slate-300 font-bangla pt-1">
              <p className="flex items-start gap-2">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{isBn ? INSTITUTIONAL_FACTS.locationBn : INSTITUTIONAL_FACTS.locationEn}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-emerald-400 shrink-0" />
                <span className="font-sans">{INSTITUTIONAL_FACTS.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-emerald-400 shrink-0" />
                <span className="font-sans">{INSTITUTIONAL_FACTS.email}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bangla-serif text-sm sm:text-base font-bold text-amber-300 border-b border-emerald-900 pb-2">
              {isBn ? "প্রয়োজনীয় লিংক" : "Quick Navigation"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-bangla">
              <li>
                <a href="#about" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span>•</span> {isBn ? "বিদ্যালয়ের ইতিহাস ও ঐতিহ্য" : "History & Heritage"}
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span>•</span> {isBn ? "ম্যানেজিং কমিটি ও প্রধান শিক্ষক" : "Managing Committee & Headmaster"}
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span>•</span> {isBn ? "মাধ্যমিক পাঠ্যক্রম (বিজ্ঞান/মানবিক/ব্যবসায়)" : "Secondary Curriculum"}
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span>•</span> {isBn ? "অনলাইন নোটিশ বোর্ড" : "Online Notice Board"}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <span>•</span> {isBn ? "ফটোগ্যালারি ও ঐতিহাসিক মুহূর্ত" : "Photo Gallery & Archives"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: National Emergency & Board Accreditation (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bangla-serif text-sm sm:text-base font-bold text-amber-300 border-b border-emerald-900 pb-2">
              {isBn ? "জাতীয় হেল্পলাইন ও স্বীকৃতি" : "National Helplines & Board"}
            </h4>

            {/* Emergency Hotline Pills */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-center">
                <span className="block text-[10px] text-slate-400 font-bangla">{isBn ? "জরুরি সেবা" : "Emergency"}</span>
                <span className="text-base font-bold text-amber-300 font-mono">৯৯৯ (999)</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-center">
                <span className="block text-[10px] text-slate-400 font-bangla">{isBn ? "শিশু সহায়তা" : "Child Helpline"}</span>
                <span className="text-base font-bold text-emerald-300 font-mono">১০৯৮ (1098)</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-center">
                <span className="block text-[10px] text-slate-400 font-bangla">{isBn ? "জাতীয় তথ্য বাতায়ন" : "Govt Services"}</span>
                <span className="text-base font-bold text-amber-300 font-mono">৩৩৩ (333)</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-center">
                <span className="block text-[10px] text-slate-400 font-bangla">{isBn ? "দুদক অভিযোগ" : "Anti-Corruption"}</span>
                <span className="text-base font-bold text-emerald-300 font-mono">১০৬ (106)</span>
              </div>
            </div>

            {/* Comilla Board Badge */}
            <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/60 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <ShieldCheck size={14} />
                <span>EIIN: {INSTITUTIONAL_FACTS.eiin} • {isBn ? "কুমিল্লা শিক্ষা বোর্ড" : "Comilla Board"}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-bangla">
                {isBn
                  ? "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক স্বীকৃত ও এমপিওভুক্ত মাধ্যমিক শিক্ষা প্রতিষ্ঠান。"
                  : "Recognized and MPO enlisted secondary school by the Ministry of Education."}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Top scroll */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="font-bangla text-center sm:text-left">
            © {new Date().getFullYear()} {isBn ? "মুছাপুর উচ্চ বিদ্যালয়, নোয়াখালী। সর্বস্বত্ব সংরক্ষিত।" : "Musapur High School, Noakhali. All rights reserved."}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-emerald-400">
              Code: {INSTITUTIONAL_FACTS.schoolCode}
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-emerald-800 transition text-xs font-semibold"
            >
              <span>{isBn ? "উপরে যান" : "Top"}</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

