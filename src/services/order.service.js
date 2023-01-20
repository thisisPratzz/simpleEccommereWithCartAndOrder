const httpStatus = require('http-status');
const { Order } = require('../models');
const { Cart } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  let total = 0;
  const cart = await Cart.find({userId:orderBody.userId});
  if (cart.length<1) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  orderBody.orderItems = cart;
  orderBody.orderStatus = "Placed";
  await cart.forEach((orderItem) => {
    total += orderItem.price * orderItem.quantity;
  })

  orderBody.total = total;

  const orderOBj =await  Order.create(orderBody)
  //Clear Cart in DB
  const cartObj =await Cart.deleteMany({userId: orderBody.userId})

  return orderOBj;
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return Order.findById(id);
};

/**
 * Get order by email
 * @param {string} email
 * @returns {Promise<Order>}
 */
const getOrderByEmail = async (email) => {
  return Order.findOne({ email });
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (updateBody.email && (await Order.isEmailTaken(updateBody.email, orderId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  getOrderByEmail,
  updateOrderById,
  deleteOrderById,
};
