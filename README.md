# School104 — 1-этап / frontend

№104 ЖББМ үчүн Next.js App Router + TypeScript + Tailwind CSS сайт. KG/RU, 8 негизги бет жана ар бир жаңылыктын өзүнчө барагы.

Бул этапта колдонмонун backend'и, база, authentication, admin panel, Firebase, Supabase жана жасалма API жок. Бардык контент локалдык TypeScript/JSON файлдарында. Next.js сервери беттерди жана сүрөттөрдүн оптимизациясын тейлейт; бул Spring Boot backend эмес.

## Иштетүү

Node.js 22 же андан жаңы версия керек.

```bash
npm install
npm run dev
```

http://localhost:3000 → /kg. Орусча версия: /ru.

```bash
npm run lint
npm run build
npm run typecheck
npm start
```

Браузердик текшерүү:

```bash
npx playwright install chromium
npm test
```

GitHub Actions build, ESLint, TypeScript, маршруттар, ички шилтемелер, PDF, меню, издөө, чыпкалар, pagination, форма, FAQ, галерея жана 1920/1440/1024/768/430/375px экрандарын текшерет. Натыйжа Actions бөлүмүндө. Артефакттар: browser-report (скриншоттор менен), school104-source (так resolved package-lock.json менен).

package-lock.json репозиторийге кошулган. CI npm ci менен ошол так версияларды орнотот. Жергиликтүү чөйрөдө npm install же npm ci колдонсоңуз болот.

## Түзүм

```text
src/
  app/
    page.tsx                 # / → /kg
    [locale]/
      layout.tsx             # Header, Footer, locale
      page.tsx               # башкы бет
      about/page.tsx
      students/page.tsx
      parents/page.tsx
      news/page.tsx
      news/[slug]/page.tsx
      documents/page.tsx
      gallery/page.tsx
      contacts/page.tsx
    robots.ts
    sitemap.ts
  components/
    layout/ home/ news/ documents/ gallery/ students/ contacts/ ui/
  data/
    site.ts                  # байланыш, сандар, сүрөттөр, demoMode
    news.ts
    documents.ts
    gallery.ts
    teachers.ts
    announcements.ts
    schedule.ts
    school-life.ts           # FAQ, кружок, кабыл алуу ж.б.
  messages/kg.json
  messages/ru.json
  types/index.ts
  lib/content.ts             # ContentRepository — келечектеги API чек арасы
  lib/i18n.ts
  lib/metadata.ts
  styles/globals.css
public/
  images/school/ news/ gallery/ team/ logo/
  documents/
tests/
```

## Чыныгы мектеп маалыматын киргизүү

`src/data/site.ts`:

- phone: эл аралык форматтагы чыныгы телефон;
- email: мектеп бекиткен Gmail;
- address: колдонуучу берген дарек;
- statistics: сандар жана негизделген жыл;
- siteUrl: `NEXT_PUBLIC_SITE_URL` аркылуу чыныгы домен;
- demoMode: азыр true.

1200+, 70+, 40+, 2010 — берилген placeholder сандар. Алар текшерилген факт катары көрсөтүлбөйт. Директордун аты-жөнү жана сүрөтү ойлоп табылган жок. Расписание, жаңылыктар, чогулуштар, кружоктор жана PDF'тер — так белгиленген үлгүлөр.

Мектеп контентти бекитип, чыныгы материалдар кошулгандан кийин гана:

1. бардык demo маалыматтарды алмаштырыңыз;
2. ар бир материалдын demo белгисин false кылыңыз;
3. site.ts ичиндеги demoMode=false кылыңыз;
4. чыныгы доменди коюп, кайра build жасаңыз.

Demo режиминде robots/noindex иштейт жана sitemap бош. Бул үлгү мектеп маалыматтарынын Google'га киришинен сактайт. Беттик title, description, OpenGraph жана KG/RU alternate URL'дер даяр.

## Жаңылык кошуу

`src/data/news.ts` массивине `NewsItem` кошуңуз:

- уникалдуу id жана slug;
- title/description/body үчүн kg жана ru;
- YYYY-MM-DD дата;
- category: school/events/parents/students/teachers/community;
- image жана кошумча images;
- demo: false (чыныгы материал болсо).

