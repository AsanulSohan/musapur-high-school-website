import {
  NoticeItem,
  ClassRoutineItem,
  SyllabusItem,
  AcademicCalendarEvent,
  LeaderMessage,
  SchoolStat,
  ImportantLink,
} from "@/types";

/* =========================================================================
   1. NOTICES DATA (বিজ্ঞপ্তি তালিকা)
   Edit or add new notices here. They dynamically appear on:
   - The Breaking News Ticker at the top
   - The interactive Notice Board widget (filtered by category)
   ========================================================================= */
export const NOTICES_DATA: NoticeItem[] = [
  {
    id: "notice-01",
    titleBn: "২০২৬ শিক্ষাবর্ষের বার্ষিক পরীক্ষা ও এসএসসি নির্বাচনী পরীক্ষার চূড়ান্ত সময়সূচি প্রকাশ",
    titleEn: "Annual Examination & SSC Test Exam Routine 2026 Published",
    dateBn: "১৫ অক্টোবর ২০২৬",
    dateEn: "15 Oct 2026",
    publishDate: "2026-10-15",
    category: "exam",
    isUrgent: true,
    fileSize: "385 KB",
  },
  {
    id: "notice-02",
    titleBn: "২০২৬ শিক্ষাবর্ষের ৬ষ্ঠ থেকে ১০ম শ্রেণির সংশোধিত দৈনিক ক্লাস রুটিন কার্যকর সংক্রান্ত",
    titleEn: "Revised Daily Class Schedule for Grades 6-10 (Academic Year 2026)",
    dateBn: "১২ অক্টোবর ২০২৬",
    dateEn: "12 Oct 2026",
    publishDate: "2026-10-12",
    category: "academic",
    isUrgent: true,
    fileSize: "295 KB",
  },
  {
    id: "notice-03",
    titleBn: "এনসিটিবি নতুন কারিকুলাম অনুযায়ী ৬ষ্ঠ-১০ম শ্রেণির বার্ষিক সিলেবাস ও পাঠপরিকল্পনা",
    titleEn: "Annual Syllabus & Lesson Plan 2026 as per NCTB New Curriculum",
    dateBn: "১০ অক্টোবর ২০২৬",
    dateEn: "10 Oct 2026",
    publishDate: "2026-10-10",
    category: "academic",
    isUrgent: false,
    fileSize: "450 KB",
  },
  {
    id: "notice-04",
    titleBn: "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে নতুন শিক্ষার্থী ভর্তি ও মেধা তালিকার বিজ্ঞপ্তি",
    titleEn: "Admission Circular & Merit List for Grades 6 to 9 (Academic Year 2026)",
    dateBn: "০৫ অক্টোবর ২০২৬",
    dateEn: "05 Oct 2026",
    publishDate: "2026-10-05",
    category: "admission",
    isUrgent: false,
    fileSize: "320 KB",
  },
  {
    id: "notice-05",
    titleBn: "বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা ২০২৬-এর গ্রুপ নির্বাচন ও রেজিস্ট্রেশন",
    titleEn: "Group Registration for Annual Sports & Cultural Meet 2026",
    dateBn: "২৮ সেপ্টেম্বর ২০২৬",
    dateEn: "28 Sep 2026",
    publishDate: "2026-09-28",
    category: "academic",
    isUrgent: false,
    fileSize: "195 KB",
  },
  {
    id: "notice-06",
    titleBn: "৬ষ্ঠ থেকে ১০ম শ্রেণির শিক্ষার্থী ও সম্মানিত অভিভাবকদের নিয়ে মতবিনিময় সভা",
    titleEn: "Guardian-Teacher Interactive Assembly for Grades 6-10",
    dateBn: "২০ সেপ্টেম্বর ২০২৬",
    dateEn: "20 Sep 2026",
    publishDate: "2026-09-20",
    category: "administrative",
    isUrgent: false,
    fileSize: "160 KB",
  },
];

/* =========================================================================
   2. CLASS ROUTINES DATA (ক্লাস রুটিন ২০২৬)
   Edit or add routines for specific classes and streams here.
   ========================================================================= */
