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

