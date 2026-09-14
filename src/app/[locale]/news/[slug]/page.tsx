import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import { requireLocale, messages, formatDate } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Sections";
import { NewsCard } from "@/components/news/NewsCard";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
type Props={params:Promise<{locale:string;slug:string}>};
export const dynamicParams=false;
export async function generateStaticParams(){return (await content.getNews()).map(item=>({slug:item.slug}));}
export async function generateMetadata({params}:Props){const {locale:raw,slug}=await params;const locale=requireLocale(raw);const item=await content.getNewsBySlug(slug);if(!item)notFound();const base=pageMetadata(locale,item.title[locale],item.description[locale],"/news/"+slug,item.image);return {...base,openGraph:{...base.openGraph,type:"article",publishedTime:item.date}};}
export default async function Article({params}:Props){
 const {locale:raw,slug}=await params;const locale=requireLocale(raw);const t=messages(locale);const item=await content.getNewsBySlug(slug);if(!item)notFound();
 const related=(await content.getNews()).filter(other=>other.id!==item.id).slice(0,3);
 return <><article className="section article-container"><Link className="text-link" href={"/"+locale+"/news"}><Icon name="left" size={18}/>{t.news.back}</Link><div className="article-heading"><span className="category-badge inline">{t.news.categories[item.category]}</span><h1>{item.title[locale]}</h1><time dateTime={item.date}>{formatDate(item.date,locale)}</time></div><Photo src={item.image} alt={item.title[locale]} priority sizes="(max-width:960px) 100vw, 960px"/><div className="article-copy">{item.demo&&<p className="sample-note">{t.news.articleSample} {t.common.photoNote}</p>}<p className="article-lead">{item.description[locale]}</p>{item.body.map((paragraph,index)=><p key={index}>{paragraph[locale]}</p>)}</div>{item.images.length>0&&<div className="article-gallery"><h2>{t.gallery.title}</h2><GalleryExplorer locale={locale} items={item.images.map((image,index)=>({id:String(index),title:item.title,category:"events",image,demo:item.demo}))}/></div>}</article><section className="section muted"><div className="container"><SectionHeading title={t.news.related}/><div className="news-grid home-news">{related.map(other=><NewsCard key={other.id} item={other} locale={locale}/>)}</div></div></section></>;
}
