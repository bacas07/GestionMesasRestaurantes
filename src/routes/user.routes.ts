import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller.js';
import { verifyAdminToken } from '../utils/auth.js';

const UserRouter = Router();

UserRouter.get(
  '/getall',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.getAll(req, res, next);
  }
);

UserRouter.get(
  '/getallactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.getAllActive(req, res, next);
  }
);

UserRouter.get(
  '/getallunactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.getAllUnactive(req, res, next);
  }
);

UserRouter.get(
  '/getbyid/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.getById(req, res, next);
  }
);

UserRouter.get(
  '/getone/:filter',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.getOne(req, res, next);
  }
);

UserRouter.post(
  '/create',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.create(req, res, next);
  }
);

UserRouter.put(
  '/update/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.update(req, res, next);
  }
);

UserRouter.delete(
  '/softdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.softDelete(req, res, next);
  }
);

UserRouter.delete(
  '/strongdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    UserController.strongDelete(req, res, next);
  }
);

/*UserRouter.post(
  '/register',
  (req: Request, res: Response, next: NextFunction) => {
    UserController.register(req, res, next);
  }
);*/

export default UserRouter;
