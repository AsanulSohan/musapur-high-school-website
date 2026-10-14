import React from "react";
import { getGalleryItemsFromDisk } from "@/lib/gallery-service";
import { LanguageProvider } from "@/context/LanguageContext";
import TopHeaderBar from "@/components/TopHeaderBar";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";
import NewsTicker from "@/components/NewsTicker";
import HeroSection from "@/components/HeroSection";
import LeadershipMessages from "@/components/LeadershipMessages";
import NoticeBoardWidget from "@/components/NoticeBoardWidget";
import AcademicPrograms from "@/components/AcademicPrograms";
import AboutSection from "@/components/AboutSection";
import PhotoGalleryMarquee from "@/components/PhotoGalleryMarquee";
import SchoolStatsSection from "@/components/SchoolStatsSection";
import ImportantLinksSidebar from "@/components/ImportantLinksSidebar";
import Footer from "@/components/Footer";

// Force dynamic or revalidate to ensure files added to public/gallery are picked up
export const dynamic = "force-dynamic";

export default function Home() {
  // Dynamically read images from public/gallery/ folder on the server
  const galleryItems = getGalleryItemsFromDisk();

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#b7d84b] selection:text-[#042f24]">
        {/* 1. Top Header Bar: Codes, EIIN, Parent/Teacher/Student Zones, Language Switcher */}
        <TopHeaderBar />

        {/* 2. Main Institutional Header: School Crest, Bilingual Names, Admission CTA */}
        <MainHeader />

        {/* 3. Primary Navigation Bar: Dropdowns & Mobile Responsive Drawer */}
        <Navbar />

        {/* 4. Breaking News Ticker (Pause on Hover) */}
        <NewsTicker />

        <main className="flex-1">
          {/* 5. Hero & Historical Welcome Banner */}
          <HeroSection />

          {/* 6. Main 2-Column Institutional Portal Body Layout */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Main Column (8 Cols): Leadership Messages, Notices, Academics, History */}
              <div className="lg:col-span-8 space-y-12">
                {/* Chairman & Headmaster Messages with Modal Dialogs */}
                <LeadershipMessages />

                {/* Clean Scrollable Notice Board Widget with Filter Tabs */}
                <NoticeBoardWidget />

                {/* School-Only Secondary Academic Streams & Facilities */}
                <AcademicPrograms />

                {/* Historical Genesis & Values (Est. 1972) */}
                <AboutSection />
              </div>

              {/* Right Sidebar (4 Cols): At A Glance, Gov Links, Visitor Counter, Working Hours */}
              <div className="lg:col-span-4 sticky top-18">
                <ImportantLinksSidebar />
              </div>
            </div>
          </div>

          {/* 7. Auto-Scrolling Right-to-Left Photo Gallery Marquee with Hover Pause */}
          <PhotoGalleryMarquee initialItems={galleryItems} />

          {/* 8. Institutional Key Statistics & Figures */}
          <SchoolStatsSection />
        </main>

        {/* 9. Comprehensive Institutional Footer with National Hotlines */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
