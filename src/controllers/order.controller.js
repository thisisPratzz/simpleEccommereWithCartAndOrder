const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createorder = catchAsync(async (req, res) => {
  req.body.userId = req.user._id.toString();
  const order = await orderService.createOrder(req.body);
  res.status(httpStatus.CREATED).send(order);
});

const getorders = catchAsync(async (req, res) => {
  const filter = await { userId: req.user._id.toString() };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getorder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
  res.send(order);
});

const updateorder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
});

const deleteorder = catchAsync(async (req, res) => {
  await orderService.deleteorderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createorder,
  getorders,
  getorder,
  updateorder,
  deleteorder,
};
