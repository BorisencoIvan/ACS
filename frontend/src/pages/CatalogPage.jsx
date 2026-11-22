import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import Filters from '../components/Filters.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { productCountText, selectProducts } from '../utils/catalog.js'

const allGroup = { id: 'all', label: 'Вся техника', icon: 'grid' }

export default function CatalogPage({ catalog, filters, setFilters }) {
  const { groups, categories, products } = catalog
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const visibleProducts = selectProducts(products, filters)

  function changeFilter(name, value) {
    setFilters((previous) => ({
      ...previous, [name]: value,
      ...(name === 'group' ? { category: 'all', brand: 'all' } : {}),
      ...(name === 'category' ? { brand: 'all' } : {}),
    }))
  }

  function resetFilters() {
    setFilters({ search: '', group: 'all', category: 'all', brand: 'all', minPrice: '', maxPrice: '', inStock: false, sort: 'recommended' })
  }

  return (
    <div className="container catalog-page">
      <div className="breadcrumb"><span>NEXUS</span><Icon name="chevron" size={12} /><span>Каталог</span></div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span />ТВОЙ СЛЕДУЮЩИЙ УРОВЕНЬ</p>
          <h1 id="hero-title">Выбирай технику.<br /><span>Создавай больше.</span></h1>
          <p className="hero-description">Ноутбуки, готовые ПК и комплектующие<br className="desktop-break" /> для работы, учебы и любимых игр.</p>
          <button className="button button-lime" onClick={() => document.getElementById('catalog-heading').scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            Смотреть каталог<Icon name="arrow" size={18} />
          </button>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <span className="hero-art-caption">БУДУЩЕЕ НАЧИНАЕТСЯ<br />С ТВОИХ ИДЕЙ</span>
          <img className="hero-desktop" src="/products/desktop.svg" alt="" width="360" height="260" />
          <img className="hero-laptop" src="/products/laptop.svg" alt="" width="360" height="260" />
          <div className="hero-art-badge"><Icon name="spark" size={18} /><span>Больше возможностей</span></div>
        </div>
        <span className="hero-number" aria-hidden="true">01 / NEXUS COLLECTION</span>
      </section>

      <div className="group-tabs" role="group" aria-label="Разделы каталога">
        {[allGroup, ...groups].map((group) => (
          <button key={group.id} className={`group-tab ${filters.group === group.id ? 'selected' : ''}`}
            aria-pressed={filters.group === group.id} onClick={() => changeFilter('group', group.id)}>
            <Icon name={group.icon} size={21} /><span>{group.label}</span>
            <span className="group-count">{products.filter((product) => group.id === 'all' || product.group === group.id).length}</span>
          </button>
        ))}
      </div>

      <div className="catalog-heading-row">
        <div className="catalog-heading"><span className="section-kicker">НАЙДИ СВОЕ</span>
          <div><h2 id="catalog-heading">Каталог товаров</h2><span className="results-count" role="status" aria-live="polite">{productCountText(visibleProducts.length)}</span></div>
        </div>
        <p className="catalog-heading-note">От первого ноутбука<br />до собственной сборки.</p>
      </div>

      <button className="mobile-filter-button" aria-expanded={filtersExpanded} aria-controls="catalog-filters" onClick={() => setFiltersExpanded(!filtersExpanded)}><Icon name="filter" size={18} />{filtersExpanded ? 'Скрыть фильтры' : 'Показать фильтры'}</button>
      <div className="catalog-layout">
        <Filters categories={categories} products={products} filters={filters} onChange={changeFilter} onReset={resetFilters} expanded={filtersExpanded} />
        <section className="catalog-results" aria-label="Товары">
          <div className="catalog-toolbar">
            <div className="catalog-search"><Icon name="search" size={20} />
              <input type="search" aria-label="Поиск по каталогу" placeholder="Название, бренд или характеристика" value={filters.search} onChange={(event) => changeFilter('search', event.target.value)} />
              {filters.search && <button className="icon-button" aria-label="Очистить поиск" onClick={() => changeFilter('search', '')}><Icon name="close" size={16} /></button>}
            </div>
            <label className="sort-control"><span className="sr-only">Сортировка</span>
              <select aria-label="Сортировка товаров" value={filters.sort} onChange={(event) => changeFilter('sort', event.target.value)}>
                <option value="recommended">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="name">По названию</option>
              </select>
            </label>
          </div>
          {visibleProducts.length > 0 ? (
            <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          ) : (
            <div className="empty-state"><span className="empty-icon"><Icon name="search" size={32} /></span>
              <h3>Ничего не нашлось</h3><p>Попробуй другое название или измени фильтры.</p>
              <button className="button button-dark" onClick={resetFilters}>Сбросить фильтры<Icon name="arrow" size={17} /></button>
            </div>
          )}
          <p className="catalog-end">Показано {visibleProducts.length} из {products.length} товаров<span>Хорошая техника начинается с правильного выбора.</span></p>
        </section>
      </div>
    </div>
  )
}
