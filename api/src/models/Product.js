import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  category: { type: String, default: '' },
  images: [{ type: String }],
  description: { type: String, default: '' },
  details: [{ type: String }],
  sizes: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

ProductSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Product', ProductSchema);
