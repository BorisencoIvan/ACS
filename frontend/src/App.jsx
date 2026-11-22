import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import ComingSoonPage from './pages/ComingSoonPage.jsx'
import './App.css'

// Адреса после # поддерживают кнопку «Назад» и не требуют настройки сервера.
function getPage() {
  return window.location.hash.slice(1) || 'catalog'
}

function CatalogStatus({ loading, onRetry }) {
  return (
    <div className="container coming-soon">
      <h1 role={loading ? 'status' : 'alert'}>
        {loading ? 'Загружаем каталог…' : 'Каталог временно недоступен'}
      </h1>
      {!loading && <button className="button button-dark" onClick={onRetry}>Повторить загрузку</button>}
    </div>
  )
}

function App() {
  const [page, setPage] = useState(getPage)
  const [catalog, setCatalog] = useState({ status: 'loading' })
  const [loadAttempt, setLoadAttempt] = useState(0)
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

  useEffect(() => {
    const controller = new AbortController()

    async function loadCatalog() {
      try {
        const response = await fetch('/api/catalog', { signal: controller.signal, cache: 'no-store' })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data = await response.json()
        if (!Array.isArray(data?.groups) || !Array.isArray(data?.categories) || !Array.isArray(data?.products)) {
          throw new Error('Неверный формат каталога')
        }
        if (!controller.signal.aborted) setCatalog({ status: 'ready', data })
      } catch {
        if (!controller.signal.aborted) setCatalog({ status: 'error' })
      }
    }

    loadCatalog()
    return () => controller.abort()
  }, [loadAttempt])

  function reloadCatalog() {
    setCatalog({ status: 'loading' })
    setLoadAttempt((attempt) => attempt + 1)
  }

  const isProductPage = page.startsWith('product/')
  const product = isProductPage && catalog.status === 'ready'
    ? catalog.data.products.find((item) => page === `product/${item.id}`)
    : null

  useEffect(() => {
    document.title = product ? `${product.name} — NEXUS` : 'NEXUS — магазин компьютеров и комплектующих'
  }, [product])

  let content
  if (page !== 'catalog' && !isProductPage) {
    content = <ComingSoonPage page={page} />
  } else if (catalog.status !== 'ready') {
    content = <CatalogStatus loading={catalog.status === 'loading'} onRetry={reloadCatalog} />
  } else if (page === 'catalog') {
    content = <CatalogPage catalog={catalog.data} filters={filters} setFilters={setFilters} />
  } else if (product) {
    content = <ProductPage product={product} products={catalog.data.products} />
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
