# Trabajo Práctico: Aplicación RIA (Rich Internet Application)

## 1. Objetivo y Alcance
El objetivo de este proyecto es desarrollar una aplicación web funcional del tipo RIA (Rich Internet Application) utilizando **React** que consuma APIs públicas de forma asíncrona. Se aplica un ciclo de desarrollo profesional que abarca desde la concepción del diseño visual (Mockups de alta fidelidad en Figma) hasta la documentación, testing automatizado y optimización de rendimiento.

### Requerimientos del Proyecto Cumplidos:
* **Framework:** Desarrollo basado en componentes utilizando **React**.
* **Interfaz de Usuario (UI):** Diseño e implementación utilizando [Bootstrap / Material Design]* (elegí el tuyo y borrá el otro) para garantizar consistencia visual y responsividad.
* **Navegación:** Implementación de enrutamiento en el cliente con un mínimo de 2 rutas/páginas diferenciadas mediante **React Router**.
* **Arquitectura de Datos:** Consumo exclusivo de APIs públicas y manejo de persistencia ligera del lado del cliente mediante `LocalStorage`. Sin backend ni base de datos propia.

---

## 2. Herramientas y Tecnologías Utilizadas

En cumplimiento con los requerimientos de la letra, se detallan las herramientas utilizadas en el ciclo de desarrollo:

* **Diseño de UI (Mockups):** [Figma](https://www.figma.com/) (Diseño estático de alta fidelidad y exportación de assets).
* **Library Frontend:** React.
* **Estilos y UI:** Bootstrap
* **Enrutamiento:** React Router.
* **Consumo de APIs:** Fetch API para la comunicación asíncrona con servicios externos.
* **Entorno de Desarrollo:** Vite como entorno de ejecución local.
* **APIs Públicas Consumidas:**
    * [Dog API (dog.ceo)](https://dog.ceo/dog-api/) - Para la obtención de imágenes aleatorias y filtrado por razas.
    * [The Dog API](https://thedogapi.com/) - Para datos detallados e información de las razas.

---

## 3. Calidad de Software y Testing

Para garantizar el cumplimiento de los estándares de una aplicación RIA profesional, el proyecto implementa una estrategia de pruebas en múltiples niveles y una auditoría estricta de rendimiento:

### Pruebas Unitarias (Unit Tests)
* **Objetivo:** Verificar el correcto funcionamiento de los componentes de React aislados y las funciones de utilidad de forma individual.
* **Herramientas:** [Jest / Vitest]* junto con **React Testing Library**.
* **Alcance:** Pruebas sobre el renderizado correcto de componentes, manejo de estados internos y eventos básicos (clicks, cambios en inputs).

### Pruebas de Integración (Integration Tests)
* **Objetivo:** Validar la interacción fluida entre múltiples componentes, el flujo de navegación entre las distintas rutas y el comportamiento de la app al consumir las APIs simuladas (mocked).
* **Herramientas:** Playwright.
* **Alcance:** Simulación de flujos de usuario completos (ej: buscar una raza de perro, esperar la respuesta de la API, renderizar la imagen y navegar a la sección de detalles).

### Auditoría de Rendimiento y UX (Lighthouse > 80)
La aplicación fue optimizada siguiendo las buenas prácticas de desarrollo web para superar un **puntaje mayor a 80** en todas las métricas clave de Google Lighthouse:

* **Performance (Rendimiento):** Optimización de carga de imágenes externas de perros (uso de atributos de tamaño adaptables y carga perezosa o *lazy loading*).
* **Accessibility (Accesibilidad):** Uso de HTML semántico, etiquetas `alt` descriptivas en las imágenes dinámicas devueltas por la API y contraste de color adecuado mediante las clases del framework de UI.
* **Best Practices (Buenas Prácticas):** Uso de conexiones seguras (HTTPS) para el consumo de las APIs y código libre de errores en la consola.
* **SEO:** Configuración correcta de meta-etiquetas y estructura de encabezados para asegurar la indexación básica.

---

## 4. Instalación y Ejecución Local

Para clonar y ejecutar esta aplicación en tu entorno local, seguí estos pasos:

### Prerrequisitos
Tener instalado [Node.js](https://nodejs.org/) y un gestor de paquetes (npm).
