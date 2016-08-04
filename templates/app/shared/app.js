import feathers from 'feathers/client';
import feathersHooks from 'feathers-hooks';
import io from 'socket.io-client';
import feathersSocketClient from 'feathers-socketio/client';
import feathersAuth from 'feathers-authentication/client';

let instance = false;
const storage = (process.env.BROWSER) ? window.localStorage : null;

console.log(`http://${process.env.API_HOST}:${process.env.API_PORT}`);
const uri = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

export function app() {
  if (instance) return instance;

  instance = feathers()
    .configure(feathersHooks())
    .configure(feathersSocketClient(io(uri)))
    .configure(feathersAuth({ storage,
      tokenKey: 'token',
      cookie: 'token'
    }));

  return instance;
}

export function service(name) {
  return app().service(name);
}
