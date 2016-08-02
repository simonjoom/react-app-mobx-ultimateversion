import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import myassets from './assets';
import Html from './core/Html';
import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import express from 'express';
import store from './core/store';
import router from './core/router';
import { getStyles } from 'simple-universal-style-loader'

let routes = require('./routes.json'); // Loaded with utils/routes-loader.js
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const data = {
    lang: 'en',
    title: 'un titre',
    description: 'ma description pour tout le site',
    script: myassets.main.js,
    scriptvendor:""
};

let mystyles,mystyleout;
const scriptvendor=(myassets.vendor)?myassets.vendor.js: false;
   if (scriptvendor)
    data.scriptvendor=scriptvendor;

if(mystyles=getStyles())
mystyleout=getStyles().map(style => (style.parts.map(part => `${part.css}\n`).join('\n')))
else
mystyleout=[];



const template=false;
   const appstate={};

let html, error = new Error('Not found');

function renderComponent(component) {
   /* if (setinjectTapEventPlugin) {
        appstate.ui.myinjectTapEventPlugin(); // material-ui fix
    }*/
const context = { ...data,
                    style: getStyles().map(style => (style.parts.map(part => `${part.css}\n`).join('\n'))),
                    setTitle: value => (data.title = value),
                    setMeta: (key, value) => (data[key] = value),
                    muiTheme: {}
                };

    const content = renderToString(
        <Provider store={store}>{component}</Provider>
    )
    html = content && `<!doctype html>\n${renderToStaticMarkup(
            React.createElement(template || Html, {
                /* start: default values */
                meta: [],
                ...context,
                store,
                //  ...actionResult,
                children: content,
            })
        )}`;
        if(component.props.error)
        error.status=404;
}
// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
function render(ctx) {
  return router.resolve(routes, ctx)
    .then(renderComponent)
    .catch(error => router.resolve(routes, { ...ctx, error }).then(renderComponent));
}

function initapp() {
  return async(req, res, next) => {
        let ctx;
try {
if ((/(\.ico|\.png|\.js|\.css|\.jpg|\.map|\.xml|\.txt)$/.test(req.path)) || (/auth.*/.test(req.path)) || (/socket.*/.test(req.path)) || (/__webpack_hmr.*/.test(req.path))) {
                console.log(req.path)
                await next()
            } else {
            error.status=200;
            ctx = {
                pathname: req.path,
                query: req.query,
               // hash: null,
               // history: useQueries(createMemoryHistory)(req.originalUrl),
               // ...context
                //...(context instanceof Function ? context(req) : context),
            };
   await render(ctx);
   if (html) {
   res.status(error.status).send(html);
   next();
  } else {
  console.log('nohtml')
  next(error);
  }
  }
  } catch (err) {
            console.log("erroe");
            await next(err);
        }
}
};

app.use(initapp())

app.listen(3000, () => {
    console.log(`The server is running at http://localhost:3000/`);
});
