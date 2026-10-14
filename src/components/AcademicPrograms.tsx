"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Atom,
  Briefcase,
  BookOpen,
  Monitor,
  Flame,
  Award,
  CheckCircle,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";
import Modal from "./Modal";

export default function AcademicPrograms() {
  const { isBn } = useLanguage();
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  const streams = [
    {
      id: "science",
      titleBn: "বিজ্ঞান বিভাগ",
      titleEn: "Science Stream",
      icon: <Atom className="text-emerald-600" size={24} />,
      badgeBn: "সর্বাধুনিক ল্যাবরেটরি",
      badgeEn: "State-of-art Labs",
      subjectsBn: ["পদার্থবিজ্ঞান", "রসায়ন", "জীববিজ্ঞান", "উচ্চতর গণিত", "তথ্য ও যোগাযোগ প্রযুক্তি"],
      subjectsEn: ["Physics", "Chemistry", "Biology", "Higher Mathematics", "ICT"],
      descBn:
        "ব্যবহারিক বিজ্ঞান শিক্ষা ও উদ্ভাবনী চিন্তার বিকাশে সমৃদ্ধ ল্যাব এবং অভিজ্ঞ শিক্ষকদের নিবিড় তত্ত্বাবধানে নিয়মিত প্র্যাকটিক্যাল ক্লাস।",
      descEn:
        "Hands-on practical classes with modern laboratory apparatus, cultivating research mindset and STEM competencies.",
    },
    {
      id: "business",
      titleBn: "ব্যবসায় শিক্ষা বিভাগ",
      titleEn: "Business Studies Stream",
      icon: <Briefcase className="text-amber-600" size={24} />,
      badgeBn: "বাণিজ্যিক ও ফাইন্যান্স দক্ষতা",
      badgeEn: "Commerce & Finance",
      subjectsBn: ["হিসাববিজ্ঞান", "ফিন্যান্স ও ব্যাংকিং", "ব্যবসায় উদ্যোগ", "সাধারণ বিজ্ঞান", "আইসিটি"],
      subjectsEn: ["Accounting", "Finance & Banking", "Business Entrepreneurship", "General Science", "ICT"],
      descBn:
        "অর্থনীতি, ব্যাংকিং, হিসাববিজ্ঞান ও বাণিজ্যিক উদ্যোগের বাস্তবমুখী শিক্ষায় দক্ষ ভবিষ্যৎ উদ্যোক্তা ও চার্টার্ড প্রফেশনাল তৈরি।",
      descEn:
        "Nurturing future financial analysts, entrepreneurs, and accountants with modern business curricula.",
    },
    {
      id: "humanities",
      titleBn: "মানবিক বিভাগ",
      titleEn: "Humanities Stream",
      icon: <BookOpen className="text-indigo-600" size={24} />,
      badgeBn: "শিল্প, সাহিত্য ও সমাজদর্শন",
      badgeEn: "Arts & Social Studies",
      subjectsBn: ["বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা", "ভূগোল ও পরিবেশ", "পৌরনীতি ও নাগরিকতা", "অর্থনীতি", "আইসিটি"],
      subjectsEn: ["History & World Civilization", "Geography & Environment", "Civics & Citizenship", "Economics", "ICT"],
      descBn:
        "ইতিহাস, সাহিত্য, সমাজবিজ্ঞান ও নাগরিক দায়িত্বশীলতার সমন্বয়ে আলোকিত নেতৃত্ব ও বিচারিক চিন্তার উন্মেষ।",
      descEn:
        "Instilling profound understanding of heritage, geography, governance, and humanitarian ethics.",
    },
  ];

  const facilities = [
    {
      titleBn: "শেখ রাসেল ডিজিটাল ল্যাব",
      titleEn: "Sheikh Russell Digital Lab",
      descBn: "উচ্চগতির ব্রডব্যান্ড ইন্টারনেট এবং আধুনিক কম্পিউটার সমৃদ্ধ স্মার্ট ল্যাব。",
      descEn: "High-speed broadband internet and contemporary PC workstations for computer literacy.",
      icon: <Monitor className="text-[#064e3b]" size={22} />,
    },
    {
      titleBn: "আধুনিক বিজ্ঞানাগার",
      titleEn: "Modern Science Practical Lab",
      descBn: "পদার্থ, রসায়ন ও জীববিজ্ঞানের সকল প্রয়োজনীয় রাসায়নিক ও ব্যবহারিক যন্ত্রপাতি。",
      descEn: "Equipped with precision instruments, chemicals, and specimens for board practicals.",
      icon: <Atom className="text-[#d97706]" size={22} />,
    },
    {
      titleBn: "বঙ্গবন্ধু ও মুক্তিযুদ্ধ কর্নার লাইব্রেরি",
      titleEn: "Library & Liberation War Corner",
      descBn: "সহস্রাধিক মূল্যবান পুস্তক, রেফারেন্স গ্রন্থ ও জাতীয় সংবাদপত্র সমৃদ্ধ পাঠাগার。",
      descEn: "Thousands of historical archives, reference volumes, and national periodicals.",
      icon: <BookOpen className="text-emerald-700" size={22} />,
    },
    {
      titleBn: "বাংলাদেশ স্কাউট ও রেড ক্রিসেন্ট",
      titleEn: "MHS Scouts & Red Crescent",
      descBn: "দুর্যোগ মোকাবিলা, শৃঙ্খলা ও আত্মমর্যাদা বৃদ্ধির সক্রিয় সহশিক্ষা কার্যক্রম。",
      descEn: "Disaster management training, outdoor camps, and community welfare initiatives.",
      icon: <Compass className="text-blue-700" size={22} />,
    },
  ];

  return (
    <section id="academics" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d97706] mb-1.5 block font-sans">
            {isBn ? "মাধ্যমিক স্তর (৬ষ্ঠ হতে ১০ম শ্রেণি)" : "Secondary School Education (Grades 6-10)"}
          </span>
          <h2 className="font-bangla-serif text-3xl sm:text-4xl font-extrabold text-[#064e3b]">
            {isBn ? "একাডেমিক পাঠ্যক্রম ও শিক্ষাদান পদ্ধতি" : "Academic Curricula & Streams"}
          </h2>
          <div className="w-16 h-1 bg-[#d97706] mx-auto mt-3 rounded-full" />
          <p className="font-bangla text-xs sm:text-sm text-slate-600 mt-3">
            {isBn
              ? "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি) এবং কুমিল্লা শিক্ষা বোর্ডের নির্দেশনায় মানসম্মত শিক্ষা প্রদান。"
              : "Affiliated strictly with Comilla Education Board and following the national NCTB secondary curriculum."}
          </p>
        </div>

        {/* 3 Academic Streams Grid (Class 9 & 10) */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-emerald-600 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">{stream.icon}</div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-sans">
                    {isBn ? stream.badgeBn : stream.badgeEn}
                  </span>
                </div>

                <h3 className="font-bangla-serif text-xl font-bold text-slate-900 mb-2">
                  {isBn ? stream.titleBn : stream.titleEn}
                </h3>
                <p className="font-bangla text-xs text-slate-600 leading-relaxed mb-4">
                  {isBn ? stream.descBn : stream.descEn}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-700 font-bangla">
                    {isBn ? "গুরুত্বপূর্ণ বিষয়সমূহ:" : "Key Subject Areas:"}
                  </p>
                  <ul className="space-y-1">
                    {(isBn ? stream.subjectsBn : stream.subjectsEn).map((subj, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600 font-bangla">
                        <CheckCircle size={12} className="text-emerald-600 shrink-0" />
                        <span>{subj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedStream(stream.id)}
                  className="w-full py-2 rounded-xl bg-slate-50 hover:bg-[#064e3b] text-slate-700 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 group"
                >
                  <span className="font-bangla">{isBn ? "সিলেবাস ও বিবরণ দেখুন" : "View Curriculum"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Campus Facilities (School-Only Highlights) */}
        <div id="facilities" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d97706] font-sans">
              {isBn ? "অবকাঠামো ও সুযোগ-সুবিধা" : "Modern Infrastructure"}
            </span>
            <h3 className="font-bangla-serif text-2xl font-bold text-[#064e3b] mt-1">
              {isBn ? "শিক্ষার্থীদের জন্য আধুনিক সুযোগ-সুবিধা" : "School Infrastructure & Facilities"}
            </h3>
            <p className="font-bangla text-xs sm:text-sm text-slate-500 mt-1">
              {isBn
                ? "মুছাপুরের শিক্ষার্থীদের বাস্তবমুখী ও যুগোপযোগী শিক্ষায় স্বয়ংসম্পূর্ণ সুযোগ-সুবিধা。"
                : "Equipped to empower rural learners with digital competency and sound moral foundation."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                <div className="p-2.5 rounded-xl bg-white w-fit border border-slate-200/60 shadow-2xs">
                  {fac.icon}
                </div>
                <h4 className="font-bangla-serif font-bold text-slate-900 text-sm">
                  {isBn ? fac.titleBn : fac.titleEn}
                </h4>
                <p className="font-bangla text-xs text-slate-600 leading-relaxed">
                  {isBn ? fac.descBn : fac.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stream Curriculum Modal */}
      {selectedStream && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedStream(null)}
          title={isBn ? "মাধ্যমিক পাঠ্যক্রম নির্দেশিকা" : "Secondary Curriculum Details"}
          subtitle="এনসিটিবি ও কুমিল্লা শিক্ষা বোর্ডের অনুমোদিত পাঠ্যসূচি"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-bangla">
            <p className="leading-relaxed">
              {isBn
                ? "মুছাপুর উচ্চ বিদ্যালয়ে ৯ম ও ১০ম শ্রেণিতে বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় শিক্ষার্থীদের মেধা ও আগ্রহ অনুযায়ী বিষয় নির্বাচন নিশ্চিত করা হয়। সাপ্তাহিক টিউটোরিয়াল ও ব্যবহারিক ক্লাসের মাধ্যমে বোর্ডের জন্য পূর্ণাঙ্গ প্রস্তুতি গ্রহণ করা হয়।"
                : "Students are guided in subject selection based on analytical evaluation and aptitude. Weekly tutorials and practical assessments ensure thorough board exam readiness."}
            </p>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              <span className="font-bold">ভর্তির তথ্য: </span>
              {isBn
                ? "বিজ্ঞপ্তি অনুযায়ী ভর্তি ফরম গ্রহণ ও মেধা যাচাই সাপেক্ষে শাখায় আসন বরাদ্দ করা হয়।"
                : "Stream allocations are finalized based on merit scores in the admission screening."}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

