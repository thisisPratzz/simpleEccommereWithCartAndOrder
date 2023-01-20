const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const cartSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    price:{
      type:Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cartSchema.plugin(toJSON);
cartSchema.plugin(paginate);

/**
 * @typedef cart
 */
const cart = mongoose.model('cart', cartSchema);

module.exports = cart;
