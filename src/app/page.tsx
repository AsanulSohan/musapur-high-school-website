import { ArrowUpRight, BookOpen, CalendarDays, ChevronRight, Download, GraduationCap, Landmark, Mail, MapPin, Menu, Phone, Search, Users, Wifi } from "lucide-react";
import Gallery from "../components/Gallery";

const notices = [
  { date: "28 SEP", type: "EXAM", title: "SSC 2027 নির্বাচনী পরীক্ষার সময়সূচি", subtitle: "SSC 2027 Test Examination Schedule", tone: "coral" },
  { date: "24 SEP", type: "ACADEMIC", title: "বার্ষিক পরীক্ষার প্রস্তুতি ও সিলেবাস", subtitle: "Annual examination preparation and syllabus", tone: "green" },
  { date: "18 SEP", type: "GENERAL", title: "অভিভাবক সমাবেশের বিজ্ঞপ্তি", subtitle: "Notice for parents and guardians meeting", tone: "yellow" },
];

const facts = [
  ["১৯৭২", "প্রতিষ্ঠার বছর", "Year established"],
  ["২২৪", "জমির পরিমাণ (শতাংশ)", "Land in decimals"],
  ["৩", "শিক্ষা বিভাগ", "Academic streams"],
  ["১০৭৩৩৫", "EIIN নম্বর", "EIIN number"],
];

