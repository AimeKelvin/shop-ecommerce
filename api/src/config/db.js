import mongoose from 'mongoose';
import logger from './logger.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shimwaaimekelvin_db_user:pass123@cluster0.j90dsw3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  logger.info(`MongoDB connected: ${conn.connection.host}`);
  return conn;
};

export default connectDB;
