export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div><a href="#catalog" className="brand footer-brand">NEXUS<span className="brand-dot">.</span></a>
          <p>Техника, с которой возможно больше.</p></div>
        <nav aria-label="Навигация в подвале">
          <a href="#catalog">Каталог</a><a href="#configurator">Конфигуратор</a>
          <a href="#compare">Сравнение</a><a href="#support">Поддержка</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 NEXUS · Учебный проект</span>
        <span>Цены, наличие и характеристики — демонстрационные. Изображения условные.</span>
      </div>
    </footer>
  )
}
