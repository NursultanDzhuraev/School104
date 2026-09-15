"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";
import { school } from "@/data/site";
import { messages } from "@/lib/i18n";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/ui/Icon";
export function MobileMenu({
  locale,
  onClose,
}: {
  locale: Locale;
  onClose: () => void;
}) {
  const t = messages(locale);
  const pathname = usePathname();
  return (
    <Modal
      label={t.common.menu}
      closeLabel={t.common.close}
      onClose={onClose}
      className="mobile-menu-modal"
    >
      <div className="mobile-menu-heading">
        <span>{t.common.official}</span>
        <strong>{school.shortName[locale]}</strong>
      </div>
      <nav className="mobile-navigation" aria-label={t.common.menu}>
        {Object.entries(t.nav).map(([key, label]) => {
          const href = "/" + locale + (key === "home" ? "" : "/" + key);
          const current =
            pathname === href ||
            (key !== "home" && pathname.startsWith(href + "/"));
          return (
            <Link
              href={href}
              key={key}
              onClick={onClose}
              aria-current={current ? "page" : undefined}
            >
              <span>{label}</span>
              <Icon name="arrow" size={16} />
            </Link>
          );
        })}
      </nav>
      <div className="mobile-menu-footer">
        <div className="mobile-menu-languages" aria-label="Language">
          {(["kg", "ru"] as const).map((lang) => (
            <Link
              href={"/" + lang}
              hrefLang={lang === "kg" ? "ky" : "ru"}
              lang={lang === "kg" ? "ky" : "ru"}
              key={lang}
              aria-current={lang === locale ? "true" : undefined}
              onClick={onClose}
            >
              {lang.toUpperCase()}
            </Link>
          ))}
        </div>
        <Link
          className="button mobile-menu-contact"
          href={"/" + locale + "/contacts"}
          onClick={onClose}
        >
          {t.nav.contacts}
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </Modal>
  );
}
