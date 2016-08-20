import feathers from 'feathers/client';
const io = require('socket.io-client');
const socketio = require('feathers-socketio/client');
//const localstorage = require('localstorage-memory');
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication/client';
import rest from 'feathers-rest/client';

let instance = false;
const storage = (process.env.BROWSER) ? window.localStorage : null;

//console.log(`http://${process.env.API_HOST}:${process.env.API_PORT}`);
const uri = `http://${process.env.API_HOST}:${process.env.API_PORT}`;


const host = 'http://localhost:3000';
const socket = io(host);

export function app() {
  if (instance) return instance;
console.log('runapp');
  instance = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({storage:storage,cookies: {enable:true}}))
  // .configure(rest('http://fr.skiscool.com').fetch(fetch))


     //.superagent(superagent))
    /* .configure(feathersAuth({ storage,{cookies: {enable:true}}
      tokenKey: 'token',
      cookie: 'token'
    }))*/


  return instance;
}

export function service(name) {
  return app().service(name);
}
