"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TEACHERS_DATA } from "@/data/teachers-data";
import { TeacherItem } from "@/types";
import {
  GraduationCap,
  Search,
  Filter,
  Phone,
  Mail,
  BookOpen,
  Calendar,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Award,
  Sparkles,
  UserCheck,
} from "lucide-react";
import Modal from "./Modal";

export default function TeachersSection() {
  const { isBn } = useLanguage();
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);

  const departments = [
    { id: "all", labelBn: "সকল শিক্ষক", labelEn: "All Faculty" },
    { id: "admin", labelBn: "প্রশাসন", labelEn: "Administration" },
    { id: "science", labelBn: "বিজ্ঞান ও গণিত", labelEn: "Science & Math" },
    { id: "humanities", labelBn: "ভাষা ও মানবিক", labelEn: "Languages & Arts" },
    { id: "business", labelBn: "ব্যবসায় শিক্ষা", labelEn: "Business Studies" },
    { id: "ict", labelBn: "আইসিটি ও কম্পিউটার", labelEn: "ICT & Digital Lab" },
  ];

  const filteredTeachers = TEACHERS_DATA.filter((teacher) => {
    const matchesDept = selectedDept === "all" || teacher.department === selectedDept;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      teacher.nameBn.toLowerCase().includes(q) ||
      teacher.nameEn.toLowerCase().includes(q) ||
      teacher.subjectBn.toLowerCase().includes(q) ||
      teacher.subjectEn.toLowerCase().includes(q) ||
      teacher.designationBn.toLowerCase().includes(q) ||
      teacher.designationEn.toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  return (
    <section id="teachers" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#064e3b] text-xs font-bold uppercase tracking-widest mb-2 font-sans">
              <GraduationCap size={14} className="text-[#d97706]" />
              <span>{isBn ? "শিক্ষক ও কর্মকর্তা কর্নার" : "Faculty & Mentors Directory"}</span>
            </div>
            <h2 className="font-bangla-serif text-3xl sm:text-4xl font-extrabold text-[#064e3b]">
              {isBn ? "মুছাপুর উচ্চ বিদ্যালয়ের নিবেদিত শিক্ষকবৃন্দ" : "Honorable Teachers & Faculty"}
            </h2>
            <p className="font-bangla text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {isBn
                ? "অভিজ্ঞ, মেধাবী ও নিবেদিতপ্রাণ শিক্ষক মণ্ডলীর তত্ত্বাবধানে মুছাপুরের শিক্ষার্থীদের চরিত্র গঠন ও মানসম্মত পাঠদান পরিচালিত হয়।"
                : "Guided by compassionate and qualified subject specialists cultivating academic distinction and moral character."}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? "শিক্ষকের নাম বা বিষয় খুঁজুন..." : "Search teacher or subject..."}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50 font-bangla"
            />
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-100 notice-scrollbar">
          <Filter size={15} className="text-slate-400 shrink-0 mr-1" />
          {departments.map((dept) => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setSelectedDept(dept.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition font-bangla ${
                selectedDept === dept.id
                  ? "bg-[#064e3b] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              {isBn ? dept.labelBn : dept.labelEn}
            </button>
          ))}
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-500 transition duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100">
                  <Image
                    src={teacher.image}
                    alt={isBn ? teacher.nameBn : teacher.nameEn}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                  {/* Department Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#064e3b] text-[10px] font-bold border border-emerald-200 shadow-xs font-bangla">
                      {isBn ? teacher.departmentBn : teacher.departmentEn}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="space-y-0.5">
                    <h3 className="font-bangla-serif text-base font-bold text-slate-900 group-hover:text-[#064e3b] transition leading-snug">
                      {isBn ? teacher.nameBn : teacher.nameEn}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800 font-bangla">
                      {isBn ? teacher.designationBn : teacher.designationEn}
                    </p>
                  </div>

                  {/* Subject and Qualification */}
                  <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600 font-bangla">
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <BookOpen size={13} className="text-[#d97706] shrink-0" />
                      <span className="truncate">{isBn ? teacher.subjectBn : teacher.subjectEn}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Award size={13} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{isBn ? teacher.qualificationBn : teacher.qualificationEn}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-4 pb-4 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="w-full py-2 rounded-xl bg-slate-50 hover:bg-[#064e3b] text-slate-700 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200 group-hover:border-emerald-600"
                >
                  <span className="font-bangla">{isBn ? "প্রোফাইল ও যোগাযোগ" : "View Profile"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <UserCheck size={36} className="mx-auto mb-2 text-slate-300" />
            <p className="font-bangla text-sm">
              {isBn ? "উক্ত বিষয়ের কোনো শিক্ষক খুঁজে পাওয়া যায়নি।" : "No faculty found matching the query."}
            </p>
          </div>
        )}
      </div>

      {/* TEACHER DETAILS MODAL */}
      {selectedTeacher && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTeacher(null)}
          title={isBn ? selectedTeacher.nameBn : selectedTeacher.nameEn}
          subtitle={`${isBn ? selectedTeacher.designationBn : selectedTeacher.designationEn} • ${
            isBn ? selectedTeacher.departmentBn : selectedTeacher.departmentEn
          }`}
          maxWidth="lg"
        >
          <div className="space-y-5 text-slate-700 text-sm">
            {/* Top Identity Card */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <div className="relative w-24 h-28 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-700 bg-white shadow-sm">
                <Image
                  src={selectedTeacher.image}
                  alt={isBn ? selectedTeacher.nameBn : selectedTeacher.nameEn}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1 text-center sm:text-left flex-1">
                <span className="px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-950 font-bold text-[10px] font-sans">
                  {selectedTeacher.department.toUpperCase()}
                </span>
                <h4 className="font-bangla-serif text-lg sm:text-xl font-bold text-[#064e3b]">
                  {isBn ? selectedTeacher.nameBn : selectedTeacher.nameEn}
                </h4>
                <p className="font-bangla text-xs font-semibold text-slate-700">
                  {isBn ? selectedTeacher.designationBn : selectedTeacher.designationEn}
                </p>
                <p className="font-bangla text-xs text-slate-500">
                  {isBn ? selectedTeacher.qualificationBn : selectedTeacher.qualificationEn}
                </p>
              </div>
            </div>

            {/* Teacher Bio */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs font-bangla">
                <Sparkles size={14} className="text-[#d97706]" />
                <span>{isBn ? "শিক্ষকের পরিচিতি ও কর্মজীবন" : "Profile & Academic Role"}</span>
              </h5>
              <p className="font-bangla text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {isBn ? selectedTeacher.bioBn : selectedTeacher.bioEn}
              </p>
            </div>

            {/* Academic Information Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bangla">{isBn ? "পাঠদানের বিষয়" : "Subject"}</span>
                <p className="font-bold text-slate-900 font-bangla mt-0.5">
                  {isBn ? selectedTeacher.subjectBn : selectedTeacher.subjectEn}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bangla">{isBn ? "যোগদানের বছর" : "Joining Year"}</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">
                  {selectedTeacher.joiningYear || "2015"}
                </p>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                {selectedTeacher.phone && (
                  <p className="flex items-center gap-2 text-slate-700 font-sans">
                    <Phone size={13} className="text-emerald-600" />
                    <span>{selectedTeacher.phone}</span>
                  </p>
                )}
                {selectedTeacher.email && (
                  <p className="flex items-center gap-2 text-slate-700 font-sans">
                    <Mail size={13} className="text-amber-600" />
                    <span>{selectedTeacher.email}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  <ShieldCheck size={13} />
                  <span>EIIN: 107335</span>
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

