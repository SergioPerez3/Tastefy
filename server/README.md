# 🍳 TASTEFY API

API REST del proyecto **TASTEFY**, una red social de recetas. Los usuarios se registran, publican sus recetas con foto, dan "me gusta" y pueden ver los perfiles de otros usuarios con sus recetas.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6C37?style=for-the-badge)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

## 🛠️ Tecnologías

- **Node.js + Express 5**: servidor y rutas
- **MongoDB Atlas + Mongoose**: base de datos y modelos
- **JWT**: autenticación con token
- **bcryptjs**: contraseñas cifradas
- **Multer**: recibe las imágenes que envía el usuario
- **Cloudinary**: almacenamiento y optimización de las fotos
- **CORS y dotenv**: peticiones desde el front y variables de entorno
- **Nodemon**: reinicio automático en desarrollo
- **Mocha, Chai y Supertest**: tests de integración

## 📁 Estructura

```
server/
├── src/
│   ├── config/
│   │   ├── db.js                  Conexión a MongoDB
│   │   └── cloudinary.js          Configuración de Cloudinary
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── recipe.controller.js
│   │   ├── upload.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js     Verificación del token (isAuth)
│   │   └── upload.middleware.js   Multer: tipo y tamaño de la imagen
│   ├── models/
│   │   ├── User.js
│   │   └── Recipe.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── recipe.routes.js
│   │   ├── upload.routes.js
│   │   └── user.routes.js
│   ├── seeders/
│   │   └── recipe.seeder.js       Usuarios y recetas de ejemplo
│   ├── app.js                     Configuración de Express
│   └── index.js                   Arranque del servidor
├── test/
│   ├── setup.js                   Carga .env.test y conecta a la base de datos
│   ├── app.test.js
│   ├── auth.test.js
│   ├── recipes.test.js
│   ├── users.test.js
│   ├── likes.test.js
│   └── upload.test.js
├── .env.example
├── .env.test                      (no se sube al repositorio)
├── .mocharc.json                  Configuración de Mocha
├── package.json
└── README.md
```

## ⚙️ Instalación

```bash
cd server
npm install
```

Crea un archivo `.env` a partir del ejemplo y rellénalo:

```bash
cp .env.example .env
```

| Variable | Descripción |
|---|---|
| `MONGO_URI` | Cadena de conexión de MongoDB (incluye el nombre de la base de datos: `recipehub`) |
| `PORT` | Puerto del servidor (por defecto `4000`) |
| `JWT_SECRET` | Clave secreta para firmar los tokens |
| `CLOUDINARY_CLOUD_NAME` | Cloud name de tu cuenta de Cloudinary (Settings → API Keys) |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary (privado, no se sube nunca a Git) |

## 📜 Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Arranca el servidor con nodemon (se reinicia al guardar) |
| `npm start` | Arranca el servidor con Node |
| `npm run seed` | Borra y recrea los usuarios y recetas de ejemplo |
| `npm test` | Ejecuta los tests con Mocha |

El servidor queda en `http://localhost:4000`.

## 🌱 Seeder

`npm run seed` crea 3 usuarios de ejemplo (**Saladman**, **Veganmix** y **VacaLola**, todos con contraseña `123456`), 20 recetas con fechas repartidas y likes entre ellos. Solo toca sus propios datos: tu cuenta real y tus recetas no se borran. Después de cada seed hay que volver a iniciar sesión.

## 🧪 Tests

Tests de integración con **Mocha**, **Chai** y **Supertest**. Comprueban la API completa contra una base de datos de pruebas.

### Configuración

Crea `server/.env.test` con las mismas variables que `.env`, pero apuntando a **otra base de datos**:

```
MONGO_URI=<tu URL de Atlas>/recipehub_test?retryWrites=true&w=majority
PORT=4001
JWT_SECRET=secreto_de_test
```

Los tests borran datos, así que `test/setup.js` se niega a arrancar si `MONGO_URI` no contiene `test`. Así nunca se tocan los datos reales. Los tests de subida **no llaman a Cloudinary**: solo comprueban las validaciones.

### Ejecutar

```bash
npm test
```

### Qué se prueba

| Archivo | Cubre |
|---|---|
| `app.test.js` | Mensaje de bienvenida |
| `auth.test.js` | Registro, validaciones (422), email duplicado (400), login correcto y credenciales inválidas (401) |
| `recipes.test.js` | Crear con y sin token, campos obligatorios, ver por id, id inválido (400), no encontrada (404), editar y borrar, y que otro usuario no pueda hacerlo (403) |
| `users.test.js` | Perfil público con sus recetas, sin email ni contraseña, id inválido (400) y usuario inexistente (404) |
| `likes.test.js` | Dar y quitar me gusta, sin token (401), que no se duplique y la lista de recetas que te gustan |
| `upload.test.js` | Subida sin token (401), sin imagen (400) y con un archivo que no es imagen (400) |

## 🗃️ Modelos

### User

| Campo | Tipo | Notas |
|---|---|---|
| `name` | String | Obligatorio |
| `email` | String | Obligatorio, único, en minúsculas |
| `password` | String | Obligatorio, cifrada. No se devuelve en las consultas |

### Recipe

