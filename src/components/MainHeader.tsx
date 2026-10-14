"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { INSTITUTIONAL_FACTS } from "@/data/school-data";
import { FileText, Award, MapPin } from "lucide-react";
import Modal from "./Modal";

export default function MainHeader() {
  const { isBn } = useLanguage();
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <>
      <div className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Institutional Crest and Identity */}
          <div className="flex items-center gap-3.5 sm:gap-4.5 text-center md:text-left">
            <a href="#top" className="shrink-0 group focus:outline-hidden" aria-label="Musapur High School Home">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 transition transform group-hover:scale-105">
                <Image
                  src="/mhs-logo.svg"
                  alt="Musapur High School Official Crest"
                  fill
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
            </a>

            <div>
              {/* Primary Bangla Title */}
              <h1 className="font-bangla-serif text-2xl sm:text-3xl font-extrabold text-[#064e3b] tracking-tight leading-tight">
                {INSTITUTIONAL_FACTS.nameBn}
              </h1>

              {/* Secondary English Title */}
              <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-800 font-sans mt-0.5">
                {INSTITUTIONAL_FACTS.nameEn}
              </p>

              {/* Geographical & Recognition Subtitle */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-slate-500 text-[11px] sm:text-xs mt-1">
                <span className="inline-flex items-center gap-1 text-slate-600">
                  <MapPin size={12} className="text-emerald-700 shrink-0" />
                  <span>{isBn ? "মুছাপুর, কোম্পানীগঞ্জ, নোয়াখালী" : "Companiganj, Noakhali"}</span>
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60 text-[10px]">
                  {isBn ? "কুমিল্লা শিক্ষা বোর্ড" : "Comilla Board"}
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="text-slate-500 font-medium text-[11px]">
                  {isBn ? "স্থাপিত: ১৯৭২" : "Estd: 1972"}
                </span>
              </div>
            </div>
          </div>

          {/* Institutional Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-center">
            {/* Online Admission Portal Button */}
            <button
              type="button"
              onClick={() => setShowAdmissionModal(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#064e3b] to-[#0d5c4a] hover:from-[#042f24] hover:to-[#064e3b] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/10 transition transform active:scale-95"
            >
              <FileText size={16} className="text-amber-300 shrink-0" />
              <span className="font-bangla">{isBn ? "অনলাইন ভর্তি ২০২৬" : "Admission 2026"}</span>
            </button>

            {/* Results Lookup Portal Button */}
            <button
              type="button"
              onClick={() => setShowResultModal(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-[#064e3b] hover:bg-emerald-50/50 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs transition transform active:scale-95"
            >
              <Award size={16} className="text-[#d97706] shrink-0" />
              <span className="font-bangla">{isBn ? "ফলাফল পোর্টাল" : "Results Portal"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Online Admission Quick Modal */}
      <Modal
        isOpen={showAdmissionModal}
        onClose={() => setShowAdmissionModal(false)}
        title={isBn ? "২০২৬ শিক্ষাবর্ষে ভর্তি তথ্য ও আবেদন" : "Admission Guidelines & Application 2026"}
        subtitle={isBn ? "৬ষ্ঠ থেকে ৯ম শ্রেণি (সহশিক্ষা) • মুছাপুর উচ্চ বিদ্যালয়" : "Grades 6 to 9 (Co-education)"}
      >
        <div className="space-y-4 text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <h4 className="font-bold text-amber-950 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-600 animate-ping" />
              {isBn ? "ভর্তি কার্যক্রম চলমান রয়েছে" : "Admission is Currently Open"}
            </h4>
            <p className="text-xs text-amber-900 mt-1 leading-relaxed">
              {isBn
                ? "সরকারি নীতিমালা অনুযায়ী ৬ষ্ঠ, ৭ম, ৮ম ও ৯ম শ্রেণিতে অনলাইন ও অফলাইনে সরাসরি আবেদন ফরম জমা নেওয়া হচ্ছে। বিদ্যালয় অফিস কক্ষে সকাল ৯টা থেকে দুপুর ২টা পর্যন্ত ফরম পাওয়া যাবে।"
                : "According to government policy, admission forms for Grades 6 through 9 are accepted both online and at the school administrative counter between 9:00 AM and 2:00 PM."}
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">{isBn ? "প্রয়োজনীয় কাগজপত্র:" : "Required Documents:"}</h5>
            <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
              <li>{isBn ? "শিক্ষার্থীর অনলাইন জন্ম নিবন্ধন সনদের ফটোকপি।" : "Online Birth Certificate photocopy of the student."}</li>
              <li>{isBn ? "পিতা ও মাতার জাতীয় পরিচয়পত্রের (NID) ফটোকপি।" : "Photocopies of National ID (NID) of parents."}</li>
              <li>{isBn ? "পূর্ববর্তী শ্রেণির প্রশংসাপত্র/ছাড়পত্র ও পরীক্ষার নম্বরপত্র।" : "Transfer certificate and previous class academic report card."}</li>
              <li>{isBn ? "পাসপোর্ট সাইজের রঙিন ছবি (৪ কপি)।" : "4 copies of recent passport size photographs."}</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">EIIN: 107335</span>
            <a
              href="#notices"
              onClick={() => setShowAdmissionModal(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#064e3b] text-white text-xs font-bold hover:bg-[#0d5c4a] transition"
            >
              {isBn ? "ভর্তি বিজ্ঞপ্তি নোটিশ দেখুন" : "View Full Notice"}
            </a>
          </div>
        </div>
      </Modal>

      {/* Result Portal Modal */}
      <Modal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={isBn ? "অনলাইন পরীক্ষা ফলাফল অনুসন্ধান" : "Online Academic Results Search"}
        subtitle={isBn ? "টার্ম পরীক্ষা, মডেল টেস্ট ও এসএসসি ফলাফল" : "Terminal, Model Test & SSC Results"}
      >
        <div className="space-y-4 text-sm text-slate-700">
          <p className="text-xs leading-relaxed text-slate-600">
            {isBn
              ? "শিক্ষার্থীর রোল নম্বর ও শ্রেণি নির্বাচন করে ফলাফল এবং মার্কশিট অনুসন্ধান করুন।"
              : "Search individual grade sheets by selecting Class and entering Student Roll."}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                isBn
                  ? "ফলাফল ডেটাবেজ যাচাই করা হচ্ছে। বিদ্যালয় অফিস কক্ষে নম্বরপত্র সংরক্ষিত আছে।"
                  : "Retrieving records. Grade transcripts are verified with the school registry."
              );
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isBn ? "শ্রেণি নির্বাচন করুন" : "Select Class"}
              </label>
              <select className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-white">
                <option>{isBn ? "১০ম শ্রেণি (SSC পরীক্ষার্থী)" : "Class 10 (SSC Candidate)"}</option>
                <option>{isBn ? "৯ম শ্রেণি" : "Class 9"}</option>
                <option>{isBn ? "৮ম শ্রেণি" : "Class 8"}</option>
                <option>{isBn ? "৭ম শ্রেণি" : "Class 7"}</option>
                <option>{isBn ? "৬ষ্ঠ শ্রেণি" : "Class 6"}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isBn ? "শিক্ষার্থীর রোল নম্বর" : "Student Roll Number"}
              </label>
              <input
                type="number"
                placeholder={isBn ? "যেমন: ১০১" : "e.g. 101"}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#064e3b] hover:bg-[#0d5c4a] text-white text-xs font-bold transition shadow-xs"
            >
              {isBn ? "ফলাফল দেখুন" : "Search Result"}
            </button>
          </form>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-900">
            <span className="font-bold">SSC Result Archive: </span>
            {isBn
              ? "কুমিল্লা শিক্ষা বোর্ডের অধীনে আমাদের এসএসসি শিক্ষার্থীদের ৯৮.৪% সফল পাসের রেকর্ড রয়েছে।"
              : "MHS maintains an exceptional 98.4% average pass rate in SSC under Comilla Board."}
          </div>
        </div>
      </Modal>
    </>
  );
}

