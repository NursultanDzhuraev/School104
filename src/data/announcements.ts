import type { Announcement } from "@/types";
export const announcements: Announcement[] = [
  {
    id: "schedule",
    title: { kg: "Сабактардын расписаниеси", ru: "Расписание уроков" },
    text: {
      kg: "Классты жана күндү тандап, үлгү расписаниени көрүңүз.",
      ru: "Выберите класс и день, чтобы посмотреть пример расписания.",
    },
    date: "2026-09-05",
    href: "/students#schedule",
    demo: true,
  },
];
