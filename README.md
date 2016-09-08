# Ultimate boilerplate react-app-mobx with mutilanguage/multidomain support

This boilerplate created in order to help developper to create multi-language react website with material-ui support.  
We did a version fully working with server side rendering but not maintained anymore, because we decided to start from single page application instead, will be easier to maintain!  
We use https://prerender.io/ to prerender and cache our we-site for google SEO   

**NEW Hot!!! USE WEBPACK chunk**   
           
           The boilerplate use code-splitting of webpack depending language and routes of users
           Done: Refactoring of routes naming convention never one style is named like his own .js


[![Dependency Status](https://david-dm.org/simonjoom/react-app-mobx-ultimateversion.svg?style=flat-square)](https://david-dm.org/simonjoom/react-app-mobx-ultimateversion)
[![devDependency Status](https://david-dm.org/simonjoom/react-app-mobx-ultimateversion/dev-status.svg?style=flat-square)](https://david-dm.org/simonjoom/react-app-mobx-ultimateversion#info=devDependencies)

We can hire developper using MOBX-NGINX TECHNOLOGIE
---------------------------------------------------

## About This boilerplate
This is a starter boilerplate app   
We together using the following technologies:   
**fontawesome + mobx + material-ui + bootstrap** + https://github.com/kriasoft/react-app

* Both client and server make calls to load data from separate API server
* [React](https://github.com/facebook/react)
* [ProxyPass with nginx](http://nginx.org/en/docs/http/ngx_http_proxy_module.html) Nginx manage javascript-cors and help us to develop under http://www.mysite.com (port 80)
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack code splitting](https://webpack.github.io/docs/code-splitting.html) Code splitted depending language and routes with require.ensure  
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [mobx](https://mobxjs.github.io/mobx/best/devtools.html) Better than redux in my opinion to maintain code  
* [mobx Dev Tools](https://github.com/mobxjs/mobx-react-devtools) for next generation DX (developer experience). 
* [ESLint](http://eslint.org) to maintain a consistent code style 
* [mobx-ajv-form](https://github.com/erikras/lru-memoize) best form validation AJV 
* [style-loader](https://github.com/webpack/style-loader), and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,
* [bootstrap v3](http://getbootstrap.com/) bootstrap + jquery CDN loaded async with https://www.npmjs.com/package/async-js
 

I cobbled this together from a wide variety of similar "starter" repositories.  
As I post this in June 2016, all of these libraries are right at the bleeding edge of web development.   
They may fall out of fashion as quickly as they have come into it, but I personally believe that this stack is the future of web development and will survive for several years.

I'm building my new projects with this, and I recommend that you do, too.


# react-app for developpement use
 

Recent change, added frontside effect (to use bootstrap popover+modal...)

see code head section in index.ejs  
**The global var window.\_q** used to check when bootstrap+jquery loading is done  

> Link and Linkmaterial support Safari now  
> Router support russian url character (url_decode)  
> Multi-language support with flags languages selection  

 -> Recent Added: 

        Updated new mobx + ajv-form version 
            "mobx": "^2.5.0",
            "mobx-ajv-form": "^1.8.0",
        
        eslint + jsx-control-statements lint support for better tracking bug code    
           
        Promise bluebird by default with help of babel-plugin-transform-promise-to-bluebird
        
        Link and Linkmaterial check route for current language and displaying in console for route problem 
        Linkmaterial support auth bouton now 


1 - install nginx for mac-os

see:
https://coderwall.com/p/dgwwuq/installing-nginx-in-mac-os-x-maverick-with-homebrew


2 - Install app 


IN root folder of react-app

a) npm install (install babel dependencies)  

b) npm run new (this install and deps of MY application in ./temp)      
normally i checked all dependencies 
### IMPORTANT before to run:

>* delete the feathers-authentication installed in ./temp/node_modules/  
and replace by mine (i did some little hack to make the new work with my config)  
> Do unzip ./temp/feathers-authentication.zip to ./temp/node_modules/  

>* I added ukrainien flag in material-ui-country-flags  
> Do unzip ./temp/material-ui-country-flags.zip to ./temp/node_modules/  

>* Little mod to support Object.entries in mobx-react-matchmedia and update mobx v2.5:  
> Do unzip ./temp/mobx-react-matchmedia.zip to ./temp/node_modules/

>* Manual things be sure to remove:
     
        ./temp/node_module/mobx-ajv-form/node_module/mobx   
        ./temp/node_module/mobx-ajv-form/node_module/ajv 
        
     node_module folders are created improperly by  mobx-ajv-form  due to the new mobx version


b) install my config with nginx for proxying all listening mysite.com:80 to localhost  
Our config manage cors, it's friendly Cross-domain  
We installed 4 language: french, ukrainien, russian, english (you can modify it for your need)   

Change respectivly in generic 'mysite' to your domain   
Generic-conf work for url as   

* fr.mysite.com (for french)  
* ru.mysite.com (for russian)  
* www.mysite.eu (for english)  


IN react-app run:

sudo cp -f ./temp/domain-conf-nginx/generic_conf/nginx.conf /usr/local/etc/nginx/nginx.conf  
sudo cp -f ./temp/domain-conf-nginx/generic__conf/hosts /etc/hosts  
sudo cp -f ./temp/domain-conf-nginx/generic__conf/.env ./temp/.env  

So We link all my server to localhost  

to check the port running it's in config file .env in ./temp


### Run APP:

First run nginx simply:  
sudo nginx (in super user because we listen 80)  

* IMPORTANT FIRST 
Run server for feathers (watch mode with debug mode authentication)  
from ./temp  
run:  
DEBUG=feathers-authentication:* node bin/server.js  

* Finally Run Application in other console: 

from root (parent of temp folder)  
npm start  

You re done ! (no need install after new the scalfolding react-app will do for you).

see webpack.config.js for my configuration

CSS should be done with [basscss](http://www.basscss.com)  
I applyed some bootstrap css only because i use popover of it.   
But i prefer basscss it's much simpler  

* add dotenv to control easily application port with a file .env

* cssnano just to optimize css output 

* fontawesome

* copy-webpack-plugin to push asset from a directory (else assets didn't found from memory)

If you have some dependances problem to run it please say me 
on skype simonzkyp or simon@skiscool.com





For server-side rendering see code of:   
Important no more maintained so it's not work but the code and implementation are still readable...   

# react-app/ssr
Old not work with last configuration

forked react-app for ssr
see webpackssr.config.js for configuration

Add fonctionnalities

deploy react-app-ssr application: (this work is temporary stopped but should work)
npm run newssr
npm run startssr


Comment developping:

You can add others template

Just need to set a environnement variable with the name of the template (for me ssr)
The name of template folder have to begin by 'app-' 

Name relation:
ex folder /templates/app-mytemplate

 in script "newssr": "template=mytemplate  node ./app/bin/react-app new --test-sdk", in package.json

 webpack.config.js become webpackmytemplate.config.js


I added 
-> 1 webpackconfig for ssr
-> select template in scripts

I removed index.html (it's generated by server.js)

I kept browser-sync and hot-middleware, but i use a proxy

New npm:

* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server

* webpack-middleware was important to replace over webpack-dev-middleware who is not done for ssr

* add dotenv to control easily application port with a file .env

* cssnano just to optimize css output

* simple-universal-style to push style in server -> important

* isomorphic-fetch for routes (code of core/router nothing change)

* did change in core/history for the server

* copy-webpack-plugin to push asset from a directory (else assets didn't found from memory)

