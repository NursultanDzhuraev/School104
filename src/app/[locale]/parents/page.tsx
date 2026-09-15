import { requireLocale, messages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHero, SectionHeading } from "@/components/ui/Sections";
type Props = { params: Promise<{ locale: string }> };
import Link from "next/link";
import {
  admissionSteps,
  requiredDocuments,
  meetings,
  faq,
  parentAdvice,
} from "@/data/school-life";
import { content } from "@/lib/content";
import { CardGrid, DateList } from "@/components/ui/Sections";
import { Announcements } from "@/components/home/SharedSections";
import { ContactInfo } from "@/components/contacts/ContactInfo";
import { Icon } from "@/components/ui/Icon";
export async function generateMetadata({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const t = messages(locale);
  return pageMetadata(
    locale,
    t.parents.title,
    t.parents.description,
    "/parents",
  );
}
export default async function Parents({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const t = messages(locale);
  const announcements = await content.getAnnouncements();
  return (
    <>
      <PageHero
        locale={locale}
        title={t.parents.title}
        description={t.parents.description}
      />
      <section className="section" id="admission">
        <div className="container">
          <SectionHeading
            title={t.parents.admission}
            description={t.parents.admissionNote}
          />
          <ol className="admission-steps">
            {admissionSteps.map((step, index) => (
              <li key={step.title.kg}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title[locale]}</h3>
                <p>{step.text[locale]}</p>
              </li>
            ))}
          </ol>
          <div className="required-panel">
            <h2>{t.parents.required}</h2>
            <p>{t.parents.requiredNote}</p>
            <ul className="check-list">
              {requiredDocuments.map((item) => (
                <li key={item.kg}>
                  <Icon name="file" />
                  <span>{item[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section muted">
        <div className="container">
          <SectionHeading title={t.home.announcements} />
          <Announcements locale={locale} items={announcements} />
        </div>
      </section>
      <section className="section" id="meetings">
        <div className="container">
          <SectionHeading title={t.parents.meetings} />
          <DateList items={meetings} locale={locale} />
        </div>
      </section>
      <section className="section muted">
        <div className="container two-columns">
          <div>
            <SectionHeading title={t.parents.faq} />
            <div className="faq-list">
              {faq.map((item) => (
                <details key={item.title.kg}>
                  <summary>{item.title[locale]}</summary>
                  <p>{item.text[locale]}</p>
                </details>
              ))}
            </div>
          </div>
          <ContactInfo locale={locale} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading title={t.parents.advice} />
          <CardGrid
            locale={locale}
            items={parentAdvice}
            icons={["heart", "users", "leaf"]}
          />
          <div className="contact-banner">
            <div>
              <h2>{t.parents.contact}</h2>
              <p>{t.parents.contactText}</p>
            </div>
            <Link
              className="button gold-button"
              href={"/" + locale + "/contacts"}
            >
              {t.nav.contacts}
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
