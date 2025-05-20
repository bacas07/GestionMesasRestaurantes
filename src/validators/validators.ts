import * as valibot from 'valibot';

export const ReservationSchema = valibot.object({
  userId: valibot.string(),
  tableId: valibot.string(),
  date: valibot.string(),
  hour: valibot.string(),
  people: valibot.number(),
  is_active: valibot.optional(valibot.boolean(), true),
});

const roleEnum = {
  user: 'user',
  admin: 'admin',
};

export const UserSchema = valibot.object({
  name: valibot.string(),
  email: valibot.pipe(valibot.string(), valibot.email()),
  password: valibot.string(),
  number: valibot.optional(valibot.string()),
  role: valibot.optional(valibot.enum(roleEnum)),
  is_active: valibot.optional(valibot.boolean(), true),
  history: valibot.optional(valibot.array(ReservationSchema), []),
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
