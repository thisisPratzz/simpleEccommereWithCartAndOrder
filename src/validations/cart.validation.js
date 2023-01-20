const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCart = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    quantity: Joi.number().required(),
    price: Joi.number().required(),

  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCart = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateCart = {
  body: Joi.object()
    .keys({
      productId: Joi.string().custom(objectId),
      quantity: Joi.number().required(),
    })
    .min(1),
};

const ClearCart = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
const deleteProductfromCart = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCart,
  getUsers,
  getCart,
  updateCart,
  ClearCart,
  deleteProductfromCart,
};
