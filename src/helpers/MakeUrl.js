import cfg from '../config.json';

function makeUrl(path) {
  return cfg.backend + path;
}

export default makeUrl;
