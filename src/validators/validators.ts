import * as valibot from 'valibot';

export const AdminSchema = valibot.object({
  email: valibot.pipe(valibot.string(), valibot.email()),
  password: valibot.string(),
});

const statusReservationEnum = {
  pending: 'pending',
  confirmed: 'confirmed',
};

export const ReservationSchema = valibot.object({
  userId: valibot.string(),
  tableId: valibot.string(),
  date: valibot.string(),
  hour: valibot.string(),
  people: valibot.number(),
  status: valibot.optional(valibot.enum(statusReservationEnum), 'pending'),
  is_active: valibot.optional(valibot.boolean(), true),
});

export const UserSchema = valibot.object({
  name: valibot.string(),
  email: valibot.pipe(valibot.string(), valibot.email()),
  number: valibot.optional(valibot.string(), ''),
  history: valibot.optional(valibot.array(ReservationSchema), []),
  is_active: valibot.optional(valibot.boolean(), true),
});

const locationEnum = {
  window: 'window',
  terrace: 'terrace',
  indoor: 'indoor',
  bar: 'bar',
};

const statusEnum = {
  available: 'available',
  occupied: 'occupied',
  reserved: 'reserved',
};

export const TableSchema = valibot.object({
  name: valibot.string(),
  capacity: valibot.string(),
  location: valibot.enum(locationEnum),
  status: valibot.optional(valibot.enum(statusEnum), 'available'),
  is_active: valibot.optional(valibot.boolean(), true),
});

const typeEnum = {
  confirmation: 'confirmation',
  modification: 'modification',
  cancellation: 'cancellation',
  reminder: 'reminder'
}

const statusNotificationEnum = {
  pending: 'pending',
  sent: 'sent',
  error: 'error'
}

export const NotificationSchema = valibot.object({
  type: valibot.enum(typeEnum),
  recipient: valibot.string(),
  subject: valibot.string(),
  date: valibot.string(),
  status: valibot.optional(valibot.enum(statusNotificationEnum), 'pending')
})