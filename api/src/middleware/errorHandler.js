import logger from '../config/logger.js';

export default (err, req, res, next) => {
  logger.error(err.stack || err.message || err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
};
