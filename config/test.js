import merge from 'webpack-merge';
import devEnv from './dev';

export default merge(devEnv, {
  NODE_ENV: '"testing"',
});