export const CLASS_ROUTINES_2026: ClassRoutineItem[] = [
  {
    id: "routine-class-10",
    classNameBn: "১০ম শ্রেণি (এসএসসি ২০২৭ ব্যাচ)",
    classNameEn: "Class 10 (SSC 2027 Batch)",
    shiftBn: "দিবা শাখা (সকাল ৯:০০ - বিকাল ৩:৩০)",
    shiftEn: "Day Shift (9:00 AM - 3:30 PM)",
    effectiveDate: "2026-10-01",
    fileSize: "180 KB",
    periods: [
      { period: 1, time: "09:00 - 09:45 AM", subjectBn: "বাংলা ১ম/২য় পত্র", subjectEn: "Bangla 1st/2nd" },
      { period: 2, time: "09:45 - 10:30 AM", subjectBn: "ইংরেজি ১ম/২য় পত্র", subjectEn: "English 1st/2nd" },
      { period: 3, time: "10:30 - 11:15 AM", subjectBn: "সাধারণ গণিত", subjectEn: "General Mathematics" },
      { period: 4, time: "11:15 - 12:00 PM", subjectBn: "গ্রুপ বিষয় (পদার্থ / হিসাববিজ্ঞান / ইতিহাস)", subjectEn: "Group (Physics / Accounting / History)" },
      { period: 5, time: "12:45 - 01:30 PM", subjectBn: "গ্রুপ বিষয় (রসায়ন / ফিন্যান্স / পৌরনীতি)", subjectEn: "Group (Chemistry / Finance / Civics)" },
      { period: 6, time: "01:30 - 02:15 PM", subjectBn: "উচ্চতর গণিত / জীববিজ্ঞান / ব্যবসায় উদ্যোগ", subjectEn: "Higher Math / Biology / Business Org" },
      { period: 7, time: "02:15 - 03:00 PM", subjectBn: "আইসিটি ও ডিজিটাল ল্যাব ব্যবহারিক", subjectEn: "ICT & Digital Lab Practical" },
    ],
  },
  {
    id: "routine-class-9",
    classNameBn: "৯ম শ্রেণি (বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা)",
    classNameEn: "Class 9 (Science, Humanities & Business)",
    shiftBn: "দিবা শাখা (সকাল ৯:০০ - বিকাল ৩:০০)",
    shiftEn: "Day Shift (9:00 AM - 3:00 PM)",
    effectiveDate: "2026-10-01",
    fileSize: "175 KB",
    periods: [
      { period: 1, time: "09:00 - 09:45 AM", subjectBn: "ইংরেজি", subjectEn: "English" },
      { period: 2, time: "09:45 - 10:30 AM", subjectBn: "গণিত", subjectEn: "Mathematics" },
      { period: 3, time: "10:30 - 11:15 AM", subjectBn: "বাংলা", subjectEn: "Bangla" },
      { period: 4, time: "11:15 - 12:00 PM", subjectBn: "শাখাভিত্তিক পাঠ (বিজ্ঞান / মানবিক / ব্যবসায়)", subjectEn: "Stream Subject (Sci / Hum / Bus)" },
      { period: 5, time: "12:45 - 01:30 PM", subjectBn: "তথ্য ও যোগাযোগ প্রযুক্তি (আইসিটি)", subjectEn: "ICT" },
      { period: 6, time: "01:30 - 02:15 PM", subjectBn: "বিজ্ঞান ল্যাব / বাণিজ্যিক প্রজেক্ট", subjectEn: "Lab Work / Practical" },
    ],
  },
  {
    id: "routine-class-8",
    classNameBn: "৮ম শ্রেণি",
    classNameEn: "Class 8",
    shiftBn: "দিবা শাখা (সকাল ৯:০০ - দুপুর ২:১৫)",
    shiftEn: "Day Shift (9:00 AM - 2:15 PM)",
    effectiveDate: "2026-10-01",
    fileSize: "165 KB",
    periods: [
      { period: 1, time: "09:00 - 09:45 AM", subjectBn: "বাংলা", subjectEn: "Bangla" },
      { period: 2, time: "09:45 - 10:30 AM", subjectBn: "গণিত", subjectEn: "Mathematics" },
      { period: 3, time: "10:30 - 11:15 AM", subjectBn: "ইংরেজি", subjectEn: "English" },
      { period: 4, time: "11:15 - 12:00 PM", subjectBn: "বিজ্ঞান অনুসন্ধান", subjectEn: "Science Inquiry" },
      { period: 5, time: "12:45 - 01:30 PM", subjectBn: "ডিজিটাল প্রযুক্তি", subjectEn: "Digital Technology" },
      { period: 6, time: "01:30 - 02:15 PM", subjectBn: "ইতিহাস ও সামাজিক বিজ্ঞান", subjectEn: "Social Science" },
    ],
  },
  {
    id: "routine-class-6-7",
    classNameBn: "৬ষ্ঠ ও ৭ম শ্রেণি",
    classNameEn: "Class 6 & 7",
    shiftBn: "দিবা শাখা (সকাল ৯:০০ - দুপুর ২:১৫)",
    shiftEn: "Day Shift (9:00 AM - 2:15 PM)",
    effectiveDate: "2026-10-01",
    fileSize: "170 KB",
    periods: [
      { period: 1, time: "09:00 - 09:45 AM", subjectBn: "বাংলা", subjectEn: "Bangla" },
      { period: 2, time: "09:45 - 10:30 AM", subjectBn: "গণিত", subjectEn: "Mathematics" },
      { period: 3, time: "10:30 - 11:15 AM", subjectBn: "ইংরেজি", subjectEn: "English" },
      { period: 4, time: "11:15 - 12:00 PM", subjectBn: "বিজ্ঞান", subjectEn: "Science" },
      { period: 5, time: "12:45 - 01:30 PM", subjectBn: "স্বাস্থ্য সুরক্ষা ও জীবন-জীবিকা", subjectEn: "Life & Livelihood" },
      { period: 6, time: "01:30 - 02:15 PM", subjectBn: "শিল্প ও সংস্কৃতি / ধর্ম শিক্ষা", subjectEn: "Art & Culture / Religion" },
    ],
  },
];

