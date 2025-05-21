import { Schema, model } from 'mongoose';
import type { IAdmin, IAdminMongoose } from '../types/types';

const AdminSchema = new Schema<IAdminMongoose>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

export const AdminModel = model<IAdmin>('Admin', AdminSchema, 'Admin');
