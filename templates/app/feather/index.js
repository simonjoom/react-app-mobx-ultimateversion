'use strict';
const express = require('express')
const path = require('path')
const app = require('./app');
const port = app.get('port');

function logServerConfig(type = null) {
  const port = type === 'API' ? process.env['API_PORT'] : process.env['WEB_PORT'];
  const host = type === 'API' ? process.env['API_HOST'] : process.env['WEB_HOST'];

  const url = ['http://', host, ':', port].join('');

  if (type === 'API') {
    this.logger.info('------------------------------------------');
    this.logger.info('API Listening at:', url);
    this.logger.info('------------------------------------------');
    this.logger.info('Database Host:', process.env['DB_HOST']);
    this.logger.info('Database Name:', process.env['DB_NAME']);
    this.logger.info('Database Port:', process.env['DB_PORT']);
    this.logger.info('------------------------------------------');
  }

  if (type !== 'API') {
    this.logger.info('WEB Listening at:', url);
    this.logger.info('Environment:', process.env['NODE_ENV']);
    this.logger.info('------------------------------------------');
    this.logger.info('IO Host:', process.env['IO_HOST']);
    this.logger.info('IO Port:', process.env['IO_PORT']);
    this.logger.info('------------------------------------------');
  }
}
/*
var app2 = express()
console.log(path.resolve(__dirname,'../public'));
app2.use('/', express.static(path.resolve(__dirname,'../public')));


let server2 = app2.listen(process.env['WEB_PORT']);
server2.on('listening', () =>
console.log('start '+process.env['WEB_PORT'])
);

console.log(app.get('auth'));
let server = app.listen(process.env['API_PORT']);
server.on('listening',logServerConfig.bind(app,'API'))

*/

let server = app.listen(process.env['API_PORT']);
server.on('listening',logServerConfig.bind(app,'API'))
