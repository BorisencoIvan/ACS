import Icon from './Icon.jsx'

const links = [
  { page: 'catalog', label: 'Каталог' },
  { page: 'configurator', label: 'Конфигуратор' },
  { page: 'compare', label: 'Сравнение' },
  { page: 'support', label: 'Поддержка' },
]

export default function Header({ page }) {
  const activePage = page.startsWith('product/') ? 'catalog' : page
  return (
    <header className="site-header">
      <div className="topline"><div className="container topline-inner">
        <span>Техника для твоих идей</span><span>Цены в молдавских леях · MDL</span>
      </div></div>
      <div className="container header-inner">
        <a className="brand" href="#catalog" aria-label="NEXUS — каталог">
          <span className="brand-mark"><span /><span /><span /></span>NEXUS<span className="brand-dot">.</span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          {links.map((link) => (
            <a key={link.page} href={`#${link.page}`} className={activePage === link.page ? 'nav-link active' : 'nav-link'}
              aria-current={activePage === link.page ? 'page' : undefined}>{link.label}</a>
          ))}
        </nav>
        <a href="#catalog" className="header-catalog"><Icon name="grid" size={17} />Выбрать технику</a>
      </div>
    </header>
  )
}
