import Product from '../models/Product.js'; 

// Create product (admin)
export const createProduct = async (req, res, next) => {
  try {
    const payload = req.body;
    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Update product (admin)
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete product (admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await Product.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed' });
  } catch (err) {
    next(err);
  }
};

// Get single product (public)
export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// List products with pagination + filters
export const listProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, q, category, minPrice, maxPrice, sort } = req.query;
    const query = {};
    if (q) {
      query.$or = [
        { name: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') }
      ];
    }
    if (category) query.category = category;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    const skip = (Number(page) - 1) * Number(limit);
    const cursor = Product.find(query).skip(skip).limit(Number(limit));
    if (sort) cursor.sort(sort);

    const [items, total] = await Promise.all([cursor.exec(), Product.countDocuments(query)]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};