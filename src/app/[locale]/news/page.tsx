import { requireLocale, messages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/Sections";
type Props = { params: Promise<{locale:string}> };
import { content } from "@/lib/content";
import { NewsExplorer } from "@/components/news/NewsExplorer";
export async function generateMetadata({params}:Props) {const locale=requireLocale((await params).locale);const t=messages(locale);return pageMetadata(locale,t.news.title,t.news.description,"/news");}
export default async function News({params}:Props){const locale=requireLocale((await params).locale);const t=messages(locale);const [news,announcements]=await Promise.all([content.getNews(),content.getAnnouncements()]);return <><PageHero locale={locale} title={t.news.title} description={t.news.description}/><section className="section"><div className="container"><NewsExplorer items={news} announcements={announcements} locale={locale}/></div></section></>;}
