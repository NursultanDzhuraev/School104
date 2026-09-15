import { requireLocale, messages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHero, SectionHeading } from "@/components/ui/Sections";
type Props = { params: Promise<{ locale: string }> };
import { content } from "@/lib/content";
import { imagery } from "@/data/site";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import {
  Director,
  Values,
  Statistics,
  GalleryPreview,
} from "@/components/home/SharedSections";
export async function generateMetadata({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const t = messages(locale);
  return pageMetadata(locale, t.about.title, t.about.description, "/about");
}
export default async function About({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const t = messages(locale);
  const [teachers, gallery] = await Promise.all([
    content.getTeachers(),
    content.getGallery(),
  ]);
  return (
    <>
      <PageHero
        locale={locale}
        title={t.about.title}
        description={t.about.description}
      />
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <article className="mission-card">
              <Icon name="book" size={34} />
              <h2>{t.about.mission}</h2>
              <p>{t.about.missionText}</p>
            </article>
            <article className="mission-card gold-card">
              <Icon name="leaf" size={34} />
              <h2>{t.about.vision}</h2>
              <p>{t.about.visionText}</p>
            </article>
          </div>
          <div className="history-grid">
            <Photo src={imagery.campus} alt={t.common.photoNote} />
            <div>
              <p className="eyebrow">{t.common.school}</p>
              <h2>{t.about.history}</h2>
              <p>{t.about.historyText}</p>
            </div>
          </div>
        </div>
      </section>
      <Director locale={locale} teacher={teachers[0]} />
      <Values locale={locale} />
      <section className="section">
        <div className="container">
          <SectionHeading
            title={t.about.team}
            description={t.about.teamIntro}
          />
          <div className="team-grid">
            {teachers.map((teacher) => (
              <article className="team-card" key={teacher.id}>
                {teacher.image ? (
                  <Photo src={teacher.image} alt={teacher.name[locale]} />
                ) : (
                  <div className="team-placeholder">
                    <Icon name="users" size={52} />
                  </div>
                )}
                <div>
                  <h3>{teacher.name[locale]}</h3>
                  <p>{teacher.position[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section muted">
        <div className="container">
          <SectionHeading title={t.about.numbers} />
        </div>
        <Statistics locale={locale} />
      </section>
      <GalleryPreview locale={locale} items={gallery} />
    </>
  );
}
