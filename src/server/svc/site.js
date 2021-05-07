/**
 * Created by lucky on 14.03.16.
 */
import logger from '../../log/server';

export default {
  report(obj) {
    logger[obj.lvl](obj);
    return { status: 'success' };
  },
};
