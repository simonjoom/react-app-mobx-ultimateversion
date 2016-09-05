/* eslint-disable import/prefer-default-export */
export function extend(...args) {
  const $extend = args[0] || null;
  return (target) => {
    Object.assign(target.prototype, {
      ___extend: $extend,
    });
  };
}
