/**
 * Created by Leonid on 26/04/17.
 */
import 'babel-polyfill';
import { Server } from 'http';
import express from 'express';
import React from 'react';
import bodyParser from 'body-parser';
import ReactDOM from 'react-dom/server';
import Html from './Html';

const app = express();
const server = Server(app);
const { PORT: envPort, NODE_ENV: ENV } = process.env;
const PORT = envPort || 4123;
const publicPath = '/dist/public';
const isDevelopment = ENV === 'development';

app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(publicPath, express.static(publicPath.replace('/', '')));

if (isDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const compiler = webpack(webpackConfig);
  const io = require('socket.io')(server);
  const wdm = new webpackDevMiddleware(compiler, {
    publicPath,
    reporter: (reporterOptions) => {
      const state = reporterOptions.state;
      const stats = reporterOptions.stats;
      const options = reporterOptions.options;

      if (state) {
        let displayStats = (!options.quiet && options.stats !== false);
        if (displayStats && !(stats.hasErrors() || stats.hasWarnings()) &&
          options.noInfo) { displayStats = false; }
        if (displayStats) {
          options.log(stats.toString(options.stats));
        }
        if (!options.noInfo && !options.quiet) {
          let msg = 'Compiled successfully.';
          if (stats.hasErrors()) {
            msg = 'Failed to compile.';
          } else if (stats.hasWarnings()) {
            msg = 'Compiled with warnings.';
          }
          options.log(`webpack: ${msg}`);
        }
      } else {
        options.log('webpack: Compiling...');
      }
      if (state) {
        console.log('Rebuild bundle');
        io.emit('refresh');
      }
    },
  });

  app.use(wdm);

  io.on('connection', (socket) => {
    console.log('Socket connected');
  });

  wdm.onRebuildDone = (ts) => {
    console.log('Valid bundle', ts);
    io.emit('refresh');
  };
}

app.get('/*', (req, res) => {
  let css = `${publicPath}/style.css`;

  if (isDevelopment) {
    css = '';
  }
  res.send(`<!doctype html>\n${
    ReactDOM.renderToStaticMarkup(
      <Html
        jsBundle={`${publicPath}/bundle.js`}
        cssBundle={css}
      />,
    )
  }`);
  res.end();
});

server.listen(PORT, () => {
  console.log('Server Listening on %s...', PORT);
});
