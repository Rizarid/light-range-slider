var webpackConfig = require('./webpack.config.js');

module.exports=function(config) {
config.set({
    port: "4200",
    // конфигурация репортов о покрытии кода тестами
    coverageReporter: {
      dir:'tmp/coverage/',
      reporters: [
        { type:'html', subdir: 'report-html' },
        { type:'lcov', subdir: 'report-lcov' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact:true }
      }
    },
    // spec файлы, условимся называть по маске **_*.spec.js_**
    files: [
        'src/**/*.spec.js',
        'src/**/*.spec.ts',
    ],
    frameworks: [ 'chai', 'jasmine' , "karma-typescript"],
    // репортеры необходимы для  наглядного отображения результатов
    reporters: ['mocha', 'coverage'],
    preprocessors: {
        'src/**/*.spec.js': ['webpack', 'sourcemap'],
        'src/**/*.spec.ts': ['webpack', 'sourcemap']
    },
    plugins: [
        'karma-jasmine', 'karma-mocha',
        'karma-chai', 'karma-coverage',
        'karma-webpack', 'karma-phantomjs-launcher',
        'karma-mocha-reporter', 'karma-sourcemap-loader',
        "karma-typescript"
    ],
    // передаем конфигурацию webpack
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      mode: webpackConfig.mode,
      devtool: 'inline-source-map',
    },
    webpackMiddleware: {
      noInfo:true
    }
  });
};