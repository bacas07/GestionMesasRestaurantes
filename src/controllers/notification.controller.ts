import { Request, Response, NextFunction } from 'express';
import NotificationModel from '../models/notification.model.js';
import { parse } from 'valibot';
import { NotificationSchema } from '../validators/validators.js';
import type { INotification } from '../types/types.js';
import sendMail from '../services/mailer.service.js';
import ApiError from '../errors/apiError.js';

class NotificationController {
  private model = NotificationModel;

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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      try {
        if (!req.body || typeof req.body !== 'object') {
          return res.status(400).json({ error: 'Payload invalido' });
        }

        const parseData = parse(NotificationSchema, req.body) as INotification;
        const data = await this.model.create(parseData);
        return res.status(201).json(data);
      } catch (ValidationError) {
        throw new ApiError(
          `Error en la validacion de los datos -> ${ValidationError}`,
          400
        );
      }
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

  async sendNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const data = parse(NotificationSchema, {
        ...req.body,
        date: new Date().toISOString(),
      }) as INotification;

      // Creamos la notificación en DB
      const notificationDoc = (await this.model.create(data)) as INotification; // Corrección: Usamos INotification
      if (!notificationDoc) {
        throw new ApiError('No se pudo crear la notificación', 500);
      }

      // Intento de envío
      try {
        await sendMail(notificationDoc);
        // @ts-ignore
        notificationDoc.status = 'sent';
      } catch (sendError) {
        // @ts-ignore
        notificationDoc.status = 'error';
      }

      // Guardar estado actualizado
      // @ts-ignore
      await this.model.update(notificationDoc.id, notificationDoc);

      return res.status(201).json(notificationDoc);
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
