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
  userId: string;
  tableId: string;
  date: string;
  hour: string;
  people: number;
  is_active: boolean;
}

// Interfaz para validar ingreso mesas
export interface ITable {
  name: string;
  is_active: boolean;
}

// Interfaz para creacion de modelo con mongoose
export interface IUserMongoose extends Document {
  name: string;
  email: string;
  number: number;
  history: [IReservation];
  is_active: boolean;
}

export interface IReservationMongoose extends Document {
  userId: string;
  tableId: string;
  date: string;
  hour: string;
  people: number;
  is_active: boolean;
}

export interface ITableMongoose extends Document {
  name: string;
  is_active: boolean;
}
