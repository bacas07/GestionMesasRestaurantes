import { Schema, model } from 'mongoose';
import { INotification, INotificationMongoose } from '../types/types';

const NotificationSchema = new Schema<INotificationMongoose>({
  type: {
    type: String,
    required: true,
    enum: ['confirmation', 'modification', 'cancellation', 'reminder'],
  },
  recipient: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'error'],
    default: 'pending',
  },
});

export const NotificationModel = model<INotification>(
  'Notification',
  NotificationSchema,
  'Notification'
);
