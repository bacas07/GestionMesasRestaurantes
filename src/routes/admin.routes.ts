import { Router, Request, Response, NextFunction } from 'express';
import AdminController from '../controllers/admin.controller.js';

const AdminRouter = Router();

AdminRouter.get(
  '/getall',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getAll(req, res, next);
  }
);

AdminRouter.get(
  '/getallactive',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getAllActive(req, res, next);
  }
);

AdminRouter.get(
  '/getallunactive',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getAllUnactive(req, res, next);
  }
);

AdminRouter.get(
  '/getbyid/:id',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getById(req, res, next);
  }
);

AdminRouter.get(
  '/getone/:filter',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getOne(req, res, next);
  }
);

AdminRouter.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.create(req, res, next);
  }
);

AdminRouter.put(
  '/update/:id',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.update(req, res, next);
  }
);

AdminRouter.delete(
  '/softdelete/:id',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.softDelete(req, res, next);
  }
);

AdminRouter.delete(
  '/strongdelete/:id',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.strongDelete(req, res, next);
  }
);

AdminRouter.post(
  '/register',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.register(req, res, next);
  }
);

export default AdminRouter;
