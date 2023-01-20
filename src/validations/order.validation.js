const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createorder = {
  body: Joi.object().keys({
    pincode :Joi.number().required().integer(),
    address :Joi.string().required(),
    paymentStatus :Joi.string().required().valid('Failed', 'Sucess'),
    paymentType: Joi.string().required().valid('COD', 'UPI'),
  }),
};

const getorders = {
  query: Joi.object().keys({

    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getorder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateorder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
     orderStatus: Joi.string().required().valid('CANCELLED'),
    })
    .min(1),
};

const deleteorder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createorder,
  getorders,
  getorder,
  updateorder,
  deleteorder,
};
