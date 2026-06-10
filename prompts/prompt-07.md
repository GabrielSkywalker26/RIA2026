# Prompt 4

**Usuario:** Quiero que ‘Fotos Random’ tenga el mismo estilo de título que ‘Productos asociados’. Sacá los textos de abajo de cada foto. El link para ir a la página que diga ‘Ver mas fotos random’ y quede abajo a la derecha. Además, que las flechas del slider funcionen igual que en razas: al ir a la derecha traen 3 imágenes más, hasta un total de 9.”

**Respuesta:** El asistente unificó el estilo visual de la sección para que el título “Fotos Random” use la misma jerarquía tipográfica que “Productos asociados”, manteniendo coherencia en toda la home.
Reorganizó el bloque como un carrusel con flechas izquierda/derecha, reutilizando el patrón del slider de razas. Al cargar la página se piden las primeras 3 fotos; cada click hacia la derecha dispara una nueva petición a la Dog API por 3 imágenes más, hasta llegar a 9 en total, sin recargar las que ya se habían obtenido.
Eliminó subtítulos o textos debajo de cada imagen para dejar solo la foto, como pediste. El enlace “Ver mas fotos random” quedó posicionado abajo a la derecha y apunta a la página /fotos.
También ajustó estados de carga (spinner mientras llegan fotos) y manejo de errores si falla la API, para que el carrusel se comporte de forma predecible al navegar ida y vuelta entre páginas del slider.
