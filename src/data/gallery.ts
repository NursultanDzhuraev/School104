import type { GalleryPhoto, GalleryVideo } from "@/types";
import { imagery } from "./site";
export const gallery: GalleryPhoto[] = [
  {
    id: "school-yard",
    title: { kg: "Билимге жол", ru: "Дорога к знаниям" },
    category: "school",
    image: imagery.campus,
    demo: false,
  },
  {
    id: "class-work",
    title: { kg: "Сабак учуру", ru: "На уроке" },
    category: "lessons",
    image: imagery.classroom,
    demo: true,
  },
  {
    id: "reading",
    title: { kg: "Китеп окуу", ru: "Время читать" },
    category: "students",
    image: imagery.library,
    demo: true,
  },
  {
    id: "school-event",
    title: { kg: "Бирге өткөргөн күн", ru: "День вместе" },
    category: "events",
    image: imagery.campus,
    demo: false,
  },
  {
    id: "team",
    title: { kg: "Командалык иш", ru: "Командная работа" },
    category: "sports",
    image: imagery.classroom,
    demo: true,
  },
  {
    id: "discoveries",
    title: { kg: "Жаңы ачылыштар", ru: "Новые открытия" },
    category: "lessons",
    image: imagery.library,
    demo: true,
  },
  {
    id: "campus",
    title: { kg: "Билим чөйрөсү", ru: "Образовательная среда" },
    category: "school",
    image: imagery.campus,
    demo: false,
  },
  {
    id: "friends",
    title: { kg: "Бирге үйрөнүү", ru: "Учимся вместе" },
    category: "students",
    image: imagery.classroom,
    demo: true,
  },
];
export const videos: GalleryVideo[] = [];
