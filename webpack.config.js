const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      },  
    },
  ]

  if (isDev) loaders.push({loader: "eslint-loader"});

  return loaders
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all" 
  }
  }

  if(isProd){
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}


module.exports = {
  mode: "development",
  entry: {
    "lite-range-slider": ["@babel/polyfill", "./src/lite-range-slider/lite-range-slider.ts"],
    demo: ["@babel/polyfill", "./src/demo/demo.ts"]
  },
    
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.ts', '.js', ".json"],
    alias: {
      app: path.join(__dirname, 'app')
    }
  },

  optimization: optimization(),
  devtool: isDev ? "source-map" : "eval" ,

  plugins: [
    autoprefixer,
    new HTMLWebpackPlugin({
      template: 'src/demo/demo.pug',
      inject: 'body',
      chunks: ['demo', 'lite-range-slider'],
      minify: {
          collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript"
            ],
            plugins: ["@babel/plugin-proposal-class-properties"]
          },
          
        }
      },

      {
        test: /\.node$/,
        use: ['node-loader']
      },
    ]
  },

  devServer: {
    port: 4200
  },

  externals: {
    jquery: 'jQuery'
  }
}