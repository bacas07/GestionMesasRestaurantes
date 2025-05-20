import { Router, Request, Response, NextFunction } from 'express';
import ReservationController from '../controllers/reservation.controller.js';
import { verifyAdminToken } from '../utils/auth.js';

const ReservationRouter = Router();

ReservationRouter.get(
  '/getall',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getAll(req, res, next);
  }
);

ReservationRouter.get(
  '/getallactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getAllActive(req, res, next);
  }
);

ReservationRouter.get(
  '/getallunactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getAllUnactive(req, res, next);
  }
);

ReservationRouter.get(
  '/getbyid/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getById(req, res, next);
  }
);

ReservationRouter.get(
  '/getone/:filter',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getOne(req, res, next);
  }
);

ReservationRouter.get(
  '/getbyuserid/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getByUserId(req, res, next);
  }
);

ReservationRouter.get(
  '/getbytableid/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getByTableId(req, res, next);
  }
);

ReservationRouter.get(
  '/getbydate/:date',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getByDate(req, res, next);
  }
);

ReservationRouter.post(
  '/create',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.create(req, res, next);
  }
);

ReservationRouter.put(
  '/update/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.update(req, res, next);
  }
);

ReservationRouter.delete(
  '/softdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.softDelete(req, res, next);
  }
);

ReservationRouter.delete(
  '/strongdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.strongDelete(req, res, next);
  }
);

export default ReservationRouter;
