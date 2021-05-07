// This is the webpack config used for unit tests.

import utils from './utils';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';
import testEnv from '../config/test';

const webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': testEnv
    })
  ]
});

// no need for app entry during tests
delete webpackConfig.entry;

export default webpackConfig;
