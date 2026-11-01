import Icon from '../components/Icon.jsx'

const sections = {
  configurator: { icon: 'cpu', label: 'Конфигуратор', title: 'Твой ПК. Твои правила.', text: 'Здесь можно будет подобрать комплектующие, проверить совместимость и сохранить свою сборку.' },
  compare: { icon: 'compare', label: 'Сравнение', title: 'Все различия — перед глазами.', text: 'Здесь появится сравнение сборок по компонентам, характеристикам и общей стоимости.' },
  support: { icon: 'chat', label: 'Поддержка', title: 'Поможем разобраться.', text: 'Здесь можно будет обратиться к мастеру или ИИ-ассистенту и обсудить выбор техники.' },
}

export default function ComingSoonPage({ page }) {
  const section = sections[page]
  return (
    <div className="container coming-soon">
      <span className="coming-soon-icon"><Icon name={section?.icon || 'search'} size={40} /></span>
      <p className="section-kicker">{section ? `${section.label} · скоро` : 'Страница не найдена'}</p>
      <h1>{section?.title || 'Кажется, здесь ничего нет.'}</h1>
      <p>{section?.text || 'Проверь адрес или вернись в каталог, чтобы продолжить выбор.'}</p>
      <a className="button button-dark" href="#catalog">Перейти в каталог<Icon name="arrow" size={18} /></a>
    </div>
  )
}
