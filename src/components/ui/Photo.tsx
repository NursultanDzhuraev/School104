"use client";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "./Icon";
export function Photo({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={"photo " + className}>
      {failed ? (
        <div className="photo-fallback" role="img" aria-label={alt}>
          <Icon name="image" size={44} />
          <span>{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
