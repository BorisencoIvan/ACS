# ACS / NEXUS — этапы 3 и 4

React запрашивает каталог по HTTP. Java и Spring Boot читают товары из PostgreSQL. В учебной базе есть 12 товаров из этапа 2 вместе с категориями, ценами, остатками и характеристиками.

## 1. Установи программы на Windows

Если программа уже установлена и проверочная команда работает, этот пункт можно пропустить.

| Что нужно | Как установить |
| --- | --- |
| Java JDK 21 | Установи [Temurin 21](https://adoptium.net/temurin/releases/?version=21). В установщике включи добавление Java в `Path` и настройку `JAVA_HOME`. Уже установленный JDK 25 тоже подходит. |
| Apache Maven 3.9 или новее | Скачай [Binary zip archive](https://maven.apache.org/download.cgi), распакуй в отдельную папку и добавь путь к её папке `bin` в пользовательскую переменную `Path`. |
| Node.js 24 LTS | Установи [Node.js 24](https://nodejs.org/en/download) вместе с npm. |
| Docker Desktop | Установи [Docker Desktop для Windows](https://docs.docker.com/desktop/setup/install/windows-install/) с WSL 2. Запусти Docker Desktop и дождись запуска движка. PostgreSQL запустится внутри Docker. |

Если Docker Desktop просит установить WSL, открой PowerShell от имени администратора и выполни `wsl --install`. При необходимости перезагрузи Windows. Для обновления WSL выполни `wsl --update`.

Чтобы настроить `Path` и `JAVA_HOME`, найди в меню «Пуск» пункт «Изменение переменных среды для текущего пользователя». `JAVA_HOME` должен указывать на корневую папку JDK. После изменения переменных перезапусти VS Code.

Проверь установку в новом PowerShell.

```powershell
java -version
javac -version
mvn -v
node -v
npm.cmd -v
docker compose version
```

`mvn -v` покажет, какой JDK использует Maven. Для первой установки зависимостей npm, Maven и Docker нужен интернет.

## 2. Распакуй архив

Распакуй `ACS-stage-3-4.zip` в отдельную папку. Открой в VS Code папку `ACS`, в которой видны `compose.yaml`, `backend` и `frontend`. Для запуска используй три терминала PowerShell. Каждый открывай из корня `ACS`.

## 3. Запусти PostgreSQL

В первом терминале выполни команды.

```powershell
docker compose up -d --wait db
docker compose ps
```

Дождись, пока `db` перейдёт в состояние `healthy`. Docker использует образ PostgreSQL 16. Сервер базы доступен по адресу `127.0.0.1:5433`, а данные хранятся в именованном томе `acs_pgdata`.

## 4. Запусти Java-сервер

Во втором терминале выполни команды и оставь его открытым.

```powershell
cd backend
mvn spring-boot:run
```

При первом запуске Maven скачает библиотеки, а Flyway создаст таблицы и заполнит каталог. Дождись сообщения `Started AcsApplication` и открой [список товаров в JSON](http://127.0.0.1:8080/api/products).

## 5. Запусти React

В третьем терминале выполни команды и оставь его открытым.

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Открой [NEXUS на localhost:5173](http://localhost:5173/). В каталоге должны появиться 12 товаров. Попробуй поиск `Vivobook`, фильтр по цене или категории и переход на страницу товара. После первой установки зависимостей для повторного запуска React достаточно `npm.cmd run dev`.

## Как проверить, что товары из PostgreSQL

| Запрос | Что отдаёт Java-сервер |
| --- | --- |
| [GET /api/catalog](http://127.0.0.1:8080/api/catalog) | Группы, категории и товары, которые загружает React |
| [GET /api/products](http://127.0.0.1:8080/api/products) | Список товаров |
| [GET /api/products/asus-vivobook-15](http://127.0.0.1:8080/api/products/asus-vivobook-15) | Данные ASUS Vivobook 15 и его характеристики |

Открой терминал из корня `ACS` и посмотри на цены и остатки напрямую в БД.

```powershell
docker compose exec -T db psql -U acs -d acs -c "SELECT id, price, stock FROM products ORDER BY sort_order, id;"
```

На свежей учебной БД измени цену ASUS Vivobook 15 и обнови страницу. В каталоге должно отображаться 15 000 MDL. После проверки второй командой верни исходные 14 990 MDL.

```powershell
docker compose exec -T db psql -U acs -d acs -c "UPDATE products SET price = 15000 WHERE id = 'asus-vivobook-15';"
```

```powershell
docker compose exec -T db psql -U acs -d acs -c "UPDATE products SET price = 14990 WHERE id = 'asus-vivobook-15';"
```

## Как остановить проект

Нажми **Ctrl+C** в терминалах Java и React. В терминале из корня `ACS` останови PostgreSQL.

```powershell
docker compose down
```

`docker compose down` сохраняет данные в `acs_pgdata`. При следующем запуске Flyway пропустит уже выполненные миграции, а сделанные в БД изменения сохранятся.

## Если что-то не запускается

| Что видно | Что проверить |
| --- | --- |
| Docker Engine недоступен | Открой Docker Desktop, дождись запуска движка и снова выполни `docker compose up -d --wait db`. |
| PowerShell не находит `mvn` | Проверь, что в `Path` есть папка `bin` Maven, и перезапусти VS Code. |
| Maven сообщает `release version 21 not supported` | Проверь `mvn -v` и укажи путь к JDK 21 или 25 в `JAVA_HOME`. |
| Java не подключается к PostgreSQL | Из корня `ACS` запусти `docker compose ps` и `docker compose logs db`. Проверь, что `db` запущена и доступна на порту `5433`. |
| Порт `5173`, `8080` или `5433` занят | Проверь, запущена ли другая копия проекта, и останови её перед повторным запуском. |
| Каталог сообщает об ошибке загрузки | Открой [API товаров](http://127.0.0.1:8080/api/products), проверь терминалы Java и Docker, затем нажми «Повторить загрузку». |

## Где посмотреть, как всё связано

- `frontend/src/App.jsx` запрашивает `/api/catalog` и передаёт данные каталогу и странице товара.
- `frontend/vite.config.js` перенаправляет запросы `/api` с Vite на Spring Boot, который слушает локальный порт `8080`.
- `backend/src/main/java/md/acs/catalog/CatalogController.java` объявляет HTTP-адреса API.
- `backend/src/main/java/md/acs/catalog/CatalogRepository.java` выполняет SQL-запросы и собирает данные ответа.
- `backend/src/main/resources/db/migration/` содержит схему четырёх таблиц и исходный каталог.

