import { test, expect } from "@playwright/test";
import { news } from "../src/data/news";
import { documents } from "../src/data/documents";
const sections=["","/about","/students","/parents","/news","/documents","/gallery","/contacts"];
test("root redirects and unknown locale / news return 404",async({page,request})=>{
 await page.goto("/");await expect(page).toHaveURL(/\/kg$/);
 expect((await request.get("/en")).status()).toBe(404);
 expect((await request.get("/kg/news/missing-story")).status()).toBe(404);
});
for(const locale of ["kg","ru"] as const){
 test(locale+" pages, metadata, assets and internal links",async({page,request})=>{
  const errors:string[]=[];page.on("pageerror",e=>errors.push(page.url()+": "+e.message));page.on("console",message=>{if(message.type()==="error")errors.push(page.url()+": "+message.text());});
  const paths=[...sections,...news.map(item=>"/news/"+item.slug)];const targets=new Set<string>();
  for(const path of paths){
   const response=await page.goto("/"+locale+path);expect(response?.status(),path).toBe(200);
   await expect(page.locator("main h1")).toHaveCount(1);
   await expect(page.locator('meta[name="description"]')).toHaveAttribute("content",/.+/);
   await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content",/.+/);
   await expect(page.locator("html")).toHaveAttribute("lang",locale==="kg"?"ky":"ru");
   for(const href of await page.locator('a[href^="/"]').evaluateAll(anchors=>anchors.map(a=>a.getAttribute("href")!)))targets.add(href);
  }
  for(const href of targets){
   const url=new URL(href,"http://127.0.0.1:3000");
   if(url.hash){await page.goto(url.pathname);expect(await page.locator('[id="'+decodeURIComponent(url.hash.slice(1))+'"]').count(),href).toBeGreaterThan(0);}
   else expect((await request.get(href)).status(),href).toBe(200);
  }
  expect(errors).toEqual([]);
 });
 for(const width of [1920,1440,1024,768,430,375]){
  test(locale+" responsive "+width,async({page})=>{
   await page.setViewportSize({width,height:1000});
   for(const path of sections){
    await page.goto("/"+locale+path);await page.locator("main h1").waitFor();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),path+" overflows").toBeTruthy();
    if(path==="/gallery")expect(await page.locator(".photo-grid").evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(" ").length)).toBe(width>=1440?4:2);
   }
   await page.goto("/"+locale);await page.screenshot({path:"test-results/"+locale+"-home-"+width+".png",fullPage:true});
  });
 }
}
test("news filters, empty search, pagination and article locale switch",async({page})=>{
 await page.goto("/kg/news");
 await page.getByRole("button",{name:"Барак 2",exact:true}).click();
 await expect(page.locator(".news-layout .news-card")).toHaveCount(2);
 await page.getByRole("button",{name:"Педагогдор",exact:true}).click();
 await expect(page.locator(".news-layout .news-card")).toHaveCount(1);
 await page.getByRole("searchbox",{name:"Издөө",exact:true}).fill("zzzz-does-not-exist");
 await expect(page.locator(".empty-state")).toBeVisible();
 await page.getByRole("searchbox",{name:"Издөө",exact:true}).fill("");
 await page.getByRole("button",{name:"Баары",exact:true}).click();
 await expect(page.locator(".news-layout .news-card")).toHaveCount(6);
 await page.goto("/kg/news/bilim-kunu");
 await page.getByRole("link",{name:"Русский",exact:true}).click();
 await expect(page).toHaveURL(/\/ru\/news\/bilim-kunu$/);
 await expect(page.locator("main h1")).toContainText("Новый учебный год");
});
test("mobile menu, search, keyboard gallery and schedule",async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto("/kg");
 await page.getByRole("button",{name:"Менюну ачуу",exact:true}).click();
 await expect(page.getByRole("dialog")).toBeVisible();
 await page.getByRole("dialog").getByRole("link",{name:"Галерея",exact:true}).click();
 await expect(page).toHaveURL(/\/kg\/gallery$/);
 await expect(page.getByRole("dialog")).toHaveCount(0);
 const photo=page.getByRole("button",{name:"Сүрөттү чоңойтуу: Билимге жол",exact:true});
 await photo.click();await expect(page.getByRole("dialog")).toBeVisible();
 await page.keyboard.press("ArrowRight");
 await expect(page.locator(".lightbox-caption")).toContainText("2 /");
 await page.keyboard.press("Escape");await expect(page.getByRole("dialog")).toHaveCount(0);
 await expect(photo).toBeFocused();
 await page.getByRole("button",{name:"Сайттан издөө",exact:true}).click();
 await page.getByRole("dialog").getByRole("textbox").fill("Окуучуларга");
 await page.getByRole("dialog").getByRole("link",{name:"Окуучуларга",exact:true}).click();
 await expect(page).toHaveURL(/\/kg\/students$/);
 await page.getByLabel("Класс",{exact:true}).selectOption("7А");
 const first=await page.locator("tbody tr").first().innerText();
 await page.getByLabel("Күн",{exact:true}).selectOption("tue");
 expect(await page.locator("tbody tr").first().innerText()).not.toBe(first);
});
test("PDF filters and all files have real PDF signatures",async({page,request})=>{
 await page.goto("/ru/documents");
 await page.getByRole("button",{name:"Устав",exact:true}).click();
 await expect(page.locator(".document-card")).toHaveCount(1);
 for(const doc of documents){const response=await request.get(doc.file);expect(response.status()).toBe(200);expect((await response.body()).subarray(0,8).toString()).toBe("%PDF-1.4");}
 const downloadPromise=page.waitForEvent("download");
 await page.getByRole("link",{name:"Скачать: Устав школы",exact:true}).click();
 expect((await downloadPromise).suggestedFilename()).toBe("sample-charter.pdf");
});
test("contact form validates and never sends visitor data",async({page})=>{
 const submissions:string[]=[];page.on("request",request=>{if(request.method()!=="GET"&&request.method()!=="HEAD")submissions.push(request.url());});
 await page.goto("/ru/contacts");
 await page.getByRole("button",{name:"Отправить",exact:true}).click();
 await expect(page.getByRole("status")).toHaveCount(0);
 await page.getByLabel("Ваше имя",{exact:false}).fill("Тест");
 await page.getByLabel("Email",{exact:false}).fill("test@example.com");
 await page.getByLabel("Тема",{exact:false}).fill("Вопрос");
 await page.getByLabel("Сообщение",{exact:false}).fill("Тестовое сообщение");
 await page.getByRole("button",{name:"Отправить",exact:true}).click();
 await expect(page.getByRole("status")).toContainText("Ваше сообщение не отправлено");
 expect(submissions).toEqual([]);
});
test("FAQ supports keyboard",async({page})=>{
 await page.goto("/ru/parents");
 const question=page.locator("summary").first();await question.focus();await page.keyboard.press("Enter");
 await expect(page.locator("details").first()).toHaveAttribute("open","");
});