/* =========================================================================
   3. SYLLABUS DATA (সিলেবাস ও পাঠ্যসূচি ২০২৬)
   ========================================================================= */
export const SYLLABUS_DATA_2026: SyllabusItem[] = [
  {
    id: "syl-class-10-sci",
    classNameBn: "১০ম শ্রেণি",
    classNameEn: "Class 10",
    streamBn: "বিজ্ঞান বিভাগ",
    streamEn: "Science Stream",
    termBn: "বার্ষিক ও এসএসসি নির্বাচনী পাঠ্যক্রম",
    termEn: "Annual & SSC Test Exam Syllabus",
    year: "2026",
    fileSize: "420 KB",
    subjectsBn: [
      "পদার্থবিজ্ঞান: গতি, বল, কাজ-ক্ষমতা-শক্তি, পদার্থের অবস্থা ও চাপ, শব্দের প্রকৃতি",
      "রসায়ন: পদার্থের গঠন, পর্যায় সারণি, রাসায়নিক বন্ধন, এসিড-ক্ষার সমতা",
      "উচ্চতর গণিত: বীজগণিতীয় রাশি, সমীকরণ, স্থানাঙ্ক জ্যামিতি, ত্রিকোণমিতি",
      "জীববিজ্ঞান: জীবকোষ ও টিস্যু, জীবনীশক্তি, উদ্ভিদের প্রস্বেদন ও মানবদেহে রক্তসংবহন",
    ],
    subjectsEn: [
      "Physics: Motion, Force, Work & Energy, States of Matter, Sound Waves",
      "Chemistry: Structure of Matter, Periodic Table, Chemical Bonding, Acids & Bases",
      "Higher Math: Algebraic Expressions, Coordinate Geometry, Trigonometry",
      "Biology: Cell & Tissue, Bioenergetics, Plant Circulation & Physiology",
    ],
  },
  {
    id: "syl-class-10-bus",
    classNameBn: "১০ম শ্রেণি",
    classNameEn: "Class 10",
    streamBn: "ব্যবসায় শিক্ষা বিভাগ",
    streamEn: "Business Studies Stream",
    termBn: "বার্ষিক ও এসএসসি নির্বাচনী পাঠ্যক্রম",
    termEn: "Annual & SSC Test Exam Syllabus",
    year: "2026",
    fileSize: "390 KB",
    subjectsBn: [
      "হিসাববিজ্ঞান: জাবেদা, খতিয়ান, রেওয়ামিল, আর্থিক বিবরণী ও পারিবারিক বাজেট",
      "ফিন্যান্স ও ব্যাংকিং: অর্থের সময়মূল্য, মূলধনী আয়-ব্যয় প্রাক্কলন, বাণিজ্যিক ব্যাংক ব্যবস্থা",
      "ব্যবসায় উদ্যোগ: ব্যবসায় পরিচিতি, উদ্যোগের পরিবেশ, বিপণন কৌশল ও ট্রেড লাইসেন্স",
    ],
    subjectsEn: [
      "Accounting: Journal, Ledger, Trial Balance, Financial Statements & Budgets",
      "Finance & Banking: Time Value of Money, Capital Budgeting, Commercial Banking",
      "Business Org: Business Environment, Marketing Strategies & Licensing",
    ],
  },
  {
    id: "syl-class-10-hum",
    classNameBn: "১০ম শ্রেণি",
    classNameEn: "Class 10",
    streamBn: "মানবিক বিভাগ",
    streamEn: "Humanities Stream",
    termBn: "বার্ষিক ও এসএসসি নির্বাচনী পাঠ্যক্রম",
    termEn: "Annual & SSC Test Exam Syllabus",
    year: "2026",
    fileSize: "375 KB",
    subjectsBn: [
      "ইতিহাস: প্রাচীন বাংলার ইতিহাস, ব্রিটিশ শাসন, মুক্তিযুদ্ধ ও স্বাধীন বাংলাদেশের অভ্যুদয়",
      "ভূগোল ও পরিবেশ: সৌরজগৎ, আবহাওয়া ও জলবায়ু, বাংলাদেশের প্রাকৃতিক দুর্যোগ ও নদ-নদী",
      "পৌরনীতি ও নাগরিকতা: রাষ্ট্র ও সরকারব্যবস্থা, সংবিধানের মৌলিক অধিকার ও নাগরিক দায়িত্ব",
    ],
    subjectsEn: [
      "History: Ancient Bengal, British Rule, 1971 Liberation War & Independent Nation",
      "Geography: Solar System, Climate Patterns, River Systems & Natural Disasters",
      "Civics: State & Governance, Constitutional Rights & Civic Obligations",
    ],
  },
  {
    id: "syl-class-6-8",
    classNameBn: "৬ষ্ঠ থেকে ৮ম শ্রেণি",
    classNameEn: "Grades 6 to 8",
    termBn: "এনসিটিবি নতুন শিক্ষাক্রম বার্ষিক মূল্যায়ন নির্দেশিকা",
    termEn: "NCTB Continuous Evaluation & Annual Syllabus",
    year: "2026",
    fileSize: "510 KB",
    subjectsBn: [
      "বাংলা ও ইংরেজি: সাহিত্য পাঠ, ব্যাকরণ, কার্যকর যোগাযোগ ও উপস্থাপনা",
      "গণিত: সংখ্যার গল্প, বাস্তব সমস্যা সমাধান, পরিমাপ ও দ্বি-মাত্রিক জ্যামিতি",
      "বিজ্ঞান অনুসন্ধানী ও অনুশীলন: পরিবেশ পর্যবেক্ষণ, শক্তি ও প্রযুক্তি",
      "ডিজিটাল প্রযুক্তি: কম্পিউটার ফান্ডামেন্টালস, নিরাপদ ইন্টারনেট ও কোডিং পরিচিতি",
    ],
    subjectsEn: [
      "Bangla & English: Literature, Grammar, Practical Communication & Dialogue",
      "Mathematics: Number Concepts, Real-life Problem Solving & 2D Geometry",
      "Science: Environmental Observation, Energy Forms & Technological Inventions",
      "Digital Technology: PC Fundamentals, Cyber Safety & Introduction to Coding",
    ],
  },
];

