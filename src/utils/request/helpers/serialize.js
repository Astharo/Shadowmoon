import { isPresent } from 'utils/lang';

const encode = (value) => {
  return encodeURIComponent(value)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
};

// Encode a set of form elements as a string for submission.
const serialize = (params) => {
  const ret = [];
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (isPresent(value)) {
      ret.push(`${encode(key)}=${encode(value)}`);
    }
  });

  return ret.join('&');
};

export default serialize;
