
import express from 'express';
import { internal as urlId, external, extra } from '../../str/url';
import sid from '../../str/id';
import svcSite from '../svc/site';
import subdomain from '../../util/subdomain';

// Future optmization !!!
// const isRoute = function recursiveIsClientRouteExist(arr, path) {
//   return arr.some(route => route.path === path
//     || (route.children && isRoute(route.children, path)));
// };

const router = express.Router();
/* GET home page. */

router.get(urlId.index, (req, res) => {
  res.redirect('/');
});

router.get(urlId.defaultUrl, (req, res, next) => {
  // console.log(req.headers.host);
  const subdom = subdomain({
    str: req.headers.host,
    arr: [external.hostName, external.localHostName, external.prodHostName],
  });
  if (subdom) {
    next();
  } else {
    res.render('index', { urls: urlId, sid });
  }
});

router.post(extra.siteSvcReport, (req, res) => {
  res.json(svcSite.report(req.body));
});

router.get(urlId.user, (req, res) => {
  res.render('spa', { sid });
});

router.get(extra.notFound, (req, res) => {
  res.status(404);
  res.render('spa', { sid });
});

router.use((req, res, next) => {
  // if (isRoute(appRoutes, req.path)) {
  if (Object.values(urlId).includes(req.path)) {
    res.render('spa', { sid });
  } else {
    next();
  }
});

// ??? 404

module.exports = router;
