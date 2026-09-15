import Link from "next/link";
import { Brand } from "./Brand";
import { school } from "@/data/site";
import { messages } from "@/lib/i18n";
import type { Locale } from "@/types";
import { Icon } from "@/components/ui/Icon";
export function Footer({ locale }: { locale: Locale }) {
  const t = messages(locale);
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand locale={locale} />
          <p className="footer-note">{t.home.intro}</p>
        </div>
        <div>
          <h3>{t.nav.contacts}</h3>
          <p className="contact-line">
            <Icon name="pin" />
            {school.address[locale]}
          </p>
          <p className="contact-line">
            <Icon name="phone" />
            {school.phone ? (
              <a href={"tel:" + school.phone}>{school.phone}</a>
            ) : (
              t.common.notProvided
            )}
          </p>
          <p className="contact-line">
            <Icon name="mail" />
            {school.email ? (
              <a href={"mailto:" + school.email}>{school.email}</a>
            ) : (
              t.common.notProvided
            )}
          </p>
        </div>
        <div>
          <h3>{t.common.quickLinks}</h3>
          <ul className="footer-links">
            {(
              ["news", "documents", "gallery", "contacts"] as const
            ).map((key) => (
              <li key={key}>
                <Link href={"/" + locale + "/" + key}>{t.nav[key]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{t.common.map}</h3>
          <a
            className="map-card"
            href={school.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="pin" size={32} />
            <strong>{school.shortName[locale]}</strong>
            <span>{school.address[locale]}</span>
            <span className="text-link">
              {t.common.map}
              <Icon name="external" size={14} />
            </span>
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getUTCFullYear()} {school.shortName[locale]}.{" "}
          {t.common.rights}
        </span>
        <span>{t.common.motto}</span>
      </div>
    </footer>
  );
}
