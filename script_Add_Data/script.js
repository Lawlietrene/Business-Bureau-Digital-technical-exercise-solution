import dotenv from 'dotenv';
dotenv.config({ path: '../config.env' });

import mongoose from 'mongoose';
import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import products from './products.js';
import users from './users.js';

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB).then(() => {
  console.log('DB conections succesful!!');
});

const createProducts = async (products) => {
  try {
    await Product.create(products);
  } catch (error) {
    console.log(error);
  }
};

const createUsers = async (users) => {
  try {
    await User.create(users);
  } catch (error) {
    console.log(error);
  }
};

createProducts(products);
createUsers(users);
