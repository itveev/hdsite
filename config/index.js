// see http://vuejs-templates.github.io/webpack for documentation.
import path from 'path';
// import merge from 'webpack-merge';
import prodEnv from './prod';
import devEnv from './dev';

const srcExt = '.pug';
const buildExt = '.pug';
// Templates name
const view = {
  index: 'spa',
};

const dir = {
  // folder name for .js, .css, and otehr site files location
  assets: 'assets',
  // URL assets dir access public path
  // urlPublicPath: '/',
  src: 'src',
  server: 'server',
  build: 'build',
  view: 'views/spa',
  landing: 'views/landing',
  client: 'client',
};

// Function: (Template.name) => full_path/Template.name
const buildView = v => path.resolve(__dirname, '..', dir.src, dir.server, dir.build, v);
const srcView = v => path.resolve(__dirname, '..', dir.src, dir.server, dir.view, v);

const cmnObj = {
  appEntry: path.resolve(__dirname, '..', dir.src, dir.client, 'vue/main.js'),
  assetsRoot: path.resolve(__dirname, '..', dir.src, dir.client),
  assetsSubDirectory: dir.assets,
  assetsPublicPath: `/${dir.build}/`,
  buildDir: dir.build,
  landDir: dir.landing,
};

Object.keys(view).forEach((item) => {
  cmnObj[item] = buildView(`${view[item]}${buildExt}`);
  cmnObj[`${item}Src`] = srcView(`${view[item]}${srcExt}`);
});

const config = {
  build: {
    ...cmnObj,
    env: prodEnv,
    productionSourceMap: true,
    devtool: 'source-map',
    // devtool: '',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    ...cmnObj,
    env: devEnv,
    port: 3000,
    autoOpenBrowser: false,
    useEslint: true,
    errorOverlay: true,
    notifyOnErrors: true,
    showEslintErrorsInOverlay: false,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    cacheBusting: true,
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
  },
};

export default config;
