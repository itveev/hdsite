import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import stylus from 'stylus';
import routes from './routes/index';
// import users from './routes/users';

import config from '../../config';

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, config.dev.buildDir),
  path.join(__dirname, config.dev.landDir)]);
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
// app.use('/users', users);

// Landing
const landPath = path.join(__dirname, config.dev.landDir);
app.use(express.static(landPath));
app.use(stylus.middleware(landPath));

// SPA
const buildSpaPath = path.join(config.dev.assetsRoot,
  config.dev.assetsSubDirectory); // , config.dev.buildDir);
app.use(express.static(buildSpaPath));
// app.use(express.static(path.join(buildSpaPath, '..')));
// app.use(stylus.middleware(buildSpaPath));

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// const proxyTable = config.dev.proxyTable;
// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   let options = proxyTable[context];
//   if (typeof options === 'string') {
//     options = { target: options };
//   }
//   app.use(proxyMiddleware(options.filter || context, options));
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('spa', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('spa', {
    message: err.message,
    error: {},
  });
});

export default app;
