// Учебные данные. На следующем этапе этот массив заменим ответом backend.
// Цены, остатки и конфигурации приведены для примера, а не как предложение продажи.
export const categories = [
  { id: 'laptop', label: 'Ноутбуки', group: 'laptops' },
  { id: 'desktop', label: 'Готовые ПК', group: 'desktops' },
  { id: 'gpu', label: 'Видеокарты', group: 'components' },
  { id: 'cpu', label: 'Процессоры', group: 'components' },
  { id: 'ram', label: 'Оперативная память', group: 'components' },
  { id: 'ssd', label: 'Накопители', group: 'components' },
  { id: 'motherboard', label: 'Материнские платы', group: 'components' },
  { id: 'psu', label: 'Блоки питания', group: 'components' },
]

export const groups = [
  { id: 'all', label: 'Вся техника', icon: 'grid' },
  { id: 'laptops', label: 'Ноутбуки', icon: 'laptop' },
  { id: 'desktops', label: 'Готовые ПК', icon: 'desktop' },
  { id: 'components', label: 'Комплектующие', icon: 'cpu' },
]

const items = [
  {
    id: 'asus-vivobook-15', name: 'ASUS Vivobook 15', brand: 'ASUS', category: 'laptop',
    price: 14990, stock: 7, tone: 'mint', label: 'Для работы и учебы',
    shortSpecs: 'Core i5 · 16 ГБ · SSD 512 ГБ',
    keywords: 'ноутбук laptop vivobook 15 16gb 512gb intel',
    description: 'Универсальный ноутбук для учебы, программирования и повседневной работы. Экран 15,6 дюйма удобен для документов, браузера и просмотра видео.',
    specs: { 'Процессор': 'Intel Core i5-1335U', 'Оперативная память': '16 ГБ DDR4', 'Накопитель': 'SSD 512 ГБ', 'Экран': '15,6″, IPS, 1920 × 1080', 'Графика': 'Intel Iris Xe', 'Операционная система': 'Без ОС' },
  },
  {
    id: 'nexus-play', name: 'NEXUS Play', brand: 'NEXUS', category: 'desktop',
    price: 26990, stock: 3, tone: 'blue', label: 'Готовая сборка',
    shortSpecs: 'Ryzen 5 · RTX 4060 · 32 ГБ',
    keywords: 'компьютер пк pc desktop готовая сборка игровой',
    description: 'Готовый настольный компьютер для игр в Full HD, учебы и домашних проектов. Внутри — отдельная видеокарта, быстрый SSD и 32 ГБ оперативной памяти.',
    specs: { 'Процессор': 'AMD Ryzen 5 7600', 'Видеокарта': 'GeForce RTX 4060, 8 ГБ', 'Оперативная память': '32 ГБ DDR5', 'Накопитель': 'SSD 1 ТБ', 'Блок питания': '650 Вт', 'Корпус': 'Mid Tower, черный' },
  },
  {
    id: 'msi-rtx-4060', name: 'MSI GeForce RTX 4060', brand: 'MSI', category: 'gpu',
    price: 8290, stock: 5, tone: 'sand', label: '',
    shortSpecs: '8 ГБ GDDR6 · PCIe 4.0 · 2 вентилятора',
    keywords: 'видеокарта graphics gpu nvidia rtx4060 8gb ventus',
    description: 'Видеокарта с 8 ГБ видеопамяти для игрового компьютера. Компактная система охлаждения с двумя вентиляторами подойдет для многих настольных сборок.',
    specs: { 'Графический процессор': 'NVIDIA GeForce RTX 4060', 'Видеопамять': '8 ГБ GDDR6', 'Интерфейс': 'PCI Express 4.0', 'Разрядность шины': '128 бит', 'Охлаждение': '2 вентилятора', 'Серия': 'Ventus 2X' },
  },
  {
    id: 'lenovo-loq-15', name: 'Lenovo LOQ 15', brand: 'Lenovo', category: 'laptop',
    price: 23990, stock: 4, tone: 'lavender', label: 'Для игр',
    shortSpecs: 'Core i5 · RTX 4050 · 16 ГБ',
    keywords: 'ноутбук laptop игровой lenovo loq 16gb 512gb intel',
    description: 'Ноутбук с отдельной видеокартой для игр, работы с графикой и учебы. Дисплей с высокой частотой обновления делает движение на экране плавнее.',
    specs: { 'Процессор': 'Intel Core i5-13450HX', 'Видеокарта': 'GeForce RTX 4050, 6 ГБ', 'Оперативная память': '16 ГБ DDR5', 'Накопитель': 'SSD 512 ГБ', 'Экран': '15,6″, IPS, Full HD, 144 Гц', 'Операционная система': 'Без ОС' },
  },
  {
    id: 'amd-ryzen-5-7600', name: 'AMD Ryzen 5 7600', brand: 'AMD', category: 'cpu',
    price: 4290, stock: 9, tone: 'sand', label: '',
    shortSpecs: '6 ядер · 12 потоков · AM5',
    keywords: 'процессор cpu ryzen5 7600 amd am5 ddr5',
    description: 'Процессор для современной настольной системы на платформе AM5. Подойдет для повседневных задач, программирования и игровых конфигураций.',
    specs: { 'Сокет': 'AM5', 'Количество ядер': '6', 'Количество потоков': '12', 'Базовая частота': '3,8 ГГц', 'Тип памяти': 'DDR5', 'Тепловой пакет': '65 Вт' },
  },
  {
    id: 'kingston-fury-32', name: 'Kingston FURY Beast 32 ГБ', brand: 'Kingston', category: 'ram',
    price: 1690, stock: 12, tone: 'mint', label: '',
    shortSpecs: 'DDR5 · 2 × 16 ГБ · 5600 МТ/с',
    keywords: 'оперативная память озу ram 32gb 32гб ddr5 kingston fury',
    description: 'Комплект из двух модулей оперативной памяти для настольного компьютера. Перед покупкой нужно проверить поддержку DDR5 материнской платой.',
    specs: { 'Объем комплекта': '32 ГБ', 'Количество модулей': '2 × 16 ГБ', 'Тип памяти': 'DDR5', 'Скорость': '5600 МТ/с', 'Форм-фактор': 'DIMM', 'Охлаждение': 'Алюминиевые радиаторы' },
  },
  {
    id: 'samsung-990-evo', name: 'Samsung 990 EVO 1 ТБ', brand: 'Samsung', category: 'ssd',
    price: 1590, stock: 8, tone: 'lavender', label: '',
    shortSpecs: 'SSD · 1 ТБ · M.2 NVMe',
    keywords: 'накопитель ssd nvme m2 m.2 диск 1tb 1тб samsung',
    description: 'Твердотельный накопитель для операционной системы, программ и проектов. Устанавливается в совместимый разъем M.2 на материнской плате.',
    specs: { 'Объем': '1 ТБ', 'Форм-фактор': 'M.2 2280', 'Протокол': 'NVMe', 'Тип накопителя': 'SSD', 'Серия': '990 EVO', 'Назначение': 'ПК и совместимые ноутбуки' },
  },
  {
    id: 'msi-b650', name: 'MSI B650 Gaming Plus WiFi', brand: 'MSI', category: 'motherboard',
    price: 3790, stock: 4, tone: 'blue', label: '',
    shortSpecs: 'AM5 · DDR5 · ATX · Wi-Fi',
    keywords: 'материнская плата motherboard am5 b650 ddr5 wifi wi-fi',
    description: 'Материнская плата для настольной сборки на платформе AMD AM5. Формат ATX требует подходящего корпуса; поддержка процессора зависит также от версии BIOS.',
    specs: { 'Сокет': 'AM5', 'Чипсет': 'AMD B650', 'Тип памяти': 'DDR5', 'Форм-фактор': 'ATX', 'Беспроводная связь': 'Wi-Fi и Bluetooth', 'Назначение': 'Настольный ПК' },
  },
  {
    id: 'intel-i5-14400f', name: 'Intel Core i5-14400F', brand: 'Intel', category: 'cpu',
    price: 3890, stock: 6, tone: 'blue', label: '',
    shortSpecs: '10 ядер · 16 потоков · LGA1700',
    keywords: 'процессор cpu intel core i5 14400f lga1700',
    description: 'Процессор для работы, учебы и игр на платформе LGA1700. Модель с индексом F требует отдельной видеокарты.',
    specs: { 'Сокет': 'LGA1700', 'Количество ядер': '10', 'Количество потоков': '16', 'Встроенная графика': 'Отсутствует', 'Поддержка памяти': 'DDR4 или DDR5, зависит от платы', 'Серия': 'Intel Core i5' },
  },
  {
    id: 'gigabyte-rtx-4070', name: 'Gigabyte GeForce RTX 4070', brand: 'Gigabyte', category: 'gpu',
    price: 13990, stock: 0, tone: 'mint', label: '',
    shortSpecs: '12 ГБ GDDR6X · PCIe 4.0',
    keywords: 'видеокарта graphics gpu nvidia rtx4070 12gb windforce',
    description: 'Видеокарта с 12 ГБ видеопамяти для производительной игровой системы и задач с графикой. Перед установкой важно проверить размеры корпуса и питание.',
    specs: { 'Графический процессор': 'NVIDIA GeForce RTX 4070', 'Видеопамять': '12 ГБ GDDR6X', 'Интерфейс': 'PCI Express 4.0', 'Разрядность шины': '192 бита', 'Серия': 'Windforce', 'Назначение': 'Настольный ПК' },
  },
  {
    id: 'deepcool-pk650d', name: 'DeepCool PK650D 650 Вт', brand: 'DeepCool', category: 'psu',
    price: 1190, stock: 10, tone: 'sand', label: '',
    shortSpecs: '650 Вт · ATX · 80 PLUS Bronze',
    keywords: 'блок питания psu power 650w 650вт deepcool bronze',
    description: 'Блок питания для настольного компьютера. При подборе нужно учитывать потребление всей сборки, требования видеокарты и необходимые разъемы.',
    specs: { 'Мощность': '650 Вт', 'Форм-фактор': 'ATX', 'Сертификат': '80 PLUS Bronze', 'Кабели': 'Несъемные', 'Цвет': 'Черный', 'Назначение': 'Настольный ПК' },
  },
  {
    id: 'nexus-studio', name: 'NEXUS Studio', brand: 'NEXUS', category: 'desktop',
    price: 34990, stock: 0, tone: 'lavender', label: 'Для больших задач',
    shortSpecs: 'Core i5 · RTX 4070 · 32 ГБ',
    keywords: 'компьютер пк pc desktop готовая сборка рабочая станция',
    description: 'Настольная система для работы с графикой, многозадачности и личных проектов. Большой SSD позволяет хранить программы и рабочие материалы на одном накопителе.',
    specs: { 'Процессор': 'Intel Core i5-14400F', 'Видеокарта': 'GeForce RTX 4070, 12 ГБ', 'Оперативная память': '32 ГБ DDR5', 'Накопитель': 'SSD 2 ТБ', 'Блок питания': '750 Вт', 'Корпус': 'Mid Tower, черный' },
  },
]

export const products = items.map((product) => {
  const category = categories.find((item) => item.id === product.category)
  return {
    ...product,
    group: category.group,
    categoryLabel: category.label,
    image: `/products/${product.category}.svg`,
    imageAlt: `Условная иллюстрация: ${product.name}`,
  }
})