/* =========================================================================
   4. ACADEMIC CALENDAR 2026 (শিক্ষাপঞ্জি ২০২৬)
   ========================================================================= */
export const ACADEMIC_CALENDAR_2026: AcademicCalendarEvent[] = [
  {
    id: "cal-01",
    titleBn: "শিক্ষাবর্ষের ক্লাস শুরু ও পাঠ্যবই বিতরণ",
    titleEn: "Commencement of Classes & Textbook Distribution",
    dateRangeBn: "০১ জানুয়ারি ২০২৬",
    dateRangeEn: "01 Jan 2026",
    type: "event",
  },
  {
    id: "cal-02",
    titleBn: "অমর একুশে ও আন্তর্জাতিক মাতৃভাষা দিবস",
    titleEn: "Shaheed Day & International Mother Language Day",
    dateRangeBn: "২১ ফেব্রুয়ারি ২০২৬",
    dateRangeEn: "21 Feb 2026",
    type: "holiday",
  },
  {
    id: "cal-03",
    titleBn: "মহান স্বাধীনতা ও জাতীয় দিবস",
    titleEn: "Independence & National Day",
    dateRangeBn: "২৬ মার্চ ২০২৬",
    dateRangeEn: "26 Mar 2026",
    type: "holiday",
  },
  {
    id: "cal-04",
    titleBn: "অর্ধবার্ষিক / প্রাক-নির্বাচনী মূল্যায়ন পরীক্ষা",
    titleEn: "Mid-Term / Pre-Test Examination Period",
    dateRangeBn: "০৫ জুন - ২০ জুন ২০২৬",
    dateRangeEn: "05 Jun - 20 Jun 2026",
    type: "exam",
  },
  {
    id: "cal-05",
    titleBn: "গ্রীষ্মকালীন অবকাশ ও ঈদুল আজহা ছুটি",
    titleEn: "Summer Recess & Eid-ul-Adha Holidays",
    dateRangeBn: "২৫ জুন - ০৮ জুলাই ২০২৬",
    dateRangeEn: "25 Jun - 08 Jul 2026",
    type: "holiday",
  },
  {
    id: "cal-06",
    titleBn: "১০ম শ্রেণির এসএসসি নির্বাচনী (Test) পরীক্ষা",
    titleEn: "SSC 2027 Candidate Test Examination",
    dateRangeBn: "১০ অক্টোবর - ২৮ অক্টোবর ২০২৬",
    dateRangeEn: "10 Oct - 28 Oct 2026",
    type: "exam",
  },
  {
    id: "cal-07",
    titleBn: "৬ষ্ঠ-৯ম শ্রেণির বার্ষিক চূড়ান্ত মূল্যায়ন পরীক্ষা",
    titleEn: "Annual Final Examination for Grades 6-9",
    dateRangeBn: "২০ নভেম্বর - ১০ ডিসেম্বর ২০২৬",
    dateRangeEn: "20 Nov - 10 Dec 2026",
    type: "exam",
  },
  {
    id: "cal-08",
    titleBn: "বার্ষিক ফলাফল প্রকাশ ও কৃতি সংবর্ধনা",
    titleEn: "Annual Result Publication & Award Day",
    dateRangeBn: "২৭ ডিসেম্বর ২০২৬",
    dateRangeEn: "27 Dec 2026",
    type: "event",
  },
];

