'use strict';

// Depends
var path = require('path');
var webpack = require('webpack');

module.exports = function(_path) {
  var rootAssetPath = './src/assets';
  return {
    cache: true,
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules']
    },
    module: {
      preLoaders: [
        {
          test: /.spec\.js$/,
          include: /src/,
          exclude: /(bower_components|node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          }
        },
        {
          test: /\.js?$/,
          include: /src/,
          exclude: /(node_modules|__tests__)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          }
        },

        {
          test: /.spec\.ts$/,
          include: /src/,
          exclude: /(bower_components|node_modules)/,
          loader: 'ts-loader',
          
        },
        {
          test: /\.ts?$/,
          include: /src/,
          exclude: /(node_modules|__tests__)/,
          loader: 'ts-loader',
         
        },
      ],
      loaders: [
        // es6 loader
        {
          test: /\.js$/,
          include: path.join(_path, 'src'),
          loader: 'babel-loader',
          exclude: /(node_modules|__tests__)/,
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          },    
        },

        {
          test: /\.ts$/,
          loader: 'ts-loader',
          include: /src/,
          exclude: /node_modules/
        },

        // jade templates
        { test: /\.jade$/, loader: 'jade-loader' },

        // stylus loader
        { test: /\.styl$/, loader: 'style!css!stylus' },

        // external files loader
        {
          test: /\.(png|ico|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)$/i,
          loader: 'file',
          query: {
            context: rootAssetPath,
            name: '[path][hash].[name].[ext]'
          }
        }
      ],
    },
  };
};