# Prompt 3

**Usuario:** Con react-router-dom no me queda claro cómo anidar el Navbar para que aparezca en todas las páginas.

**Respuesta:** Se usó `createBrowserRouter` con un layout padre (`AppLayout`) que contiene Navbar y `<Outlet/>`, y las páginas como hijos. Así el Navbar se mantiene fijo en todas las rutas.
