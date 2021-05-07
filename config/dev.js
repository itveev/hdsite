import merge from 'webpack-merge';
import prodEnv from './prod';

export default merge(prodEnv, {
  NODE_ENV: '"development"',
});
