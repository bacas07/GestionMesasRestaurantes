import { object, string, number, array } from 'valibot';

const ReservationSchema = object({
  userId: string(),
  table: string(),
  date: string(),
  hour: string(),
  people: number(),
});

export const UserSchema = object({
  name: string(),
  email: string(),
  number: number(),
  history: array(ReservationSchema),
});
