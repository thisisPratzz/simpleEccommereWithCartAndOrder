const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Cart
 * @param {Object} cartBody
 * @returns {Promise<Cart>}
 */
const createcart = async (cartBody) => {

  return Cart.create(cartBody);
};

/**
 * Query for carts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querycarts = async (filter, options) => {
  const carts = await Cart.paginate(filter, options);
  return carts;
};

/**
 * Get Cart by id
 * @param {ObjectId} id
 * @returns {Promise<Cart>}
 */
const getcartById = async (id) => {
  return Cart.findById(id);
};

/**
 * Get Cart by email
 * @param {string} email
 * @returns {Promise<Cart>}
 */
const getcartByEmail = async (email) => {
  return Cart.findOne({ email });
};

/**
 * Update Cart by id
 * @param {ObjectId} cartId
 * @param {Object} updateBody
 * @returns {Promise<Cart>}
 */
const updatecartByproductId = async (updateBody) => {
  const CartObj = await Cart.findOne({ userId: updateBody.userId, productId: updateBody.productId });
  if (!CartObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'productId not found for users cart');
  }
  Object.assign(CartObj, updateBody);
  await CartObj.save();
  return CartObj;
};

/**
 * Delete Cart by id
 * @param {ObjectId} cartId
 * @returns {Promise<Cart>}
 */
const deletecartById = async (userId) => {

  await Cart.deleteMany({ userId });
  return Cart;
};
const deleteProductfromCart = async (body) => {

  await Cart.deleteMany(body);
  return Cart;
};

module.exports = {
  createcart,
  querycarts,
  getcartById,
  getcartByEmail,
  updatecartByproductId,
  deletecartById,
  deleteProductfromCart,
};
