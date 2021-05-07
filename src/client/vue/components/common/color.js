/**
 * Created by fox on 26.06.17.
 */

import md5 from 'blueimp-md5';

const colors = [
  '#4555B4',
  '#4D6875',
  '#55B211',
  '#636363',
  '#6C48AA',
  '#8C6456',
  '#95CB58',
  '#A33BB4',
  '#C9D742',
  '#DF4679',
  '#E54946',
  '#EA3527',
  '#EAD72D',
  '#F4C021',
  '#F5A022',
  '#F67147',
];
export default {
  methods: {
    colorStyle(id) {
      // Because hash is too big number, we slice it,
      // 12 - experimental number
      const colorId = parseInt(md5(id).slice(0, 12), 16) % colors.length;
      return colors[colorId];
    },
  },
  computed: {},
};
