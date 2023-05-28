import express from 'express';
import { isAuth } from '../utils/security.js';
import {
  getAllProducts,
  postProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  productOutStock,
  getQuantity,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/outstock').get(productOutStock, getAllProducts);
router.route('/productquantity').get(getQuantity);

router.route('/').get(getAllProducts).post(isAuth, postProduct);
router
  .route('/:id')
  .get(getProduct)
  .patch(isAuth, updateProduct)
  .delete(isAuth, deleteProduct);

export default router;
