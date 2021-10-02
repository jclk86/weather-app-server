/*
 * caller function for global error handling
 * route all calls through this to try and handle errors
 */

exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