/* =========================================================================
   5. LEADERSHIP MESSAGES
   ========================================================================= */
export const LEADER_MESSAGES: Record<"chairman" | "headmaster", LeaderMessage> = {
  chairman: {
    id: "chairman",
    titleBn: "ম্যানেজিং কমিটি সভাপতির বাণী",
    titleEn: "Message from the Chairman, Managing Committee",
    nameBn: "আলহাজ্ব মোঃ নুরুল হুদা",
    nameEn: "Alhaj Md. Nurul Huda",
    designationBn: "সভাপতি, ম্যানেজিং কমিটি, মুছাপুর উচ্চ বিদ্যালয়",
    designationEn: "Chairman, Managing Committee, Musapur High School",
    image: "/chairman-portrait.svg",
    quoteBn:
      "১৯৭২ সালে প্রতিষ্ঠিত মুছাপুর উচ্চ বিদ্যালয় নোয়াখালীর কোম্পানীগঞ্জ অঞ্চলের এক গৌরবোজ্জ্বল বাতিঘর। নৈতিকতা ও আধুনিক শিক্ষার সমন্বয়ে আমাদের সন্তানরা গড়ে তুলবে আগামীর স্মার্ট বাংলাদেশ।",
    quoteEn:
      "Established in 1972, Musapur High School stands as a glorious beacon of learning in Companiganj, Noakhali. Through the synergy of values and modern education, our students will build tomorrow's prosperous nation.",
    fullMessageBn: [
      "বিসমিল্লাহির রাহমানির রাহিম। ১৯৭১ সালের মহান মুক্তিযুদ্ধের বিজয়ের পর, পিছিয়ে পড়া চরাঞ্চল মুছাপুরে শিক্ষার আলো ছড়িয়ে দেওয়ার দৃপ্ত অঙ্গীকার নিয়ে ১৯৭২ সালে প্রতিষ্ঠিত হয়েছিল ঐতিহ্যবাহী মুছাপুর উচ্চ বিদ্যালয়।",
      "প্রতিষ্ঠালগ্ন থেকেই এই প্রতিষ্ঠান অত্র অঞ্চলের সন্তান-সন্ততিদের সুশিক্ষিত, নীতিবান ও দায়িত্বশীল নাগরিক হিসেবে গড়ে তুলতে অগ্রণী ভূমিকা পালন করে আসছে। বর্তমান বিজ্ঞান ও তথ্যপ্রযুক্তির যুগে আমরা কেবল সনাতন পাঠ্যপুস্তকীয় শিক্ষায় সীমাবদ্ধ থাকতে চাই না; আমাদের লক্ষ্য প্রতিটি শিক্ষার্থীকে সৃজনশীল ও প্রযুক্তিবান্ধব মানবিক মানুষ হিসেবে গড়ে তোলা।",
      "ম্যানেজিং কমিটি, শিক্ষক-কর্মচারী, অভিভাবক ও শুভানুধ্যায়ীদের সম্মিলিত প্রচেষ্টায় আজ আমাদের বিদ্যালয় সুপ্রশস্ত ক্যাম্পাস, শেখ রাসেল ডিজিটাল ল্যাব ও সমৃদ্ধ লাইব্রেরির সুবিধায় সমৃদ্ধ। আমি বিদ্যালয়ের উত্তরোত্তর সার্বিক সাফল্য ও গৌরব কামনা করি।",
    ],
    fullMessageEn: [
      "In the name of Allah, the Most Gracious, the Most Merciful. Following our independence in 1971, Musapur High School was founded in 1972 with a solemn commitment to illuminate the rural youth of Musapur and Companiganj with the light of knowledge.",
      "Since its inception, this institution has nurtured generations into responsible, compassionate, and enlightened citizens. In this age of ICT and scientific innovation, our aspiration extends beyond textbooks; we strive to instill creativity, analytical thinking, and ethical integrity.",
      "With the combined dedication of our managing committee, faculty, parents, and well-wishers, MHS today boasts modern multi-story facilities, the Sheikh Russell Digital Lab, and a vibrant educational atmosphere. I wish the institution continued glory and prosperity.",
    ],
  },
  headmaster: {
    id: "headmaster",
    titleBn: "প্রধান শিক্ষকের বাণী",
    titleEn: "Message from the Headmaster",
    nameBn: "মোঃ জাহাঙ্গীর আলম (এম.এসসি, বি.এড)",
    nameEn: "Md. Jahangir Alam (M.Sc, B.Ed)",
    designationBn: "প্রধান শিক্ষক, মুছাপুর উচ্চ বিদ্যালয়",
    designationEn: "Headmaster, Musapur High School",
    image: "/headmaster-portrait.svg",
    quoteBn:
      "বিদ্যালয় কেবল পাঠ্যবই পড়ার স্থান নয়; এটি ব্যক্তিত্ব গঠন ও জীবন গড়ার পবিত্র প্রাঙ্গণ। স্নেহের শিক্ষার্থীদের জ্ঞান, শৃঙ্খলা ও মুক্তিযুদ্ধের চেতনায় দীক্ষিত করাই আমাদের ব্রত।",
    quoteEn:
      "A school is more than a place of study; it is a sacred ground where character and destiny are forged. Our mission is to inspire students with knowledge, discipline, and patriotic devotion.",
    fullMessageBn: [
      "মুছাপুর উচ্চ বিদ্যালয়ের অফিশিয়াল পোর্টালে সকলকে জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন। শিক্ষকতা কেবল একটি পেশা নয়, এটি একটি মহান ব্রত। আমাদের অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকবৃন্দ নিরন্তর কাজ করে যাচ্ছেন প্রতিটি শিক্ষার্থীর সুপ্ত প্রতিভার উন্মেষ ঘটাতে।",
      "কুমিল্লা শিক্ষা বোর্ডের অধীনে আমাদের শিক্ষার্থীরা প্রতি বছর এসএসসি পরীক্ষায় অসাধারণ সাফল্য অর্জন করছে। বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় আধুনিক ল্যাবরেটরি ও নিয়মিত ব্যবহারিক ক্লাসের মাধ্যমে বাস্তবমুখী শিক্ষা নিশ্চিত করা হচ্ছে।",
      "সহশিক্ষা কার্যক্রম হিসেবে খেলাধুলা, বিতর্ক প্রতিযোগিতা, স্কাউটিং ও সাংস্কৃতিক উৎসবে আমাদের শিক্ষার্থীরা জাতীয় পর্যায়ে সুনাম বয়ে এনেছে। বিদ্যালয়ের সকল অভিভাবকের সচেতন সহযোগিতা আমাদের এগিয়ে চলার প্রধান চালিকাশক্তি। আসুন, সবাই মিলে মুছাপুর উচ্চ বিদ্যালয়কে দেশের অন্যতম শ্রেষ্ঠ বিদ্যাপীঠে রূপান্তর করি।",
    ],
    fullMessageEn: [
      "A warm welcome to all students, guardians, and well-wishers visiting the official portal of Musapur High School. Teaching is not merely a profession, but a sacred calling. Our devoted faculty members are committed to unlocking the latent potentials of every pupil.",
      "Under the Board of Intermediate and Secondary Education, Comilla, our students consistently achieve stellar results in the Secondary School Certificate (SSC) examinations. Hands-on practical sessions in Science, Humanities, and Business Studies foster critical problem-solving skills.",
      "In co-curricular spheres—including inter-school athletics, debating, scouting, and cultural festivities—our students continue to shine. The active partnership of our guardians is our greatest strength. Together, let us elevate MHS to the pinnacle of educational excellence.",
    ],
  },
};

