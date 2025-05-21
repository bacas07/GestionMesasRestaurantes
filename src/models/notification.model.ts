import { NotificationModel } from '../schemas/notification.schema.js';
import { INotification } from '../types/types.js';
import ApiError from '../errors/apiError.js';

class NotificationService {
  private model = NotificationModel;

  async getAll(): Promise<INotification[] | null> {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model getAll: ${(error as Error).message}`,
        500
      );
    }
  }

  async getAllActive(): Promise<INotification[] | null> {
    try {
      const result = await this.model.find({ is_active: true });
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model getAllActive: ${(error as Error).message}`,
        500
      );
    }
  }

  async getAllUnactive(): Promise<INotification[] | null> {
    try {
      const result = await this.model.find({ is_active: false });
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model getAllUnactive: ${(error as Error).message}`,
        500
      );
    }
  }

  async getById(id: string): Promise<INotification | null> {
    try {
      const result = await this.model.findById(id);

      if (!result) {
        throw new ApiError(
          `No se encontraron registros para el id: ${id}`,
          404
        );
      }

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model getById: ${(error as Error).message}`,
        500
      );
    }
  }

  async getOne(filter: any): Promise<INotification | null> {
    try {
      const result = await this.model.findOne(filter);

      /*if (!result) {
        throw new ApiError(
          `No se encontraron registros para el filtro: ${filter}`,
          404
        );
      }*/

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model getOne: ${(error as Error).message}`,
        500
      );
    }
  }

  async create(data: INotification): Promise<INotification | null> {
    try {
      const created = await this.model.create(data);
      return created;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model create: ${(error as Error).message}`,
        500
      );
    }
  }

  async update(id: string, data: Partial<INotification>): Promise<INotification | null> {
    try {
      const updated = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updated) {
        throw new ApiError(
          `No se encontraron registros para el id: ${id}`,
          404
        );
      }

      return updated;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model update: ${(error as Error).message}`
      );
    }
  }

  async softDelete(id: string): Promise<INotification | null> {
    try {
      const softDeleted = await this.model.findByIdAndUpdate(
        id,
        { is_active: false },
        { new: false }
      );

      if (!softDeleted) {
        throw new ApiError(
          `No se encontraron registros para el id: ${id}`,
          404
        );
      }

      return softDeleted;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model softDelete: ${(error as Error).message}`
      );
    }
  }

  async strongDelete(id: string): Promise<INotification | null> {
    try {
      const strongDeleted = await this.model.findByIdAndDelete(id);

      if (!strongDeleted) {
        throw new ApiError(
          `No se encontraron registros para el id: ${id}`,
          404
        );
      }

      return strongDeleted;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Error Notification model strongDelete: ${(error as Error).message}`
      );
    }
  }
}

export default new NotificationService();
