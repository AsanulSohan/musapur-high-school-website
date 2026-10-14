"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LEADER_MESSAGES } from "@/data/school-data";
import { LeaderMessage } from "@/types";
import { Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import Modal from "./Modal";

export default function LeadershipMessages() {
  const { isBn } = useLanguage();
  const [selectedLeader, setSelectedLeader] = useState<LeaderMessage | null>(null);

  const leaders = [LEADER_MESSAGES.chairman, LEADER_MESSAGES.headmaster];

  return (
    <section id="leadership" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#d97706] mb-1.5 font-sans">
            {isBn ? "দিকনির্দেশনা ও অনুপ্রেরণা" : "Leadership & Governance"}
          </p>
          <h2 className="font-bangla-serif text-2xl sm:text-4xl font-bold text-[#064e3b]">
            {isBn ? "প্রতিষ্ঠানের দায়িত্বপ্রাপ্ত নেতৃত্বের বাণী" : "Messages from Institutional Leadership"}
          </h2>
          <div className="w-16 h-1 bg-[#d97706] mx-auto mt-3 rounded-full" />
          <p className="font-bangla text-slate-600 text-xs sm:text-sm mt-3">
            {isBn
              ? "মুছাপুর উচ্চ বিদ্যালয়কে আলোকিত বিদ্যাপীঠে রূপান্তরে আমাদের সভাপতি ও প্রধান শিক্ষকের মূল্যবান দিকনির্দেশনা।"
              : "Inspiring messages and strategic visions from the Chairman of the Managing Committee and Headmaster."}
          </p>
        </div>

        {/* Cards Grid: Chairman & Headmaster */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Body */}
              <div className="p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  {/* Portrait with Frame */}
                  <div className="relative w-28 h-34 sm:w-32 sm:h-38 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-800 shadow-md bg-slate-100">
                    <Image
                      src={leader.image}
                      alt={isBn ? leader.nameBn : leader.nameEn}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Leader Info */}
                  <div className="space-y-1.5 text-center sm:text-left flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#064e3b] font-bold text-[11px] border border-emerald-200">
                      {isBn ? leader.titleBn : leader.titleEn}
                    </span>
                    <h3 className="font-bangla-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {isBn ? leader.nameBn : leader.nameEn}
                    </h3>
                    <p className="font-bangla text-xs text-slate-500 font-medium">
                      {isBn ? leader.designationBn : leader.designationEn}
                    </p>

                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-1 text-[11px] text-emerald-800 font-semibold">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>{isBn ? "মুছাপুর উচ্চ বিদ্যালয় পরিচালনা পর্ষদ" : "MHS Administration"}</span>
                    </div>
                  </div>
                </div>

                {/* Quote Section */}
                <div className="mt-5 relative bg-slate-50 rounded-xl p-4 border border-slate-200/70">
                  <Quote size={20} className="text-amber-500/50 absolute top-3 right-3" />
                  <p className="font-bangla text-xs sm:text-sm text-slate-700 leading-relaxed italic pr-4">
                    "{isBn ? leader.quoteBn : leader.quoteEn}"
                  </p>
                </div>
              </div>

              {/* Card Footer: Read Full Message Action */}
              <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {isBn ? "প্রতিষ্ঠার ঐতিহ্য: ১৯৭২ সাল থেকে" : "Heritage: Since 1972"}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedLeader(leader)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064e3b] hover:text-[#0d5c4a] group-hover:translate-x-0.5 transition"
                >
                  <span className="font-bangla">{isBn ? "সম্পূর্ণ বাণী পড়ুন" : "Read Full Message"}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Message Dialog Modal */}
      {selectedLeader && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedLeader(null)}
          title={isBn ? selectedLeader.titleBn : selectedLeader.titleEn}
          subtitle={`${isBn ? selectedLeader.nameBn : selectedLeader.nameEn} • ${isBn ? selectedLeader.designationBn : selectedLeader.designationEn}`}
          maxWidth="xl"
        >
          <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-emerald-700 bg-white">
                <Image
                  src={selectedLeader.image}
                  alt={isBn ? selectedLeader.nameBn : selectedLeader.nameEn}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bangla-serif text-lg font-bold text-[#064e3b]">
                  {isBn ? selectedLeader.nameBn : selectedLeader.nameEn}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {isBn ? selectedLeader.designationBn : selectedLeader.designationEn}
                </p>
                <p className="text-[11px] text-emerald-800 font-semibold mt-1">
                  EIIN: 107335 • মুছাপুর, কোম্পানীগঞ্জ, নোয়াখালী
                </p>
              </div>
            </div>

            {/* Paragraphs of Speech */}
            <div className="space-y-3 font-bangla text-slate-800 text-sm sm:text-base leading-relaxed">
              {(isBn ? selectedLeader.fullMessageBn : selectedLeader.fullMessageEn).map((para, idx) => (
                <p key={idx} className="indent-4 sm:indent-6">
                  {para}
                </p>
              ))}
            </div>

            {/* Signature Block */}
            <div className="pt-4 border-t border-slate-100 flex flex-col items-end">
              <p className="font-bangla-serif font-bold text-[#064e3b]">
                {isBn ? selectedLeader.nameBn : selectedLeader.nameEn}
              </p>
              <p className="text-xs text-slate-500">
                {isBn ? selectedLeader.designationBn : selectedLeader.designationEn}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

