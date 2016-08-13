import compression from 'compression';
import cors from 'express-cors';
import feathers from 'feathers';
import path from 'path';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import { logServerConfig } from './logger';

import apiBeforeMiddleware from './middleware/api/before';
import apiAfterMiddleware from './middleware/api/after';

import auth from './auth';
import adapter from 'feathers-mongoose';
import { connector } from './connector';
import { setupServicesAutoload, initServicesAutoload } from './services';
//import { startApiServer as start } from '../utils/server.start';

require('dotenv').config();

setupServicesAutoload({
  dir: __dirname,
  adapter,
  connector,
});


const app = feathers().configure(configuration(path.join(__dirname,'/config'), 'feathers'));


app.use(cors({credentials: true,allowedOrigins: [
        'http://localhost:8080', 'http://localhost:8000', 'http://localhost:3000'
    ]}))

app
  .use(compression())
  .configure(apiBeforeMiddleware)
  .configure(hooks())
  .configure(rest())
  .configure(socketio((io) => io.set('origins', '*:*')))
  .configure(auth)
  .configure(initServicesAutoload)
  .configure(apiAfterMiddleware)
//  .configure(start);
console.log(app.get('auth'));
let server = app.listen(process.env['API_PORT']);
server.on('listening',() => logServerConfig('API'))

