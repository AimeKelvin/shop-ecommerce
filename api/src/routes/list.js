import express from 'express';
import protect from '../middleware/auth.js';
import { getMyList, addToList, removeFromList, updateListItem } from '../controllers/listController.js';

const router = express.Router();

// all routes require auth and buyer role (buyers can have lists; admin could too but typical)
router.use(protect);

router.get('/', getMyList);
router.post('/', addToList); // body: { productId, qty, size }
router.put('/:productId', updateListItem); // update qty/size
router.delete('/:productId', removeFromList);

export default router;
