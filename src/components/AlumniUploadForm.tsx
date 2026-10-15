"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { AlumniStoryItem } from "@/types";
import {
  UploadCloud,
  X,
  CheckCircle2,
  AlertCircle,
  Camera,
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  FileText,
  Loader2,
} from "lucide-react";

interface AlumniUploadFormProps {
  onSuccess: (newStory: AlumniStoryItem) => void;
  onCancel?: () => void;
}

export default function AlumniUploadForm({ onSuccess, onCancel }: AlumniUploadFormProps) {
  const { isBn } = useLanguage();

  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg(
          isBn
            ? "ছবির আকার সর্বোচ্চ ৫ মেগাবাইট (5MB) হতে পারবে।"
            : "Photo size cannot exceed 5MB."
        );
        return;
      }
      setPhotoFile(file);
      setErrorMsg(null);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setErrorMsg(isBn ? "অনুগ্রহ করে আপনার নাম লিখুন।" : "Please enter your name.");
      return;
    }
    if (!batch.trim()) {
      setErrorMsg(isBn ? "অনুগ্রহ করে আপনার এসএসসি ব্যাচের সন লিখুন।" : "Please enter your SSC batch year.");
      return;
    }
    if (!story.trim()) {
      setErrorMsg(
        isBn
          ? "অনুগ্রহ করে ছবির পেছনের স্মৃতি বা কাহিনী লিখুন।"
          : "Please describe the memory or story behind the photo."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nameBn", name.trim());
      formData.append("nameEn", name.trim());
      formData.append("batch", batch.trim());
      formData.append("titleBn", title.trim() || `মুছাপুরের স্মৃতি • এসএসসি ${batch.trim()}`);
      formData.append("titleEn", title.trim() || `Memories • SSC ${batch.trim()}`);
      formData.append("storyBn", story.trim());
      formData.append("storyEn", story.trim());
      if (profession.trim()) formData.append("professionBn", profession.trim());
      if (location.trim()) formData.append("locationBn", location.trim());

      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const res = await fetch("/api/alumni", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit story");
      }

      setSuccessMsg(
        isBn
          ? "অভিনন্দন! আপনার স্মৃতি ও ছবি সফলভাবে গ্যালারিতে যুক্ত হয়েছে।"
          : "Success! Your memory and photo have been added to the gallery."
      );

      // Trigger parent update
      if (data.story) {
        onSuccess(data.story);
      }

      // Reset form after short delay
      setTimeout(() => {
        setName("");
        setBatch("");
        setProfession("");
        setLocation("");
        setTitle("");
        setStory("");
        handleRemovePhoto();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || (isBn ? "সংরক্ষণ করতে সমস্যা হয়েছে।" : "Submission error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Alert Notices */}
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bangla animate-in fade-in">
          <AlertCircle size={16} className="shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bangla animate-in fade-in">
          <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Row 1: Alumnus Name & SSC Batch */}
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
            {isBn ? "প্রাক্তন শিক্ষার্থীর নাম *" : "Alumnus Full Name *"}
          </label>
          <div className="relative">
            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isBn ? "যেমন: প্রকৌশলী তানভীর আহমেদ" : "e.g. Engr. Tanvir Ahmed"}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50 font-bangla"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
            {isBn ? "এসএসসি পাসের বছর (Batch) *" : "SSC Batch Year *"}
          </label>
          <div className="relative">
            <GraduationCap size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder={isBn ? "যেমন: 1998 বা 2012" : "e.g. 1998 or 2012"}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Profession & Location (Optional) */}
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 font-bangla">
            {isBn ? "বর্তমান পেশা / ডিগ্রি (ঐচ্ছিক)" : "Current Profession / Degree (Optional)"}
          </label>
          <div className="relative">
            <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder={isBn ? "যেমন: শিক্ষক / ব্যাংকার / বুয়েট গ্র্যাজুয়েট" : "e.g. Physician / Banker"}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-slate-50 font-bangla"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 font-bangla">
            {isBn ? "বর্তমান বাসস্থান / কর্মস্থল (ঐচ্ছিক)" : "Current Location (Optional)"}
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={isBn ? "যেমন: ঢাকা / নোয়াখালী / প্রবাস" : "e.g. Dhaka, Bangladesh"}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-slate-50 font-bangla"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Memory Title */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
          {isBn ? "স্মৃতির শিরোনাম (Title)" : "Memory / Photo Caption"}
        </label>
        <div className="relative">
          <FileText size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isBn ? "যেমন: ১৯৯৮ সালের বার্ষিক ক্রীড়া প্রতিযোগিতা ও স্মৃতি" : "e.g. 1998 Sports Day Memories"}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-slate-50 font-bangla"
          />
        </div>
      </div>

      {/* Row 4: Photo Upload Drag & Drop Box */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
          {isBn ? "ঐতিহাসিক ছবি আপলোড করুন" : "Upload School Memory Photo"}
        </label>

        {!previewUrl ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-2xl p-5 text-center cursor-pointer transition bg-slate-50/70 hover:bg-emerald-50/40 group"
          >
            <UploadCloud size={32} className="mx-auto mb-2 text-slate-400 group-hover:text-emerald-600 transition" />
            <p className="font-bangla text-xs font-bold text-slate-700 group-hover:text-emerald-800">
              {isBn ? "ছবি নির্বাচন করতে এখানে ক্লিক করুন" : "Click to select a photo from your device"}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              PNG, JPG, WEBP, SVG • {isBn ? "সর্বোচ্চ ৫ মেগাবাইট" : "Max 5MB"}
            </p>
          </div>
        ) : (
          <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 group">
            <Image src={previewUrl} alt="Upload Preview" fill className="object-contain" />
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-mono">
                {photoFile?.name}
              </span>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="p-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                title="Remove photo"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Row 5: Memory Story Description Textarea */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
          {isBn ? "ছবির পেছনের কাহিনী ও স্মৃতিচারণ * (Memory / Story)" : "Memory Story / Behind the Photo *"}
        </label>
        <textarea
          required
          rows={4}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder={
            isBn
              ? "ছবিটি কবে তোলা হয়েছিল, কোন কোন সহপাঠী বা শিক্ষক সাথে ছিলেন এবং মুছাপুর উচ্চ বিদ্যালয়ের ক্যাম্পাসের সেই দিনটির বিশেষ মুহূর্তের স্মৃতি সুন্দরভাবে বর্ণনা করুন..."
              : "Describe the memories associated with this photo, your batchmates, mentors, and unforgettable campus moments..."
          }
          className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50 font-bangla leading-relaxed"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            {isBn ? "বাতিল" : "Cancel"}
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#064e3b] to-[#0d5c4a] hover:from-[#042f24] hover:to-[#064e3b] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/20 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin text-amber-300" />
              <span>{isBn ? "আপলোড হচ্ছে..." : "Submitting..."}</span>
            </>
          ) : (
            <>
              <Camera size={16} className="text-amber-300" />
              <span>{isBn ? "স্মৃতি ও ছবি শেয়ার করুন" : "Share Photo & Story"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

