const Joi = require("joi");

const signUpSchema = Joi.object({
  name: Joi.string().required().min(3).max(61),
  email: Joi.string().required().email().min(5),
  password: Joi.string().required().min(6).max(200),
});

const signInSchema = Joi.object({
  email: Joi.string().required().email().min(5),
  password: Joi.string().required().min(6).max(200),
});

module.exports = {
  signUpSchema,
  signInSchema,
};
