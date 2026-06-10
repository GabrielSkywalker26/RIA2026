# Prompt 4

**Usuario:** En base al PDF de Figma, generar unas vistas básicas para cada una de esas páginas. Agregué algunas imágenes en assets para usar para la generación de esas páginas. Empezá con esas y armá la sección ‘Mostrar por raza’ como slider que cargue 4 razas al inicio y 4 más al hacer click a la derecha, trayendo una imagen distinta por raza desde la Dog API.

**Respuesta:** Revisó el PDF/bosquejo y las imágenes que ya estaban en el proyecto. Reorganizó la home en bloques parecidos al diseño: hero con texto y botones, sección “Mostrar por raza”, productos asociados, promo naranja y “Fotos random”.
Usó las imágenes que habías traído de Figma (cabezal compuesto, flechas, logos, fotos de productos).
Para el slider de razas implementó carga progresiva: primero 4 razas al azar con su imagen, y al avanzar con las flechas se piden 4 más hasta completar las 12. Cada tarjeta enlaza a la página de razas con la categoría ya seleccionada.
También ajustó estilos globales (tipografía, colores naranja/negro, espaciados, navbar y footer) para acercarse al look del template.
