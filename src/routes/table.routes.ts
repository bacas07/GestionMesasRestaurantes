import { Router, Request, Response, NextFunction } from 'express';
import TableController from '../controllers/table.controller.js';
import { verifyAdminToken } from '../utils/auth.js';

const TableRouter = Router();

TableRouter.get(
  '/getall',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.getAll(req, res, next);
  }
);

TableRouter.get(
  '/getallactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.getAllActive(req, res, next);
  }
);

TableRouter.get(
  '/getallunactive',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.getAllUnactive(req, res, next);
  }
);

TableRouter.get(
  '/getbyid/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.getById(req, res, next);
  }
);

TableRouter.get(
  '/getone/:filter',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.getOne(req, res, next);
  }
);

TableRouter.post(
  '/create',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.create(req, res, next);
  }
);

TableRouter.put(
  '/update/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.update(req, res, next);
  }
);

TableRouter.delete(
  '/softdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.softDelete(req, res, next);
  }
);

TableRouter.delete(
  '/strongdelete/:id',
  verifyAdminToken,
  (req: Request, res: Response, next: NextFunction) => {
    TableController.strongDelete(req, res, next);
  }
);

export default TableRouter;
