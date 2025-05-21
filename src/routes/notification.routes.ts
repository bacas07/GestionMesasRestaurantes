import { Router, Request, Response, NextFunction } from 'express';
import NotificationController from '../controllers/notification.controller.js';
import { verifyAdminToken } from '../utils/auth.js';

const NotificationRouter = Router();

NotificationRouter.get(
  '/getall',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.getAll(req, res, next);
  }
);

NotificationRouter.get(
  '/getallactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.getAllActive(req, res, next);
  }
);

NotificationRouter.get(
  '/getallunactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.getAllUnactive(req, res, next);
  }
);

NotificationRouter.get(
  '/getbyid/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.getById(req, res, next);
  }
);

NotificationRouter.get(
  '/getone/:filter',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.getOne(req, res, next);
  }
);

NotificationRouter.post(
  '/create',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.create(req, res, next);
  }
);

NotificationRouter.put(
  '/update/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.update(req, res, next);
  }
);

NotificationRouter.delete(
  '/softdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.softDelete(req, res, next);
  }
);

NotificationRouter.delete(
  '/strongdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    NotificationController.strongDelete(req, res, next);
  }
);

export default NotificationRouter;
