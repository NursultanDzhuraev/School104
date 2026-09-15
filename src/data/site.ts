export const school = {
  name: {
    kg: "№104 Жалпы билим берүүчү мектеп",
    ru: "Средняя общеобразовательная школа №104",
  },
  shortName: { kg: "№104 ЖББМ", ru: "СОШ №104" },
  address: {
    kg: "Рыскулбек Ашырматов көчөсү, 25/2, Новопавловка, Бишкек",
    ru: "ул. Рыскулбека Ашырматова, 25/2, Новопавловка, Бишкек",
  },
  phone: "",
  email: "",
  // Keep this enabled until the school approves all demo content and images.
  demoMode: true,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Рыскулбек Ашырматов 25/2 Новопавловка Бишкек"),
  statistics: [
    { value: "1200+", label: { kg: "Окуучу", ru: "Учеников" } },
    { value: "70+", label: { kg: "Мугалим", ru: "Учителей" } },
    { value: "40+", label: { kg: "Класс", ru: "Классов" } },
    { value: "2010", label: { kg: "Негизделген жылы", ru: "Год основания" } },
  ],
};
export const imagery = {
  campus: "/images/school/campus.jpg",
  classroom: "/images/gallery/classroom.jpg",
  library: "/images/gallery/library.jpg",
};
