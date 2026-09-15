export const locales = ["kg", "ru"] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;
export interface NewsItem {
  id: number;
  slug: string;
  title: Localized;
  description: Localized;
  body: Localized[];
  date: string;
  category: NewsCategory;
  image: string;
  images: string[];
  demo: boolean;
}
export type NewsCategory =
  | "school"
  | "events"
  | "students"
  | "teachers"
  | "community";
export type DocumentCategory =
  | "charter"
  | "license"
  | "orders"
  | "plan"
  | "reports";
export interface SchoolDocument {
  id: string;
  title: Localized;
  category: DocumentCategory;
  date: string;
  sizeBytes: number;
  file: string;
  demo: boolean;
}
export type GalleryCategory =
  | "school"
  | "events"
  | "lessons"
  | "sports"
  | "students";
export interface GalleryPhoto {
  id: string;
  title: Localized;
  category: GalleryCategory;
  image: string;
  demo: boolean;
}
export interface GalleryVideo {
  id: string;
  title: Localized;
  src: string;
  poster: string;
}
export interface Teacher {
  id: string;
  name: Localized;
  position: Localized;
  image: string | null;
  demo: boolean;
}
export interface Announcement {
  id: string;
  title: Localized;
  text: Localized;
  date: string;
  href: string;
  demo: boolean;
}
export interface Lesson {
  time: string;
  subject: Localized;
  room: string;
}
export interface ClassSchedule {
  grade: string;
  days: Record<string, Lesson[]>;
  demo: boolean;
}
export interface ContentCard {
  title: Localized;
  text: Localized;
}
export interface DatedItem extends ContentCard {
  date: string;
  time: string;
}
