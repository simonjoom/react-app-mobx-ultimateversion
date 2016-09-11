/* eslint-disable import/prefer-default-export */
import { action } from 'mobx';

export function toggle(...args) {
  const fnName = args[0] || 'active';
  const propKey = args[1] || 'isActive';
  return ({ prototype }) => {
    Object.assign(prototype, {
      [propKey]: prototype[propKey],
      [fnName]: action(() => {
        let propValue = !prototype[propKey];
        return Object.assign(prototype, { [propKey]: propValue });
      }) });
  };
}


