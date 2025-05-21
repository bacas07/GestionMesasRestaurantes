import { Document } from 'mongoose';

// Interfaz para validar ingreso de datos para admin
export interface IAdmin {
  email: string;
  password: string;
}

// interfaz para validar ingreso de datos para user
export interface IUser {
  name: string;
  email: string;
  number: string;
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
  status: string;
  is_active: boolean;
}

// Interfaz para validar ingreso mesas
export interface ITable {
  name: string;
  capacity: string;
  location: string;
  status: string;
  is_active: boolean;
}

export interface INotificacion {
  type: string;
  recipient: string;
  subject: string;
  dat: string;
  status: string;
}

// Interfaz para creacion de modelo con mongoose
export interface IAdminMongoose extends Document {
  email: string;
  password: string;
}

export interface IUserMongoose extends Document {
  name: string;
  email: string;
  number: string;
  history: [IReservation];
  is_active: boolean;
}

export interface IReservationMongoose extends Document {
  userId: string;
  tableId: string;
  date: string;
  hour: string;
  people: number;
  status: string;
  is_active: boolean;
}

export interface ITableMongoose extends Document {
  name: string;
  capacity: string;
  location: string;
  status: string;
  is_active: boolean;
}
