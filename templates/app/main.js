import ReactDOM from 'react-dom';
import router from './core/router';
import history from './core/history';
import App from './components/App';
import FastClick from 'fastclick';
import {readState, saveState} from 'history/lib/DOMStateStorage';
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'mobx-react';
import jsonStringifySafe from 'json-stringify-safe';
import {toJS} from 'mobx';
import $store from './store/stores'; // initialize stores

import {
  addEventListener,
  removeEventListener,
  windowScrollX,
  windowScrollY,
} from './core/DOMUtils';

//import 'whatwg-fetch';

let routes = require('./routes.json'); // Loaded with utils/routes-loader.js
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


let initialState = {
  app: { },
  ui: {
  theme: {mui: {}}
  }
  }


const store = $store.set(initialState);
window.__STORE=store;

function renderComponent(component) {
let setinjectTapEventPlugin=true;
 if (__DEV__) {
     console.log('React rendering. Stat:');
      if (window.location.search.includes('debugRender')) {
            const {whyDidYouUpdate} = require('why-did-you-update')
             whyDidYouUpdate(React)
      }
  }
    if (setinjectTapEventPlugin) {
        store.ui.myinjectTapEventPlugin(); // material-ui fix
        }
        ReactDOM.render(
        <Provider context={ context } appstate={ store }>
        <AppContainer>
        <App children={ component }/>
        </AppContainer>
         </Provider>, MOUNT_NODE, () => {
          //document.title = result.title || '';
            renderComplete(currentLocation.state)
        });
}


    // Make taps on links and buttons work fast on mobiles
    FastClick.attach(document.body);
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
    currentLocation = location;
if(/auth.*/.test(location.pathname)) {
// renderComponent(<login/>);
 }else{
 console.log('render')
// if (location.pathname !== currentLocation){
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, { ...location, error }).then(renderComponent));
  //  }
}
  // currentLocation = location.pathname;
}

function createApp(history) {

currentLocation = history.getCurrentLocation();

const removeHistoryListener = history.listen(render);
render(currentLocation);
//history.replace(currentLocation);

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

if ([   'complete',
        'loaded',
        'interactive'
    ].includes(document.readyState) && document.body) {
    createApp.bind(null, history)
} else {
    document.addEventListener('DOMContentLoaded', createApp.bind(null, history), false);
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme



// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes.json', () => {
    routes = require('./routes.json'); // eslint-disable-line global-require
    render(history.getCurrentLocation());
  });
}




