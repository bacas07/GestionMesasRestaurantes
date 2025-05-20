import { Router, Request, Response, NextFunction } from 'express';
import ReservationController from '../controllers/reservation.controller.js';

const ReservationRouter = Router();

ReservationRouter.get(
  '/getall',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getAll(req, res, next);
  }
);

ReservationRouter.get(
  '/getallactive',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getAllActive(req, res, next);
  }
);

ReservationRouter.get(
  '/getallunactive',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getAllUnactive(req, res, next);
  }
);

ReservationRouter.get(
  '/getbyid/:id',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getById(req, res, next);
  }
);

ReservationRouter.get(
  '/getone/:filter',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getOne(req, res, next);
  }
);

ReservationRouter.get(
  '/getbyuserid/:id',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getByUserId(req, res, next);
  }
);

ReservationRouter.get(
  '/getbytableid/:id',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.getByTableId(req, res, next);
  }
);

ReservationRouter.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.create(req, res, next);
  }
);

ReservationRouter.put(
  '/update/:id',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.update(req, res, next);
  }
);

ReservationRouter.delete(
  '/softdelete/:id',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.softDelete(req, res, next);
  }
);

ReservationRouter.delete(
  '/strongdelete/:id',
  (req: Request, res: Response, next: NextFunction) => {
    ReservationController.strongDelete(req, res, next);
  }
);

export default ReservationRouter;
