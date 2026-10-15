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
  Sparkles,
} from "lucide-react";
import { compressImage, normalizeBatchYear } from "@/lib/image-compression";

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
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = useState<{
    originalKB: number;
    compressedKB: number;
  } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check upper limit before compression (allow up to 25MB phone photos)
    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg(
        isBn
          ? "ছবির ফাইল সাইজ অনেক বড় (সর্বোচ্চ ২৫ মেগাবাইট অনুমোদিত)।"
          : "Photo size is too large (maximum 25MB allowed)."
      );
      return;
    }

    setErrorMsg(null);
    setIsCompressing(true);

    try {
      // In-browser Canvas compression: 5MB-15MB -> ~120KB-200KB
      const result = await compressImage(file, 1200, 0.8);
      setPhotoFile(result.file);
      setPhotoBase64(result.dataUrl);
      setPreviewUrl(result.dataUrl);
      setCompressionInfo({
        originalKB: result.originalSizeKB,
        compressedKB: result.compressedSizeKB,
      });
    } catch (compressErr) {
      console.warn("Client compression failed, using original file:", compressErr);
      setPhotoFile(file);
      const objUrl = URL.createObjectURL(file);
      setPreviewUrl(objUrl);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoBase64(null);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setCompressionInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanName = name.trim();
    const cleanBatch = normalizeBatchYear(batch);
    const cleanStory = story.trim();

    if (!cleanName) {
      setErrorMsg(isBn ? "অনুগ্রহ করে আপনার নাম লিখুন।" : "Please enter your name.");
      return;
    }
    if (!cleanBatch) {
      setErrorMsg(
        isBn
          ? "অনুগ্রহ করে আপনার এসএসসি ব্যাচের সন সঠিকভাবে লিখুন (যেমন: 2019 বা ২০১৯)।"
          : "Please enter a valid SSC batch year (e.g. 2019)."
      );
      return;
    }
    if (!cleanStory) {
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
      formData.append("nameBn", cleanName);
      formData.append("nameEn", cleanName);
      formData.append("batch", cleanBatch);
      formData.append(
        "titleBn",
        title.trim() || `মুছাপুরের স্মৃতি • এসএসসি ${cleanBatch} ব্যাচ`
      );
      formData.append(
        "titleEn",
        title.trim() || `Memories • SSC ${cleanBatch} Batch`
      );
      formData.append("storyBn", cleanStory);
      formData.append("storyEn", cleanStory);
      if (profession.trim()) formData.append("professionBn", profession.trim());
      if (location.trim()) formData.append("locationBn", location.trim());

      // Send both compressed file and base64 string for maximum reliability
      if (photoBase64) {
        formData.append("photoBase64", photoBase64);
      }
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const res = await fetch("/api/alumni", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error(
          isBn
            ? "সার্ভার থেকে সঠিক উত্তর পাওয়া যায়নি।"
            : "Invalid response received from server."
        );
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || (isBn ? "স্মৃতি আপলোড করা সম্ভব হয়নি।" : "Failed to submit story."));
      }

      setSuccessMsg(
        isBn
          ? "অভিনন্দন! আপনার স্মৃতি ও ছবি সফলভাবে গ্যালারিতে যুক্ত হয়েছে।"
          : "Success! Your memory and photo have been added to the gallery."
      );

      // Trigger parent update & local storage cache
      if (data.story) {
        try {
          const cached = localStorage.getItem("mhs_alumni_stories_cache");
          const existingList: AlumniStoryItem[] = cached ? JSON.parse(cached) : [];
          const updatedList = [data.story, ...existingList.filter((s) => s.id !== data.story.id)];
          localStorage.setItem("mhs_alumni_stories_cache", JSON.stringify(updatedList));
        } catch {}

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
      console.error("Submission error:", err);
      if (err.name === "TypeError" || err.message?.includes("fetch")) {
        setErrorMsg(
          isBn
            ? "সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করুন এবং পুনরায় চেষ্টা করুন।"
            : "Network error. Please check your internet connection and try again."
        );
      } else {
        setErrorMsg(err.message || (isBn ? "সংরক্ষণ করতে সমস্যা হয়েছে।" : "Submission error occurred."));
      }
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
              placeholder={isBn ? "যেমন: তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
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
              placeholder={isBn ? "যেমন: 2019 বা ২০১৯" : "e.g. 2019"}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50 font-mono"
            />
          </div>
          {batch && (
            <p className="text-[10px] text-emerald-700 mt-1 font-mono">
              ✓ Batch: {normalizeBatchYear(batch) || batch}
            </p>
          )}
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
              placeholder={isBn ? "যেমন: শিক্ষক / ইঞ্জিনিয়ার / শিক্ষার্থী" : "e.g. Engineer / Student"}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-slate-50 font-bangla"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 font-bangla">
            {isBn ? "বর্তমান বাসস্থান / দেশ (ঐচ্ছিক)" : "Current Location / Country (Optional)"}
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={isBn ? "যেমন: সংযুক্ত আরব আমিরাত (UAE) / ঢাকা" : "e.g. United Arab Emirates"}
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
            placeholder={isBn ? "যেমন: ২০১৯ সালের বিদায় সংবর্ধনা ও প্রিয় বন্ধুদের আড্ডা" : "e.g. 2019 Farewell & Memories"}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-slate-50 font-bangla"
          />
        </div>
      </div>

      {/* Row 4: Photo Upload Box with Auto-Compression */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla flex items-center justify-between">
          <span>{isBn ? "ঐতিহাসিক ছবি আপলোড করুন *" : "Upload School Memory Photo *"}</span>
          <span className="text-[10px] text-emerald-700 font-normal flex items-center gap-1">
            <Sparkles size={11} /> {isBn ? "স্মার্ট অটো-কম্প্রেশন সক্রিয়" : "Smart Compression Active"}
          </span>
        </label>

        {!previewUrl ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-2xl p-5 text-center cursor-pointer transition bg-slate-50/70 hover:bg-emerald-50/40 group"
          >
            {isCompressing ? (
              <div className="flex flex-col items-center justify-center py-2">
                <Loader2 size={28} className="animate-spin text-emerald-600 mb-2" />
                <p className="font-bangla text-xs font-bold text-slate-700">
                  {isBn ? "ছবি অপ্টিমাইজ করা হচ্ছে..." : "Optimizing photo for fast upload..."}
                </p>
              </div>
            ) : (
              <>
                <UploadCloud size={32} className="mx-auto mb-2 text-slate-400 group-hover:text-emerald-600 transition" />
                <p className="font-bangla text-xs font-bold text-slate-700 group-hover:text-emerald-800">
                  {isBn ? "ছবি নির্বাচন করতে এখানে ক্লিক করুন" : "Click to select a photo from your phone or PC"}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  JPG, PNG, WEBP • {isBn ? "মোবাইল ক্যামেরা ছবি স্বয়ংক্রিয়ভাবে দ্রুত আপলোড উপযোগী করা হবে" : "Mobile camera photos auto-optimized"}
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-slate-300 bg-slate-950 group">
            <Image
              src={previewUrl}
              alt="Upload Preview"
              fill
              className="object-contain"
              unoptimized
            />
            <div className="absolute top-2 right-2 flex items-center gap-2">
              {compressionInfo && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-900/90 text-emerald-200 text-[10px] font-mono border border-emerald-500/40 flex items-center gap-1">
                  <span>{compressionInfo.originalKB}KB ➔ {compressionInfo.compressedKB}KB</span>
                </span>
              )}
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="p-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-sm"
                title="Remove photo"
              >
                <X size={14} />
              </button>
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono">
              {photoFile?.name}
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
            disabled={loading || isCompressing}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            {isBn ? "বাতিল" : "Cancel"}
          </button>
        )}

        <button
          type="submit"
          disabled={loading || isCompressing}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#064e3b] to-[#0d5c4a] hover:from-[#042f24] hover:to-[#064e3b] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/20 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin text-amber-300" />
              <span>{isBn ? "সংরক্ষণ হচ্ছে..." : "Uploading story..."}</span>
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
