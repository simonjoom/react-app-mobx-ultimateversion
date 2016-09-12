/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import ReactDOM from 'react-dom';
import { readState, saveState } from 'history/lib/DOMStateStorage';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { MatchMediaProvider } from 'mobx-react-matchmedia';
import {
  addEventListener,
  removeEventListener,
  windowScrollX,
  windowScrollY,
} from './core/DOMUtils';
import router from './core/router';
import history from './core/history';
//import App from './components/App';
// import FastClick from 'fastclick';
import $store from './store/stores'; // initialize stores
import dicoarray_func from './get-dico_chunk';
let setinjectTapEventPlugin;

window.__routesen__ = require('./routes.json');
window.__routesfr__ = require('./routes_fr.json');
window.__routesru__ = require('./routes_ru.json');
window.__routesuk__ = require('./routes_uk.json');
window.__routespt__ = require('./routes_pt.json');

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
let oldhost = window.location.hostname;
let routes;

function checkhostnamechange(oh) {
  const data = window.location.hostname;
  oldhost = window.location.hostname;
  if (data !== oh) {
    console.log('hostchanging');
    if (data === process.env.SITEFR) {
      routes = window.__routesfr__;
      window.__lang__ = 'fr';
    } else if (data === process.env.SITEPT) {
      routes = window.__routespt__;
      window.__lang__ = 'pt';
    } else if (data === process.env.SITERU) {
      routes = window.__routesru__;
      window.__lang__ = 'ru';
    } else if (data === process.env.SITEUK) {
      routes = window.__routesuk__;
      window.__lang__ = 'uk';
    } else {
      routes = window.__routesen__;
      window.__lang__ = 'en';
    }
    window.__routes__ = routes;
  }
}

checkhostnamechange('');

const MOUNT_NODE = document.getElementById('root');

let currentLocation, currentLang;
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
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document
      .getElementsByTagName('head')[0]
      .appendChild(meta);
  },
};

const initialState = {
  app: {},
  ui: { theme: { mui: {} } }
};


const store = $store.set(initialState);
window.__STORE = store;


function restoreScrollPosition(state) {
  if (state && state.scrollY !== undefined) {
    window.scrollTo(state.scrollX, state.scrollY);
  } else {
    window.scrollTo(0, 0);
  }
}


const renderComplete = (s) => {
  restoreScrollPosition(s);

  // Google Analytics tracking. Don't send 'pageview' event after
  // the initial rendering, as it was already sent
  if (window.ga) {
    window.ga('send', 'pageview');
  }
};


function renderComponent(component) {
  if (process.env.__DEV__) {
    console.log('React rendering. Stat:');
    if (window.location.search.includes('debugRender')) {
      const { whyDidYouUpdate } = require('why-did-you-update');

      whyDidYouUpdate(React);
    }
  }

  const breakpoints = store.ui.breakpoints;
  ReactDOM.render(
    <Provider context={context} appstate={store}>
      <AppContainer>
        <MatchMediaProvider breakpoints={breakpoints} children={component}/>
      </AppContainer>
    </Provider>, MOUNT_NODE, () => {
      // document.title = result.title || '';
      renderComplete(currentLocation.state);
    });
}


function resolveroute(routes, location, force) {
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => {
      console.log(error);
      router.resolve(routes, { ...location, error }).then(renderComponent);
    });
}

// Make taps on links and buttons work fast on mobiles
//  FastClick.attach(document.body);
// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
function render(location, force) {
  if (currentLocation.key) {
    saveState(currentLocation.key, {
      ...readState(currentLocation.key),
      scrollX: windowScrollX(),
      scrollY: windowScrollY(),
    });
  }
  // currentLocation = location;
  if (/auth.*/.test(location.pathname)) {
// renderComponent(<login/>);
  } else {
    console.log(oldhost);
    // checkhostnamechange(oldhost);
    console.log(currentLocation);
    console.log(location.pathname);
    if (force || (location.pathname !== currentLocation.pathname)) {
      console.log('render');
      currentLocation = location;

      if (force || (currentLang !== window.__lang__)) {
        dicoarray_func[window.__lang__]().then(([dico,dico1]) => {
          global.dico = Object.assign({}, dico, dico1);
          resolveroute(window.__routes__, location, force);
        });
        currentLang = window.__lang__;
      }
      else {
        resolveroute(window.__routes__, location, force);
      }
    }
  }
  // currentLocation = location.pathname;
}

function createApp(hist) {
  currentLocation = hist.getCurrentLocation();
  currentLocation.pathname = 'init';
  setinjectTapEventPlugin = true;
  if (setinjectTapEventPlugin) {
    store.ui.myinjectTapEventPlugin(); // material-ui fix
    setinjectTapEventPlugin = false;
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

createApp(history);

/* currentLocation = history.getCurrentLocation();
 render(history.getCurrentLocation());
 //routes =require("./routes.json");
 });
 });*/

// Enable Hot Module Replacement (HMR)
if (module.hot) {

  module.hot.accept('./components/App/App.js', () => {
    let App = require('./components/App/App.js').default; // eslint-disable-line global-require

    render(history.getCurrentLocation(), true);
  });

  module.hot.accept('./routes.json', () => {
    routes = require('./routes.json'); // eslint-disable-line global-require

    render(history.getCurrentLocation(), true);
  });
  module.hot.accept('./routes_fr.json', () => {
    routes = require('./routes_fr.json'); // eslint-disable-line global-require

    render(history.getCurrentLocation(), true);
  });
  module.hot.accept('./routes_uk.json', () => {
    routes = require('./routes_uk.json'); // eslint-disable-line global-require

    render(history.getCurrentLocation(), true);
  });
  module.hot.accept('./routes_ru.json', () => {
    routes = require('./routes_ru.json'); // eslint-disable-line global-require

    render(history.getCurrentLocation(), true);
  });
  module.hot.accept('./routes_pt.json', () => {
    routes = require('./routes_pt.json'); // eslint-disable-line global-require

    render(history.getCurrentLocation(), true);
  });

}
