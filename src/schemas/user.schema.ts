import { Schema, model } from 'mongoose';
import type { IReservation, IUserMongoose, IUser } from '../types/types';

const ReservationSchema = new Schema<IReservation>({
  userId: {
    type: String,
    required: true,
  },
  tableId: {
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
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'confirmed',
  },
  is_active: {
    type: Boolean,
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
    type: String,
    default: '',
  },
  history: {
    type: [ReservationSchema],
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

export const UserModel = model<IUser>('User', UserSchema, 'User');
