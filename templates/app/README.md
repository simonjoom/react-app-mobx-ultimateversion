This thread call react-app-ssr; i did a version fully working with server side rendering,  
But we decided to start from single page application instead, will be easier to maintain!  
So see the first "react-app"  

# react-app for developpement use

forked react-app  with **fontawesome + mobx + material-ui** + https://github.com/kriasoft/react-app

Recent change, added frontside effect (to use bootstrap popover+modal...)

>bootstrap + jquery CDN loaded async with https://www.npmjs.com/package/async-js  
see code head section in index.ejs  
**The global var window.\_q** used to check when loading is done  

> Link and Linkmaterial support Safari now  
> Router support russian url character (url_decode)  
> Multi-language support with flags languages selection  

 -> Recent Added: 

        Updated new mobx version 
        
        eslint + jsx-control-statements lint support for better tracking bug code    
           
        Promise bluebird by default with help of babel-plugin-transform-promise-to-bluebird
        
        Link and Linkmaterial check route for current language and displaying in console for route problem


1 - install nginx for mac-os

see:
https://coderwall.com/p/dgwwuq/installing-nginx-in-mac-os-x-maverick-with-homebrew


2 - Install app 


IN root folder of react-app

a) npm install (install babel dependencies)

b) npm run new (this install and deps of MY application in ./temp)

normally i checked all dependencies

b) install my config with nginx for proxying all listening skiscool.com:80 to localhost

i installed 4 language: french, ukrainien, russian, english (you can modify it for your need)

Generic-conf work for url like 

* fr.skiscool.com (for french)
* ru.skiscool.com (for russian)
* www.skiscool.eu (for english)


IN react-app run:

sudo cp -f ./temp/domain-conf-nginx/skiscool_conf/nginx.conf /usr/local/etc/nginx/nginx.conf  
sudo cp -f ./temp/domain-conf-nginx/skiscool_conf/hosts /etc/hosts  
sudo cp -f ./temp/domain-conf-nginx/skiscool_conf/.env ./temp/.env  

like that we link all my server to localhost 

to check the port running it's in config file .env in ./temp


### IMPORTANT before to run:

>* delete the feathers-authentication installed in ./temp/node_modules/  
and replace by mine (i did some little hack to make the new work with my config)  
> Do unzip ./temp/feathers-authentication.zip to ./temp/node_modules/  

>* I added ukrainien flag in material-ui-country-flags  
> Do unzip ./temp/material-ui-country-flags.zip to ./temp/node_modules/  

>* Little mod to support Object.entries in mobx-react-matchmedia:  
> Do unzip ./temp/mobx-react-matchmedia.zip to ./temp/node_modules/


### Run APP:

First run nginx simply:  
sudo nginx (in super user because we listen 80)  

* Run server for feathers (watch mode with debug mode authentication)  
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
