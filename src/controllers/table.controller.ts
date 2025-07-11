import { Request, Response, NextFunction } from 'express';
import TableModel from '../models/table.model.js';
import { parse } from 'valibot';
import { TableSchema } from '../validators/validators.js';
import type { ITable } from '../types/types.js';
import ApiError from '../errors/apiError.js';

class TableController {
  private model = TableModel;

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

        const parseData = parse(TableSchema, req.body) as ITable;
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
}

export default new TableController();
