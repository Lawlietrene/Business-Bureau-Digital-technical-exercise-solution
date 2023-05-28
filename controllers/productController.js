import Product from '../models/ProductModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import { catchAsync } from './errorController.js';

export const productOutStock = (req, res, next) => {
  req.query.countInStock = 0;
  next();
};
export const getAllProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Product, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: 'success',
    result: products.length,
    products: products,
  });
});
export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    product: product,
  });
});
export const postProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});
export const deleteProduct = catchAsync(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: `Product id: ${req.params.id} delete`,
  });
});
export const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    product: product,
  });
});
export const getQuantity = catchAsync(async (req, res) => {
  const features = new APIFeatures(Product, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: 'success',
    Quantity: products.length,
  });
});
