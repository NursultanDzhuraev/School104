import type { ClassSchedule, Localized } from "@/types";
const subjects: Localized[] = [
  { kg: "Кыргыз тили", ru: "Кыргызский язык" },
  { kg: "Математика", ru: "Математика" },
  { kg: "Орус тили", ru: "Русский язык" },
  { kg: "Тарых", ru: "История" },
  { kg: "Англис тили", ru: "Английский язык" },
];
const times = [
  "08:00 – 08:45",
  "08:55 – 09:40",
  "09:50 – 10:35",
  "10:50 – 11:35",
  "11:45 – 12:30",
];
export const schedule: ClassSchedule[] = ["5А", "6А", "7А", "8А", "9А"].map(
  (grade, offset) => ({
    grade,
    demo: true,
    days: Object.fromEntries(
      ["mon", "tue", "wed", "thu", "fri"].map((day, dayIndex) => [
        day,
        times.map((time, index) => ({
          time,
          subject: subjects[(index + dayIndex + offset) % subjects.length],
          room: String(201 + ((index + offset) % 5)),
        })),
      ]),
    ),
  }),
);
