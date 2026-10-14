"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { NOTICES_DATA } from "@/data/school-data";
import { NoticeItem } from "@/types";
import {
  Bell,
  Download,
  Calendar,
  Search,
  Filter,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import Modal from "./Modal";

export default function NoticeBoardWidget() {
  const { isBn } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<NoticeItem["category"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeItem | null>(null);

  const categories = [
    { id: "all", labelBn: "সকল বিজ্ঞপ্তি", labelEn: "All Notices" },
    { id: "admission", labelBn: "ভর্তি বিজ্ঞপ্তি", labelEn: "Admission" },
    { id: "exam", labelBn: "পরীক্ষা ও রুটিন", labelEn: "Exam & Routine" },
    { id: "academic", labelBn: "একাডেমিক", labelEn: "Academic" },
    { id: "administrative", labelBn: "প্রশাসনিক", labelEn: "Administrative" },
  ];

  const filteredNotices = NOTICES_DATA.filter((notice) => {
    const matchesCategory = selectedCategory === "all" || notice.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      notice.titleBn.toLowerCase().includes(q) ||
      notice.titleEn.toLowerCase().includes(q) ||
      notice.dateBn.includes(q) ||
      notice.dateEn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (notice: NoticeItem) => {
    alert(
      isBn
        ? `"${notice.titleBn}" বিজ্ঞপ্তিটির ফাইল ডাউনলোড শুরু হচ্ছে (${notice.fileSize || "250 KB"})...`
        : `Downloading "${notice.titleEn}" (${notice.fileSize || "250 KB"})...`
    );
  };

  return (
    <section id="notices" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d97706] mb-1 font-sans">
              <Bell size={14} className="text-[#d97706] animate-bounce" />
              <span>{isBn ? "সর্বশেষ দাপ্তরিক ও একাডেমিক নোটিশ" : "Official Circulars & Schedules"}</span>
            </div>
            <h2 className="font-bangla-serif text-2xl sm:text-3xl font-extrabold text-[#064e3b]">
              {isBn ? "মুছাপুর উচ্চ বিদ্যালয় নোটিশ বোর্ড" : "MHS Notice Board & Circulars"}
            </h2>
            <p className="font-bangla text-xs sm:text-sm text-slate-500 mt-1">
              {isBn
                ? "ভর্তি বিজ্ঞপ্তি, পরীক্ষার সময়সূচি, অভিভাবক সমাবেশ এবং সরকারি নির্দেশনাবলী"
                : "Admission notices, examination schedules, assemblies, and official gazettes."}
            </p>
          </div>

          {/* Search Filter Box */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? "নোটিশ অনুসন্ধান করুন..." : "Search notices..."}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 border-b border-slate-100 notice-scrollbar">
          <Filter size={14} className="text-slate-400 mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-bold transition font-bangla ${
                selectedCategory === cat.id
                  ? "bg-[#064e3b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              {isBn ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Notice Items List / Scrolling Container */}
        <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-3 sm:p-5 shadow-xs">
          <div className="max-h-[460px] overflow-y-auto space-y-2.5 pr-1 notice-scrollbar">
            {filteredNotices.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <AlertCircle size={32} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-bangla">
                  {isBn ? "কোনো নোটিশ পাওয়া যায়নি।" : "No notices found matching your criteria."}
                </p>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 hover:border-emerald-600 hover:shadow-xs transition duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  {/* Left: Date Badge & Title */}
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    {/* Date Block */}
                    <div className="shrink-0 w-13 sm:w-15 text-center bg-emerald-50 rounded-lg p-1.5 border border-emerald-200/60 group-hover:bg-[#064e3b] group-hover:text-white transition">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 group-hover:text-amber-300">
                        {notice.dateEn.split(" ")[1] || "OCT"}
                      </span>
                      <span className="block text-base sm:text-lg font-black text-[#064e3b] group-hover:text-white leading-tight">
                        {notice.dateEn.split(" ")[0] || "12"}
                      </span>
                    </div>

                    {/* Notice Text Content */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            notice.category === "admission"
                              ? "bg-amber-100 text-amber-900 border border-amber-200"
                              : notice.category === "exam"
                              ? "bg-rose-100 text-rose-900 border border-rose-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {notice.category}
                        </span>

                        {notice.isUrgent && (
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold animate-pulse">
                            {isBn ? "জরুরি" : "URGENT"}
                          </span>
                        )}

                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar size={11} /> {isBn ? notice.dateBn : notice.dateEn}
                        </span>
                      </div>

                      <h4
                        onClick={() => setActiveNoticeModal(notice)}
                        className="font-bangla-serif text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#064e3b] cursor-pointer transition leading-snug"
                      >
                        {isBn ? notice.titleBn : notice.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 font-sans line-clamp-1">
                        {isBn ? notice.titleEn : notice.titleBn}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => setActiveNoticeModal(notice)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-600 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition flex items-center gap-1"
                    >
                      <span className="font-bangla">{isBn ? "বিস্তারিত" : "Details"}</span>
                      <ExternalLink size={12} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownload(notice)}
                      className="px-3 py-1.5 rounded-lg bg-[#064e3b] hover:bg-[#0d5c4a] text-white text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                      title={isBn ? "পিডিএফ ডাউনলোড করুন" : "Download PDF"}
                    >
                      <Download size={13} className="text-amber-300" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer of Notice Board */}
          <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span className="font-bangla">
              {isBn
                ? `মোট ${filteredNotices.length} টি বিজ্ঞপ্তি প্রদর্শিত হচ্ছে • মুছাপুর উচ্চ বিদ্যালয়`
                : `Showing ${filteredNotices.length} notices • Musapur High School`}
            </span>
            <span className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              EIIN: 107335
            </span>
          </div>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {activeNoticeModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveNoticeModal(null)}
          title={isBn ? activeNoticeModal.titleBn : activeNoticeModal.titleEn}
          subtitle={`${isBn ? "প্রকাশের তারিখ:" : "Date Published:"} ${
            isBn ? activeNoticeModal.dateBn : activeNoticeModal.dateEn
          } • Category: ${activeNoticeModal.category.toUpperCase()}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-slate-700 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold text-[#064e3b]">মুছাপুর উচ্চ বিদ্যালয়, নোয়াখালী</span>
                <span>স্মারক নং: মউবি/নোয়া/{activeNoticeModal.id}/২০২৬</span>
              </div>
              <h4 className="font-bangla-serif text-base sm:text-lg font-bold text-slate-900">
                {isBn ? activeNoticeModal.titleBn : activeNoticeModal.titleEn}
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-sans italic">
                {isBn ? activeNoticeModal.titleEn : activeNoticeModal.titleBn}
              </p>
            </div>

            <div className="font-bangla text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
              <p>
                {isBn
                  ? "মুছাপুর উচ্চ বিদ্যালয়ের সংশ্লিষ্ট সকল শিক্ষার্থী, শিক্ষক-কর্মচারী এবং সম্মানিত অভিভাবকদের অবগতির জন্য জানানো যাচ্ছে যে, উপরোক্ত বিষয়ের বিস্তারিত নির্দেশিকা ও সময়সূচি কার্যকর করা হলো।"
                  : "This is for the information of all concerned students, teachers, staff, and guardians of Musapur High School that the directives and schedules mentioned above are hereby enacted."}
              </p>
              <p>
                {isBn
                  ? "যে কোনো তথ্য বা অনুসন্ধানের জন্য অফিস চলাকালীন প্রধান শিক্ষকের কার্যালয়ে যোগাযোগ করার পরামর্শ দেওয়া হলো।"
                  : "For further inquiries or clarification, please contact the Headmaster's office during official working hours."}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {isBn ? `ফাইলের আকার: ${activeNoticeModal.fileSize || "250 KB"}` : `Size: ${activeNoticeModal.fileSize || "250 KB"}`}
              </span>
              <button
                type="button"
                onClick={() => handleDownload(activeNoticeModal)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#064e3b] hover:bg-[#0d5c4a] text-white text-xs font-bold transition"
              >
                <Download size={14} className="text-amber-300" />
                <span>{isBn ? "পিডিএফ ডাউনলোড" : "Download PDF"}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

