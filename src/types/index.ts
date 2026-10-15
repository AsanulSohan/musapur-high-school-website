export type Language = "bn" | "en";

export interface GalleryItem {
  id: string;
  filename: string;
  src: string;
  titleBn: string;
  titleEn: string;
  category: "historic" | "campus" | "lab" | "sports" | "cultural" | "national" | "academic";
  year: string;
  descriptionBn: string;
  descriptionEn: string;
}

export interface NoticeItem {
  id: string;
  titleBn: string;
  titleEn: string;
  dateBn: string;
  dateEn: string;
  publishDate: string;
  category: "all" | "academic" | "exam" | "admission" | "administrative";
  isUrgent?: boolean;
  fileUrl?: string;
  fileSize?: string;
}

export interface ClassRoutineItem {
  id: string;
  classNameBn: string;
  classNameEn: string;
  shiftBn: string;
  shiftEn: string;
  effectiveDate: string;
  fileSize: string;
  periods: {
    period: number;
    time: string;
    subjectBn: string;
    subjectEn: string;
  }[];
}

export interface SyllabusItem {
  id: string;
  classNameBn: string;
  classNameEn: string;
  streamBn?: string;
  streamEn?: string;
  termBn: string;
  termEn: string;
  year: string;
  fileSize: string;
  subjectsBn: string[];
  subjectsEn: string[];
}

export interface AcademicCalendarEvent {
  id: string;
  titleBn: string;
  titleEn: string;
  dateRangeBn: string;
  dateRangeEn: string;
  type: "exam" | "holiday" | "event";
}

export interface LeaderMessage {
  id: "chairman" | "headmaster";
  titleBn: string;
  titleEn: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  image: string;
  quoteBn: string;
  quoteEn: string;
  fullMessageBn: string[];
  fullMessageEn: string[];
}

export interface SchoolStat {
  id: string;
  numberBn: string;
  numberEn: string;
  labelBn: string;
  labelEn: string;
  subtextBn: string;
  subtextEn: string;
  icon: string;
}

export interface ImportantLink {
  titleBn: string;
  titleEn: string;
  url: string;
  badgeBn?: string;
  badgeEn?: string;
}

export interface TeacherItem {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  department: "admin" | "science" | "humanities" | "business" | "ict";
  departmentBn: string;
  departmentEn: string;
  subjectBn: string;
  subjectEn: string;
  qualificationBn: string;
  qualificationEn: string;
  joiningYear?: string;
  phone?: string;
  email?: string;
  image: string;
  bioBn: string;
  bioEn: string;
}

export interface AlumniStoryItem {
  id: string;
  nameBn: string;
  nameEn: string;
  batch: string; // e.g. "1982", "1996", "2005", "2014"
  professionBn?: string;
  professionEn?: string;
  locationBn?: string;
  locationEn?: string;
  titleBn: string;
  titleEn: string;
  storyBn: string;
  storyEn: string;
  image: string;
  submittedAt: string;
  likes?: number;
}
