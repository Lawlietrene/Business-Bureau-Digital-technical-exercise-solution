import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import { generateToken } from '../utils/security.js';
import APIFeatures from '../utils/apiFeatures.js';
import { catchAsync } from './errorController.js';
import AppError from '../utils/appError.js';

export const authentication = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
        expiresIn: '30min',
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid passwor for this users',
      });
    }
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid user',
    });
  }
});
export const getAllUser = catchAsync(async (req, res) => {
  const features = new APIFeatures(User, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;

  res.status(200).json({
    status: 'success',
    result: users.length,
    users: users,
  });
});
export const getUser = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  let userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  res.status(200).json({
    status: 'success',
    user: userWithoutPassword,
  });
});
export const postUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  let userWithoutPassword = newUser.toObject();
  delete userWithoutPassword.password;

  res.status(201).json({
    status: 'success',
    data: {
      user: userWithoutPassword,
    },
  });
});
export const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
    message: `User id: ${req.params.id} delete`,
  });
});
export const updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    user: user,
  });
});
