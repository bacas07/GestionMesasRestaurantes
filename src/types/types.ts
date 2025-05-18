import { Document } from 'mongoose';

// interfaz para validar ingreso de datos para user
export interface IUser {
  name: string;
  email: string;
  number: number;
  history: [IReservation];
  is_active: boolean;
}

// Interfaz para validar ingreso de reservas para historial de usuario
export interface IReservation {
  table: string;
  date: string;
  hour: string;
  people: number;
}

// Interfaz para creacion de modelo con mongoose
export interface IUserMongoose extends Document {
  name: string;
  email: string;
  number: number;
  history: [IReservation];
  is_active: boolean;
}
