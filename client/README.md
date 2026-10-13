# Tastefy · Front end

Interfaz de Tastefy, hecha con **React 18** y **Vite**. Consume la API de [`../server`](../server/README.md).

## Tecnologías

- React 18 + Vite 6
- React Router (`createBrowserRouter`, loaders para rutas privadas)
- Context API para la sesión del usuario
- CSS propio: variables, glassmorphism, grid, `clamp()` para tamaños fluidos
- Fuentes: Fredoka, Poppins y Dancing Script (Google Fonts)
- Cloudinary para las fotos de las recetas

## Puesta en marcha

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Necesita la API en marcha (ver el README del servidor).

### Variables de entorno

Crea `client/.env`:

```
VITE_API_URL=http://localhost:4000
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
VITE_CLOUDINARY_PRESET=tastefy_recipes
```

Vite solo lee el `.env` al arrancar: si lo cambias, reinicia `npm run dev`.

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build para probarlo |
| `npm run lint` | Revisa el código con ESLint |

## Rutas

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

Las rutas privadas usan `authLoader`, que comprueba el token antes de pintar la página y
redirige a `/login` si no existe.

## Estructura

```
src/
├── components/   # RecipeCard, RecipeCarousel, RecipeFilters, Pagination,
│                 # LikeButton, ConfirmModal, Footer, iconos...
├── constants/    # Categorías y dificultades
├── context/      # AuthContext y AuthProvider
├── hooks/        # useAuth
├── layouts/      # MainLayout (nav fijo + footer)
├── loaders/      # authLoader (protege rutas privadas)
├── pages/        # Una página por ruta
├── routes/       # router.jsx
├── services/     # authService, recipeService, userService, imageService
├── index.css     # Estilos globales y variables de diseño
└── main.jsx
public/           # Fondo, logo y favicon
```

## Cómo funciona

- **Sesión:** `AuthProvider` guarda el token y el usuario en `localStorage`, y `useAuth()`
  los expone a toda la app.
- **Servicios:** cada llamada a la API vive en `services/` y pasa por un `handleResponse`
  común que convierte los errores del servidor en excepciones.
- **Filtros, orden y paginación:** se hacen en el cliente sobre la lista de recetas
  (búsqueda sin distinguir tildes ni mayúsculas).
- **Me gusta:** cada receta guarda los ids de los usuarios que le dieron like. El botón sabe
  si va lleno comprobando si tu id está en esa lista, y cada usuario ve su propio estado.
- **Subida de fotos:** el usuario elige una imagen de su galería, se valida (tipo y máximo
  5 MB), se sube a Cloudinary con un *upload preset* sin firma y la URL resultante se guarda
  en el campo `image` de la receta.

## Diseño

- Tema oscuro azul-morado con paleta cian y violeta, definida con variables CSS.
- Tarjetas de receta con foto a todo tamaño y panel de cristal (`backdrop-filter`).
- Nav fijo, y tamaños que escalan con la pantalla (`html { font-size: clamp(...) }`).
- Fondo común a todas las páginas.

## Pendiente

- Diseño responsive para móvil y tablet
- Página de perfil público (`/users/:id`)