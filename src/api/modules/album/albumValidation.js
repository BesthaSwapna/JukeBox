const { celebrate, Joi } = require('celebrate');


module.exports = {
  create: celebrate({
    body: {
      album_id: Joi.string().required(),
      musicians_ids: Joi.array().required(),
      name: Joi.string().min(5).required(),
      release_date: Joi.date().required(),
      genre: Joi.string().required(),
      price: Joi.number().min(100).max(1000).required()
    },
  }),
};
