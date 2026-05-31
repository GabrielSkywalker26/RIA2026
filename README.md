# Trabajo Practico: Aplicacion RIA (Rich Internet Application)

Aplicacion RIA para Rich Internet Applications (UTU, ESI Buceo, 2026). El proyecto esta desarrollado con React, TypeScript, Vite, Bootstrap y Docker, consume APIs publicas de forma asincronica y no utiliza backend propio ni base de datos.

## 1. Objetivo y Alcance

El objetivo de este proyecto es desarrollar una aplicacion web funcional del tipo RIA utilizando React. Se aplica un ciclo de desarrollo que abarca desde la concepcion del diseno visual hasta la documentacion, testing automatizado y optimizacion de rendimiento.

### Requerimientos del Proyecto Cumplidos

- **Framework:** desarrollo basado en componentes utilizando React.
- **Interfaz de Usuario:** diseno e implementacion con Bootstrap para garantizar consistencia visual y responsividad.
- **Navegacion:** enrutamiento en el cliente con rutas diferenciadas mediante React Router.
- **Arquitectura de Datos:** consumo exclusivo de APIs publicas y manejo de persistencia ligera del lado del cliente mediante LocalStorage si aplica. Sin backend ni base de datos propia.

## 2. Herramientas y Tecnologias Utilizadas

- **Diseno de UI:** Figma.
- **Frontend:** React y TypeScript.
- **Estilos y UI:** Bootstrap.
- **Enrutamiento:** React Router.
- **Consumo de APIs:** Fetch API para la comunicacion asincronica con servicios externos.
- **Entorno de desarrollo:** Vite.
- **Contenedores:** Docker y Docker Compose.
- **API publica consumida:** [Dog API (dog.ceo)](https://dog.ceo/dog-api/) para la obtencion de imagenes aleatorias y filtrado por razas.

## 3. Instalacion y Ejecucion Local

### Prerrequisitos

Tener instalado Docker Desktop.

### Levantar la app

Desde la raiz del repositorio:

```bash
docker compose up --build
```

La aplicacion queda disponible en:

```text
http://localhost:5173
```

Comandos utiles:

- Segundo plano: `docker compose up --build -d`
- Frenar: `docker compose down`
- Rebuild limpio: `docker compose build --no-cache` y despues `docker compose up`

## 4. Variables de Entorno

- `.env.example`: plantilla versionada.
- `.env`: archivo local opcional, no se sube a Git.
- Si no se crea `.env`, Docker usa `https://dog.ceo/api` por defecto.

Para crear el archivo local:

```bash
cp .env.example .env
```

## 5. Rutas

- `/`: inicio.
- `/fotos`: fotos aleatorias de perros.
- `/razas`: selector de razas y navegacion de fotos.
- `/aboutus`: informacion sobre el proyecto.

## 6. Calidad de Software y Testing

### Pruebas Unitarias

- **Objetivo:** verificar el funcionamiento de componentes de React aislados y funciones de utilidad.
- **Herramientas:** Vitest/Jest junto con React Testing Library, segun configuracion del proyecto.
- **Alcance:** renderizado correcto de componentes, manejo de estados internos y eventos basicos.

### Pruebas de Integracion

- **Objetivo:** validar la interaccion entre componentes, navegacion entre rutas y comportamiento frente al consumo de APIs simuladas.
- **Herramientas:** Playwright.
- **Alcance:** simulacion de flujos de usuario completos.

### Auditoria de Rendimiento y UX

La aplicacion apunta a superar un puntaje mayor a 80 en las metricas clave de Google Lighthouse:

- **Performance:** optimizacion de carga y renderizado de imagenes externas.
- **Accessibility:** HTML semantico, etiquetas `alt` descriptivas y contraste adecuado.
- **Best Practices:** consumo de APIs por HTTPS y codigo libre de errores en consola.
- **SEO:** meta-etiquetas y estructura de encabezados.

## 7. Estructura del Repo

```text
.
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── frontend/
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── assets/favicon.png
        ├── components/layout/
        ├── pages/
        ├── services/
        ├── main.tsx
        └── index.css
```

## 8. Entrega

Pre-entrega: 1 de junio de 2026. Prorroga posible: 15 de junio de 2026.

No incluir en Git: `.env`, `node_modules/` ni `frontend/dist/`.
