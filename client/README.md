# 🍳 TASTEFY Front end

Interfaz de **TASTEFY**, una red social de recetas. Hecha con **React** y **Vite**, consume la API de [`../server`](../server/README.md): los usuarios se registran, publican sus recetas con foto, las filtran, dan "me gusta" y guardan sus favoritas.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

## 🛠️ Tecnologías

- **React 18 + Vite 6**: interfaz y entorno de desarrollo
- **React Router**: rutas con `createBrowserRouter` y loaders para las rutas privadas
- **Context API**: sesión del usuario (`AuthProvider` y `useAuth`)
- **CSS propio**: variables, glassmorphism, grid y `clamp()` para tamaños fluidos
- **Google Fonts**: Fredoka, Poppins y Dancing Script
- **ESLint**: revisión del código

## 📁 Estructura

```
client/
├── public/                        Fondo, logo y favicon
├── src/
│   ├── components/
│   │   ├── RecipeCard.jsx         Card con foto y panel de cristal
│   │   ├── RecipeCarousel.jsx     Carrusel de 4 en 4 (Home)
│   │   ├── RecipeFilters.jsx      Búsqueda, categoría, dificultad y orden
│   │   ├── Pagination.jsx
│   │   ├── LikeButton.jsx
│   │   ├── ConfirmModal.jsx       Ventana de confirmación al borrar
│   │   ├── Footer.jsx
│   │   └── UserIcon.jsx / BrandIcons.jsx
│   ├── constants/
│   │   └── recipe.js              Categorías y dificultades
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── AuthProvider.jsx       Sesión en localStorage
│   ├── hooks/
│   │   └── useAuth.js
│   ├── layouts/
│   │   └── MainLayout.jsx         Nav fijo + contenido + footer
│   ├── loaders/
│   │   └── authLoader.js          Protege las rutas privadas
│   ├── pages/                     Una página por ruta
│   ├── routes/
│   │   └── router.jsx
│   ├── services/
│   │   ├── authService.js
│   │   ├── recipeService.js
│   │   ├── userService.js
│   │   └── imageService.js        Subida de imágenes
│   ├── index.css                  Estilos globales y variables de diseño
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── README.md
```

## ⚙️ Instalación

Necesitas la API en marcha (ver el [README del servidor](../server/README.md)).

```bash
cd client
npm install
```

Crea `client/.env`:

```
VITE_API_URL=http://localhost:4000
```

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL de la API (sin barra al final) |

Vite solo lee el `.env` al arrancar: si lo cambias, reinicia `npm run dev`.

## 📜 Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Arranca el servidor de desarrollo |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Sirve el build para probarlo |
| `npm run lint` | Revisa el código con ESLint |

La web queda en `http://localhost:5173`.

## 🧭 Rutas

| Ruta | Página | Acceso |
|---|---|---|
| `/` | Home: hero, nuevas recetas y más gustadas | Pública |
| `/recipes` | Despensa: filtros, orden y paginación | Pública |
| `/recipes/:id` | Detalle de receta | Pública |
| `/users/:id` | Perfil público | Pública |
| `/about` | Sobre nosotros | Pública |
| `/contact` | Contacto | Pública |
| `/login` | Iniciar sesión | Pública |
| `/register` | Crear cuenta | Pública |
| `/likes` | Recetas que me gustan | Privada |
| `/dashboard` | Mi Cocina | Privada |
| `/dashboard/recipes/new` | Nueva receta | Privada |
| `/dashboard/recipes/:id/edit` | Editar receta | Privada |

Las rutas privadas usan `authLoader`, que comprueba el token antes de pintar la página y redirige a `/login` si no existe.

## ✨ Funcionalidades

- **Registro e inicio de sesión** con sesión guardada en `localStorage`.
- **Home** con hero, carrusel de "Nuevas recetas" y carrusel de "Los más gustados".
- **Despensa** con búsqueda de texto (título, descripción e ingredientes, sin distinguir tildes ni mayúsculas), filtros por tipo de comida y dificultad, orden por fecha o por likes y paginación.
- **Mi Cocina**: crear, editar y borrar tus recetas, con ventana de confirmación antes de borrar.
- **Subida de fotos** desde la galería del usuario.
- **Me gusta** sincronizados por usuario y página con todas las recetas que te gustan.
- **Nav fijo**, footer y páginas de Sobre nosotros y Contacto.

## ⚙️ Cómo funciona

- **Sesión:** `AuthProvider` guarda el token y el usuario en `localStorage` y `useAuth()` los expone a toda la app.
- **Servicios:** cada llamada a la API vive en `services/` y pasa por un `handleResponse` común que convierte los errores del servidor en excepciones.
- **Filtros, orden y paginación:** se hacen en el cliente sobre la lista de recetas.
- **Me gusta:** cada receta guarda los ids de los usuarios que le dieron like. El botón sabe si va lleno comprobando si tu id está en esa lista, así cada usuario ve su propio estado.
- **Subida de fotos:** el usuario elige una imagen en el formulario de receta. Se valida (JPG, PNG o WEBP, máximo 5 MB), se envía con `FormData` y el token a `POST /upload`, y la API la sube a Cloudinary. La URL que devuelve se guarda en el campo `image`. El front **no tiene claves de Cloudinary**.

## 🎨 Diseño

- Tema oscuro azul-morado con paleta cian y violeta, definida con variables CSS.
- Cards con la foto a todo el tamaño y un panel de cristal (`backdrop-filter`) de altura fija.
- Todas las fotos se muestran en la misma proporción con `object-fit: cover`.
- Nav fijo y tamaños que escalan con la pantalla (`html { font-size: clamp(...) }`).
- Fondo común a todas las páginas.

## 🚀 Próximas versiones

- [x] Subida de fotos desde la galería
- [x] Me gusta y página de favoritos
- [ ] Diseño responsive para móvil y tablet
- [ ] Cerrar sesión automáticamente cuando el token caduque