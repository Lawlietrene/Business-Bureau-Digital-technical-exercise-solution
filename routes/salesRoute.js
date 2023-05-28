import express from 'express';
import {
  sellController,
  getAllSell,
  totalprofit,
} from '../controllers/salesController.js';

const router = express.Router();

router.route('/').get(getAllSell);
router.route('/:id').post(sellController);
router.route('/totalprofit').get(totalprofit);

export default router;
