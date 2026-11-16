import { useMemo, useState } from 'react';
import gamesData from './data/games.json';
import { GameCard } from './components/GameCard';
import { GameFilters } from './components/GameFilters';
import type { Game } from './types/game';
import { filterAndSortGames, getCategories, type SortOrder } from './utils/gameFilters';

const games: Game[] = gamesData;

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const categories = useMemo(() => getCategories(games), []);
  const visibleGames = useMemo(
    () => filterAndSortGames(games, search, category, sortOrder),
    [search, category, sortOrder],
  );

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="WhiteGor10 首页">
          <span className="brand__mark" aria-hidden="true">W</span>
          <span>WHITEGOR<span className="brand__accent">10</span></span>
        </a>
        <nav aria-label="主导航">
          <a className="site-header__link" href="#games">作品集 <span aria-hidden="true">↘</span></a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <div className="hero__copy">
            <p className="eyebrow"><span /> 独立游戏开发者 · 作品集</p>
            <h1 id="page-title">由好奇心，<br /><span>造出新世界。</span></h1>
            <p className="hero__description">这里收录了我制作的游戏作品。每一次探索，都是一次新的开始。</p>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__orbit hero__orbit--outer" />
            <div className="hero__orbit hero__orbit--inner" />
            <div className="hero__planet"><span /></div>
            <span className="hero__spark hero__spark--one">✳</span>
            <span className="hero__spark hero__spark--two">✦</span>
            <span className="hero__orbit-label">PLAY / CREATE / REPEAT</span>
          </div>
          <a className="hero__scroll" href="#games"><span /> 向下探索</a>
        </section>

        <section className="games-section" id="games" aria-labelledby="games-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">精选与新作</p>
              <h2 id="games-title">游戏作品<span className="section-heading__period">.</span></h2>
            </div>
            <span className="section-heading__index">作品目录 <span>— 01</span></span>
          </div>

          <GameFilters
            search={search}
            category={category}
            sortOrder={sortOrder}
            categories={categories}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onSortChange={setSortOrder}
          />

          <div className="results-bar" aria-live="polite">
            <span>全部作品</span>
            <span>共 <strong>{visibleGames.length}</strong> 个游戏</span>
          </div>

          {visibleGames.length > 0 ? (
            <div className="game-grid">
              {visibleGames.map((game) => <GameCard game={game} key={game.id} />)}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__symbol" aria-hidden="true">⌕</span>
              <h3>{games.length === 0 ? '作品正在准备中' : '没有找到符合条件的游戏。'}</h3>
              <p>
                {games.length === 0
                  ? '新作品即将到来，敬请期待。'
                  : '请尝试更换搜索词或分类。'}
              </p>
            </div>
          )}
        </section>

        <section id="about" aria-label="个人介绍预留" />
      </main>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#" aria-label="WhiteGor10 首页">
          <span className="brand__mark" aria-hidden="true">W</span>
          <span>WHITEGOR<span className="brand__accent">10</span></span>
        </a>
        <span>独立制作 · 持续创造</span>
        <span>© {new Date().getFullYear()} WHITEGOR10</span>
      </footer>
    </div>
  );
}
