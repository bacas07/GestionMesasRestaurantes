export interface IUser {
  name: string;
  email: string;
  number: number;
  history: [IReservation];
}

export interface IReservation {
  table: string;
  date: string;
  hour: string;
  people: number;
}
