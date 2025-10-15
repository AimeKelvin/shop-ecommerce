import express from 'express';
import { body } from 'express-validator';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts
} from '../controllers/productController.js';
import protect from '../middleware/auth.js';
import permit from '../middleware/roles.js';
import validate from '../middleware/validate.js';

const router = express.Router();

/**
 * Public: list & get
 */
router.get('/', listProducts);
router.get('/:id', getProduct);

/**
 * Admin CRUD
 */
router.post(
  '/',
  protect,
  permit('admin'),
  [
    body('name').notEmpty(),
    body('price').isNumeric()
  ],
  validate,
  createProduct
);

router.put(
  '/:id',
  protect,
  permit('admin'),
  validate,
  updateProduct
);

router.delete('/:id', protect, permit('admin'), deleteProduct);

export default router;
