import express from 'express';
import {
  authentication,
  getAllUser,
  postUser,
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import { isAuth, encryptPassword } from '../utils/security.js';

const router = express.Router();

router.route('/login').post(authentication);
router.route('/').get(isAuth, getAllUser).post(encryptPassword, postUser);
router.route('/:id').get(isAuth, getUser).patch(updateUser).delete(deleteUser);

export default router;
