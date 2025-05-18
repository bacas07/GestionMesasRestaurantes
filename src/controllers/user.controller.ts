import { Request, Response, NextFunction } from 'express';
import userModel from '../models/user.model.js';
import ApiError from '../errors/apiError.js';

class UserController {
  private model = userModel;

  async getAll() {}

  async getById() {}

  async getOne() {}

  async create() {}

  async update() {}

  async delete() {}
}
