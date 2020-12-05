const { celebrate, Joi } = require('celebrate');


module.exports = {
  createMusicians: celebrate({
    body: {
      musician_id: Joi.string().required(),
      musician_name: Joi.string().min(3).required(),
      musician_type: Joi.string().required(),
    },
  }),
};
