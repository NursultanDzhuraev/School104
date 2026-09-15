// The UI depends on this typed repository, never on HTTP or component-owned arrays.
// Replace these methods with Spring Boot fetch calls in stage two.
import { news } from "@/data/news";
import { documents } from "@/data/documents";
import { gallery, videos } from "@/data/gallery";
import { teachers } from "@/data/teachers";
import { announcements } from "@/data/announcements";
import { schedule } from "@/data/schedule";
import type {
  NewsItem,
  SchoolDocument,
  GalleryPhoto,
  GalleryVideo,
  Teacher,
  Announcement,
  ClassSchedule,
} from "@/types";
export interface ContentRepository {
  getNews(): Promise<NewsItem[]>;
  getNewsBySlug(slug: string): Promise<NewsItem | undefined>;
  getDocuments(): Promise<SchoolDocument[]>;
  getGallery(): Promise<GalleryPhoto[]>;
  getVideos(): Promise<GalleryVideo[]>;
  getTeachers(): Promise<Teacher[]>;
  getAnnouncements(): Promise<Announcement[]>;
  getSchedule(): Promise<ClassSchedule[]>;
}
export const content: ContentRepository = {
  getNews: async () => [...news].sort((a, b) => b.date.localeCompare(a.date)),
  getNewsBySlug: async (slug) => news.find((item) => item.slug === slug),
  getDocuments: async () => documents,
  getGallery: async () => gallery,
  getVideos: async () => videos,
  getTeachers: async () => teachers,
  getAnnouncements: async () => announcements,
  getSchedule: async () => schedule,
};