/* =========================================================================
   6. SCHOOL KEY STATS & COUNTERS
   ========================================================================= */
export const SCHOOL_STATS: SchoolStat[] = [
  {
    id: "stat-estd",
    numberBn: "১৯৭২",
    numberEn: "1972",
    labelBn: "প্রতিষ্ঠার গৌরবময় বছর",
    labelEn: "Year of Establishment",
    subtextBn: "৫ দশকের বেশি ঐতিহ্য",
    subtextEn: "Over 5 Decades of Legacy",
    icon: "landmark",
  },
  {
    id: "stat-students",
    numberBn: "১,২৫০+",
    numberEn: "1,250+",
    labelBn: "বর্তমান নিয়মিত শিক্ষার্থী",
    labelEn: "Active Regular Students",
    subtextBn: "৬ষ্ঠ থেকে ১০ম শ্রেণি (সহশিক্ষা)",
    subtextEn: "Grades 6 to 10 (Co-education)",
    icon: "users",
  },
  {
    id: "stat-teachers",
    numberBn: "৩৮",
    numberEn: "38",
    labelBn: "দক্ষ শিক্ষক ও কর্মকর্তা",
    labelEn: "Qualified Teachers & Staff",
    subtextBn: "অভিজ্ঞ ও নিবেদিতপ্রাণ মেন্টর",
    subtextEn: "Dedicated Subject Specialists",
    icon: "graduation-cap",
  },
  {
    id: "stat-passrate",
    numberBn: "৯৮.৪%",
    numberEn: "98.4%",
    labelBn: "এসএসসি গড় পাসের হার",
    labelEn: "Average SSC Pass Rate",
    subtextBn: "কুমিল্লা শিক্ষা বোর্ডে শীর্ষ তালিকায়",
    subtextEn: "Top ranking in Comilla Board",
    icon: "award",
  },
  {
    id: "stat-land",
    numberBn: "২২৪",
    numberEn: "224",
    labelBn: "ক্যাম্পাসের জমি (শতাংশ)",
    labelEn: "Campus Land (Decimals)",
    subtextBn: "সুবিশাল খেলার মাঠ ও প্রাঙ্গণ",
    subtextEn: "Expansive Playground & Greenery",
    icon: "map-pin",
  },
  {
    id: "stat-gpa5",
    numberBn: "৫২",
    numberEn: "52",
    labelBn: "সর্বশেষ জিপিএ-৫ অর্জন",
    labelEn: "Recent GPA-5 Achievers",
    subtextBn: "বিজ্ঞান ও ব্যবসায় শিক্ষায় মেধার জয়",
    subtextEn: "Excellence in Science & Commerce",
    icon: "sparkles",
  },
];

