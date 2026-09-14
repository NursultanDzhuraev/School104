"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/types";
import { messages } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
interface SearchEntry { title:string; href:string }
export function Header({locale,entries}:{locale:Locale;entries:SearchEntry[]}) {
 const t=messages(locale);const pathname=usePathname();const router=useRouter();const [menu,setMenu]=useState(false);const [search,setSearch]=useState(false);const [query,setQuery]=useState("");
 const results=entries.filter(entry=>entry.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())).slice(0,12);
 function translatedPath(target:Locale){const parts=pathname.split("/");parts[1]=target;return parts.join("/");}
 return <header className="site-header">
 <div className="container header-main"><Brand locale={locale}/><div className="header-tools">
 <div className="language-switch" aria-label="Language">{(["kg","ru"] as const).map(lang=><Link key={lang} href={translatedPath(lang)} hrefLang={lang==="kg"?"ky":"ru"} lang={lang==="kg"?"ky":"ru"} aria-label={lang==="kg"?"Кыргызча":"Русский"} aria-current={lang===locale?"true":undefined} onClick={event=>{if(event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();router.push(translatedPath(lang)+window.location.search+window.location.hash);}}}>{lang.toUpperCase()}</Link>)}</div>
 <button className="icon-button" aria-label={t.common.searchSite} onClick={()=>setSearch(true)}><Icon name="search"/></button>
 <Link className="button header-contact" href={"/"+locale+"/contacts"}>{t.nav.contacts}<Icon name="arrow" size={16}/></Link>
 <button className="icon-button menu-toggle" aria-label={t.common.menu} aria-expanded={menu} onClick={()=>setMenu(true)}><Icon name="menu"/></button></div></div>
 <nav className="container desktop-navigation" aria-label={t.common.official}>{Object.entries(t.nav).map(([key,label])=>{const href="/"+locale+(key==="home"?"":"/"+key);const current=pathname===href||(key!=="home"&&pathname.startsWith(href+"/"));return <Link href={href} key={key} aria-current={current?"page":undefined}>{label}</Link>;})}</nav>
 {menu&&<MobileMenu locale={locale} onClose={()=>setMenu(false)}/>}
 {search&&<Modal label={t.common.searchSite} closeLabel={t.common.close} onClose={()=>setSearch(false)}><h2>{t.common.searchSite}</h2><label className="search-field"><Icon name="search"/><span className="sr-only">{t.common.searchHint}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.common.searchHint}/></label><ul className="search-results" aria-label={t.common.results}>{results.map(entry=><li key={entry.href}><Link href={entry.href} onClick={()=>setSearch(false)}>{entry.title}<Icon name="arrow" size={16}/></Link></li>)}</ul>{results.length===0&&<p role="status">{t.common.empty}</p>}</Modal>}
 </header>;
}
