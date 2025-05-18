import { connect } from 'mongoose';
import { config } from 'dotenv';
import ApiError from '../errors/apiError.js';

config();

const MONGO_URL: string = process.env.MONGO_URL || '';

export const connectDB = async () => {
  try {
    await connect(MONGO_URL);
    console.log('> Servidor conectado a la base de datos');
  } catch (error) {
    throw new ApiError(
      `Error connecting to database: ${(error as Error).message}`,
      500
    );
  }
};
