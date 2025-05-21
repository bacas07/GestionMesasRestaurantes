A continuación se presenta la **documentación completa** de los endpoints disponibles en la aplicación, organizada por recurso (**admin**, **users**, **tables**, **reservations**). Para cada ruta se indica:

* **Método HTTP**: Verbo utilizado.
* **Endpoint**: Ruta completa (asumiendo prefijo `/api/{recurso}`).
* **Descripción**: Función que cumple.
* **Parámetros de URL / Query**: Campos en la ruta o query.
* **Body (JSON)**: Objeto esperado en el cuerpo de la petición.

---

## 1. Admin (prefijo `/admin`)

| Método | Endpoint | Descripción | Params URL/Query | Body (JSON) |
| :----- | :------- | :---------- | :--------------- | :---------- |
| `GET` | `/getall` | Obtener todos los administradores | — | — |
| `GET` | `/getallactive` | Obtener administradores activos | — | — |
| `GET` | `/getallunactive` | Obtener administradores inactivos | — | — |
| `GET` | `/getbyid/:id` | Obtener administrador por ID | `id` (string) | — |
| `GET` | `/getone/:filter` | Obtener un admin según filtro JSON | `filter` (string)¹ | — |
| `POST` | `/create` | Crear nuevo administrador | — | `{ email: string, password: string }` |
| `PUT` | `/update/:id` | Actualizar administrador | `id` (string) | `{ email?: string, password?: string }` |
| `DELETE` | `/softdelete/:id` | Desactivar (soft delete) admin | `id` (string) | — |
| `DELETE` | `/strongdelete/:id` | Eliminar definitivamente admin | `id` (string) | — |
| `POST` | `/login` | Autenticar admin y obtener token | — | `{ email: string, password: string }` |

¹ El parámetro `filter` se recibe como string con un JSON serializado (p.ej. `filter={"email":"admin@..."}`).

---

## 2. Users (prefijo `/user`)

| Método | Endpoint | Descripción | Params URL/Query | Body (JSON) |
| :----- | :------- | :---------- | :--------------- | :---------- |
| `GET` | `/getall` | Obtener todos los usuarios | — | — |
| `GET` | `/getallactive` | Obtener usuarios activos | — | — |
| `GET` | `/getallunactive` | Obtener usuarios inactivos | — | — |
| `GET` | `/getbyid/:id` | Obtener usuario por ID | `id` (string) | — |
| `GET` | `/getone/:filter` | Obtener un usuario según filtro | `filter` (string)¹ | — |
| `POST` | `/create` | Crear nuevo usuario | — | ``{ name: string, email: string, password: string, number?: string, role?: "user"}` |
| `PUT` | `/update/:id` | Actualizar usuario | `id` (string) | Igual al body de create, todos opcionales |
| `DELETE` | `/softdelete/:id` | Desactivar (soft delete) usuario | `id` (string) | — |
| `DELETE` | `/strongdelete/:id` | Eliminar definitivamente usuario | `id` (string) | — |

¹ Mismo comportamiento de filtro JSON que en Admin.

---

## 3. Tables (prefijo `/table`)

| Método | Endpoint | Descripción | Params URL/Query | Body (JSON) |
| :----- | :------- | :---------- | :--------------- | :---------- |
| `GET` | `/getall` | Obtener todas las mesas | — | — |
| `GET` | `/getallactive` | Obtener mesas activas | — | — |
| `GET` | `/getallunactive` | Obtener mesas inactivas | — | — |
| `GET` | `/getbyid/:id` | Obtener mesa por ID | `id` (string) | — |
| `GET` | `/getone/:filter` | Obtener mesa según filtro | `filter` (string)¹ | — |
| `POST` | `/create` | Crear nueva mesa | — | `{ name: string, capacity: string, location: <enum>, status?: <enum>, is_active?: boolean }` |
| `PUT` | `/update/:id` | Actualizar mesa | `id` (string) | Igual al schema de creación, todos campos opcionales |
| `DELETE` | `/softdelete/:id` | Desactivar (soft delete) mesa | `id` (string) | — |
| `DELETE` | `/strongdelete/:id` | Eliminar definitivamente mesa | `id` (string) | — |

¹ Filtro JSON serializado.

---

## 4. Reservations (prefijo `/reservation`)

| Método | Endpoint | Descripción | Params URL/Query | Body (JSON) |
| :----- | :------- | :---------- | :--------------- | :---------- |
| `GET` | `/getall` | Obtener todas las reservaciones | — | — |
| `GET` | `/getallactive` | Obtener reservaciones activas | — | — |
| `GET` | `/getallunactive` | Obtener reservaciones inactiva | — | — |
| `GET` | `/getbyid/:id` | Obtener reservación por ID | `id` (string) | — |
| `GET` | `/getone/:filter` | Obtener reserva según filtro | `filter` (string)¹ | — |
| `GET` | `/getbydate/:date` | Obtener reservaciones para un dia | `date` (s-tring) | — |
| `POST` | `/create` | Crear nueva reservación | — | ``{ userId: string, tableId: string, date: string, hour: string, people: number, status?: "pending"}` |
| `PUT` | `/update/:id` | Actualizar reservación | `id` (string) | Igual al schema de creación, campos opcionales |
| `DELETE` | `/softdelete/:id` | Desactivar (soft delete) reservación | `id` (string) | — |
| `DELETE` | `/strongdelete/:id` | Eliminar definitivamente reservación | `id` (string) | — |

¹ Para `/getone/:filter` se espera un JSON serializado como string.

---

**Nota**: Todos los endpoints que requieren autenticación de administrador usan el middleware `verifyAdminToken`. Las rutas comentadas o en desarrollo (`/register` en Users) no están activas.

Con esta documentación, el equipo de frontend podrá comprender rápidamente qué rutas existen, cómo invocarlas y qué datos enviar o recibir en cada caso.