import { Schema, model } from 'mongoose';
import type { IReservation, IReservationMongoose } from '../types/types.js';

const ReservationSchema = new Schema<IReservation>({
  userId: {
    type: String,
    required: true,
  },
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

export const ReservationModel = model<IReservation>(
  'Reservation',
  ReservationSchema,
  'Reservation'
);