/* =========================================================================
   7. IMPORTANT GOVERNMENT & BOARD PORTAL LINKS
   ========================================================= */
export const IMPORTANT_GOV_LINKS: ImportantLink[] = [
  {
    titleBn: "শিক্ষা মন্ত্রণালয়, বাংলাদেশ সরকার",
    titleEn: "Ministry of Education, Govt. of Bangladesh",
    url: "https://moedu.gov.bd",
    badgeBn: "সরকারি",
    badgeEn: "Govt",
  },
  {
    titleBn: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (মাউশি)",
    titleEn: "Directorate of Secondary & Higher Education (DSHE)",
    url: "https://dshe.gov.bd",
    badgeBn: "মাউশি",
    badgeEn: "DSHE",
  },
  {
    titleBn: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, কুমিল্লা",
    titleEn: "Board of Intermediate & Secondary Education, Comilla",
    url: "https://comillaboard.portal.gov.bd",
    badgeBn: "বোর্ড",
    badgeEn: "Board",
  },
  {
    titleBn: "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি)",
    titleEn: "National Curriculum & Textbook Board (NCTB)",
    url: "https://nctb.gov.bd",
    badgeBn: "এনসিটিবি",
    badgeEn: "NCTB",
  },
  {
    titleBn: "বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো (ব্যানবেইস)",
    titleEn: "BANBEIS Educational Statistics",
    url: "https://banbeis.gov.bd",
    badgeBn: "তথ্য",
    badgeEn: "Data",
  },
  {
    titleBn: "শিক্ষক বাতায়ন (Teachers Portal)",
    titleEn: "Teachers Portal Bangladesh",
    url: "https://teachers.gov.bd",
    badgeBn: "বাতায়ন",
    badgeEn: "Portal",
  },
];

