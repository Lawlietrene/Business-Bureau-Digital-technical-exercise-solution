import Sales from '../models/SalesModel.js';
import Product from '../models/ProductModel.js';
import { catchAsync } from './errorController.js';

export const sellController = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product.countInStock > 0) {
    const newSale = await Sales.create({
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      quantity: 1,
    });

    await Product.findByIdAndUpdate(req.params.id, {
      countInStock: product.countInStock - 1,
    });

    res.status(201).json({
      status: 'success',
      sale: newSale,
    });
  } else {
    res.status(400).json({
      status: 'Fail',
      message: 'This product is out of stock',
    });
  }
});
export const getAllSell = catchAsync(async (req, res) => {
  const sales = await Sales.find();

  res.status(201).json({
    status: 'success',
    result: sales.length,
    sales: sales,
  });
});
export const totalprofit = catchAsync(async (req, res) => {
  const totalProfit = await Sales.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ['$quantity', '$product_price'] } },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    totalProfit: totalProfit[0].total,
  });
});
