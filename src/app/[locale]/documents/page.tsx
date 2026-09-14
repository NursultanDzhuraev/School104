import { requireLocale, messages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/Sections";
type Props = { params: Promise<{locale:string}> };
import { content } from "@/lib/content";
import { DocumentExplorer } from "@/components/documents/DocumentExplorer";
export async function generateMetadata({params}:Props) {const locale=requireLocale((await params).locale);const t=messages(locale);return pageMetadata(locale,t.documents.title,t.documents.description,"/documents");}
export default async function Documents({params}:Props){const locale=requireLocale((await params).locale);const t=messages(locale);const documents=await content.getDocuments();return <><PageHero locale={locale} title={t.documents.title} description={t.documents.description}/><section className="section"><div className="container">{documents.some(item=>item.demo)&&<p className="sample-note">{t.documents.note}</p>}<DocumentExplorer items={documents} locale={locale}/></div></section></>;}
