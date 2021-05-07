/* eslint-disable no-param-reassign */

import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import config from '../config';

export default {
  assetsPath(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
  },
  cssLoaders(options) {
    options = options || {};

    const cssLoader = {
      loader: 'css-loader',
      options: {
        // minimize: process.env.NODE_ENV === 'production',
        sourceMap: options.sourceMap,
      },
    };
    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap,
      },
    };

    // generate loader string to be used with extract text plugin
    const generateLoaders = function genLdrs(loader, loaderOptions) {
      const loaders = [];
      // Extract CSS when that option is specified
      // (which is the case during production build)
      if (options.extract) {
        loaders.push(MiniCssExtractPlugin.loader);
      } else {
        loaders.push('vue-style-loader');
      }
      loaders.push(cssLoader);
      if (options.usePostCSS) {
        loaders.push(postcssLoader);
      }
      if (loader) {
        loaders.push({
          loader: `${loader}-loader`,
          options: {
            ...loaderOptions,
            sourceMap: options.sourceMap,
          },
        });
      }
      return loaders;
    };

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', { indentedSyntax: true }),
      scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      styl: generateLoaders('stylus'),
    };
  },
  // Generate loaders for standalone style files (outside of .vue)
  styleLoaders(options) {
    const output = [];
    const loaders = this.cssLoaders(options);
    Object.keys(loaders).forEach((extension) => {
      const loader = loaders[extension];
      output.push({
        test: new RegExp(`\\.${extension}$`),
        use: loader,
      });
    });
    return output;
  },
};
