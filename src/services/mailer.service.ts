import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import ApiError from '../errors/apiError.js';
import { config } from 'dotenv';
import type { INotification } from '../types/types.js';

const { GOOGLE_EMAIL, GOOGLE_APP_PASSWORD } = process.env;
let transporter: Transporter;

const initializeMailer = async (): Promise<void> => {
  try {
    if (!GOOGLE_EMAIL || !GOOGLE_APP_PASSWORD) {
      throw new ApiError('No se encontraron credenciales de email', 500);
    }

    transporter = createTransport({
      service: 'gmail',
      auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_APP_PASSWORD,
      },
    });

    console.log('Nodemailer configurado con contraseña de aplicación');
  } catch (error) {
    throw new ApiError(
      `No se pudo configurar Nodemailer -> ${(error as Error).message}`,
      500
    );
  }
};

/**
 * Envía un correo según los datos de notificación.
 * @param mailOptions - Objeto INotification con data para el correo
 * @throws ApiError en caso de fallo en el envío
 */
const sendMail = async (mailOptions: INotification): Promise<void> => {
  if (!transporter) {
    await initializeMailer();
  }

  // Construcción del cuerpo del mensaje
  let textBody = '';
  let htmlBody = '';

  switch (mailOptions.type) {
    case 'confirmation':
      textBody = `Hola!\n\nTu reserva ha sido confirmada para el ${mailOptions.date}.\nGracias por elegirnos.`;
      htmlBody = `<p>Hola!</p><p>Tu reserva ha sido <strong>confirmada</strong> para el ${new Date(
        mailOptions.date
      ).toLocaleString()}.</p><p>Gracias por elegirnos.</p>`;
      break;

    case 'reminder':
      textBody = `¡Hola!\n\nEste es un recordatorio de tu reserva para el ${mailOptions.date}.\nTe esperamos.`;
      htmlBody = `<p>¡Hola!</p><p>Este es un <strong>recordatorio</strong> de tu reserva para el ${new Date(
        mailOptions.date
      ).toLocaleString()}.</p><p>¡Te esperamos!</p>`;
      break;

    case 'cancellation':
      textBody = `Hola, lamentamos informarte que tu reserva para el ${mailOptions.date} ha sido cancelada.\nPor favor contáctanos si necesitas más información.`;
      htmlBody = `<p>Hola,</p><p><strong>Tu reserva ha sido cancelada</strong> para el ${new Date(
        mailOptions.date
      ).toLocaleString()}.</p><p>Por favor contáctanos si necesitas más información.</p>`;
      break;

    // Agrega más tipos de notificaciones según necesidad:
    // case 'update':
    //   textBody = `...`;
    //   htmlBody = `...`;
    //   break;

    default:
      textBody = mailOptions.subject;
      htmlBody = `<p>${mailOptions.subject}</p>`;
  }

  try {
    await transporter.sendMail({
      from: `Restaurante Ficticio <${GOOGLE_EMAIL}>`,
      to: mailOptions.recipient,
      subject: mailOptions.subject,
      text: textBody,
      html: htmlBody,
    });
  } catch (error) {
    console.error('Error enviando correo:', error);
    throw new ApiError(
      `Error enviando correo -> ${(error as Error).message}`,
      500
    );
  }
};

export default sendMail;
