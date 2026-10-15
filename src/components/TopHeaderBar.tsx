"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { INSTITUTIONAL_FACTS } from "@/data/school-data";
import {
  Phone,
  Mail,
  Users,
  GraduationCap,
  Bell,
  Languages,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import Modal from "./Modal";

export default function TopHeaderBar() {
  const { lang, toggleLang, isBn } = useLanguage();
  const [activeZoneModal, setActiveZoneModal] = useState<string | null>(null);

  return (
    <>
      <div className="bg-[#042f24] text-white text-xs border-b border-[#065f46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Institutional Identifiers */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300 text-[11px] font-medium tracking-wide">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <ShieldCheck size={13} className="text-amber-400" />
              <span>EIIN: {INSTITUTIONAL_FACTS.eiin}</span>
            </span>
            <span className="hidden md:inline text-emerald-600">•</span>
            <span className="hidden md:inline">
              {isBn ? "বিদ্যালয় কোড: " : "School Code: "}
              <strong className="text-white font-mono">{INSTITUTIONAL_FACTS.schoolCode}</strong>
            </span>
            <span className="hidden lg:inline text-emerald-600">•</span>
            <span className="hidden lg:inline">
              {isBn ? "কেন্দ্র কোড: " : "Center Code: "}
              <strong className="text-white font-mono">{INSTITUTIONAL_FACTS.centerCode}</strong>
            </span>
            <span className="hidden sm:inline text-emerald-600">•</span>
            <span className="text-emerald-300 font-medium">
              {isBn ? "কুমিল্লা শিক্ষা বোর্ড • স্থাপিত: ১৯৭২" : "Comilla Board • Estd: 1972"}
            </span>
          </div>

          {/* Quick Zones & Language Switcher */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Parent's Zone */}
            <button
              type="button"
              onClick={() => setActiveZoneModal("parent")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-200 hover:text-white hover:bg-emerald-900/60 transition"
              title={isBn ? "অভিভাবক কর্নার" : "Parent's Zone"}
            >
              <Users size={12} className="text-amber-400" />
              <span>{isBn ? "অভিভাবক কর্নার" : "Parent's Zone"}</span>
            </button>

            {/* Teacher's Zone */}
            <button
              type="button"
              onClick={() => setActiveZoneModal("teacher")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-200 hover:text-white hover:bg-emerald-900/60 transition"
              title={isBn ? "শিক্ষক কর্নার" : "Teacher's Zone"}
            >
              <GraduationCap size={12} className="text-emerald-400" />
              <span>{isBn ? "শিক্ষক কর্নার" : "Teacher's Zone"}</span>
            </button>

            {/* Student's Zone */}
            <button
              type="button"
              onClick={() => setActiveZoneModal("student")}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-200 hover:text-white hover:bg-emerald-900/60 transition"
              title={isBn ? "শিক্ষার্থী কর্নার" : "Student's Zone"}
            >
              <BookOpen size={12} className="text-sky-300" />
              <span>{isBn ? "শিক্ষার্থী কর্নার" : "Student's Zone"}</span>
            </button>

            {/* Notice Board Anchor */}
            <a
              href="#notices"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-amber-300 bg-emerald-950/70 hover:bg-emerald-900 transition border border-emerald-800"
            >
              <Bell size={12} className="text-amber-400 animate-pulse" />
              <span>{isBn ? "নোটিশ" : "Notice"}</span>
            </a>

            {/* Language Switcher Pill */}
            <button
              type="button"
              onClick={toggleLang}
              className="ml-1 sm:ml-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-[11px] shadow-sm transition transform hover:scale-105 active:scale-95"
              aria-label="Toggle Language"
            >
              <Languages size={13} className="text-slate-900" />
              <span>{lang === "bn" ? "English" : "বাংলা"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Parent's Zone */}
      <Modal
        isOpen={activeZoneModal === "parent"}
        onClose={() => setActiveZoneModal(null)}
        title={isBn ? "অভিভাবক কর্নার (Parent's Zone)" : "Parent's Zone"}
        subtitle={isBn ? "মুছাপুর উচ্চ বিদ্যালয় অভিভাবক সেবা ও সংযোগ পোর্টাল" : "Parent Services & Communication"}
      >
        <div className="space-y-4 text-sm text-slate-700">
          <p className="leading-relaxed">
            {isBn
              ? "সম্মানিত অভিভাবকবৃন্দ, আপনার সন্তানের লেখাপড়ার সার্বিক অগ্রগতি, পরীক্ষার ফলাফল ও দৈনিক উপস্থিতি তদারকি করতে এই কর্নার নিয়মিত ব্যবহার করুন। কোনো অভিযোগ বা পরামর্শ থাকলে প্রধান শিক্ষকের কার্যালয়ে যোগাযোগ করুন।"
              : "Respected Guardians, use this portal to track your child's academic progress, exam results, and daily attendance. For queries or appointments, reach out to the Headmaster's office."}
          </p>
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/60">
              <h4 className="font-bold text-[#064e3b] flex items-center gap-2">
                <Phone size={15} /> {isBn ? "অভিভাবক হটলাইন" : "Guardian Helpline"}
              </h4>
              <p className="text-xs text-slate-600 mt-1">{INSTITUTIONAL_FACTS.phone}</p>
              <p className="text-[11px] text-emerald-700 mt-1">{isBn ? "সকাল ৯টা হতে বিকাল ৪টা" : "9:00 AM - 4:00 PM"}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/60">
              <h4 className="font-bold text-amber-900 flex items-center gap-2">
                <Mail size={15} /> {isBn ? "ইমেইল পরামর্শ" : "Email Query"}
              </h4>
              <p className="text-xs text-slate-600 mt-1">{INSTITUTIONAL_FACTS.email}</p>
              <p className="text-[11px] text-amber-700 mt-1">{isBn ? "২৪ ঘণ্টার মধ্যে উত্তর" : "Response within 24h"}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <a
              href="#contact"
              onClick={() => setActiveZoneModal(null)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#064e3b] text-white text-xs font-bold rounded-lg hover:bg-[#0d5c4a] transition"
            >
              {isBn ? "সরাসরি যোগাযোগ করুন" : "Direct Contact"}
            </a>
          </div>
        </div>
      </Modal>

      {/* Modal for Teacher's Zone */}
      <Modal
        isOpen={activeZoneModal === "teacher"}
        onClose={() => setActiveZoneModal(null)}
        title={isBn ? "শিক্ষক কর্নার (Teacher's Zone)" : "Teacher's Zone"}
        subtitle={isBn ? "ডিজিটাল পাঠ পরিকল্পনা ও শিক্ষক ব্যবস্থাপনা" : "Digital Lesson Planning & Management"}
      >
        <div className="space-y-4 text-sm text-slate-700">
          <p className="leading-relaxed">
            {isBn
              ? "মুছাপুর উচ্চ বিদ্যালয়ের নিবেদিতপ্রাণ শিক্ষকবৃন্দের জন্য ডিজিটাল পাঠপরিকল্পনা, মূল্যায়ন নির্দেশিকা এবং শিক্ষক বাতায়ন সংযোগ।"
              : "Digital lesson planning, continuous assessment guidelines, and Teachers Portal resources for MHS faculty."}
          </p>
          <div className="space-y-2">
            <a
              href="https://teachers.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition group"
            >
              <span className="font-semibold text-slate-800 group-hover:text-emerald-800">
                {isBn ? "শিক্ষক বাতায়ন (Teachers Portal Bangladesh)" : "Teachers Portal Bangladesh"}
              </span>
              <span className="text-xs font-bold text-emerald-700">teachers.gov.bd ↗</span>
            </a>
            <a
              href="https://nctb.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition group"
            >
              <span className="font-semibold text-slate-800 group-hover:text-emerald-800">
                {isBn ? "এনসিটিবি নতুন কারিকুলাম ও শিক্ষক সহায়িকা" : "NCTB Curriculum & Teacher Guides"}
              </span>
              <span className="text-xs font-bold text-emerald-700">nctb.gov.bd ↗</span>
            </a>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <a
              href="#teachers"
              onClick={() => setActiveZoneModal(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#064e3b] text-white text-xs font-bold rounded-lg hover:bg-[#0d5c4a] transition"
            >
              {isBn ? "সকল শিক্ষক তালিকা ও প্রোফাইল দেখুন" : "View Full Faculty Directory"}
            </a>
          </div>
        </div>
      </Modal>

      {/* Modal for Student's Zone */}
      <Modal
        isOpen={activeZoneModal === "student"}
        onClose={() => setActiveZoneModal(null)}
        title={isBn ? "শিক্ষার্থী কর্নার (Student's Zone)" : "Student's Zone"}
        subtitle={isBn ? "রুটিন, সিলেবাস ও অনলাইন স্টুডেন্ট পোর্টাল" : "Routine, Syllabus & Academic Resources"}
      >
        <div className="space-y-4 text-sm text-slate-700">
          <p className="leading-relaxed">
            {isBn
              ? "৬ষ্ঠ থেকে ১০ম শ্রেণির শিক্ষার্থীদের জন্য ক্লাস রুটিন, সিলেবাস, পরীক্ষার প্রস্তুতি এবং কুইজ শিট।"
              : "Class routines, syllabus, model test preparation, and quiz materials for Grades 6 to 10."}
          </p>
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <a
              href="#academic"
              onClick={() => setActiveZoneModal(null)}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-500 transition block"
            >
              <h5 className="font-bold text-[#064e3b]">{isBn ? "ক্লাস রুটিন ও সিলেবাস" : "Class Routine & Syllabus"}</h5>
              <p className="text-xs text-slate-500 mt-1">{isBn ? "২০২৬ শিক্ষাবর্ষ" : "Academic Session 2026"}</p>
            </a>
            <a
              href="#gallery"
              onClick={() => setActiveZoneModal(null)}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-500 transition block"
            >
              <h5 className="font-bold text-[#064e3b]">{isBn ? "সহশিক্ষা ও ক্লাব কার্যক্রম" : "Co-curricular & Clubs"}</h5>
              <p className="text-xs text-slate-500 mt-1">{isBn ? "স্কাউট, আইসিটি ও স্পোর্টস" : "Scouts, ICT & Sports"}</p>
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}

