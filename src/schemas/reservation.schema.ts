import { Schema, model } from 'mongoose';
import type { IReservation, IReservationMongoose } from '../types/types.js';

const ReservationSchema = new Schema<IReservationMongoose>({
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
    default: 'confimed',
  },
  is_active: {
    type: Boolean,
  },
});

export const ReservationModel = model<IReservation>(
  'Reservation',
  ReservationSchema,
  'Reservation'
);
