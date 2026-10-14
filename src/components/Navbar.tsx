"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Briefcase,
  BookOpen,
  UserPlus,
  Bell,
  Camera,
  Mail,
  GraduationCap,
} from "lucide-react";

interface NavSubItem {
  titleBn: string;
  titleEn: string;
  href: string;
}

interface NavItem {
  id: string;
  titleBn: string;
  titleEn: string;
  href: string;
  icon: React.ReactNode;
  children?: NavSubItem[];
}

export default function Navbar() {
  const { isBn } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: "home",
      titleBn: "প্রচ্ছদ",
      titleEn: "Home",
      href: "#top",
      icon: <Home size={15} />,
    },
    {
      id: "about",
      titleBn: "আমাদের সম্পর্কে",
      titleEn: "About Us",
      href: "#about",
      icon: <Info size={15} />,
      children: [
        { titleBn: "ইতিহাস ও ঐতিহ্য (১৯৭২)", titleEn: "History & Legacy (Est. 1972)", href: "#about" },
        { titleBn: "লক্ষ্য ও উদ্দেশ্য", titleEn: "Vision & Mission", href: "#about" },
        { titleBn: "পরিচালনা পর্ষদ", titleEn: "Managing Committee", href: "#leadership" },
        { titleBn: "ক্যাম্পাস ও অবকাঠামো", titleEn: "Campus & Infrastructure", href: "#facilities" },
      ],
    },
    {
      id: "administration",
      titleBn: "প্রশাসন",
      titleEn: "Administration",
      href: "#leadership",
      icon: <Briefcase size={15} />,
      children: [
        { titleBn: "সভাপতির বাণী", titleEn: "Chairman's Message", href: "#leadership" },
        { titleBn: "প্রধান শিক্ষকের বাণী", titleEn: "Headmaster's Message", href: "#leadership" },
        { titleBn: "শিক্ষক ও কর্মচারী তালিকা", titleEn: "Faculty & Staff Directory", href: "#stats" },
      ],
    },
    {
      id: "academics",
      titleBn: "একাডেমিক",
      titleEn: "Academics",
      href: "#academics",
      icon: <BookOpen size={15} />,
      children: [
        { titleBn: "মাধ্যমিক পাঠ্যক্রম (৬ষ্ঠ-১০ম)", titleEn: "Secondary Curriculum (Grades 6-10)", href: "#academics" },
        { titleBn: "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা", titleEn: "Science, Humanities & Business", href: "#academics" },
        { titleBn: "ক্লাস রুটিন ও শিক্ষাপঞ্জি", titleEn: "Class Routine & Calendar", href: "#academics" },
        { titleBn: "শেখ রাসেল আইসিটি ল্যাব", titleEn: "Sheikh Russell ICT Lab", href: "#facilities" },
      ],
    },
    {
      id: "admission",
      titleBn: "ভর্তি তথ্য",
      titleEn: "Admission",
      href: "#admission",
      icon: <UserPlus size={15} />,
      children: [
        { titleBn: "২০২৬ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি", titleEn: "Admission Circular 2026", href: "#notices" },
        { titleBn: "ভর্তির যোগ্যতা ও আসন সংখ্যা", titleEn: "Eligibility & Seat Capacity", href: "#notices" },
        { titleBn: "অনলাইন আবেদন নির্দেশিকা", titleEn: "Application Guidelines", href: "#admission" },
      ],
    },
    {
      id: "notices",
      titleBn: "নোটিশ বোর্ড",
      titleEn: "Notice Board",
      href: "#notices",
      icon: <Bell size={15} />,
    },
    {
      id: "gallery",
      titleBn: "ফটোগ্যালারি",
      titleEn: "Photo Gallery",
      href: "#gallery",
      icon: <Camera size={15} />,
    },
    {
      id: "contact",
      titleBn: "যোগাযোগ",
      titleEn: "Contact",
      href: "#contact",
      icon: <Mail size={15} />,
    },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#064e3b] text-white shadow-md border-b border-[#042f24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => item.children && setOpenDropdown(item.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-semibold rounded-md hover:bg-[#042f24] hover:text-amber-300 transition duration-150"
                >
                  <span className="text-emerald-300 group-hover:text-amber-300">{item.icon}</span>
                  <span className="font-bangla tracking-wide">{isBn ? item.titleBn : item.titleEn}</span>
                  {item.children && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition" />}
                </a>

                {/* Dropdown Menu */}
                {item.children && openDropdown === item.id && (
                  <div className="absolute left-0 top-full pt-1 w-64 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 py-2 text-slate-800">
                      {item.children.map((sub, i) => (
                        <a
                          key={i}
                          href={sub.href}
                          className="block px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50 hover:text-[#064e3b] transition border-b last:border-b-0 border-slate-100"
                        >
                          <span className="font-bangla">{isBn ? sub.titleBn : sub.titleEn}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Helpline Badge (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-amber-200 font-semibold bg-[#042f24] px-3 py-1.5 rounded-lg border border-emerald-800">
            <GraduationCap size={15} className="text-amber-400" />
            <span>{isBn ? "শিক্ষা ও শৃঙ্খলা" : "Discipline & Excellence"}</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <span className="font-bangla text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              {isBn ? "মুছাপুর উচ্চ বিদ্যালয় মেন্যু" : "MHS Main Menu"}
            </span>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#042f24] text-white hover:text-amber-300 transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#042f24] border-t border-[#065f46] px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => (
            <div key={item.id} className="border-b border-emerald-900/60 pb-1">
              <div className="flex items-center justify-between">
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-slate-100 hover:text-amber-300"
                >
                  <span className="text-amber-400">{item.icon}</span>
                  <span className="font-bangla">{isBn ? item.titleBn : item.titleEn}</span>
                </a>

                {item.children && (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileAccordion(openMobileAccordion === item.id ? null : item.id)
                    }
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition ${openMobileAccordion === item.id ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>

              {/* Mobile Submenu Accordion */}
              {item.children && openMobileAccordion === item.id && (
                <div className="pl-6 py-1.5 space-y-1 bg-emerald-950/60 rounded-lg my-1">
                  {item.children.map((sub, i) => (
                    <a
                      key={i}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-xs text-slate-300 hover:text-amber-300 font-bangla"
                    >
                      • {isBn ? sub.titleBn : sub.titleEn}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

