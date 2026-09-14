"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";
import { messages } from "@/lib/i18n";
import { Modal } from "@/components/ui/Modal";
export function MobileMenu({locale,onClose}:{locale:Locale;onClose:()=>void}){const t=messages(locale);const pathname=usePathname();return <Modal label={t.common.menu} closeLabel={t.common.close} onClose={onClose}><nav className="mobile-navigation" aria-label={t.common.menu}>{Object.entries(t.nav).map(([key,label])=>{const href="/"+locale+(key==="home"?"":"/"+key);return <Link href={href} key={key} onClick={onClose} aria-current={pathname===href?"page":undefined}>{label}</Link>;})}</nav></Modal>;}
