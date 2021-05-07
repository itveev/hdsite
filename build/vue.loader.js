import config from '../config';
// import merge from 'webpack-merge';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  cacheBusting: config.dev.cacheBusting,
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href',
  },
};
