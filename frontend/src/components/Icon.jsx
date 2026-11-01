// Иконки нарисованы SVG: дополнительная библиотека не нужна.
const paths = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  back: 'M19 12H5m6-6-6 6 6 6',
  chevron: 'm9 5 7 7-7 7',
  search: 'm21 21-5-5M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16',
  close: 'm6 6 12 12M6 18 18 6',
  filter: 'M4 7h16M7 12h10M10 17h4',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  laptop: 'M4 4h16v12H4zM2 20h20l-2-4H4z',
  desktop: 'M7 2h10v20H7zM10 6h4M10 10h4M11 17h2',
  gpu: 'M3 6h18v12H3zM7 18v3M12 18v3M17 18v3M7 10h3v4H7zM14 10h3v4h-3z',
  cpu: 'M6 6h12v12H6zM9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4',
  ram: 'M2 7h20v10H2zM5 10v4M9 10v4M13 10v4M17 10v4M5 17v3M10 17v3M15 17v3M20 17v3',
  ssd: 'M4 5h16v14H4zM7 9h6v6H7zM17 9v6M7 19v3M11 19v3M15 19v3',
  motherboard: 'M4 3h16v18H4zM7 6h6v6H7zM16 6v9M7 16h6M7 19h6',
  psu: 'M3 5h18v14H3zM8 9h6v6H8zM18 9v6',
  check: 'm5 12 4 4L19 6',
  compare: 'M5 5h4v14H5zM15 2h4v17h-4zM2 22h20',
  chat: 'M21 11a9 9 0 0 1-9 9H4l-2 2V11a9 9 0 0 1 19 0ZM7 10h10M7 14h6',
  spark: 'm12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7Z',
  box: 'm12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M7.5 5.5l9 5',
}

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.grid} /></svg>
  )
}
