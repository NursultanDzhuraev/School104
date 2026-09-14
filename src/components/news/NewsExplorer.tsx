"use client";
import { useState } from "react";
import type { Locale, NewsItem, NewsCategory, Announcement } from "@/types";
import { messages } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { NewsCard } from "./NewsCard";
import { Announcements } from "@/components/home/SharedSections";
export function NewsExplorer({items,announcements,locale}:{items:NewsItem[];announcements:Announcement[];locale:Locale}) {
 const t=messages(locale);const [category,setCategory]=useState<NewsCategory|"all">("all");const [query,setQuery]=useState("");const [page,setPage]=useState(1);
 const filtered=items.filter(item=>(category==="all"||item.category===category)&&(item.title[locale]+" "+item.description[locale]).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
 const pages=Math.ceil(filtered.length/6);const current=Math.min(page,Math.max(pages,1));const visible=filtered.slice((current-1)*6,current*6);
 return <><div className="filter-toolbar"><div className="filter-list" aria-label={t.news.title}><button className={category==="all"?"chip active":"chip"} aria-pressed={category==="all"} onClick={()=>{setCategory("all");setPage(1);}}>{t.common.all}</button>{(Object.keys(t.news.categories) as NewsCategory[]).map(key=><button key={key} className={category===key?"chip active":"chip"} aria-pressed={category===key} onClick={()=>{setCategory(key);setPage(1);}}>{t.news.categories[key]}</button>)}</div><label className="search-field"><Icon name="search"/><span className="sr-only">{t.common.search}</span><input type="search" value={query} onChange={e=>{setQuery(e.target.value);setPage(1);}} placeholder={t.common.searchPlaceholder}/></label></div>
 {category==="all"&&!query&&current===1&&items[0]&&<div className="featured-wrap"><p className="eyebrow">{t.news.featured}</p><NewsCard item={items[0]} locale={locale} featured/></div>}
 <div className="news-layout"><div><p className="result-count" role="status">{t.common.results}: {filtered.length}</p><div className="news-grid">{visible.map(item=><NewsCard key={item.id} item={item} locale={locale}/>)}</div>{!visible.length&&<div className="empty-state">{t.common.empty}</div>}{pages>1&&<nav className="pagination" aria-label={t.common.page}><button className="icon-button" aria-label={t.common.previous} disabled={current===1} onClick={()=>setPage(current-1)}><Icon name="left"/></button>{Array.from({length:pages},(_,i)=>i+1).map(n=><button key={n} className={n===current?"page-button active":"page-button"} aria-current={n===current?"page":undefined} aria-label={t.common.page+" "+n} onClick={()=>setPage(n)}>{n}</button>)}<button className="icon-button" aria-label={t.common.next} disabled={current===pages} onClick={()=>setPage(current+1)}><Icon name="right"/></button></nav>}</div><aside className="news-sidebar"><h2>{t.home.announcements}</h2><Announcements locale={locale} items={announcements} compact/></aside></div></>;
}
