import { Router, Request, Response, NextFunction } from 'express';
import AdminController from '../controllers/admin.controller.js';
import { verifyAdminToken } from '../utils/auth.js';

const AdminRouter = Router();

AdminRouter.get(
  '/getall',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getAll(req, res, next);
  }
);

AdminRouter.get(
  '/getallactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getAllActive(req, res, next);
  }
);

AdminRouter.get(
  '/getallunactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getAllUnactive(req, res, next);
  }
);

AdminRouter.get(
  '/getbyid/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getById(req, res, next);
  }
);

AdminRouter.get(
  '/getone/:filter',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.getOne(req, res, next);
  }
);

AdminRouter.post(
  '/create',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.create(req, res, next);
  }
);

AdminRouter.put(
  '/update/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.update(req, res, next);
  }
);

AdminRouter.delete(
  '/softdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.softDelete(req, res, next);
  }
);

AdminRouter.delete(
  '/strongdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.strongDelete(req, res, next);
  }
);

AdminRouter.post(
  '/register',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.register(req, res, next);
  }
);

AdminRouter.post(
  '/login',
  (req: Request, res: Response, next: NextFunction) => {
    AdminController.login(req, res, next);
  }
);

export default AdminRouter;
