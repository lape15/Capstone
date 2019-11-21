const Joi = require('@hapi/joi');

// Validation
const validateCreateAdmin = (data) => {
  const schema = {
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    username: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

const validateLogin = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

const validateEmployeeLogin = (data) => {
  const schema = {
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

const validateCreateEmployee = (data) => {
  const schema = {
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    username: Joi.string().min(6).required(),
    phone: Joi.string().min(6).required(),
    gender: Joi.string().min(3),
  };
  return Joi.validate(data, schema);
};

module.exports.validateCreateAdmin = validateCreateAdmin;
module.exports.validateLogin = validateLogin;
module.exports.validateEmployeeLogin = validateEmployeeLogin;
module.exports.validateCreateEmployee = validateCreateEmployee;