/* =========================================================================
   8. INSTITUTION PROFILE & CONTACT
   ========================================================================= */
export const INSTITUTIONAL_FACTS = {
  nameBn: "মুছাপুর উচ্চ বিদ্যালয়",
  nameEn: "Musapur High School",
  eiin: "107335",
  schoolCode: "5124",
  centerCode: "348",
  established: "1972",
  board: "মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, কুমিল্লা (Comilla Board)",
  locationBn: "মুছাপুর, ডাকঘর: মুছাপুর, উপজেলা: কোম্পানীগঞ্জ, জেলা: নোয়াখালী - ৩৮৫৩",
  locationEn: "Musapur, P.O: Musapur, Upazila: Companiganj, District: Noakhali - 3853",
  shift: "Single Shift (Day / দিবা শাখা)",
  schoolType: "Secondary (Co-educational / সহশিক্ষা)",
  email: "mhs107335@gmail.com",
  phone: "+880 1819-765432",
  officeHoursBn: "রবিবার হতে বৃহস্পতিবার: সকাল ৯:০০ টা - বিকাল ৪:০০ টা",
  officeHoursEn: "Sunday to Thursday: 9:00 AM - 4:00 PM",
  mottoBn: "জ্ঞানই আলো • চরিত্রই শক্তি • সেবাই ব্রত",
  mottoEn: "Knowledge is Light • Character is Strength • Service is Duty",
};
