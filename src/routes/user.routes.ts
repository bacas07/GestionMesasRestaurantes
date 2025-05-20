import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller.js';

const UserRouter = Router();

UserRouter.get('/getall', (req: Request, res: Response, next: NextFunction) => {
  UserController.getAll(req, res, next);
});

UserRouter.get(
  '/getallactive',
  (req: Request, res: Response, next: NextFunction) => {
    UserController.getAllActive(req, res, next);
  }
);

UserRouter.get(
  '/getallunactive',
  (req: Request, res: Response, next: NextFunction) => {
    UserController.getAllUnactive(req, res, next);
  }
);

UserRouter.get(
  '/getbyid/:id',
  (req: Request, res: Response, next: NextFunction) => {
    UserController.getById(req, res, next);
  }
);

UserRouter.get('/getone/:filter', (req: Request, res: Response, next: NextFunction) => {
  UserController.getOne(req, res, next);
});

UserRouter.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    UserController.create(req, res, next);
  }
);

UserRouter.put('/update/:id', (req: Request, res: Response, next: NextFunction) => {
  UserController.update(req, res, next);
});

UserRouter.delete(
  '/softdelete/:id',
  (req: Request, res: Response, next: NextFunction) => {
    UserController.softDelete(req, res, next);
  }
);

UserRouter.delete(
  '/strongdelete/:id',
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
