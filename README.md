# Light range slider
JQuery плагин реализующий функционал бегунка. Примеры использвания представлены на [DEMO](https://rizarid.github.io/light-range-slider/) странице.

## Архитектура проекта

Плагин реализует MVP архитектуру и содержит три основных слоя: Model, View and Presenter. 
### Model
Слой отвечает за хнанение состояний слайдера и изменение их при запросе Presenter - а.
### View
Слой отвечает за отображение слайдера и регистрацию действий пользователя.
### Presenter
Организет взаимодействие между Model и View, а так же обрабатывает API запросы.

Все взаимодействие между Model и View производится строго через Presenter.

![mvp](./mvp.svg)

Слои Model и View полностью ослеплены и не осведамлены, не только о существовании друг друга, но и о существовании слоя Presenter. В связи с чем, передача данных снизу в верх осуществляется при помощи Observer - а. При инициализации слайдера, Presenter подписывается на обновления слоев Model и View, передавая им соответствующие callback функции. При наступлении событий в Model и View они формируют объект события, и вызывают callback функцию, в которую и передают этот объект.
### UML - диаграмма
![uml](./uml.svg)

## Клонировать репозиторий
```git
$ git clone https://github.com/Rizarid/light-range-slider.git
```
## Установить зависимости
```
npm i
```
## Запустить тесты
```
npm run test:single
```
## Начало работы

Подключите JQuery и плагин:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="light-range-slider.a41d4c721744ffe21a39.css">
<script src="light-range-slider.a8613c5aea034fa44649.js"></script>
```
Создайте контейнер для слайдера:

```html
<div class="slider"></div>
```

Инициализируйте плагин при помощи JQuery:

``` javascript
const slider = $('.slider');
slider.rangeSlider();
```

Для кастомизации слайдера, при инициализации передайте объект с необходимыми параметрами:
```javascript
const slider = $('.slider');
slider.rangeSlider({
  extremeValues: [250, 400],
  currentValues: [320]
});
// Создаст слайдер с  диапазоном значений от 250 до 400 и текущим значением слайдера 320
```
Что-бы получать новае значения параметров слайдера, при их изменении, передайте callback функцию в параметер callbacks:
```javascript
const callback = (event) => console.log(event.currentValues);
const slider = $('.slider');
slider.rangeSlider({callbacks: [callback] });
slider.setCurrentValues([60])
// Выведет в консоль: [60]
```
## Параметры

+ `extremeValues: number[]` - массив содержащий минимальное и максимальное знаачения диапазона слайдера. Значение по умолчанию `[0, 100]`.
+ `currentValues: number[]` - массив текущих значений слайдера. Количество значений которое необходимо передать зависит от параметра `isInterval`. Если `isInterval = true`, то необходимо передать два значения, в противном случае одно. Значение по умолчанию `[50]`.
+ `step: number` - шаг слайдера. Значение по умолчанию `1`.
+ `scaleStep: number` - шаг шкалы слайдера. Значение по умолчанию `10`.
+ `isVertical: boolean` - если значение параметра ровняется `true`, то слайдер переходит в вертикальный мод. Значение по умолчанию `false`.
+ `isInterval: boolean` - если значение параметра ровняется `true`, то слайдер переходит в интервальный мод. Значение по умолчанию `false`.
+ `isProgressBar: boolean` - определяет отображать или нет полосу прогресса. Значение по умолчанию `true`.
+ `isLabel: boolean` - определяет отображать или нет элемент над бегунком, содержащий значение слайдера. Значение по умолчанию `true`.
+ `isScale: boolean` - определяет отображать или нет шкалу слайдера. Значение по умолчанию `true`.
+ `callbacks: function[]` - массив функций которые вызываются при изменении модели. При вызове в функцию передается обект состояний слайдера.Значение поумолчанию `[]`
+ `isCollection: boolean` - если значение параметра ровняется `true`, то слайдер переходит в режим работы с коллекцией элементов, преданных через параметр `collection`.
+ `collection: number[] | string[] | HTMLElement[]` - массив значений между которыми переключается слайдер, в случе активации параметра `isCollection`.

## API

Для того, что-бы изменить параметры слайдера, не пересоздавая его, можно использовать метод changeParameter:

`changeParameter(parameter: string, value: number | boolean | number[] | string[] | HTMLElement[] | function[]): JQuery` - задает указанному в `parameter` параметру значение, переданное в параметре `value`.
  ```javascript
    const slider = $('.slider');
    slider.rangeSlider({ extremeValues: [250, 400] });
    slider.changeParameter('extremeValues', [200, 300]);
    // Параметр extremeValues будет равен [200, 300]
  ```

  Кроме стандартных значений параметров слайдера, метод может принимать следующие значения
+ `min` - изменяет минимальное значение слайдера.
  ```javascript
    const slider = $('.slider');
    slider.rangeSlider({ extremeValues: [250, 400] });
    slider.changeParameter('min', 300);
    // Параметр extremeValues будет равен [300, 400]
  ```
+ `max` - изменяет максимальное значение слайдера.
  ```javascript
    const slider = $('.slider');
    slider.rangeSlider({ extremeValues: [250, 400] });
    slider.changeParameter('max', 350);
    // Параметр extremeValues будет равен [250, 350]
  ```
+ `changeMin` - изменяет меньшее из текущих значений слайдера.
  ```javascript
    const slider = $('.slider');
    slider.rangeSlider({ currentValues: [30, 70], isInterval: true  });
    slider.changeParameter('currentMin', 50);
    // Параметр currentValues будет равен [50, 70]
  ```
+ `curentMax` - изменяет большее из текущих значений слайдера. Если параметер `isInterval = false`, метод не сработает.
  ```javascript
    const slider = $('.slider');
    slider.rangeSlider({ currentValues: [30, 70], isInterval: true  });
    slider.changeParameter('currentMax', 50);
    // Параметр currentValues будет равен [30, 50]
  ```


  ## npm команды

  + `npm run test:single` - запускает тесты unit тесты с модом `--single-run`.
  + `npm run test:watch` - запускает тесты unit тесты с модом `--browsers`.
  + `npm run dev` - собирает проект с модом `development`.
  + `npm run build` - собирает проект с модом `production` 
  + `npm run start` - собирает проект с модом `development` и запускает на локальном сервере.
  + `npm run lint` - запуск проверки проекта при помощи eslint.
  + `npm run lint-fix` - исправляет eslint ошибки которые можно исправить автоматически.
  + `npm run deploy` - собирает проект с модом `production` и публикует на gh-pages.


  ## Версии плагинов

  ```
    @babel/core: ^7.14.6,
    @babel/eslint-parser: ^7.14.7,
    @babel/eslint-plugin: ^7.14.5,
    @babel/plugin-proposal-class-properties: ^7.14.5,
    @babel/polyfill: ^7.12.1,
    @babel/preset-env": "^7.14.7,
    @babel/preset-typescript: ^7.14.5,
    @types/jquery: ^3.5.6,
    types/mocha: ^9.0.0,
    @typescript-eslint/eslint-plugin: ^4.28.4,
    @typescript-eslint/parser: ^4.28.4,
    autoprefixer: ^10.3.1,
    babel-eslint: ^10.1.0,
    babel-loader: ^8.2.2,
    babel-plugin-rewire: ^1.2.0,
    canvas: ^2.8.0,
    chai: ^4.3.4,
    chai-dom: ^1.9.0,
    clean-webpack-plugin: ^4.0.0-alpha.0,
    cross-env: ^7.0.3,
    css-loader: ^6.2.0,
    eslint: ^7.31.0,
    eslint-config-airbnb-typescript: ^12.3.1,
    eslint-loader: ^4.0.2,
    eslint-plugin-fsd: ^1.0.1,
    eslint-plugin-import: ^2.22.0,
    gh-pages: ^3.2.3,
    global-jsdom: ^8.1.0,
    html-loader: ^2.1.2,
    html-webpack-plugin: ^5.3.2,
    https-browserify: ^1.0.0,
    jasmine: ^3.8.0,
    jasmine-core: ^3.8.0,
    jsdom: ^16.6.0,
    karma: ^6.3.4,
    karma-chai: ^0.1.0,
    karma-coverage: ^2.0.3,
    karma-jasmine: ^4.0.1,
    karma-jsdom-launcher: ^9.0.0,
    karma-mocha: 2.0.1,
    karma-mocha-reporter: ^2.2.5,
    karma-phantomjs-launcher: ^1.0.4,
    karma-sourcemap-loader: ^0.3.8,
    karma-typescript: ^5.5.1,
    karma-webpack: ^5.0.0,
    mini-css-extract-plugin: ^2.1.0,
    minimatch: ^3.0.4,
    mocha: ^9.0.2,
    node-loader: ^2.0.0,
    optimize-css-assets-webpack-plugin: ^6.0.1,
    phantomjs-prebuilt: ^2.1.16,
    postcss-loader: ^6.1.1,
    pug: ^3.0.2,
    pug-loader: ^2.4.0,
    sass: ^1.35.2,
    sass-loader: ^12.1.0,
    script-ext-html-webpack-plugin: ^2.1.5,
    stream-http: ^3.2.0,
    terser-webpack-plugin: ^5.1.4,
    ts-loader: ^9.2.3,
    typescript: ^4.3.5,
    webpack: ^5.45.1,
    webpack-cli: ^4.7.2,
    webpack-dev-server: ^3.11.2,
    css-element-queries: ^1.2.3,
    jquery: ^3.6.0
  ```