export default function Home() {
  return (
    <main>
      <div className="bg-[#0d5c4a] px-5 py-2 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">জরুরি নোটিশ: ২০২৬ সালের ভর্তি কার্যক্রম চলমান <span className="mx-2 text-[#b7d84b]">•</span> Admission for 2026 is open</div>
      <header className="border-b border-[#dce7df] bg-[#f5f7f2]/95 px-5 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-5">
          <a href="#top" className="flex items-center gap-3" aria-label="Musapur High School home">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#b7d84b] text-[#0d5c4a]"><Landmark size={24} /></div>
            <div><p className="bangla text-lg font-bold leading-tight">মুছাপুর উচ্চ বিদ্যালয়</p><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#62736b]">Musapur High School · EIIN 107335</p></div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex"><a href="#about">About Us</a><a href="#academic">Academic Info</a><a href="#notices">Notice Board</a><a href="#results">Results</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></nav>
          <div className="flex items-center gap-2"><button className="hidden rounded-full border border-[#dce7df] px-3 py-2 text-xs font-bold sm:block">বাংলা / EN</button><button className="rounded-full bg-[#0d5c4a] p-2.5 text-white lg:hidden" aria-label="Open navigation"><Menu size={19} /></button></div>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pt-16">
        <div><p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#e77945]"><span className="h-2 w-2 rounded-full bg-[#e77945]" /> Knowledge · Character · Service</p><h1 className="max-w-3xl text-5xl font-bold leading-[1.03] tracking-[-.04em] sm:text-7xl">শিক্ষার আলোয়<br /><span className="text-[#0d5c4a]">আগামীর পথে</span></h1><p className="bangla mt-6 max-w-xl text-lg leading-8 text-[#62736b]">মুছাপুর উচ্চ বিদ্যালয় — জ্ঞান, নৈতিকতা ও মানবিকতার ভিত্তিতে গড়ে ওঠা একটি আলোকিত শিক্ষাঙ্গন।</p><div className="mt-8 flex flex-wrap gap-3"><a href="#notices" className="inline-flex items-center gap-2 rounded-full bg-[#0d5c4a] px-5 py-3 text-sm font-bold text-white">সর্বশেষ নোটিশ <ArrowUpRight size={17} /></a><a href="#about" className="inline-flex items-center gap-2 rounded-full border border-[#b9cfc1] px-5 py-3 text-sm font-bold">আমাদের সম্পর্কে <ChevronRight size={17} /></a></div></div>
        <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] bg-[#c9d8ca] shadow-xl shadow-[#0d5c4a]/10"><div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,92,74,.08),rgba(183,216,75,.35))]" /><div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 backdrop-blur"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#e77945]">Since 1972</p><p className="bangla mt-1 text-xl font-bold">একটি গর্বিত ঐতিহ্য</p></div><GraduationCap className="text-[#0d5c4a]" /></div></div><div className="absolute right-10 top-10 h-36 w-36 rounded-full border-[18px] border-white/50" /><div className="absolute left-12 top-20 h-28 w-28 rounded-[2rem] bg-[#0d5c4a]/15 rotate-12" /></div>
      </section>

      <section className="border-y border-[#dce7df] bg-white px-5 py-7 sm:px-8"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-4">{facts.map(([value, bn, en]) => <div key={en} className="border-l-2 border-[#b7d84b] pl-4"><p className="text-2xl font-bold text-[#0d5c4a]">{value}</p><p className="bangla mt-1 text-sm font-semibold">{bn}</p><p className="text-xs text-[#62736b]">{en}</p></div>)}</div></section>

      <section id="notices" className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e77945]">Stay informed</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Notice Board</h2><p className="bangla mt-2 text-[#62736b]">গুরুত্বপূর্ণ বিজ্ঞপ্তি ও সর্বশেষ খবর</p></div><a href="#" className="hidden items-center gap-1 text-sm font-bold text-[#0d5c4a] sm:flex">সব নোটিশ দেখুন <ArrowUpRight size={16} /></a></div><div className="grid gap-4 lg:grid-cols-3">{notices.map((notice) => <article key={notice.title} className="group rounded-2xl border border-[#dce7df] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-start justify-between"><div className={`grid h-14 w-14 place-items-center rounded-xl text-center text-[10px] font-bold leading-tight ${notice.tone === "coral" ? "bg-[#fde0d5] text-[#b54e28]" : notice.tone === "green" ? "bg-[#dcefcf] text-[#28704d]" : "bg-[#fff0b7] text-[#786419]"}`}>{notice.date.split(" ").map((part) => <span key={part}>{part}</span>)}</div><span className="rounded-full bg-[#f5f7f2] px-3 py-1 text-[10px] font-bold tracking-widest text-[#62736b]">{notice.type}</span></div><h3 className="bangla mt-5 text-lg font-bold">{notice.title}</h3><p className="mt-1 text-sm text-[#62736b]">{notice.subtitle}</p><button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0d5c4a]"><Download size={15} /> PDF ডাউনলোড</button></article>)}</div></section>
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["Principal's Message", "প্রধান শিক্ষকের বার্তা"], ["Governing Body", "পরিচালনা পর্ষদ"], ["Online Admission", "অনলাইন ভর্তি তথ্য"], ["Parent Contact", "অভিভাবক যোগাযোগ"]].map(([title, text]) => <a href="#contact" key={title} className="flex items-center justify-between rounded-2xl border border-[#dce7df] bg-white p-5 transition hover:border-[#0d5c4a]"><div><p className="text-sm font-bold">{title}</p><p className="bangla mt-1 text-xs text-[#62736b]">{text}</p></div><ArrowUpRight className="text-[#e77945]" size={18} /></a>)}</div></section>

      <Gallery />

      <section id="about" className="bg-[#0d5c4a] px-5 py-16 text-white sm:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b7d84b]">Our foundation</p><h2 className="mt-3 text-4xl font-bold tracking-tight">একটি বিদ্যালয়,<br />একটি পরিবার</h2><p className="bangla mt-5 max-w-md text-base leading-8 text-white/70">১৯৭২ সাল থেকে মুছাপুর ও আশেপাশের এলাকার শিক্ষার্থীদের স্বপ্নকে জ্ঞানের শক্তিতে রূপ দিতে আমরা কাজ করে চলেছি।</p><a href="#academic" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#b7d84b] px-5 py-3 text-sm font-bold text-[#17261f]">আরও জানুন <ArrowUpRight size={17} /></a></div><div id="academic" className="grid gap-3 sm:grid-cols-2"><InfoCard icon={<BookOpen />} title="Academic Excellence" text="Science, Humanities & Business Studies" /><InfoCard icon={<Users />} title="Caring Community" text="Dedicated teachers and engaged guardians" /><InfoCard icon={<CalendarDays />} title="Day Shift" text="Accessible learning for every student" /><InfoCard icon={<Wifi />} title="Digital Future" text="Building a connected learning portal" /></div></div></section>

      <section id="results" className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e77945]">Performance</p><h2 className="mt-3 text-4xl font-bold tracking-tight">ফলাফল ও<br />অগ্রগতি</h2><p className="bangla mt-4 text-[#62736b]">পরিশ্রমের প্রতিফলন, সাফল্যের গল্প।</p></div><div className="grid grid-cols-3 gap-3">{[["৯৬%", "SSC pass rate"], ["৪৮", "GPA 5 · 2025"], ["৮২%", "JSC pass rate"]].map(([value, label]) => <div className="rounded-2xl bg-white p-5" key={label}><p className="text-3xl font-bold text-[#0d5c4a]">{value}</p><p className="mt-2 text-xs font-semibold text-[#62736b]">{label}</p></div>)}</div></div></section>

      <footer id="contact" className="bg-[#17261f] px-5 pb-8 pt-12 text-white sm:px-8"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr]"><div><p className="bangla text-xl font-bold">মুছাপুর উচ্চ বিদ্যালয়</p><p className="mt-2 text-sm text-white/55">Musapur High School · EIIN 107335</p><p className="mt-5 max-w-xs text-sm leading-6 text-white/70">Companiganj, Noakhali<br />Affiliated with Comilla Education Board</p></div><div><p className="mb-4 text-sm font-bold text-[#b7d84b]">যোগাযোগ করুন</p><p className="mb-3 flex items-center gap-2 text-sm text-white/70"><MapPin size={16} /> Noakhali, Bangladesh</p><p className="mb-3 flex items-center gap-2 text-sm text-white/70"><Mail size={16} /> mhs107335@gmail.com</p><p className="flex items-center gap-2 text-sm text-white/70"><Phone size={16} /> +880 1XXX-XXXXXX</p></div><div><p className="mb-4 text-sm font-bold text-[#b7d84b]">দ্রুত লিংক</p><div className="grid gap-3 text-sm text-white/70"><a href="#notices">Notice Board</a><a href="#results">Result Analysis</a><a href="#about">About School</a></div></div></div><div className="mx-auto mt-10 flex max-w-7xl items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40"><p>© 2026 Musapur High School</p><a href="#top" className="flex items-center gap-2"><Search size={13} /> Back to top</a></div></footer>
    </main>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><div className="mb-5 text-[#b7d84b]">{icon}</div><p className="font-bold">{title}</p><p className="mt-1 text-sm leading-6 text-white/60">{text}</p></div>;
}