| Campo | Tipo | Notas |
|---|---|---|
| `title` | String | Obligatorio |
| `description` | String | Opcional |
| `image` | String | Opcional. URL de la imagen (Cloudinary) |
| `ingredients` | String | Obligatorio. Un ingrediente por línea |
| `steps` | String | Obligatorio. Un paso por línea |
| `category` | String | `desayuno`, `comida`, `cena`, `postre`, `snack`, `otros` (por defecto `otros`) |
| `difficulty` | String | `fácil`, `media`, `difícil` (por defecto `fácil`) |
| `cookingTime` | Number | Minutos (por defecto `0`) |
| `author` | ObjectId | Referencia a `User`. Se asigna desde el token |
| `likes` | [ObjectId] | Ids de los usuarios a los que les gusta. No se edita desde `PUT` |

Ambos modelos incluyen `createdAt` y `updatedAt`.

## 🔐 Autenticación

Las rutas protegidas necesitan el token que devuelve el login en la cabecera:

```
Authorization: Bearer <token>
```

El token caduca a los 7 días.

## 📡 Endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/auth/register` | No | Registrar usuario |
| POST | `/auth/login` | No | Iniciar sesión |
| GET | `/recipes` | No | Listar recetas (más recientes primero) |
| GET | `/recipes/liked` | Sí | Recetas a las que has dado me gusta |
| GET | `/recipes/:id` | No | Ver una receta |
| POST | `/recipes` | Sí | Crear receta |
| PUT | `/recipes/:id` | Sí (autor) | Editar receta |
| DELETE | `/recipes/:id` | Sí (autor) | Eliminar receta |
| POST | `/recipes/:id/likes` | Sí | Dar me gusta |
| DELETE | `/recipes/:id/likes` | Sí | Quitar me gusta |
| POST | `/upload` | Sí | Subir una imagen (devuelve su URL) |
| GET | `/users/:id` | No | Perfil público con sus recetas |

> `/recipes/liked` está declarada **antes** que `/recipes/:id`; si no, Express entendería `liked` como un id.

### Ejemplos

**POST `/auth/register`**

```json
{
  "name": "Sergio",
  "email": "sergio@test.com",
  "password": "123456"
}
```

Respuesta `201`:

```json
{
  "message": "Usuario registrado correctamente",
  "user": { "_id": "...", "name": "Sergio", "email": "sergio@test.com" }
}
```

**POST `/auth/login`**

```json
{
  "email": "sergio@test.com",
  "password": "123456"
}
```

Respuesta `200`:

```json
{
  "message": "Inicio de sesión correctamente",
  "token": "eyJhbGciOi...",
  "user": { "_id": "...", "name": "Sergio", "email": "sergio@test.com" }
}
```

**POST `/upload`** (requiere token)

Se envía como `multipart/form-data` con el archivo en el campo `image`. Admite JPG, PNG y WEBP de hasta 5 MB.

Respuesta `201`:

```json
{
  "message": "Imagen subida",
  "url": "https://res.cloudinary.com/.../tastefy/abc123.jpg"
}
```

Esa URL se manda después en el campo `image` al crear o editar una receta.

**POST `/recipes`** (requiere token)

```json
{
  "title": "Tortilla de patatas",
  "description": "La clásica",
  "image": "https://res.cloudinary.com/.../tastefy/abc123.jpg",
  "ingredients": "4 patatas\n6 huevos\n1 cebolla\nAceite de oliva\nSal",
  "steps": "Pela y corta las patatas\nFríelas a fuego lento\nMezcla con el huevo batido\nCuaja la tortilla por ambos lados",
  "category": "cena",
  "difficulty": "media",
  "cookingTime": 40
}
```

Respuesta `201`:

```json
{
  "message": "Receta creada correctamente",
  "recipe": { "_id": "...", "title": "Tortilla de patatas", "author": "..." }
}
```

**POST `/recipes/:id/likes`** (requiere token)

Respuesta `200`:

```json
{
  "message": "Me gusta añadido",
  "likes": ["<id de usuario>", "..."]
}
```

**GET `/users/:id`**

```json
{
  "user": { "_id": "...", "name": "Sergio", "createdAt": "..." },
  "recipes": [ { "_id": "...", "title": "Tortilla de patatas" } ]
}
```

## 📋 Códigos de respuesta

| Código | Cuándo |
|---|---|
| `200` / `201` | Petición correcta / recurso creado |
| `400` | ID no válido, correo ya registrado, imagen ausente o con formato no válido |
| `401` | Credenciales inválidas, token ausente o no válido |
| `403` | Intentas editar o borrar una receta que no es tuya |
| `404` | Receta o usuario no encontrado |
| `413` | La imagen pesa más de 5 MB |
| `422` | Faltan campos o no son válidos |
| `500` | Error del servidor |

## 📝 Notas

- El `author` de una receta siempre sale del token, nunca del body.
- Solo el autor puede editar o eliminar su receta.
- Los `likes` se guardan dentro de la receta con `$addToSet` (no se duplican) y `$pull`.
- El perfil público (`/users/:id`) no expone el email.
- Las imágenes se validan en el servidor (JPG, PNG o WEBP, máximo 5 MB), se recortan a **4:3 (1200×900)** y se optimizan en Cloudinary, en la carpeta `tastefy`.
- Si `mongodb+srv` falla con `querySrv ECONNREFUSED`, el DNS de tu red está bloqueando la consulta. En `index.js` y en `test/setup.js` se fuerzan los DNS de Google y Cloudflare para evitarlo.

## 🚀 Próximas versiones

- [x] Tests con Mocha, Chai y Supertest
- [x] Seeders con datos de ejemplo
- [x] Likes
- [x] Subida de imágenes
- [ ] Borrar de Cloudinary las imágenes que ya no se usan