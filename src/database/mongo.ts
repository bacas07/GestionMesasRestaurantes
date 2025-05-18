import { connect } from 'mongoose';
import { config } from 'dotenv';

const MONGO_URL: string = process.env.MONGO_URL || '';

export const connectDB = async () => {
  try {
    await connect(MONGO_URL);
    console.log('> Servidor conectado a la base de datos')
  } catch (error) {
    
  }
};
