/**
 * obj: {
 *  str: 'string'
 *  arr: [array,of,defined,values]
 * }
 */
export default (obj) => {
  if (!obj || !obj.str || !obj.arr) {
    throw new Error('Incorrect subdomain args');
  }
  let subdomain = null;
  obj.arr.some((item) => {
    obj.str.replace(
      new RegExp(`^(.+)\\.${item}(:\\d*)?$`, 'i'),
      (subStr, domain) => {
        subdomain = domain;
      },
    );
    return !!subdomain;
  });
  return subdomain;
};
