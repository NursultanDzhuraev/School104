import type { SchoolDocument } from "@/types";
export const documents: SchoolDocument[] = [
  {
    id: "charter",
    title: {
      kg: "Мектептин уставы",
      ru: "Устав школы",
    },
    category: "charter",
    date: "2026-01-15",
    sizeBytes: 753,
    file: "/documents/sample-charter.pdf",
    demo: true,
  },
  {
    id: "license",
    title: {
      kg: "Билим берүү лицензиясы",
      ru: "Образовательная лицензия",
    },
    category: "license",
    date: "2026-01-15",
    sizeBytes: 753,
    file: "/documents/sample-license.pdf",
    demo: true,
  },
  {
    id: "orders",
    title: {
      kg: "Окуу жылы боюнча буйрук",
      ru: "Приказ на учебный год",
    },
    category: "orders",
    date: "2026-01-15",
    sizeBytes: 752,
    file: "/documents/sample-orders.pdf",
    demo: true,
  },
];
