const Joi = require('@hapi/joi');

// Validation
const validateLogin = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

const validateCreateUser = (data) => {
  const schema = {
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    jobrole: Joi.string().min(2).required(),
    phone: Joi.string().min(6).required(),
    address: Joi.string().min(6),
    gender: Joi.string().min(2),
    department: Joi.string().min(1),
  };
  return Joi.validate(data, schema);
};

const validateCreateArticle = (data) => {
  const schema = {
    title: Joi.string().min(4).required(),
    content: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.validateLogin = validateLogin;
module.exports.validateCreateUser = validateCreateUser;
module.exports.validateCreateArticle = validateCreateArticle;
