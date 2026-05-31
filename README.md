# Trabajo Práctico: Aplicación RIA (BuscarPerros)

## 1. Objetivo y Alcance
El objetivo de este proyecto es desarrollar una aplicación web funcional del tipo RIA (Rich Internet Application) denominada **BuscarPerros** utilizando **React** para el consumo asíncrono de APIs públicas. Se aplica un ciclo de desarrollo profesional que abarca desde la concepción del diseño visual (Mockups de alta fidelidad) hasta la documentación, testing automatizado, contenerización y optimización de rendimiento.

### Requerimientos del Proyecto Cumplidos:
* **Framework Core:** Desarrollo moderno basado en componentes utilizando **React**.
* **Interfaz de Usuario (UI):** Implementación estilizada y responsiva utilizando el framework **Bootstrap 5**.
* **Navegación:** Implementación de enrutamiento en el cliente con 4 rutas/páginas diferentes mediante **React Router**.
* **Arquitectura de Datos (Restricciones):** Consumo exclusivo de una API pública externa. No se permite lógica de negocio propia ni bases de datos persistentes del lado del servidor.

---

## 2. Diseño de Interfaz (UI/UX)
El proceso de diseño se estructuró bajo un enfoque metodológico riguroso para garantizar la fidelidad visual y una navegación óptima antes de iniciar la etapa de codificación:
* **Fase de Mockups:** Se desarrollaron prototipos estáticos de alta fidelidad utilizando **Figma**, definiendo la paleta de colores, la jerarquía tipográfica y la iconografía del sitio.
* **Enfoque Responsive:** Gracias a las utilidades de grillas responsivas de **Bootstrap 5** (`Grid`, `Navbar`, `Col`, `Card`), la interfaz fue adaptada siguiendo la filosofía *Mobile-First*, garantizando consistencia visual tanto en dispositivos móviles como en pantallas de escritorio.

---

## 3. Herramientas y Tecnologías Utilizadas

En cumplimiento con las pautas de la materia, se detallan explícitamente las herramientas utilizadas en el ciclo de vida del proyecto:

* **Diseño Visual:** [Figma](https://www.figma.com/) (Mockups de alta fidelidad y exportación de assets).
* **Library Frontend:** React (Gestión de componentes y estados).
* **Entorno de Desarrollo y Empaquetador:** Vite (Entorno ágil con *Hot Module Replacement*).
* **Framework de Estilos:** Bootstrap 5 (Estructura de grillas, espaciados y componentes UI).
* **Enrutamiento:** React Router (Navegación fluida Single Page Application).
* **Consumo de Datos:** Fetch API para la comunicación asíncrona mediante promesas.
* **Infraestructura:** Docker + Docker Compose (Entorno aislado, consistente y portable).
* **API Pública Consumida:** Exclusivamente [Dog API (dog.ceo/api)](https://dog.ceo/dog-api/), utilizada para la obtención de imágenes aleatorias y el listado dinámico para el filtro de razas.

---

## 4. Calidad de Software y Testing

Para garantizar el cumplimiento de los estándares de una aplicación RIA profesional, el proyecto implementa una estrategia de pruebas en múltiples niveles y una auditoría estricta de rendimiento:
Pruebas Unitarias (Unit Tests)

    Objetivo: Verificar el correcto funcionamiento de los componentes de React aislados y las funciones de utilidad de forma individual.
    Herramientas: Vitest junto con React Testing Library.
    Alcance: Pruebas sobre el renderizado correcto de componentes, manejo de estados internos y eventos básicos (clicks, cambios en inputs).

Pruebas de Integración (Integration Tests)

    Objetivo: Validar la interacción fluida entre múltiples componentes, el flujo de navegación entre las distintas rutas y el comportamiento de la app al consumir las APIs simuladas (mocked).
    Herramientas: Playwright.
    Alcance: Simulación de flujos de usuario completos (ej: buscar una raza de perro, esperar la respuesta de la API, renderizar la imagen y navegar a la sección de detalles).

Auditoría de Rendimiento y UX (Lighthouse > 80)

La aplicación fue optimizada siguiendo las buenas prácticas de desarrollo web para superar un puntaje mayor a 80 en todas las métricas clave de Google Lighthouse:

    Performance (Rendimiento): Optimización de carga de imágenes externas de perros (uso de atributos de tamaño adaptables y carga perezosa o lazy loading).
    Accessibility (Accesibilidad): Uso de HTML semántico, etiquetas alt descriptivas en las imágenes dinámicas devueltas por la API y contraste de color adecuado mediante las clases del framework de UI.
    Best Practices (Buenas Prácticas): Uso de conexiones seguras (HTTPS) para el consumo de las APIs y código libre de errores en la consola.
    SEO: Configuración correcta de meta-etiquetas y estructura de encabezados para asegurar la indexación básica.

---

## 5. Configuración del Entorno (Docker)
El proyecto está completamente contenerizado para aislar el entorno de ejecución, evitando el clásico conflicto de versiones de Node.js locales:
* **Dockerfile:** Configurado en etapas (*multi-stage build*) para optimizar el peso de la imagen. La etapa final compila los archivos estáticos de React generados por **Vite** y los sirve de forma ultraeficiente.
* **Docker Compose:** Orquesta el mapeo de puertos y volúmenes necesarios para levantar el ecosistema con un solo comando.

---

## 6. Paso a Paso: Cómo Levantar el Sistema

Para construir y ejecutar esta aplicación en cualquier computadora sin necesidad de instalar dependencias locales, seguí estos pasos:

### Prerrequisitos
Tener instalado **Docker** en el sistema operativo.

### Pasos para la ejecución:
1. **Clonar el repositorio:**
   ```bash
   docker compose up -d