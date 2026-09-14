import { requireLocale, messages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageHero, SectionHeading } from "@/components/ui/Sections";
type Props = { params: Promise<{locale:string}> };
import { content } from "@/lib/content";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { Icon } from "@/components/ui/Icon";
export async function generateMetadata({params}:Props) {const locale=requireLocale((await params).locale);const t=messages(locale);return pageMetadata(locale,t.gallery.title,t.gallery.description,"/gallery");}
export default async function Gallery({params}:Props){const locale=requireLocale((await params).locale);const t=messages(locale);const [gallery,videos]=await Promise.all([content.getGallery(),content.getVideos()]);return <><PageHero locale={locale} title={t.gallery.title} description={t.gallery.description}/><section className="section"><div className="container">{gallery.some(item=>item.demo)&&<p className="sample-note">{t.common.photoNote}</p>}<GalleryExplorer items={gallery} locale={locale}/><div className="section-gap"><SectionHeading title={t.gallery.videos}/>{videos.length?<div className="video-grid">{videos.map(video=><figure key={video.id}><video controls preload="none" poster={video.poster} aria-label={video.title[locale]}><source src={video.src} type="video/mp4"/><track kind="captions"/></video><figcaption>{video.title[locale]}</figcaption></figure>)}</div>:<div className="video-empty"><span className="icon-tile"><Icon name="play" size={32}/></span><p>{t.gallery.videoEmpty}</p></div>}</div></div></section></>;}
