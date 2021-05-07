import rm from 'rimraf';
import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../config';
import webpackProdConfig from './webpack.prod';
import webpackDevConfig from './webpack.dev';
import checkVer from './check.versions';

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = 'development';
}
checkVer();

let wpConfig = webpackDevConfig;
let root = path.join(config.dev.assetsRoot, config.dev.assetsSubDirectory);
let subDir = config.dev.buildDir;

if (process.env.NODE_ENV === 'production') {
  wpConfig = webpackProdConfig;
  // root = config.build.assetsRoot;
  root = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
  subDir = config.build.buildDir;
}

const spinner = ora(`building for ${process.env.NODE_ENV}...`);
spinner.start();

rm(path.join(root, subDir), (e) => {
  if (e) throw e;
  webpack(wpConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(`${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })}\n\n`);

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
    } else {
      console.log(chalk.cyan('  Build complete.\n'));
    }
  });
});
