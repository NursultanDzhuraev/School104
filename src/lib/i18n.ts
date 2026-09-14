import kg from "@/messages/kg.json";
import ru from "@/messages/ru.json";
import { notFound } from "next/navigation";
import type { Locale, Localized } from "@/types";
export function isLocale(value: string): value is Locale { return value === "kg" || value === "ru"; }
export function requireLocale(value: string): Locale { if (!isLocale(value)) notFound(); return value; }
export function messages(locale: Locale) { return locale === "kg" ? kg : ru; }
export function localize(value: Localized, locale: Locale) { return value[locale]; }
export function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "kg" ? "ky-KG" : "ru-RU", {day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(value + "T12:00:00Z"));
}
