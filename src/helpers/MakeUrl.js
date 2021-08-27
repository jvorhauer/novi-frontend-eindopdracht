import cfg from '../config.json';

function makeUrl(path) {
  if (path) {
    return cfg.backend + path;
  } else {
    return cfg.backend + "/";
  }
}

module.exports = makeUrl;

export default makeUrl;