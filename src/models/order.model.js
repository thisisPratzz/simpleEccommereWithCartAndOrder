const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderitemsSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },

    pincode: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      trim: true,
    },
    paymentType: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [orderitemsSchema],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
