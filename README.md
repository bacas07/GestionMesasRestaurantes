# API RESTful con Node.js, Express y TypeScript

Este proyecto expone una API RESTful construida con **Node.js** y **Express**, usando **TypeScript** compilado en la carpeta `dist`. Permite gestionar usuarios, mesas y reservas con operaciones **CRUD**, baja lógica/física y filtros de estado (`is_active`). Es ideal para integrarse con clientes frontend y desplegarse en plataformas como Heroku.

---

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1.  **Clonar el repositorio**

    ```bash
    git clone [https://github.com/bacas07/GestionMesasClientesProduccion](https://github.com/bacas07/GestionMesasClientesProduccion)
    cd tu_repo
    ```

2.  **Instalar dependencias**

    * Desde la raíz (solo instala herramientas de desarrollo):
        ```bash
        npm install
        ```
    * En la carpeta `dist` deben estar solo las dependencias de producción. Asegúrate de copiar el `package.json` definitivo allí antes de hacer deploy en Heroku.

3.  **Compilar TypeScript al directorio `dist`**

    ```bash
    npm run build
    ```

4.  **Configurar variables de entorno**

    Crea un archivo `.env` en la raíz de tu proyecto con al menos las siguientes variables:

    ```
    MONGODB_URI=<tu_uri_de_mongodb>
    JWT_SECRET_KEY=<tu_clave_secreta>
    PORT=5000
    ```

5.  **Ejecutar localmente**

    * Desde la raíz (modo desarrollo con hot-reload):
        ```bash
        npm run start:dev
        ```
    * O, para ejecutar la versión compilada desde `dist`:
        ```bash
        cd dist
        npm start
        ```

---

## Uso de la API

La base URL por defecto es: `http://localhost:5000`

Todas las rutas devuelven **JSON** y utilizan **códigos HTTP estándares** (200, 201, 400, 404, 500, etc.), gestionados por el middleware `errorHandler`.

### Autenticación (opcional)

Para rutas protegidas, envía el siguiente encabezado en tus peticiones:


---

## Endpoints

### Usuarios (`/user`)

| MÉTODO | RUTA                     | DESCRIPCIÓN                                        |
| :----- | :----------------------- | :------------------------------------------------- |
| `GET`  | `/user/getall`           | Lista todos los usuarios (activos e inactivos).    |
| `GET`  | `/user/getallactive`     | Solo usuarios con `is_active=true`.                |
| `GET`  | `/user/getallunactive`   | Solo usuarios con `is_active=false`.               |
| `GET`  | `/user/getbyid/:id`      | Obtiene usuario por `_id` (parámetro URL).         |
| `GET`  | `/user/getone?field=valor` | Primer match según query (e.g., `email`, `name`).  |
| `POST` | `/user/create`           | Crea un nuevo usuario. Body: `{ name, email, phone? }`. |
| `PUT`  | `/user/update`           | Actualiza un usuario. Body: `{ id, campo1, campo2, ... }`. |
| `DELETE`|`/user/softdelete/:id`   | Baja lógica (establece `is_active=false`).         |
| `DELETE`|`/user/strongdelete/:id` | Baja física (elimina el registro permanentemente). |

---

### Mesas (`/table`)

| MÉTODO | RUTA                     | DESCRIPCIÓN                                        |
| :----- | :----------------------- | :------------------------------------------------- |
| `GET`  | `/table/getall`          | Todas las mesas.                                   |
| `GET`  | `/table/getallactive`    | Mesas con `is_active=true`.                        |
| `GET`  | `/table/getallunactive`  | Mesas con `is_active=false`.                       |
| `GET`  | `/table/getbyid/:id`     | Mesa por `_id`.                                    |
| `GET`  | `/table/getone?field=valor`| Primer match (e.g., `capacity=4`).                 |
| `POST` | `/table/create`          | Crea una nueva mesa. Body: `{ number, capacity }`. |
| `PUT`  | `/table/update`          | Actualiza una mesa. Body: `{ id, campo... }`.      |
| `DELETE`|`/table/softdelete/:id`  | Baja lógica.                                       |
| `DELETE`|`/table/strongdelete/:id`| Baja física.                                       |

---

### Reservas (`/reservation`)

| MÉTODO | RUTA                               | DESCRIPCIÓN                                        |
| :----- | :--------------------------------- | :------------------------------------------------- |
| `GET`  | `/reservation/getall`              | Todas las reservas.                                |
| `GET`  | `/reservation/getallactive`        | Reservas con `is_active=true`.                     |
| `GET`  | `/reservation/getallunactive`      | Reservas con `is_active=false`.                    |
| `GET`  | `/reservation/getbyid/:id`         | Reserva por `_id`.                                 |
| `GET`  | `/reservation/getone?field=valor`  | Primer match (e.g., `date=2025-05-20`).            |
| `GET`  | `/reservation/getbyuserid?userId=…`| Filtra reservas por `userId`.                      |
| `GET`  | `/reservation/getbytableid?tableId=…`| Filtra reservas por `tableId`.                     |
| `POST` | `/reservation/create`              | Crea una reserva. Body: `{ userId, tableId, date: "YYYY-MM-DD", time: "HH:mm", people }`. |
| `PUT`  | `/reservation/update`              | Actualiza una reserva. Body: `{ id, campo... }`.   |
| `DELETE`|`/reservation/softdelete/:id`      | Baja lógica.                                       |
| `DELETE`|`/reservation/strongdelete/:id`    | Baja física.                                       |