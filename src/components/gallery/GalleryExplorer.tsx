"use client";
import { useState } from "react";
import type { Locale, GalleryPhoto, GalleryCategory } from "@/types";
import { messages } from "@/lib/i18n";
import { Photo } from "@/components/ui/Photo";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/ui/Icon";
export function GalleryExplorer({
  items,
  locale,
}: {
  items: GalleryPhoto[];
  locale: Locale;
}) {
  const t = messages(locale);
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = items.filter(
    (item) => category === "all" || item.category === category,
  );
  const photo = selected === null ? null : filtered[selected];
  function move(delta: number) {
    setSelected((index) =>
      index === null
        ? null
        : (index + delta + filtered.length) % filtered.length,
    );
  }
  return (
    <>
      <div className="filter-list" aria-label={t.gallery.title}>
        <button
          className={category === "all" ? "chip active" : "chip"}
          aria-pressed={category === "all"}
          onClick={() => {
            setCategory("all");
            setSelected(null);
          }}
        >
          {t.common.all}
        </button>
        {(Object.keys(t.gallery.categories) as GalleryCategory[]).map((key) => (
          <button
            key={key}
            className={category === key ? "chip active" : "chip"}
            aria-pressed={category === key}
            onClick={() => {
              setCategory(key);
              setSelected(null);
            }}
          >
            {t.gallery.categories[key]}
          </button>
        ))}
      </div>
      <div className="photo-grid">
        {filtered.map((item, index) => (
          <button
            className="gallery-photo"
            key={item.id}
            aria-label={t.gallery.open + ": " + item.title[locale]}
            onClick={() => setSelected(index)}
          >
            <Photo
              src={item.image}
              alt={
                item.title[locale] + (item.demo ? " — " + t.common.sample : "")
              }
            />
            <span>
              {item.title[locale]}
              <Icon name="external" size={16} />
            </span>
          </button>
        ))}
      </div>
      {!filtered.length && <p className="empty-state">{t.common.empty}</p>}
      {photo && (
        <Modal
          label={photo.title[locale]}
          closeLabel={t.common.close}
          onClose={() => setSelected(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              move(1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="lightbox">
            <Photo src={photo.image} alt={photo.title[locale]} sizes="90vw" />
            <div className="lightbox-caption">
              <button
                className="icon-button"
                aria-label={t.common.previous}
                onClick={() => move(-1)}
              >
                <Icon name="left" />
              </button>
              <div aria-live="polite">
                <strong>{photo.title[locale]}</strong>
                <p>
                  {t.gallery.counter} {(selected ?? 0) + 1} / {filtered.length}
                </p>
              </div>
              <button
                className="icon-button"
                aria-label={t.common.next}
                onClick={() => move(1)}
              >
                <Icon name="right" />
              </button>
            </div>
            {photo.demo && <p className="fine-print">{t.common.photoNote}</p>}
          </div>
        </Modal>
      )}
    </>
  );
}
