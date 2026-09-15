import kg from "@/messages/kg.json";
import ru from "@/messages/ru.json";
import { notFound } from "next/navigation";
import type { Locale, Localized } from "@/types";
export function isLocale(value: string): value is Locale {
  return value === "kg" || value === "ru";
}
export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}
export function messages(locale: Locale) {
  return locale === "kg" ? kg : ru;
}
export function localize(value: Localized, locale: Locale) {
  return value[locale];
}
export function formatDate(value: string, locale: Locale) {
  // Explicit month names keep server and browser output identical across ICU versions.
  const [year, month, day] = value.split("-");
  return (
    Number(day) +
    " " +
    messages(locale).common.months[Number(month) - 1] +
    " " +
    year
  );
}
