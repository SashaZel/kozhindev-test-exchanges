![hedgehog](/src/assets/hedg.svg)

## 'Наш Ёж' ('Our Hedgehog')

## Currency exchange rate calculator.

Live demo: [https://sashazel.github.io/our-hedgehog/](https://sashazel.github.io/our-hedgehog/)

The 'Our Hegehog' app offers actual currency exchange rates and currencies calculator.

Features:
- get actual rates from open non-official API of 'The Central Bank of the Russian Federation'.
- get actual rates from open official 'Moscow Exchange' API.
- manual currencies rates update.
- initial load currencies rates update.
- cross-course calculation via RUB.
- sorting of rates table.
- searching in the table.
- compact/expand currencies table mode.
- saving chosen currencies in localStorage.

Tech stack features:
- Webpack with Babel (custom setting from scratch)
- ESLint (KozhinDev config https://github.com/steroids/eslint-config)
- React 18
- Redux RTX with async thunks.
- TypeScript
- axios
- SCSS with BEM-like style
- mobile-first Responsive Web Design.
- no-jerk UI with API loader animations.
- original art of funny Hedgehog created in Inkscape.

Feel free to pull and try the project.
- For development mode run 'npm run dev'
- For development build run 'npm run build' (target './dist' folder)
- For minified production build run 'npm run prod-build' (target './dist' folder)

TODO:
- re-organize code for company convention
- leverage down the bundle size
- add uniqe bundle script name feature
- add re-render optimization
- add animation for smooth UI
- add asc/desc sorting feature
- brush up UI and design, add icons
- add Storybook presentations
- add more currencies sources
- add tests (?)
- add internationalization
- add access to history of currencies rates
- add history visualization
- add rates compare feature

The app creation takes about 27 hours of work.

**Наш Ёж** is developed and maintained by [Alexander Zelenkov](https://www.zelenkov.space/)

# Code review

(from 40:00)

https://youtu.be/dZM8Wbs9OV8?t=2383

# The task description:

Задача

Разработать одностраничное SPA-приложение на React+Redux для отображения курса валют и конвертации из одной в другую.

Страница состоит трех элементов:
Шапка
Содержит название проекта
Содержит время последней подгрузки курсов валют в человекопонятном формате
Рядом со временем подгрузки данных разместить ссылку “обновить”, которая отправляет принудительный запрос на обновление курсов валют. Все данные на странице (в том числе в форме конвертации валют) должны пересчитываться.
Таблица с курсами. Содержит информацию по подгруженным курсам.
Колонки
Номер строки
Код валюты (ISO 4217)
Название валюты
Курс к Рублю
Курс к Доллару
Курс к Евро
Курс к Юаню
Количество валют — не меньше 10
Откуда взять данные — найти самостоятельно (это тоже часть тестового задания)
Данные подгружать библиотекой axios при загрузке страницы, на время загрузки показывать Loader
Сохранять данные в redux хранилище
Вынести в константы коды валют, участвующих в условиях и логике (например, для колонок курсов валют)
Форма конвертации одной валюты в другую.
Поля
Ввод суммы + выбор из выпадающего списка первой валюты
Ввод суммы + выбор из выпадающего списка второй валюты

При вводе суммы в первой строке — обновляется вторая (происходит конвертация валюты) и наоборот — при вводе на второй строке, обновляется первая.
В поле не давать вводить буквы и спецсимволы, кроме запятой(как разделителя целой и дробной частей)

Можно придумать свои стили, или использовать готовую библиотеку (Bootstrap, Ant.Design, Material UI, …). Визуальная эстетика тоже важна.

Качеству, стилю и единообразию кода будет уделяться особое внимание. Думайте о том, как называть компоненты, переменные, как структурировать код в проекте. Некоторые наши рекомендации и практики мы собираем в нашей документации — (пока бета)

Фиксируйте потраченное на тестовое задание время в часах, и укажите его при отправке нам ссылки на готовое задание.
Технологии
Минимальные требования:
Webpack, babel
Eslint
React (Functional Components)
Redux (хранение состояния курсов)
SCSS, Bootstrap
Axios (запросы API)

Будет плюсом:
TypeScript
Использование нашего open-source фреймворка — Steroids
Шаги выполнения
Прочитайте задание от начала до конца :)
Создайте репозиторий на Github с названием «kozhindev-test-exchanges»
Разверните проект, настройте билд вебпака, чтобы у вас собирались исходники. Если используете react-create-app, то удалите все ненужные (или непонятные вам и не влияющие на работу) файлы
Подключите наши правила eslint. Он во многом основан на общепринятых правилах стиля кода, таких как https://www.npmjs.com/package/eslint-config-airbnb 
Продумайте из каких React компонентов будет состоять приложение и как будут храниться данные в Redux
Имплементируйте минимальный функционал приложения, описанный в задаче. С какой части начинать — решать вам, но список будет примерно таков:
Добавить action и reducer для хранения данных, в action должен происходить запрос на бекенд
Добавить основной компонент (страницу / layout) проекта, добавить вызов action для подгрузки данных, убедиться что данные попали в Redux
Добавить компонент для отрисовки шапки страницы
Добавить компонент для отрисовки данных в табличном виде
Добавить компонент для калькуляции курса валют (форма)
Выгрузите получившееся приложение на Github Pages, чтобы его можно было легко открыть в браузере. Разместить в README ссылку на него и инструкцию, как запускать проект.
Будет плюсом
Если вы уверенно чувствуете себя в задаче, то будет хорошим плюсом сделать дополнительный функционал к нашему приложению, варианты:
Использование БЭМ подхода при верстке приложения
В localstorage сохранять данные о выбранных в калькуляторе валютах, чтобы после перезагрузки страницы они сохранялись
В таблице отображать только 5 первых валют и ниже таблицы добавить кнопку “Показать все” / “Скрыть”, которая раскрывает полный список (и скрывает, если он раскрыт)
В поле формы, при вводе точки “.”, автоматически заменять ее на запятую
Написать весь код на TypeScript, описать интерфейсы под все данные и props компонентов
Реализовать сортировку в таблице по всем столбцам
Оптимизировать компоненты таким образом, чтобы минимизировать количество лишних перерендеров (и проверить/подтвердить это через chrome devtool)
Добавить поле поиска над таблицей (или под шапкой таблицы), которое при каждом вводе символа будет фильтровать строки таблицы, поиск должен вестись как по коду валюты, так и по названию вне зависимости от регистра.
Реализовать приложение с помощью нашего open-source фреймворка — Steroids, используя компоненты Link, Grid, Form, NumberField, DropDownField. Можно обратиться к нам за дополнительной помощью.
Сделать адаптивную верстку для телефона,планшета и десктопа
