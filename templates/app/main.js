import ReactDOM from 'react-dom';
import router from './core/router';
import history from './core/history';
import App from './components/App';
//import FastClick from 'fastclick';
import {readState, saveState} from 'history/lib/DOMStateStorage';
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'mobx-react';
import {MatchMediaProvider} from 'mobx-react-matchmedia';
import $store from './store/stores'; // initialize stores

import {
  addEventListener,
  removeEventListener,
  windowScrollX,
  windowScrollY,
} from './core/DOMUtils';


/*
import { app } from '~/temp/shared/app';
/socket use and working!
currentlocation={lat:0,lont:0};
app().io.on('connect',function(){
    // Send ehlo event right after connect:
    //app().io.emit('setlocation',currentlocation);
    app().io.emit('location','name',function(data){

    })
    */
let oldhost=window.location.hostname;
let routes;
window.__routesen__ =require("./routes.json");
window.__routesfr__ =require("./routes_fr.json");
window.__routesru__ =require("./routes_ru.json");
window.__routesuk__ =require("./routes_uk.json");
window.__routespt__ =require("./routes_pt.json");

function checkhostnamechange(oh){
let data=window.location.hostname;
oldhost=window.location.hostname;
if (data!=oh){
console.log('hostchanging')
 if (data==process.env['SITEFR']){
 routes = window.__routesfr__;
window.__lang__='fr';
window.dico=require('./dico_fr').default()
}else if (data==process.env['SITEPT']){
 routes =window.__routespt__;
 window.__lang__='pt';
window.dico=require('./dico_pt').default()
}else if (data==process.env['SITERU']){
 routes =window.__routesru__;
window.__lang__='ru';
window.dico=require('./dico_ru').default()
}else if (data==process.env['SITEUK']){
 routes =window.__routesuk__;
window.__lang__='uk';
window.dico=require('./dico_ru').default()
}else{
 routes =window.__routesen__;
window.__lang__='en';
window.dico=require('./dico_en').default()
}
 console.log(routes)
 window.__routes__=routes;

}
}

checkhostnamechange('');

const MOUNT_NODE = document.getElementById('root');

let currentLocation;
const context = {
    muiTheme: {},
    setTitle: value => (document.title = value),
    setMeta: (name, content) => {
        // Remove and create a new <meta /> tag in order to make it work
        // with bookmarks in Safari
        const elements = document.getElementsByTagName('meta');
        Array.from(elements).forEach((element) => {
            if (element.getAttribute('name') === name) {
                element.parentNode.removeChild(element);
            }
        })
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document
            .getElementsByTagName('head')[0]
            .appendChild(meta);
    }
};

let initialState = {
  app: { },
  ui: {
  theme: {mui: {}}
  }
  }


const store = $store.set(initialState);
window.__STORE=store;


function restoreScrollPosition(state) {
    if (state && state.scrollY !== undefined) {
        window.scrollTo(state.scrollX, state.scrollY);
    } else {
        window.scrollTo(0, 0);
    }
}


let renderComplete = (s) => {
        restoreScrollPosition(s);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (window.ga) {
            window.ga('send', 'pageview');
        }
    };


function renderComponent(component) {

 if (process.env['__DEV__']) {
     console.log('React rendering. Stat:');
      if (window.location.search.includes('debugRender')) {
            const {whyDidYouUpdate} = require('why-did-you-update')
             whyDidYouUpdate(React)
      }
  }

        const breakpoints=store.ui.breakpoints;
        ReactDOM.render(
        <Provider context={ context } appstate={ store }>
        <AppContainer>
         <MatchMediaProvider breakpoints={breakpoints}>
            <App children={ component } breakpoints={breakpoints}/>
         </MatchMediaProvider>
        </AppContainer>
         </Provider>, MOUNT_NODE, () => {
          //document.title = result.title || '';
            renderComplete(currentLocation.state)
        });
}


    // Make taps on links and buttons work fast on mobiles
  //  FastClick.attach(document.body);
// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
function render(location) {

    if (currentLocation.key) {
      saveState(currentLocation.key, {
        ...readState(currentLocation.key),
        scrollX: windowScrollX(),
        scrollY: windowScrollY(),
      });
    }
   // currentLocation = location;
if(/auth.*/.test(location.pathname)) {
// renderComponent(<login/>);
 }else{
 console.log(oldhost);
 //checkhostnamechange(oldhost);
 console.log(currentLocation)
 console.log(location.pathname)
 if (location.pathname !== currentLocation.pathname){
 console.log('render')
 currentLocation = location;
  router.resolve(window.__routes__, location)
    .then(renderComponent)
    .catch(error => {console.log(error);router.resolve(routes, { ...location, error }).then(renderComponent)});
    }
 }
  // currentLocation = location.pathname;
}

function createApp(history) {
currentLocation = history.getCurrentLocation();
 currentLocation.pathname='init';
   let setinjectTapEventPlugin=true;
    if (setinjectTapEventPlugin) {
        store.ui.myinjectTapEventPlugin(); // material-ui fix
        }
const removeHistoryListener = history.listen(render);
history.replace(history.getCurrentLocation());

 let originalScrollRestoration;
    if (window.history && 'scrollRestoration' in window.history) {
        originalScrollRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
    }


    // Prevent listeners collisions during history navigation
    addEventListener(window, 'pagehide', function onPageHide() {
        removeEventListener(window, 'pagehide', onPageHide);
        removeHistoryListener();
        if (originalScrollRestoration) {
            window.history.scrollRestoration = originalScrollRestoration;
            originalScrollRestoration = undefined;
        }
    });
}
/*
if ([   'complete',
        'loaded',
        'interactive'
    ].includes(document.readyState) && document.body) {
    createApp.bind(null, history)
} else {
    document.addEventListener('DOMContentLoaded', createApp.bind(null, history), false);
}*/

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme


createApp(history)

/*currentLocation = history.getCurrentLocation();
    render(history.getCurrentLocation());
  //routes =require("./routes.json");
   });
});*/

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes.json', () => {
    routes = require('./routes.json'); // eslint-disable-line global-require
    render(history.getCurrentLocation());
  });
  module.hot.accept('./routes_fr.json', () => {
    routes = require('./routes_fr.json'); // eslint-disable-line global-require
    render(history.getCurrentLocation());
  });
  module.hot.accept('./routes_uk.json', () => {
    routes = require('./routes_uk.json'); // eslint-disable-line global-require
    render(history.getCurrentLocation());
  });
  module.hot.accept('./routes_ru.json', () => {
    routes = require('./routes_ru.json'); // eslint-disable-line global-require
    render(history.getCurrentLocation());
  });
    module.hot.accept('./routes_pt.json', () => {
    routes = require('./routes_pt.json'); // eslint-disable-line global-require
    render(history.getCurrentLocation());
  });
}
