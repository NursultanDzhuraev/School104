import type { Teacher } from "@/types";
export const teachers: Teacher[] = [
  {
    id: "director",
    name: { kg: "Аты-жөнү кийин кошулат", ru: "Имя будет добавлено" },
    position: { kg: "Мектеп директору", ru: "Директор школы" },
    image: null,
    demo: true,
  },
  {
    id: "deputy",
    name: { kg: "Аты-жөнү кийин кошулат", ru: "Имя будет добавлено" },
    position: {
      kg: "Окуу иштери боюнча орун басар",
      ru: "Заместитель по учебной работе",
    },
    image: null,
    demo: true,
  },
  {
    id: "education",
    name: { kg: "Аты-жөнү кийин кошулат", ru: "Имя будет добавлено" },
    position: {
      kg: "Тарбия иштери боюнча орун басар",
      ru: "Заместитель по воспитательной работе",
    },
    image: null,
    demo: true,
  },
];
