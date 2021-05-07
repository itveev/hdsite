import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
import utils from './utils';
import config from '../config';
import baseWebpackConfig from './webpack.base';

// const extractDocs = new ExtractTextPlugin({
//     filename: 'docs.md',
//   });
// import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(name => {
//  baseWebpackConfig.entry[name] = ['./src/client/dev.js'].concat(baseWebpackConfig.entry[name])
// });

export default merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: true,
      usePostCSS: true,
    }),
    // rules: merge(utils.styleLoaders({
    //  sourceMap: config.dev.cssSourceMap,
    //  extract: true
    // }),[{
    //  test: /\.vue$/,
    //  loader: 'vue-loader',
    //  options: {
    //    loaders:{
    //      docs: extractDocs.extract({
    //        use: 'raw-loader'
    //      })
    //    }
    //  }
    // }])
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  // devtool: 'source-map',
  output: {
    path: path.join(config.dev.assetsRoot, config.dev.assetsSubDirectory,
      config.dev.buildDir),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: config.dev.indexSrc,
      filename: config.dev.index,
      filetype: 'pug',
      inject: true,
    }),
    // new HtmlWebpackPugPlugin(),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
});
