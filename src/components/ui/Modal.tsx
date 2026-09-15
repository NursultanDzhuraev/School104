"use client";
import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
export function Modal({
  label,
  closeLabel,
  className = "",
  onClose,
  onKeyDown,
  children,
}: {
  label: string;
  closeLabel: string;
  className?: string;
  onClose: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLDialogElement>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const active = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      active?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={["modal", className].filter(Boolean).join(" ")}
      aria-label={label}
      onKeyDown={onKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="icon-button modal-close"
        aria-label={closeLabel}
        onClick={onClose}
        autoFocus
      >
        <Icon name="close" />
      </button>
      {children}
    </dialog>
  );
}
