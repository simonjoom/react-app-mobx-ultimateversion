import { log,logerreur } from '../logger';

export default function (app) {
  // Add a logger to our app object for convenience
  app.logger = log; // eslint-disable-line no-param-reassign

  return (err, req, res, next) => {
    if (err) {
      const { url } = req;
      const { code, message } = err;
      const msg = `${code ? `(${code})` : ''} Route: ${url} - ${message}`;

      if (err.code === 404) {
        log(msg);
      } else {
        logerreur(msg);
        log(err.stack);
      }
    }
    next(err);
  };
}
