import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
// import CompressionWebpackPlugin from 'compression-webpack-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer';
// import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import TerserJsPlugin from 'terser-webpack-plugin';
import utils from './utils';
import config from '../config';
import baseWebpackConfig from './webpack.base';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
import testEnv from '../config/test';

const env = process.env.NODE_ENV === 'testing'
  ? testEnv
  : config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: path.join(config.build.assetsRoot, config.build.assetsSubDirectory,
      config.build.buildDir),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.

    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: config.build.productionSourceMap
    //     ? { safe: true, map: { inline: false } }
    //     : { safe: true },
    // }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'spa.pug'
        : config.build.index,
      template: config.dev.indexSrc,
      filetype: 'pug',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.NamedChunksPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    // new HtmlWebpackPugPlugin(),

    // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*'],
    //   },
    // ]),
  ],
  optimization: {
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
    runtimeChunk: 'single',
    minimizer: [
      // new UglifyJsPlugin({
      new TerserJsPlugin({
        // uglifyOptions: {
        terserOptions: {
          compress: {
            warnings: false,
          },
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true,
      }),
    ],
  },
});

// if (config.build.productionGzip) {
//   webpackConfig.plugins.push(
//     new CompressionWebpackPlugin({
//       asset: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`),
//       threshold: 10240,
//       minRatio: 0.8,
//     })
//   );
// }

if (config.build.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = BundleAnalyzer;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

export default webpackConfig;
