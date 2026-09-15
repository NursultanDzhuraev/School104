"use client";
import { useState } from "react";
import type { Locale } from "@/types";
import { messages } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
export function ContactForm({ locale }: { locale: Locale }) {
  const t = messages(locale);
  const [feedback, setFeedback] = useState(false);
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        setFeedback(true);
      }}
    >
      <h2>{t.contacts.form}</h2>
      <p id="form-note">{t.contacts.formNote}</p>
      <div className="form-grid">
        <label>
          {t.contacts.name} *
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            aria-describedby="form-note"
          />
        </label>
        <label>
          {t.contacts.email} *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label>
          {t.contacts.phone}
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </label>
        <label>
          {t.contacts.subject} *
          <input name="subject" required maxLength={160} />
        </label>
      </div>
      <label>
        {t.contacts.message} *
        <textarea name="message" rows={5} required maxLength={4000} />
      </label>
      <p className="fine-print">* {t.contacts.required}</p>
      <button className="button" type="submit">
        {t.contacts.send}
        <Icon name="arrow" size={18} />
      </button>
      {feedback && (
        <p className="form-status" role="status">
          {t.contacts.feedback}
        </p>
      )}
    </form>
  );
}
