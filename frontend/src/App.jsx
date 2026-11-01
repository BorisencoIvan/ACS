import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import ComingSoonPage from './pages/ComingSoonPage.jsx'
import { products } from './data/products.js'
import './App.css'

// Адреса после # поддерживают кнопку «Назад» и не требуют настройки сервера.
function getPage() {
  return window.location.hash.slice(1) || 'catalog'
}

function App() {
  const [page, setPage] = useState(getPage)
  // Фильтры остаются при переходе в карточку товара и обратно.
  const [filters, setFilters] = useState({
    search: '', group: 'all', category: 'all', brand: 'all',
    minPrice: '', maxPrice: '', inStock: false, sort: 'recommended',
  })

  useEffect(() => {
    function handleNavigation() {
      setPage(getPage())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', handleNavigation)
    return () => window.removeEventListener('hashchange', handleNavigation)
  }, [])

  const product = page.startsWith('product/')
    ? products.find((item) => item.id === page.split('/')[1])
    : null

  useEffect(() => {
    document.title = product ? `${product.name} — NEXUS` : 'NEXUS — магазин компьютеров и комплектующих'
  }, [product])

  let content
  if (page === 'catalog') {
    content = <CatalogPage filters={filters} setFilters={setFilters} />
  } else if (product) {
    content = <ProductPage product={product} />
  } else {
    content = <ComingSoonPage page={page} />
  }

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault()
        document.getElementById('main-content').focus()
      }}>Перейти к содержимому</a>
      <Header page={page} />
      <main id="main-content" tabIndex={-1}>{content}</main>
      <Footer />
    </>
  )
}

export default App
