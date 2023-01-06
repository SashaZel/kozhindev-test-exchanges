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