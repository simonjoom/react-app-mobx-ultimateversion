//import $store from '../store';
import access from 'safe-access';
import _ from 'lodash';

function getNSClassNamespace(str) {
  const lastIndex = str.lastIndexOf('.');
  return str.substring(0, lastIndex);
}

function getNSMethodName(str) {
  const lastIndex = str.lastIndexOf('.');
  return str.substring(lastIndex + 1, str.length);
}

function getRealClassName(ns, store) {
  const className = getNSClassNamespace(ns);
  const _class = access(store, className);
  if (_.isUndefined(_class)) throw new Error(`The Store ${className} does not exist!`);
  return _class.constructor.name;
}

export default function dispatch(namespace, ...opt) {
  const store = window.__STORE;
  const fn = access(store, namespace);
  const className = getRealClassName(namespace, store);
  const methodName = getNSMethodName(namespace);

  if (_.isFunction(fn)) {
    const args = _.isArray(opt) ? opt : [opt];
    return access(store, [namespace, '()'].join(''), args);
  }

  throw new Error(`${methodName} is not an action of ${className}`);
}
