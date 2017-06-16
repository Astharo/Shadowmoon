export const isPresent = (obj) => {
  return typeof obj !== 'undefined' && obj !== null;
};

export const isBlank = (obj) => {
  return typeof obj === 'undefined' || obj === null;
};

export const isBoolean = (obj) => {
  return typeof obj === 'boolean';
};

export const isNumber = (obj) => {
  return typeof obj === 'number';
};

export const isString = (obj) => {
  return typeof obj === 'string';
};

export const isDate = (obj) => {
  return obj instanceof Date && !isNaN(obj.valueOf());
};

export const isFunction = (obj) => {
  return typeof obj === 'function';
};

export const isJsObject = (obj) => {
  return obj !== null && (isFunction(obj) || typeof obj === 'object');
};

export const isPromise = (obj) => {
  return isPresent(obj) && isFunction(obj.then);
};

export const isEmpty = (obj) => {
  if (isBlank(obj)) {
    return true;
  }

  if (obj.length === 0) {
    return true;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
};

export const isEqual = (actual, expected, opts) => {
  return require('deep-equal')(actual, expected, opts);
};

export const normalizeBlank = (obj) => {
  return isBlank(obj) ? null : obj;
};

export const normalizeBool = (obj) => {
  return isBlank(obj) ? false : obj;
};

export const stringify = (token) => {
  if (isString(token)) {
    return token;
  }

  if (isBlank(token)) {
    return String(token);
  }

  const ret = token.toString();
  const newLineIndex = ret.indexOf('\n');
  return (newLineIndex === -1) ? ret : ret.substring(0, newLineIndex);
};

export const find = (obj, predicate) => {
  return Object.keys(obj).filter(key => predicate(obj[key], key))[0];
};

let _uid = 0;
export const guid = () => _uid++;
