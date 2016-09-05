/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import React, { PropTypes } from 'react';
import IconButton from 'material-ui/FlatButton';
import {
  Icon_Flag_FR,
  Icon_Flag_RU,
  Icon_Flag_US,
  Icon_Flag_UK,
  Icon_Flag_BR,
} from 'material-ui-country-flags';
import _ from 'lodash';
import history from '../../core/history';

const findRouteThenDebug = (component, routes, lang) => {
  const tmp = routes.find(x => (x.component ? x.component === component : null));
  if (tmp && tmp.path) {
    return tmp.path;
  }
  console.log(`link fail_:${lang}`);
  console.log(component);
  return '/';
};

const findComponentThenDebug = (path, routes) => {
  path = decodeURI(path);
  const tmp = routes.find(x => (x.path ? x.path === path : null));
  if (tmp && tmp.component) {
    return tmp.component;
  }
  console.log('link path_fail_:');
  console.log(path);
  return './routes/Skiscool';
};

const SelFlag = ({ FL, component }) => {
  let path;
  let alt = '';
  let title = '';
  let flagComponent = null;
  if (FL === 'FR') {
    path = findRouteThenDebug(component, window.__routesfr__, 'fr');
    alt = 'French (FR)';
    title = 'French (FR)';
    flagComponent = <Icon_Flag_FR />;
  } else if (FL === 'RU') {
    path = findRouteThenDebug(component, window.__routesru__, 'ru');
    alt = 'Russe (RU)';
    title = 'Russe (RU)';
    flagComponent = <Icon_Flag_RU />;
  } else if (FL === 'PT') {
    path = findRouteThenDebug(component, window.__routespt__, 'pt');
    alt = 'Portugais (PT)';
    title = 'Portugais (PT)';
    flagComponent = <Icon_Flag_BR />;
  } else if (FL === 'UK') {
    path = findRouteThenDebug(component, window.__routesuk__, 'uk');
    alt = 'Ukrainien (UK)';
    title = 'Ukrainien (UK)';
    flagComponent = <Icon_Flag_UK />;
  } else {
    path = findRouteThenDebug(component, window.__routesen__, 'en');
    alt = 'English (UK)';
    title = 'English (UK)';
    flagComponent = <Icon_Flag_US />;
  }

  const iconURL = `http://${process.env[`SITE${FL}`]}${history.createHref(path)}`;
  return (
    <IconButton href={iconURL} alt={alt} title={title}>
      {flagComponent}
    </IconButton>
  );
};

SelFlag.propTypes = {
  FL: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
};

const Flag = () => {
  const path = window.location.pathname;
  const data = window.location.hostname;
  let other = ['FR', 'UK', 'PT', 'RU'];

  if (data === process.env.SITEFR) {
    other = ['US', 'UK', 'PT', 'RU'];
  } else if (data === process.env.SITEUK) {
    other = ['US', 'FR', 'PT', 'RU'];
  } else if (data === process.env.SITERU) {
    other = ['US', 'UK', 'PT', 'FR'];
  } else if (data === process.env.SITEPT) {
    other = ['US', 'UK', 'FR', 'RU'];
  } else {
    other = ['PT', 'UK', 'FR', 'RU'];
  }
  // Find Component
  const component = findComponentThenDebug(path, window.__routes__);
  const itemlist = [];
  _.map(other, (val, key) => itemlist.push(
    <SelFlag FL={val} key={key} component={component} />
  ));

  return (
    <div>{itemlist}</div>
  );
};

export default Flag;
