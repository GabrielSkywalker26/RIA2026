# RIA 2026 — Tarea 2

Aplicación RIA para Rich Internet Applications (UTU, ESI Buceo, 2026). Consume APIs públicas según el tema del grupo; sin backend propio ni base de datos (solo LocalStorage si hace falta).

**Stack:** React, TypeScript, Vite, Bootstrap, Docker.

## Cómo levantar la app

Un solo entorno de desarrollo (Vite en el puerto 5173):

- `docker compose up --build` → [http://localhost:5173](http://localhost:5173)
- Segundo plano: `docker compose up --build -d`
- Frenar: `docker compose down`
- Rebuild limpio: `docker compose build --no-cache` y después `docker compose up`

## Variables de entorno

- `.env.example` — plantilla versionada (copiar si hace falta).
- `.env` — opcional, local, **no se sube a Git** (está en `.gitignore`).
- Si no creás `.env`, Docker usa `https://dog.ceo/api` por defecto.

```bash
cp .env.example .env   # solo si van a cambiar VITE_API_BASE_URL
```

## Estructura del repo

```
.
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── frontend/
    ├── Dockerfile          # Vite dev (único contenedor)
    ├── package.json
    └── src/
        ├── assets/favicon.png
        ├── components/layout/   # AppLayout, Navbar
        ├── pages/                 # HomePage, ExplorePage
        ├── services/
        │   ├── httpClient.ts      # fetch a la API configurada
        │   └── api.ts             # endpoints de Dog CEO
        ├── main.tsx               # entrada, rutas y favicon
        └── index.css
```

## Rutas

- `/` — inicio
- `/fotos` — fotos aleatorias de perros
- `/razas` — selector de razas y botón Next
- `/explorar` — redirige a `/fotos`

## Requisitos del laboratorio (estado base)

- React + Bootstrap
- Mínimo 2 rutas
- API pública Dog CEO
- Pendiente según el grupo: LocalStorage si aplica, documentación de entrega

## Entrega

Pre-entrega: 1 de junio de 2026. Prórroga posible: 15 de junio.

## Primer commit

Incluir: `frontend/`, `docker-compose.yml`, `.env.example`, `.gitignore`, `README.md`.

No incluir: `.env`, `node_modules/`, `frontend/dist/`.
