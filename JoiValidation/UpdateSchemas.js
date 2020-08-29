const Joi = require("joi");

const profileUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(61),
  email: Joi.string().email().min(5),
  password: Joi.string().min(6).max(200),
});

module.exports = {
  profileUpdateSchema: profileUpdateSchema,
};
