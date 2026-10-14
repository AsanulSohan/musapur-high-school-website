"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { IMPORTANT_GOV_LINKS, INSTITUTIONAL_FACTS } from "@/data/school-data";
import {
  ExternalLink,
  Clock,
  Phone,
  Mail,
  Eye,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  FileDown,
  Compass,
} from "lucide-react";

export default function ImportantLinksSidebar() {
  const { isBn } = useLanguage();

  // Simulated live visitor counter with realistic state
  const [visitorStats, setVisitorStats] = useState({
    today: 142,
    onlineNow: 7,
    thisMonth: 3850,
    total: 124890,
  });

  useEffect(() => {
    // Subtle real-time fluctuation
    const interval = setInterval(() => {
      setVisitorStats((prev) => ({
        ...prev,
        onlineNow: Math.floor(Math.random() * 5) + 6,
        today: prev.today + 1,
        total: prev.total + 1,
      }));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="space-y-6">
      {/* WIDGET 1: INSTITUTION AT A GLANCE (এক নজরে মুছাপুর উচ্চ বিদ্যালয়) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
          <Building2 size={18} className="text-[#064e3b]" />
          <h3 className="font-bangla-serif text-base font-bold text-slate-900">
            {isBn ? "এক নজরে প্রতিষ্ঠান" : "Institution at a Glance"}
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500 font-bangla">{isBn ? "প্রতিষ্ঠানের নাম" : "Institution"}</span>
            <span className="font-bold text-slate-800 font-bangla text-right">মুছাপুর উচ্চ বিদ্যালয়</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500">EIIN</span>
            <span className="font-mono font-bold text-[#064e3b]">{INSTITUTIONAL_FACTS.eiin}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500 font-bangla">{isBn ? "বিদ্যালয় কোড" : "School Code"}</span>
            <span className="font-mono font-bold text-slate-800">{INSTITUTIONAL_FACTS.schoolCode}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500 font-bangla">{isBn ? "শিক্ষা বোর্ড" : "Education Board"}</span>
            <span className="font-semibold text-emerald-800 font-bangla">{isBn ? "কুমিল্লা বোর্ড" : "Comilla"}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500 font-bangla">{isBn ? "স্থাপিত" : "Established"}</span>
            <span className="font-bold text-amber-700">{INSTITUTIONAL_FACTS.established} খ্রিষ্টাব্দ</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500 font-bangla">{isBn ? "শাখা ও শিফট" : "Shift"}</span>
            <span className="font-semibold text-slate-700 font-bangla">{isBn ? "একক শিফট (দিবা শাখা)" : "Single (Day)"}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-bangla">{isBn ? "ক্যাম্পাসের জমি" : "Campus Land"}</span>
            <span className="font-bold text-slate-800">২২৪ শতাংশ (২.২৪ একর)</span>
          </div>
        </div>
      </div>

      {/* WIDGET 2: IMPORTANT GOV & BOARD LINKS (গুরুত্বপূর্ণ লিংক) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-[#064e3b]" />
            <h3 className="font-bangla-serif text-base font-bold text-slate-900">
              {isBn ? "গুরুত্বপূর্ণ সরকারি লিংক" : "Important Official Links"}
            </h3>
          </div>
          <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold">
            {isBn ? "শিক্ষা বাতায়ন" : "Portals"}
          </span>
        </div>

        <div className="space-y-1.5">
          {IMPORTANT_GOV_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-50 text-xs text-slate-700 hover:text-[#064e3b] transition group"
            >
              <div className="flex items-center gap-2 font-bangla font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 group-hover:scale-125 transition" />
                <span>{isBn ? link.titleBn : link.titleEn}</span>
              </div>
              <ExternalLink size={13} className="text-slate-400 group-hover:text-emerald-700 shrink-0 ml-1" />
            </a>
          ))}
        </div>
      </div>

      {/* WIDGET 3: WORKING HOURS & EMERGENCY CONTACT (অফিস সময় ও যোগাযোগ) */}
      <div className="bg-gradient-to-br from-[#064e3b] to-[#042f24] rounded-2xl p-5 text-white shadow-md">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-emerald-800">
          <Clock size={18} className="text-amber-400" />
          <h3 className="font-bangla-serif text-base font-bold text-white">
            {isBn ? "অফিস সময় ও হটলাইন" : "Office Hours & Helpline"}
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <p className="text-emerald-300 font-semibold">{isBn ? "দাপ্তরিক সময়সূচি:" : "Working Schedule:"}</p>
            <p className="font-bangla text-slate-100 font-bold mt-0.5">
              {isBn ? INSTITUTIONAL_FACTS.officeHoursBn : INSTITUTIONAL_FACTS.officeHoursEn}
            </p>
            <p className="text-[11px] text-amber-300 mt-0.5">
              {isBn ? "শুক্রবার ও শনিবার সাপ্তাহিক ছুটি" : "Friday & Saturday Closed"}
            </p>
          </div>

          <div className="pt-2 border-t border-emerald-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-200">
              <Phone size={13} className="text-amber-400 shrink-0" />
              <span>{INSTITUTIONAL_FACTS.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Mail size={13} className="text-amber-400 shrink-0" />
              <span className="truncate">{INSTITUTIONAL_FACTS.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* WIDGET 4: VISITOR COUNTER (ভিজিটর ট্র্যাকার) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-[#064e3b]" />
            <h3 className="font-bangla-serif text-base font-bold text-slate-900">
              {isBn ? "ভিজিটর ট্র্যাকার" : "Visitor Analytics"}
            </h3>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
            {isBn ? "সক্রিয়" : "Active"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[11px] text-slate-500 font-bangla">{isBn ? "আজকের ভিজিটর" : "Today"}</p>
            <p className="font-bold text-slate-900 text-sm font-mono mt-0.5">{visitorStats.today}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[11px] text-slate-500 font-bangla">{isBn ? "বর্তমানে অনলাইন" : "Online"}</p>
            <p className="font-bold text-emerald-700 text-sm font-mono mt-0.5">{visitorStats.onlineNow}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[11px] text-slate-500 font-bangla">{isBn ? "চলতি মাসে" : "This Month"}</p>
            <p className="font-bold text-slate-900 text-sm font-mono mt-0.5">{visitorStats.thisMonth.toLocaleString()}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <p className="text-[11px] text-emerald-800 font-bangla font-semibold">{isBn ? "সর্বমোট ভিজিটর" : "Total"}</p>
            <p className="font-bold text-[#064e3b] text-sm font-mono mt-0.5">{visitorStats.total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

