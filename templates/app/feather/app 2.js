'use strict';

const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
//import cors from 'express-cors';
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
import authentication from 'feathers-authentication';

//const mp = require('mapbox');
var path = require("path");
const memoryService = require('feathers-memory')

//import auth from './auth';
import adapter from 'feathers-mongoose';
import { connector } from './connector';
import { setupServicesAutoload, initServicesAutoload } from './services';
require('dotenv').config();
setupServicesAutoload({
  dir: __dirname,
  adapter,
  connector,
});
const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

//app.set('views', path.join(__dirname, 'views'));
/*
const mycors=cors({credentials: true,allowedOrigins: [
        'http://localhost:8080', 'http://localhost:8000', 'http://localhost:3000', 'http://localhost:3001'
    ]})
*/
let allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
  var token = authentication.TokenService;
  var local = authentication.LocalService;
var oauth2 = authentication.OAuth2Service;
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const InstagramStrategy = require('passport-instagram').Strategy;
const InstagramTokenStrategy = require('passport-instagram-token');


var providerOptions = Object.assign({ provider: 'facebook',strategy:FacebookStrategy,tokenStrategy:FacebookTokenStrategy}, app.get('auth').facebook);
 var options = Object.assign({}, providerOptions);

app.use(compress())
    //.options('*', cors())
   // .use(cors())
//.use(allowCrossDomain)
   // .use(favicon(path.join(app.get('public'), 'favicon.ico')))

    .configure(rest())
    .configure(socketio())
    .configure(hooks())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
.configure(authentication({cookies: {enable:true}})).configure(token()).configure(local()).configure(oauth2(options))
 // .configure(auth)
  .configure(initServicesAutoload).use('/', serveStatic(app.get('public')))
    .configure(middleware);

app.on('login', function(data) {
  console.log('User logged in', data);
});

app.on('logout', function(data) {
  console.log('User logged out', data);
});

app.get('/hello', function(req, res) {
          console.log("/hello",
              '\n  req.feathers:', req.feathers,
              '\n  req.params:', req.params,
              '\n  req.user:', req.user)
          res.send(req.isAuthenticated() ? 'authenticated' : 'NOT authenticated')
        })



module.exports = app;



