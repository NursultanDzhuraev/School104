import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";
import { messages } from "@/lib/i18n";
import { school } from "@/data/site";
export function Brand({ locale }: { locale: Locale }) {
  const t = messages(locale);
  return (
    <Link className="brand" href={"/" + locale}>
      <span className="brand-mark">
        <Image
          src="/images/logo/school-104-logo.jpeg"
          alt={school.shortName[locale]}
          width={128}
          height={128}
          priority
        />
      </span>
      <span className="brand-copy">
        <strong>{school.name[locale]}</strong>
        <small>{t.common.motto}</small>
      </span>
    </Link>
  );
}
