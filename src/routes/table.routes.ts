import { Router, Request, Response, NextFunction } from 'express';
import TableController from '../controllers/table.controller.js';

const TableRouter = Router();

TableRouter.get('/getall', (req: Request, res: Response, next: NextFunction) => {
  TableController.getAll(req, res, next);
});

TableRouter.get(
  '/getallactive',
  (req: Request, res: Response, next: NextFunction) => {
    TableController.getAllActive(req, res, next);
  }
);

TableRouter.get(
  '/getallunactive',
  (req: Request, res: Response, next: NextFunction) => {
    TableController.getAllUnactive(req, res, next);
  }
);

TableRouter.get(
  '/getbyid',
  (req: Request, res: Response, next: NextFunction) => {
    TableController.getById(req, res, next);
  }
);

TableRouter.get('/getone', (req: Request, res: Response, next: NextFunction) => {
  TableController.getOne(req, res, next);
});

TableRouter.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    TableController.create(req, res, next);
  }
);

TableRouter.put('/update', (req: Request, res: Response, next: NextFunction) => {
  TableController.update(req, res, next);
});

TableRouter.delete(
  '/softdelete',
  (req: Request, res: Response, next: NextFunction) => {
    TableController.softDelete(req, res, next);
  }
);

TableRouter.delete(
  '/strongdelete',
  (req: Request, res: Response, next: NextFunction) => {
    TableController.strongDelete(req, res, next);
  }
);

export default TableRouter;
