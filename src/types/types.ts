import { Document } from 'mongoose';

// Interfaz para validar ingreso de datos para admin
export interface IAdmin {
  email: string;
  password: string;
  is_active: boolean;
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

export interface INotification {
  type: string;
  recipient: string;
  subject: string;
  date: string;
  status: string;
  is_active: boolean;
}

// Interfaz para creacion de modelo con mongoose
export interface IAdminMongoose extends Document {
  email: string;
  password: string;
  is_active: boolean;
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

export interface INotificationMongoose extends Document {
  type: string;
  recipient: string;
  subject: string;
  date: string;
  status: string;
  is_active: boolean;
}
