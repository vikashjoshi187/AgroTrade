import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = mongoose.connect(process.env.DB_URL).then(() => {
  console.log('Connected successfully to MongoDB Atlas');
})
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas: ', err);
  });

export default connectDB;