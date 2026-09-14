import Link from "next/link";
import type { Locale } from "@/types";
import { messages } from "@/lib/i18n";
import { school } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
export function Brand({locale}:{locale:Locale}) {const t=messages(locale);return <Link className="brand" href={"/"+locale}><span className="brand-mark"><Icon name="graduation" size={26}/><b>104</b></span><span className="brand-copy"><strong>{school.name[locale]}</strong><small>{t.common.motto}</small></span></Link>;}
