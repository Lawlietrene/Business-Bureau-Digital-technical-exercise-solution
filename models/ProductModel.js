import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      maxlength: [40, 'A product must have less or equal then 40 characters,'],
      minlength: [4, 'A product must have more or equal then 4 characters,'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [1, 'Rating must be below 1.0'],
    },
    countInStock: {
      type: Number,
      required: [true, 'A product must have a countInStock'],
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
    },
    tags: {
      type: [String],
      required: [true, 'A product must have tags'],
    },
    description: {
      type: String,
    },
    information: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, 'A product must have a rating'],
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    images: {
      type: [String],
      required: [true, 'A product must have images'],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
