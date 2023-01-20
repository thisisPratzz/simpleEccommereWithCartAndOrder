const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');

const createcart = catchAsync(async (req, res) => {
  req.body.userId =req.user._id.toString();
  const cart = await cartService.createcart(req.body);
  res.status(httpStatus.CREATED).send(cart);
});

const getcarts = catchAsync(async (req, res) => {
  const filter = await { userId: req.user._id.toString() };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cartService.querycarts(filter, options);
  res.send(result);
});

const getcart = catchAsync(async (req, res) => {
  const cart = await cartService.getcartById(req.params.cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cart not found');
  }
  res.send(cart);
});

const updatecart = catchAsync(async (req, res) => {
  req.body.userId = req.user._id;
  // console.log(req.user)
  const cart = await cartService.updatecartByproductId(req.body);
  res.send(cart);
});

const deletecart = catchAsync(async (req, res) => {
  await cartService.deletecartById(req.user._id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteProductfromCart = catchAsync(async (req, res) => {
  req.body.userId = req.user._id;
  await cartService.deleteProductfromCart(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createcart,
  getcarts,
  getcart,
  updatecart,
  deletecart,
  deleteProductfromCart,
};
