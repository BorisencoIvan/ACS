export function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price)
}

export function productCountText(count) {
  const lastTwo = count % 100
  const last = count % 10
  if (lastTwo >= 11 && lastTwo <= 14) return `${count} товаров`
  if (last === 1) return `${count} товар`
  if (last >= 2 && last <= 4) return `${count} товара`
  return `${count} товаров`
}

function normalizeText(text) {
  return text.toLocaleLowerCase('ru-RU').replaceAll('ё', 'е')
}

export function hasInvalidPriceRange(filters) {
  const min = filters.minPrice === '' ? 0 : Number(filters.minPrice)
  const max = filters.maxPrice === '' ? Infinity : Number(filters.maxPrice)
  return !Number.isFinite(min) || Number.isNaN(max) || min < 0 || max < 0 || min > max
}

// Все условия применяются вместе. Исходный массив товаров не изменяется.
export function selectProducts(products, filters) {
  if (hasInvalidPriceRange(filters)) return []
  const words = normalizeText(filters.search.trim()).split(/\s+/).filter(Boolean)
  const min = filters.minPrice === '' ? 0 : Number(filters.minPrice)
  const max = filters.maxPrice === '' ? Infinity : Number(filters.maxPrice)
  const result = products.filter((product) => {
    const searchableText = normalizeText([
      product.name, product.brand, product.categoryLabel,
      product.shortSpecs, product.description, product.keywords,
    ].join(' '))
    return words.every((word) => searchableText.includes(word)) &&
      (filters.group === 'all' || product.group === filters.group) &&
      (filters.category === 'all' || product.category === filters.category) &&
      (filters.brand === 'all' || product.brand === filters.brand) &&
      product.price >= min && product.price <= max && (!filters.inStock || product.stock > 0)
  })
  if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price)
  if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price)
  if (filters.sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  return result
}
