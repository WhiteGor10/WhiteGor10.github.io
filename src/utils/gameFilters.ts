import type { Game } from '../types/game';

export type SortOrder = 'newest' | 'oldest';

export function getCategories(games: Game[]): string[] {
  return [...new Set(games.flatMap((game) => game.categories))]
    .sort((a, b) => a.localeCompare(b));
}

export function filterAndSortGames(
  games: Game[],
  search: string,
  category: string,
  sortOrder: SortOrder,
): Game[] {
  const query = search.trim().toLocaleLowerCase();

  return games
    .filter((game) => category === '' || game.categories.includes(category))
    .filter((game) => game.title.toLocaleLowerCase().includes(query))
    .sort((a, b) => {
      const dateDifference =
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
      const orderedDate = sortOrder === 'newest' ? -dateDifference : dateDifference;
      return orderedDate || a.title.localeCompare(b.title);
    });
}
