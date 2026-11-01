import Icon from './Icon.jsx'
import { formatPrice } from '../utils/catalog.js'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <a className={`product-image-wrap tone-${product.tone}`} href={`#product/${product.id}`} aria-label={`Подробнее: ${product.name}`}>
        {product.label && <span className="product-label">{product.label}</span>}
        <img src={product.image} alt={product.imageAlt} width="360" height="260" loading="lazy" />
      </a>
      <div className="product-card-content">
        <p className="product-category">{product.categoryLabel} <span> / </span> {product.brand}</p>
        <h3><a href={`#product/${product.id}`}>{product.name}</a></h3>
        <p className="product-summary">{product.shortSpecs}</p>
        <p className={`stock ${product.stock > 0 ? 'available' : 'unavailable'}`}>
          <span className="stock-dot" />{product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
        </p>
        <div className="product-card-bottom">
          <p className="product-price">{formatPrice(product.price)} <span>MDL</span></p>
          <a className="product-more" href={`#product/${product.id}`} aria-label={`Открыть ${product.name}`}><Icon name="arrow" size={19} /></a>
        </div>
      </div>
    </article>
  )
}
