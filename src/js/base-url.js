var urls = {
  dev: '',
  // dev: 'http://192.168.21.55:8000/api/',
  production: 'http://www.abc.com/'
};
var isDebug = true;
function baseURL(url) {
  if (isDebug) {
    return urls.dev + url;
  } else {
    return urls.production + url;
  }
}

module.exports = baseURL;