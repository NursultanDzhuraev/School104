import Link from "next/link";
import { requireLocale, messages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { content } from "@/lib/content";
import { imagery, school } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/Sections";
import { NewsCard } from "@/components/news/NewsCard";
import {
  Statistics,
  Announcements,
  Director,
  Values,
  GalleryPreview,
} from "@/components/home/SharedSections";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const t = messages(locale);
  return pageMetadata(locale, t.nav.home, t.home.intro);
}
export default async function Home({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const t = messages(locale);
  const [news, announcements, teachers, gallery] = await Promise.all([
    content.getNews(),
    content.getAnnouncements(),
    content.getTeachers(),
    content.getGallery(),
  ]);
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t.home.eyebrow}</p>
            <h1>
              <span>{t.home.headline}</span>
              <span>{t.home.headline2}</span>
              <span className="gold-text">{t.home.headline3}</span>
            </h1>
            <p className="hero-intro">{t.home.intro}</p>
            <div className="actions">
              <Link className="button" href={"/" + locale + "/about"}>
                {t.home.cta}
                <Icon name="arrow" size={18} />
              </Link>
              <Link
                className="hero-secondary"
                href={"/" + locale + "/students"}
              >
                {t.home.secondary}
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="hero-school-label">
              <span className="small-rule" />
              {school.name[locale]}
            </div>
          </div>
          <div className="hero-visual">
            <Photo
              src={imagery.campus}
              alt={t.common.photoNote}
              priority
              sizes="(max-width:768px) 100vw, 55vw"
            />
            <div className="hero-image-caption">
              <Icon name="graduation" size={32} />
              <div>
                <strong>{school.shortName[locale]}</strong>
                <span>{t.common.motto}</span>
              </div>
            </div>
            <span className="hero-year" aria-hidden="true">
              №104
            </span>
          </div>
        </div>
      </section>
      <Statistics locale={locale} />
      <section className="section">
        <div className="container">
          <SectionHeading
            title={t.home.news}
            description={t.home.newsIntro}
            href={"/" + locale + "/news"}
            linkText={t.common.viewAll}
          />
          <div className="news-grid home-news">
            {news.slice(0, 3).map((item) => (
              <NewsCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </div>
      </section>
      <section className="section muted">
        <div className="container">
          <SectionHeading
            title={t.home.announcements}
            description={t.home.announcementsIntro}
          />
          <Announcements locale={locale} items={announcements} />
        </div>
      </section>
      <Director locale={locale} teacher={teachers[0]} />
      <Values locale={locale} />
      <GalleryPreview locale={locale} items={gallery} />
    </>
  );
}
