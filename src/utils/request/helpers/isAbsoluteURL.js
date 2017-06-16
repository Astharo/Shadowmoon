// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
// by any combination of letters, digits, plus, period, or hyphen.
// https://www.ietf.org/rfc/rfc3986.txt
const isAbsoluteURL = (url) => /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);

export default isAbsoluteURL;
