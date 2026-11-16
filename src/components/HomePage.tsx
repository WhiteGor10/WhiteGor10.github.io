import { useState } from 'react';
import profileData from '../data/profile.json';
import type { Profile } from '../types/profile';
import { SiteLogo } from './SiteLogo';

const profile: Profile = profileData;

export function HomePage() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoPath = profile.photo.replace(/^\/+/, '');

  return (
    <div className="site-shell">
      <header className="site-header">
        <SiteLogo />
        <nav aria-label="主导航">
          <a className="site-header__link" href={`${import.meta.env.BASE_URL}games/`}>
            游戏作品 <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main className="home-main">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero__copy">
            <p className="eyebrow"><span /> 个人主页 · 游戏作品集</p>
            <p className="home-hero__greeting">你好，我是</p>
            <h1 id="home-title">{profile.name}<span className="home-hero__period">.</span></h1>
            <p className="home-hero__description">{profile.description}</p>
            <a className="home-cta" href={`${import.meta.env.BASE_URL}games/`}>
              <span>进入游戏作品集</span>
              <span className="home-cta__arrow" aria-hidden="true">↗</span>
            </a>
            <p className="home-hero__hint">探索我制作的游戏作品与创意</p>
          </div>

          <div className="home-portrait">
            <div className="home-portrait__frame">
              {!photoFailed ? (
                <img
                  src={`${import.meta.env.BASE_URL}${photoPath}`}
                  alt={`${profile.name} 的个人照片`}
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="home-portrait__fallback" role="img" aria-label="个人照片待添加">
                  <span>{profile.name.slice(0, 1).toUpperCase()}</span>
                  <small>添加你的个人照片</small>
                </div>
              )}
            </div>
            <span className="home-portrait__index" aria-hidden="true">01 / PROFILE</span>
            <span className="home-portrait__spark" aria-hidden="true">✳</span>
          </div>
          <span className="home-hero__scroll" aria-hidden="true">SCROLL TO EXPLORE <span>↓</span></span>
        </section>
      </main>

      <footer className="site-footer">
        <SiteLogo className="brand--footer" />
        <span>个人主页 · 游戏作品集</span>
        <span>© {new Date().getFullYear()} WHITEGOR10</span>
      </footer>
    </div>
  );
}
