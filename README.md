# react-app-ssr
forked react-app for ssr

Add fonctionalities

deploy react-app-ssr application:
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

SEO:
In routes i correctly send a 404 response from server to the client for google

I kept browser-sync and hot-middleware, but i use a proxy , i understood that the proxy is important for ssr

New npm:

* webpack-middleware was important to replace over webpack-dev-middleware who is not done for ssr

* add dotenv to control easily application port with a file .env

* simple-universal-style to push style in server -> important

* isomorphic-fetch for routes (code of core/router nothing change)

* did change in core/history for the server

* copy-webpack-plugin to push asset from a directory (else assets didn't found from memory)



