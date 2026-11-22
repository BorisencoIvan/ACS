import Icon from '../components/Icon.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { formatPrice } from '../utils/catalog.js'

export default function ProductPage({ product, products }) {
  const related = products.filter((item) => item.group === product.group && item.id !== product.id).slice(0, 3)
  return (
    <div className="container product-page">
      <nav className="breadcrumb" aria-label="Хлебные крошки"><a href="#catalog">Каталог</a><Icon name="chevron" size={12} /><span>{product.categoryLabel}</span><Icon name="chevron" size={12} /><span>{product.name}</span></nav>
      <a href="#catalog" className="back-link"><Icon name="back" size={18} />Вернуться в каталог</a>
      <section className="product-detail">
        <div className={`detail-image tone-${product.tone}`}>
          {product.label && <span className="product-label">{product.label}</span>}
          <img src={product.image} alt={product.imageAlt} width="600" height="440" />
          <span className="illustration-note">Условная иллюстрация товара</span>
        </div>
        <div className="detail-info"><p className="section-kicker">{product.categoryLabel} / {product.brand}</p>
          <h1>{product.name}</h1><p className="detail-summary">{product.shortSpecs}</p>
          <p className={`stock ${product.stock > 0 ? 'available' : 'unavailable'}`}><span className="stock-dot" />{product.stock > 0 ? `В наличии · ${product.stock} шт.` : 'Нет в наличии'}</p>
          <p className="detail-price">{formatPrice(product.price)} <span>MDL</span></p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-meta"><span>Производитель <strong>{product.brand}</strong></span><span>Категория <strong>{product.categoryLabel}</strong></span></div>
          <a href="#catalog" className="button button-dark">Продолжить выбор<Icon name="arrow" size={18} /></a>
        </div>
      </section>
      <section className="specifications" aria-labelledby="specifications-heading">
        <div><span className="section-kicker">ВСЕ ДЕТАЛИ</span><h2 id="specifications-heading">Характеристики</h2><p>Самое важное для твоего выбора.</p></div>
        <dl className="specification-list">{Object.entries(product.specs).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
      {related.length > 0 && <section className="related-products" aria-labelledby="related-heading"><h2 id="related-heading">Посмотри также</h2><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    </div>
  )
}