Компоненттерге өзгөртүү кереги жок. Кайра build кылганда /kg/news/slug жана /ru/news/slug түзүлөт. Белгисиз locale/slug 404 кайтарат.

## Документ кошуу

1. Бекитилген PDF'ти `public/documents/` ичине сактаңыз.
2. `src/data/documents.ts` ичине title, category, date, file, sizeBytes кошуңуз.
3. Category: charter/license/orders/plan/reports.
4. file: `/documents/filename.pdf`. sizeBytes — файлдын чыныгы көлөмү.
5. demo:false.

Кошулган sample-\*.pdf файлдары чыныгы ачылуучу PDF, бирок расмий документ эмес. Ичинде SAMPLE ONLY деп белгиленген.

## Сүрөттөр жана видео

Дизайн референстеринин тиркемелери бул иш чөйрөсүндө ачылган жок. Түзүм жана green/gold/white багыты тексттик тапшырма боюнча аткарылды. Баштапкы сүрөттөр Unsplash'тагы иллюстрациялык материалдар, мектеп №104 деп ырасталбайт:

- https://images.unsplash.com/photo-1565734777784-6e89609ed871?ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1000
- https://images.unsplash.com/photo-1509062522246-3755977927d7
- https://images.unsplash.com/photo-1503676260728-1c00da094a0b

Сүрөттөр public/images/ ичине көчүрүлгөн: сайт иштегенде Unsplash кызматына сурам жөнөтүлбөйт. Булактар public/images/ATTRIBUTION.md файлында көрсөтүлгөн. `next/image` оптимизация, өлчөмдөрдү резервдөө жана lazy loading берет. Сүрөт жүктөлбөсө, alt түшүндүрмөсү бар fallback чыгат.

Чыныгы сүрөттөрдү `public/images/` ичине кошуп, `src/data/site.ts` imagery же тиешелүү маалымат файлынын image талаасын `/images/...` кылып өзгөртүңүз. Галерея үчүн `src/data/gallery.ts` колдонулат. Teacher image:null ордуна чыныгы жол жазыңыз.

Видео үчүн ошол файлдагы videos массивине title, src (/videos/name.mp4), poster кошуңуз. Сүйлөө бар видеого титр трегин кошуп, компоненттеги track src'ин толтуруңуз.

## Тексттерди которуу

Интерфейс: `src/messages/kg.json` жана `ru.json`. Эки файлдагы ачкычтарды бирдей сактаңыз. Контент: `src/data/` ичиндеги kg/ru талаалары. URL'де kg колдонулат, HTML тили үчүн стандарттык ky колдонулат. Тил алмашканда ошол эле барак жана slug сакталат.

## Spring Boot кошуу — 2-этап

`src/lib/content.ts` ичиндеги ContentRepository компоненттер үчүн бирдей типтелген интерфейс берет. Азыр функциялар локалдык маалыматтарды кайтарат. Кийин:

- getNews → GET /api/news;
- getNewsBySlug → GET /api/news/{slug};
- getDocuments → GET /api/documents;
- getGallery/getVideos → GET /api/gallery;
- getTeachers → GET /api/teachers;
- getAnnouncements → GET /api/announcements;
- getSchedule → GET /api/schedule.

Учурда эч кандай fetch/API request жок. HTTP каталарын иштетүү, DTO mapping, кэш/ISR жана runtime validation 2-этапта ушул катмарга кошулат. Жаңы жаңылыктар build күтпөй ачылышы үчүн dynamicParams/generateStaticParams стратегиясын ошол этапта өзгөртүү керек. School-life маалыматтары да өзүнчө файлда.

Байланыш формасы HTML validation менен гана иштейт; маалымат эч жакка жөнөтүлбөйт жана localStorage'ге сакталбайт. Жөнөтүлгөнү тууралуу жалган ийгиликтүү билдирүү жок.

## Жайгаштыруу

`npm run build && npm start` колдогон Next.js хостингге же Node.js серверге жайгаштырыңыз. Backend өзүнчө талап кылынбайт. Бул output:export эмес: стандарттык Next.js runtime сүрөттөрдү оптимизациялайт жана root redirect'ти аткарат. Статикалык маалыматтар build учурунда алдын ала рендерленет.

`.env.example` негизинде доменди коюңуз. .env файлдары git'ке кирбейт.
