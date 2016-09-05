/* eslint-disable import/prefer-default-export */
import { action } from 'mobx';

export function toggle(...args) {
  const fnName = args[0] || 'active';
  const propKey = args[1] || 'isActive';
  return action((target) => {
    Object.assign(target.prototype, {
      [propKey]: target.prototype[propKey],
      [fnName]: action((flag = null) => {
        if (flag === true) return Object.assign(target.prototype, { [propKey]: true });
        if (flag === false) return Object.assign(target.prototype, { [propKey]: false });
        return Object.assign(target.prototype, { [propKey]: !target.prototype[propKey] });
      }) });
  });
}
