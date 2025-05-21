import { Request, Response, NextFunction } from 'express';
import ReservationModel from '../models/reservation.model.js';
import UserModel from '../models/user.model.js';
import NotificationModel from '../models/notification.model.js';
import { parse } from 'valibot';
import { ReservationSchema } from '../validators/validators.js';
import type { IReservation, INotification, INotificationMongoose, IUser } from '../types/types.js';
import sendMail from '../services/mailer.service.js';
import ApiError from '../errors/apiError.js';

class ReservationController {
  private model = ReservationModel;

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.getAll();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllActive(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.getAllActive();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllUnactive(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.getAllUnactive();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.model.getById(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.body;
      const data = await this.model.getOne(filter);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.model.getByUserId(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getByTableId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.model.getByTableId(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const { day } = req.params;
      const data = await this.model.getByDate(day);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // 3.1 Validamos y creamos la reserva
      const reservationData = parse(
        ReservationSchema,
        req.body
      ) as IReservation;

      const reservation = await this.model.create(reservationData);
      // Comprobación para el error 'reservation' is possibly 'null'.
      if (!reservation) {
        throw new ApiError('No se pudo crear la reserva', 500);
      }

      // 3.2 Obtenemos el email del usuario
      const user = (await UserModel.getById(reservationData.userId)) as IUser; // Casteamos a IUser si es necesario
      if (!user) {
        throw new ApiError('Usuario no encontrado para la reserva', 404);
      }

      // 3.3 Preparamos y guardamos la notificación
      // Ahora notifData es de tipo INotification completo
      const notifData: INotification = {
        type: 'confirmation',
        recipient: user.email,
        subject: `Confirmación de tu reserva para el ${reservation.date}`,
        date: new Date().toISOString(),
        status: 'pending', // Estado inicial al crear la notificación
        is_active: true, // Asumimos que está activa por defecto
        // Aquí puedes añadir los detalles de la reserva si tu INotification lo requiere para las plantillas
        // details: {
        //   userName: user.name || user.email, // Asume que el usuario tiene una propiedad name
        //   restaurantName: 'Tu Restaurante', // O el nombre real de tu restaurante
        //   reservationDate: reservation.date,
        //   reservationTime: reservation.time,
        //   numberOfGuests: reservation.numberOfGuests,
        //   reservationCode: reservation.id // O un código de reserva específico
        // }
      };

      // Casteamos el resultado de create a NotificationDocument
      let notification = (await NotificationModel.create(
        notifData
      )) as INotificationMongoose;
      // Comprobación para el error 'notification' is possibly 'null'.
      if (!notification) {
        throw new ApiError('No se pudo crear la notificación', 500);
      }

      // 3.4 Intentamos enviar el correo
      try {
        await sendMail(notification); // sendMail ahora recibe un INotification o NotificationDocument
        notification.status = 'sent';
      } catch (sendError) {
        console.error('Error al enviar el correo:', sendError); // Loguear el error de envío
        notification.status = 'error';
      }

      // Guardar estado actualizado del documento de notificación
      await notification.save(); // Ahora el método save() existe en NotificationDocument

      return res.status(201).json(reservation);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.model.update(id, req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.model.softDelete(id);
      return res.status(204).json(data);
    } catch (error) {
      next(error);
    }
  }

  async strongDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.model.strongDelete(id);
      return res.status(204).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new ReservationController();
