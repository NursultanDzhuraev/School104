import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { requireLocale, messages } from "@/lib/i18n";
import { content } from "@/lib/content";
import { school } from "@/data/site";
import { locales } from "@/types";
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale=>({locale})); }
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
 const locale=requireLocale((await params).locale);const t=messages(locale);const news=await content.getNews();
 const entries=[...Object.entries(t.nav).map(([key,title])=>({title,href:"/"+locale+(key==="home"?"":"/"+key)})),...news.map(item=>({title:item.title[locale],href:"/"+locale+"/news/"+item.slug}))];
 return <div lang={locale==="kg"?"ky":"ru"}><LocaleDocument locale={locale}/><a className="skip-link" href="#main-content">{t.common.skip}</a><Header locale={locale} entries={entries}/>{school.demoMode&&<div className="demo-notice">{t.common.demo}</div>}<main id="main-content" tabIndex={-1}>{children}</main><Footer locale={locale}/></div>;
}
