import Link from "next/link";
import type { Locale, NewsItem } from "@/types";
import { messages, formatDate } from "@/lib/i18n";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
export function NewsCard({
  item,
  locale,
  featured = false,
}: {
  item: NewsItem;
  locale: Locale;
  featured?: boolean;
}) {
  const t = messages(locale);
  return (
    <article className={"news-card" + (featured ? " featured-news" : "")}>
      <Link
        className="news-image"
        href={"/" + locale + "/news/" + item.slug}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Photo
          src={item.image}
          alt={item.title[locale]}
          priority={featured}
          sizes={featured ? "(max-width:768px) 100vw, 55vw" : undefined}
        />
        <span className="category-badge">
          {t.news.categories[item.category]}
        </span>
      </Link>
      <div className="news-body">
        <div className="news-meta">
          <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
          {item.demo && <span>{t.common.sample}</span>}
        </div>
        <h3>
          <Link href={"/" + locale + "/news/" + item.slug}>
            {item.title[locale]}
          </Link>
        </h3>
        <p>{item.description[locale]}</p>
        <Link className="text-link" href={"/" + locale + "/news/" + item.slug}>
          {t.common.more}
          <Icon name="arrow" size={17} />
        </Link>
      </div>
    </article>
  );
}
