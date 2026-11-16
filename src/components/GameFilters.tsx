import type { SortOrder } from '../utils/gameFilters';

interface GameFiltersProps {
  search: string;
  category: string;
  sortOrder: SortOrder;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOrder) => void;
}

export function GameFilters({
  search,
  category,
  sortOrder,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: GameFiltersProps) {
  return (
    <div className="filters">
      <label className="filter-field filter-field--search">
        <span>搜索</span>
        <span className="search-input">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            type="search"
            placeholder="搜索游戏名称"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </span>
      </label>

      <label className="filter-field">
        <span>分类</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">全部分类</option>
          {categories.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span>发布日期</span>
        <select value={sortOrder} onChange={(event) => onSortChange(event.target.value as SortOrder)}>
          <option value="newest">最新优先</option>
          <option value="oldest">最早优先</option>
        </select>
      </label>
    </div>
  );
}
