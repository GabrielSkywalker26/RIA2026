# Prompt 4

**Usuario:** Reemplazá el botón ‘Buscar perros’ del navbar por un buscador de razas. Que fetchee todas las categorías una vez, filtre solo en ese array local, y al elegir una me lleve a /razas?breed=... con esa raza preseleccionada, igual que cuando clickeo una tarjeta del slider de la home.

**Respuesta:** Sacó el botón “Buscar perros” y puso un campo de búsqueda con ícono de lupa.
Al iniciar (o al usar el buscador, según la versión final) se obtiene el listado completo de razas de la Dog API y se guarda en memoria; mientras el usuario escribe, solo se filtra ese array, sin llamadas extra por cada tecla.
Muestra un desplegable con coincidencias; al elegir una raza navega a /razas?breed=..., igual que al hacer click en una tarjeta del slider de la home.
Se ajustó el layout del navbar para que el buscador entre bien (padding, alineación, estados de carga y error).
