import type { Locale, Announcement, GalleryPhoto, Teacher } from "@/types";
import Link from "next/link";
import { school } from "@/data/site";
import { values } from "@/data/school-life";
import { messages, formatDate } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { CardGrid, SectionHeading } from "@/components/ui/Sections";
export function Statistics({ locale }: { locale: Locale }) {
  const t = messages(locale);
  return (
    <div className="container stats-wrap">
      <div className="statistics">
        {school.statistics.map((stat) => (
          <div key={stat.label.kg}>
            <strong>{stat.value}</strong>
            <span>{stat.label[locale]}</span>
          </div>
        ))}
      </div>
      {school.demoMode && <p className="fine-print">{t.home.statsNote}</p>}
    </div>
  );
}
export function Values({ locale }: { locale: Locale }) {
  const t = messages(locale);
  return (
    <section className="section muted">
      <div className="container">
        <SectionHeading
          title={t.home.values}
          description={t.home.valuesIntro}
        />
        <CardGrid
          locale={locale}
          items={values}
          icons={["book", "heart", "users", "leaf"]}
        />
      </div>
    </section>
  );
}
export function Director({
  locale,
  teacher,
}: {
  locale: Locale;
  teacher: Teacher | undefined;
}) {
  const t = messages(locale);
  return (
    <section className="section">
      <div className="container director-grid">
        <div className="director-portrait">
          {teacher?.image ? (
            <Photo src={teacher.image} alt={teacher.name[locale]} />
          ) : (
            <div className="portrait-placeholder">
              <Icon name="graduation" size={84} />
              <span>{t.common.notProvided}</span>
            </div>
          )}
          <div className="portrait-caption">
            <strong>{teacher?.position[locale] || t.home.director}</strong>
            <span>{teacher?.name[locale] || t.common.notProvided}</span>
          </div>
        </div>
        <div className="director-message">
          <Icon name="quote" size={44} />
          <p className="eyebrow">{t.home.directorTag}</p>
          <h2>{t.home.director}</h2>
          <blockquote>{t.home.directorText}</blockquote>
          {school.demoMode && (
            <p className="fine-print">{t.home.directorNote}</p>
          )}
          <span className="signature">{school.shortName[locale]}</span>
        </div>
      </div>
    </section>
  );
}
export function Announcements({
  locale,
  items,
  compact = false,
}: {
  locale: Locale;
  items: Announcement[];
  compact?: boolean;
}) {
  const t = messages(locale);
  return (
    <div className={compact ? "announcements compact" : "announcements"}>
      {items.map((item) => (
        <Link
          className="announcement"
          href={"/" + locale + item.href}
          key={item.id}
        >
          <span className="icon-tile">
            <Icon name="calendar" size={24} />
          </span>
          <div>
            <time dateTime={item.date}>
              {formatDate(item.date, locale)}
              {item.demo ? " · " + t.common.sample : ""}
            </time>
            <h3>{item.title[locale]}</h3>
            <p>{item.text[locale]}</p>
          </div>
          <Icon name="arrow" />
        </Link>
      ))}
    </div>
  );
}
export function GalleryPreview({
  locale,
  items,
}: {
  locale: Locale;
  items: GalleryPhoto[];
}) {
  const t = messages(locale);
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          title={t.home.gallery}
          description={t.home.galleryIntro}
          href={"/" + locale + "/gallery"}
          linkText={t.common.viewAll}
        />
        <div className="gallery-preview">
          {items.slice(0, 4).map((item) => (
            <Link key={item.id} href={"/" + locale + "/gallery"}>
              <Photo
                src={item.image}
                alt={
                  item.title[locale] +
                  (item.demo ? " — " + t.common.sample : "")
                }
              />
              <span>
                {item.title[locale]}
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          ))}
        </div>
        {school.demoMode && <p className="fine-print">{t.common.photoNote}</p>}
      </div>
    </section>
  );
}
