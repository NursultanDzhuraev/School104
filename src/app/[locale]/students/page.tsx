import { requireLocale, messages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHero, SectionHeading } from "@/components/ui/Sections";
type Props = { params: Promise<{locale:string}> };
import Link from "next/link";
import { content } from "@/lib/content";
import { clubs, homework, exams, rules, usefulLinks, events } from "@/data/school-life";
import { Schedule } from "@/components/students/Schedule";
import { CardGrid, DateList } from "@/components/ui/Sections";
import { Icon } from "@/components/ui/Icon";
export async function generateMetadata({params}:Props) {const locale=requireLocale((await params).locale);const t=messages(locale);return pageMetadata(locale,t.students.title,t.students.description,"/students");}
export default async function Students({params}:Props) {
 const locale=requireLocale((await params).locale);const t=messages(locale);const schedule=await content.getSchedule();
 return <><PageHero locale={locale} title={t.students.title} description={t.students.description}/>
 <section className="section" id="schedule"><div className="container"><SectionHeading title={t.students.schedule} description={t.students.scheduleNote}/><Schedule items={schedule} locale={locale}/></div></section>
 <section className="section muted"><div className="container"><SectionHeading title={t.students.homework}/><CardGrid items={homework} locale={locale}/><div className="section-gap"><SectionHeading title={t.students.tests}/><CardGrid items={exams} locale={locale} icons={["calendar"]}/></div></div></section>
 <section className="section"><div className="container"><SectionHeading title={t.students.clubs}/><CardGrid items={clubs} locale={locale} icons={["book","leaf","users"]}/></div></section>
 <section className="section muted"><div className="container two-columns"><div><SectionHeading title={t.students.rules}/><ul className="check-list">{rules.map(rule=><li key={rule.kg}><Icon name="check"/><span>{rule[locale]}</span></li>)}</ul></div><div><SectionHeading title={t.students.links}/><div className="link-stack">{usefulLinks.map(link=><Link href={"/"+locale+link.href} key={link.href}>{link.title[locale]}<Icon name="arrow"/></Link>)}</div></div></div></section>
 <section className="section"><div className="container"><SectionHeading title={t.students.events}/><DateList items={events} locale={locale}/></div></section></>;
}
