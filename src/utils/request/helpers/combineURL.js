// Creates a new URL by combining the specified URLs
const combineURL = (baseUrl, path) => {
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};

export default combineURL;
