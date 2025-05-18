import { Schema, model } from 'mongoose';
import type { IReservation, IUserMongoose, IUser } from '../types/types';

const ReservationSchema = new Schema<IReservation>({
  table: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },
});

const UserSchema = new Schema<IUserMongoose>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
  },
  history: {
    type: [ReservationSchema],
  },
});

export const UserModel = model<IUser>('User', UserSchema, 'User')