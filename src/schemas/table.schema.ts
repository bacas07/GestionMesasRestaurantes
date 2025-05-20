import { Schema, model } from 'mongoose';
import type { ITable, ITableMongoose } from '../types/types.js';

const TableSchema = new Schema<ITableMongoose>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: ['window', 'terrace', 'indoor', 'bar'],
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved'],
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

export const TableModel = model<ITable>('Table', TableSchema, 'Table');
