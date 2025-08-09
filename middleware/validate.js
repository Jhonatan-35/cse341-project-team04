const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
  const validationRule = {
    movieId: 'required|string',
    movieName: 'required|string',
    movieYear: 'required|string',
    moviestags: 'string',
    movieDescription: 'required|string',
    movieProducer:'required|string',
    movieCountry:'string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const saveUser = (req, res, next) => {
  const validationRule = {
    firstname: 'required|string',
    lastname: 'required|string',
    username: 'required|string',
    email: 'required|email',
    password: 'required|string',
    phone:'required|string',
    birthday:'string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


module.exports = {
  saveMovie,
  saveUser
};