import User from '../models/User.js';
import Product from '../models/Product.js';

// get current buyer's list
export const getMyList = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('myList.product');
    res.json(user.myList || []);
  } catch (err) {
    next(err);
  }
};

// add item to list
export const addToList = async (req, res, next) => {
  try {
    const { productId, qty = 1, size = '' } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const user = await User.findById(req.user.id);
    const existingIndex = user.myList.findIndex(i => i.product.toString() === productId && i.size === size);

    if (existingIndex > -1) {
      user.myList[existingIndex].qty = Math.min(999, user.myList[existingIndex].qty + qty);
    } else {
      user.myList.push({ product: productId, qty, size });
    }

    await user.save();
    const populated = await user.populate('myList.product');
    res.status(200).json(populated.myList);
  } catch (err) {
    next(err);
  }
};

// remove item from list
export const removeFromList = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    user.myList = user.myList.filter(i => i.product.toString() !== productId);
    await user.save();
    const populated = await user.populate('myList.product');
    res.json(populated.myList);
  } catch (err) {
    next(err);
  }
};

// update qty or size
export const updateListItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { qty, size } = req.body;
    const user = await User.findById(req.user.id);
    const item = user.myList.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not in list' });
    if (qty !== undefined) item.qty = Math.max(1, qty);
    if (size !== undefined) item.size = size;
    await user.save();
    const populated = await user.populate('myList.product');
    res.json(populated.myList);
  } catch (err) {
    next(err);
  }
}
