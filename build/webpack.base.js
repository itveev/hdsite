import path from 'path';
import friendlyFormatter from 'eslint-friendly-formatter';
import { VueLoaderPlugin } from 'vue-loader';
import utils from './utils';
import config from '../config';
import vueLoaderConfig from './vue.loader';

const resolve = function resJoin(dir) {
  return path.join(__dirname, '..', dir);
};

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: friendlyFormatter,
    emitWarning: !config.dev.showEslintErrorsInOverlay,
  },
});

export default {
  entry: {
    app: config.dev.appEntry,
    // err: ./src/client/vue/err.js ??
  },
  output: {
    // filename: path.join(config.dev.buildDir, '[name].bundle.js'),
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.styl'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        // loader: '@kazupon/vue-i18n-loader',
        use: ['@kazupon/vue-i18n-loader', 'yaml-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader'],
            // use: 'pug-loader',
          },
        ],
        include: [resolve('src'), resolve('test')],
      },
      // {
      //   test: /\.pug$/,
      //   loader: 'pug-loader',
      //   include: [resolve('src'), resolve('test')],
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
