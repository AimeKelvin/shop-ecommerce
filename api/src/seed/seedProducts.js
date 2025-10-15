import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import logger from "../config/logger.js";

dotenv.config();

const allProducts = [
  {
    name: "Red Home Jersey",
    price: 25000,
    rating: 4.8,
    category: "jersey",
    images: ["https://i.pinimg.com/736x/09/43/92/094392a6867bbef3c0df9fe8c33316bf.jpg"],
    description: "Official red home jersey made with premium breathable material.",
    details: ["Material: Polyester", "Sizes: XS - XL"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    name: "Blue Away Jersey",
    price: 26000,
    rating: 4.9,
    category: "jersey",
    images: ["https://i.pinimg.com/1200x/bd/e5/1e/bde51e7bae7f66fe370c962af7f69429.jpg"],
    description: "Comfortable blue away jersey for matches and casual wear.",
    details: ["Material: Polyester", "Sizes: XS - XL"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    name: "Goalkeeper Jersey",
    price: 28000,
    rating: 4.7,
    category: "jersey",
    images: ["https://i.pinimg.com/736x/52/ee/38/52ee38929caa01d58360098070cd9a69.jpg"],
    description: "High-grip goalkeeper jersey built for performance.",
    details: ["Material: Polyester", "Sizes: XS - XL"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    name: "Team Scarf",
    price: 9000,
    rating: 4.6,
    category: "textile",
    images: ["https://i.pinimg.com/736x/b4/a5/d8/b4a5d882970c2e735d856d11eb0b5bdf.jpg"],
    description: "Soft team scarf to show your support.",
    details: ["Material: Wool", "Sizes: One size fits all"],
    sizes: ["One Size"],
  },
  {
    name: "Sports Cap",
    price: 8000,
    rating: 4.8,
    category: "headwear",
    images: ["https://i.pinimg.com/1200x/dc/8c/64/dc8c644603c17a9c9eb6eadc355869c3.jpg"],
    description: "Adjustable sports cap with logo embroidery.",
    details: ["Material: Cotton", "Sizes: Adjustable"],
    sizes: ["One Size"],
  },
  {
    name: "Training Shorts",
    price: 15000,
    rating: 4.5,
    category: "jersey",
    images: ["https://i.pinimg.com/736x/78/36/99/7836999896b9c90785f4e2e1e2102594.jpg"],
    description: "Comfortable training shorts for everyday workouts.",
    details: ["Material: Polyester", "Sizes: XS - XL"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    name: "Soccer Ball",
    price: 20000,
    rating: 4.9,
    category: "accessory",
    images: ["https://i.pinimg.com/1200x/3d/bd/f3/3dbdf3f2a0c9817efc4531c681682ab6.jpg"],
    description: "High-quality match soccer ball.",
    details: ["Material: Synthetic leather", "Size: 5"],
    sizes: ["5"],
  },
  {
    name: "Goalkeeper Gloves",
    price: 18000,
    rating: 4.4,
    category: "accessory",
    images: ["https://i.pinimg.com/1200x/05/78/75/05787563086580064323e57b8c620ee0.jpg"],
    description: "Durable gloves with strong grip.",
    details: ["Material: Latex", "Sizes: M - XL"],
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Digital Sports Watch",
    price: 22000,
    rating: 4.7,
    category: "accessory",
    images: ["https://i.pinimg.com/736x/84/e4/17/84e4172c8650f813853e803211e22440.jpg"],
    description: "Digital waterproof sports watch.",
    details: ["Battery life: 2 years", "Material: Rubber"],
    sizes: ["One Size"],
  },
  {
    name: "Analog Classic Watch",
    price: 30000,
    rating: 4.8,
    category: "accessory",
    images: ["https://i.pinimg.com/736x/7d/cc/7e/7dcc7ee62713a57a3c92458b45ca570b.jpg"],
    description: "Elegant analog watch with stainless steel strap.",
    details: ["Water resistant", "Warranty: 1 year"],
    sizes: ["One Size"],
  },
  {
    name: "Baseball Cap",
    price: 7000,
    rating: 4.5,
    category: "accessory",
    images: ["https://i.pinimg.com/1200x/a4/15/61/a415617218dc5273f8c2260d905cecd0.jpg"],
    description: "Classic baseball cap with curved brim.",
    details: ["Material: Cotton", "Sizes: Adjustable"],
    sizes: ["One Size"],
  },
  {
    name: "Snapback Hat",
    price: 8500,
    rating: 4.6,
    category: "accessory",
    images: ["https://i.pinimg.com/1200x/5b/13/3e/5b133ec9d16ba9945efecfaa04fea9a1.jpg"],
    description: "Streetwear snapback hat with flat brim.",
    details: ["Material: Cotton", "Sizes: Adjustable"],
    sizes: ["One Size"],
  },
  {
    name: "Fitness Tracker Watch",
    price: 27000,
    rating: 4.9,
    category: "accessory",
    images: ["https://i.pinimg.com/736x/4b/3d/78/4b3d787f53eb4d12ff48d978a07c5ff7.jpg"],
    description: "Track your workouts and sleep with style.",
    details: ["Battery life: 5 days", "Bluetooth: Yes"],
    sizes: ["One Size"],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB for seeding");

    await Product.deleteMany();
    logger.info("Existing products deleted");

    await Product.insertMany(allProducts);
    logger.info(`${allProducts.length} products inserted successfully!`);

    process.exit();
  } catch (error) {
    logger.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
