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
  email: "school104.bishkek@mail.ru",
  social: {
    instagram: "https://www.instagram.com/school104.bishkek/",
    facebook: "https://www.facebook.com/profile.php?id=61594136441414",
  },
  // Keep this enabled until the school approves all demo content and images.
  demoMode: true,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Рыскулбек Ашырматов 25/2 Новопавловка Бишкек"),
  statistics: [
    { value: "4000+", label: { kg: "Окуучу", ru: "Учеников" } },
    { value: "150+", label: { kg: "Мугалим", ru: "Учителей" } },
    { value: "125+", label: { kg: "Класс", ru: "Классов" } },
    { value: "2026", label: { kg: "Негизделген", ru: "Основана" } },
  ],
};
export const imagery = {
  campus: "/images/school/campus.jpg",
  classroom: "/images/gallery/classroom.jpg",
  library: "/images/gallery/library.jpg",
};
