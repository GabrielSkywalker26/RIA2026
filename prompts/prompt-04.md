# Prompt 4

**Usuario:** Estoy teniendo problemas para optimizar la carga de imágenes dinámicas de la API de perros y me está hundiendo el puntaje de Performance en Lighthouse. ¿Cómo lo soluciono?

**Respuesta:** Se refactorizó el componente DogCard aplicando lazy loading nativo (loading="lazy") y se definieron contenedores con dimensiones estables mediante clases de Bootstrap. Esto evitó el parpadeo visual por desvío de diseño (CLS) y redujo el tiempo de carga inicial (FCP), permitiendo que la aplicación supere con éxito el umbral de 80+ puntos en la auditoría de Lighthouse.
