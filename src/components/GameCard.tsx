import { useState } from 'react';
import type { Game } from '../types/game';

interface GameCardProps {
  game: Game;
}

function isHttpUrl(value: string | null | undefined): value is string {
  if (!value?.trim()) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function GameCard({ game }: GameCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const imagePath = game.image.replace(/^\/+/, '');
  const imageUrl = `${import.meta.env.BASE_URL}${imagePath}`;
  const videoUrl = isHttpUrl(game.videoUrl) ? game.videoUrl : null;
  const downloadUrl = isHttpUrl(game.downloadUrl) ? game.downloadUrl : null;

  return (
    <article className="game-card">
      <div className="game-card__art">
        {!imageFailed ? (
          <img
            src={imageUrl}
            alt={`${game.title} 封面`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="game-card__image-fallback" role="img" aria-label={`${game.title} 封面暂不可用`}>
            <span>封面暂不可用</span>
          </div>
        )}
        {game.featured && <span className="game-card__featured">精选作品</span>}
      </div>

      <div className="game-card__content">
        <div className="game-card__heading">
          <h2>{game.title}</h2>
          <time dateTime={game.releaseDate}>{game.releaseDate}</time>
        </div>
        <p className="game-card__description">{game.description}</p>
        <ul className="game-card__categories" aria-label="游戏分类">
          {game.categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
        <div className="game-card__actions">
          {downloadUrl ? (
            <a className="button button--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
              下载游戏 <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="button button--disabled" aria-disabled="true">
              暂无下载链接
            </span>
          )}
          {videoUrl && (
            <a className="button button--secondary" href={videoUrl} target="_blank" rel="noopener noreferrer">
              观看介绍视频 <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
