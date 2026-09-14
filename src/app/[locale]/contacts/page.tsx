import { requireLocale, messages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHero, SectionHeading } from "@/components/ui/Sections";
type Props = { params: Promise<{locale:string}> };
import { school } from "@/data/site";
import { ContactForm } from "@/components/contacts/ContactForm";
import { ContactInfo } from "@/components/contacts/ContactInfo";
import { Icon } from "@/components/ui/Icon";
export async function generateMetadata({params}:Props) {const locale=requireLocale((await params).locale);const t=messages(locale);return pageMetadata(locale,t.contacts.title,t.contacts.description,"/contacts");}
export default async function Contacts({params}:Props){const locale=requireLocale((await params).locale);const t=messages(locale);return <><PageHero locale={locale} title={t.contacts.title} description={t.contacts.description}/><section className="section"><div className="container"><div className="two-columns contact-columns"><ContactInfo locale={locale}/><ContactForm locale={locale}/></div><div className="directions"><div><SectionHeading title={t.contacts.directions} description={t.contacts.directionsText}/><p>{school.address[locale]}</p><a className="button" href={school.mapUrl} target="_blank" rel="noreferrer">{t.common.map}<Icon name="external" size={18}/></a></div><a className="address-panel" href={school.mapUrl} target="_blank" rel="noreferrer"><Icon name="pin" size={52}/><strong>{t.common.school}</strong><span>{school.address[locale]}</span></a></div></div></section></>;}
