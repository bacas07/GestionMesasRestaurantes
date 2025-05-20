// Paquete mas importante
import express from 'express';
import { Request, Response, NextFunction } from 'express';

// Metodo de conexion a la base de datos
import { connectDB } from './database/mongo.js';

// Rutas principales
import UserRouter from './routes/user.routes.js';
import ReservationRouter from './routes/reservation.routes.js';
import TableRouter from './routes/table.routes.js';

// Importando gestor de errores
import { errorHandler } from './middlewares/custom/errorHandler.js';

// Importando CORS para configuracion de accesos al servidor
import cors from 'cors';

// Declarando puerto de entrada al servidor
const PORT = process.env.PORT || 5000;

// Instanciando la clase express
const server = express();

// Configuracion muy muy basica de cors, Cambiar mas adelante
server.use(cors());

// Incluir lectura de json a nuestro server
server.use(express.json());

// Creando ruta principal del servidor
server.get('', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'Bienvenido al Sistema de Reservas' });
});

server.use('/user', UserRouter);
server.use('/reservation', ReservationRouter);
server.use('/table', TableRouter);

server.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`> Server activo en puerto: ${PORT}`);
    });
  } catch (error) {
    console.error(`Error activando el servidor -> ${(error as Error).message}`);
    process.exit(1);
  }
};

startServer();
