import type { Locale } from "@/types";
import { school } from "@/data/site";
import { messages } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
export function ContactInfo({ locale }: { locale: Locale }) {
  const t = messages(locale);
  return (
    <div className="contact-info">
      <h2>{t.contacts.info}</h2>
      <div>
        <span className="icon-tile">
          <Icon name="pin" />
        </span>
        <section>
          <h3>{t.common.address}</h3>
          <p>{school.address[locale]}</p>
        </section>
      </div>
      <div>
        <span className="icon-tile">
          <Icon name="phone" />
        </span>
        <section>
          <h3>{t.common.phone}</h3>
          {school.phone ? (
            <a href={"tel:" + school.phone}>{school.phone}</a>
          ) : (
            <p>{t.common.notProvided}</p>
          )}
        </section>
      </div>
      <div>
        <span className="icon-tile">
          <Icon name="mail" />
        </span>
        <section>
          <h3>{t.common.email}</h3>
          {school.email ? (
            <a href={"mailto:" + school.email}>{school.email}</a>
          ) : (
            <p>{t.common.notProvided}</p>
          )}
        </section>
      </div>
      <div>
        <span className="icon-tile">
          <Icon name="clock" />
        </span>
        <section>
          <h3>{t.contacts.hours}</h3>
          <p>{t.contacts.hoursText}</p>
        </section>
      </div>
    </div>
  );
}
