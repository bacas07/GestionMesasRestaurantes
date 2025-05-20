import { Request, Response, NextFunction } from 'express';
import userModel from '../models/user.model.js';
import { parse } from 'valibot';
import { UserSchema } from '../validators/validators.js';
import type { IUser } from '../types/types.js';
import ApiError from '../errors/apiError.js';
import { hash, verify } from 'argon2';
// import { generateUserToken } from '../utils/auth.js';

class UserController {
  private model = userModel;

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

        const parseData = parse(UserSchema, req.body) as IUser;
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

  /* Proximos features
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      try {
        if (!req.body || typeof req.body !== 'object') {
          return res.status(400).json({ error: 'Payload invalido' });
        }

        const {
          email,
          password,
        } = req.body;

        const userExist = await this.model.getOne({ email });

        if (userExist) {
          throw new ApiError(
            `Ya existe un usuario con este emai: ${email}`,
            400
          );
        }

        const hashed = await hash(password);

        const parsedData = parse(UserSchema, {
          email,
          password: hashed,
        }) as IUser;

        const newUser = await this.model.create(parsedData);
        return res.status(201).json(newUser);
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: 'Payload invalido' });
      }

      const { email, password } = req.body;
      const userExist = await this.model.getOne({ email });

      if (!userExist) {
        throw new ApiError(
          `No existe un usuario con este emai!!: ${email}`,
          400
        );
      }

      const validPassword = await verify(userExist.password, password);

      if (!validPassword) {
        throw new ApiError('Contraseña incorrecta', 401);
      }

      /*const token = generateUserToken({
        id: userExist._id,
      });
    } catch (error) {}
  }*/
}

export default new UserController();
