import { useState } from 'react';

interface SiteLogoProps {
  className?: string;
}

export function SiteLogo({ className = '' }: SiteLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      className={`brand ${className}`.trim()}
      href={import.meta.env.BASE_URL}
      aria-label="WhiteGor10 首页"
    >
      {imageFailed ? (
        <>
          <span className="brand__fallback" aria-hidden="true">W</span>
          <span>WHITEGOR<span className="brand__accent">10</span></span>
        </>
      ) : (
        <img
          className="brand__image"
          src={`${import.meta.env.BASE_URL}images/logo/logo.png`}
          alt=""
          onError={() => setImageFailed(true)}
        />
      )}
    </a>
  );
}
