import Icon from './Icon.jsx'
import { hasInvalidPriceRange } from '../utils/catalog.js'

export default function Filters({ categories, products, filters, onChange, onReset, expanded }) {
  const availableCategories = categories.filter((category) => filters.group === 'all' || category.group === filters.group)
  const brands = [...new Set(products.filter((product) =>
    (filters.group === 'all' || product.group === filters.group) &&
    (filters.category === 'all' || product.category === filters.category))
    .map((product) => product.brand))].sort()

  return (
    <aside id="catalog-filters" className={`filter-panel ${expanded ? 'filter-panel-open' : ''}`} aria-label="Фильтры каталога">
      <div className="filter-heading"><h3>Фильтры</h3><button className="text-button" onClick={onReset}>Сбросить</button></div>
      <fieldset className="filter-section category-section">
        <legend>Категория</legend>
        <label className={`category-option ${filters.category === 'all' ? 'selected' : ''}`}>
          <input type="radio" name="category" checked={filters.category === 'all'} onChange={() => onChange('category', 'all')} />
          <Icon name="grid" size={18} /><span>Все категории</span>
          <span className="category-count">{products.filter((product) => filters.group === 'all' || product.group === filters.group).length}</span>
        </label>
        {availableCategories.map((category) => (
          <label key={category.id} className={`category-option ${filters.category === category.id ? 'selected' : ''}`}>
            <input type="radio" name="category" checked={filters.category === category.id} onChange={() => onChange('category', category.id)} />
            <Icon name={category.id} size={18} /><span>{category.label}</span>
            <span className="category-count">{products.filter((product) => product.category === category.id).length}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="filter-section">
        <legend>Цена, MDL</legend>
        <div className="price-inputs">
          <label><span>От</span><input aria-label="Минимальная цена" type="number" min="0" step="1" placeholder="0" value={filters.minPrice} onChange={(event) => onChange('minPrice', event.target.value)} /></label>
          <span className="price-divider">—</span>
          <label><span>До</span><input aria-label="Максимальная цена" type="number" min="0" step="1" placeholder="Любая" value={filters.maxPrice} onChange={(event) => onChange('maxPrice', event.target.value)} /></label>
        </div>
        {hasInvalidPriceRange(filters) && <p className="field-error" role="alert">Укажи неотрицательные цены: «От» должно быть не больше «До».</p>}
      </fieldset>
      <div className="filter-section">
        <label className="field-label" htmlFor="brand">Производитель</label>
        <select id="brand" value={filters.brand} onChange={(event) => onChange('brand', event.target.value)}>
          <option value="all">Все производители</option>
          {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
        </select>
      </div>
      <div className="filter-section stock-filter">
        <label><input type="checkbox" checked={filters.inStock} onChange={(event) => onChange('inStock', event.target.checked)} /><span>Только в наличии</span></label>
      </div>
      <div className="filter-note"><Icon name="box" size={22} /><p>Найди то, что подходит<br />именно тебе.</p></div>
    </aside>
  )
}
