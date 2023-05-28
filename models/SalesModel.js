import mongoose from 'mongoose';
import Product from './ProductModel.js';

const userSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: [true, 'A sell must have a id'],
    },
    product_name: {
      type: String,
      required: [true, 'A sell must have a product name'],
    },
    product_price: {
      type: Number,
      required: [true, 'A sell must have a product price'],
    },
    quantity: {
      type: Number,
      required: [true, 'A sell must have a quantity'],
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model('Sales', userSchema);
export default Sales;
