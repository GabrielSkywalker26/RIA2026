# Memory Bank — RIA 2026

## Contexto

App frontend tipo "BuscaPerros" para RIA (UTU ESI Buceo, 2026). Consume Dog CEO API. Sin backend. Stack: React + TypeScript + Vite + Bootstrap + react-router-dom. Docker Compose para levantar.

## Arquitectura

- **SPA** con 4 rutas: `/`, `/fotos`, `/razas`, `/aboutus`
- **Layout:** Navbar (con top-strip + buscador de razas) + Footer que envuelve todas las páginas via `<Outlet />`
- **API Layer:** `httpClient.ts` (wrapper fetch genérico) → `api.ts` (endpoints específicos Dog CEO)
- **Estado:** todo local con `useState`/`useEffect`, sin context ni store global

## Estructura relevante

```
src/
├── services/httpClient.ts     # fetch wrapper, url base desde VITE_API_BASE_URL
├── services/api.ts            # fetchBreeds, fetchRandomDogImages, fetchRandomImageByBreed, etc.
├── components/layout/         # AppLayout, Navbar, BreedSearch
├── pages/                     # HomePage, PhotosPage, BreedsPage, AboutUsPage
├── test/                      # setup + test-utils con MemoryRouter
└── vite-env.d.ts              # type declarations para assets
```

## Decisiones

- `getBreedLabel('hound/afghan')` → `"Hound Afghan"` (split por `/`, capitaliza y join)
- `fetchBreeds` aplana sub-razas y ordena alfabéticamente por label
- `fetchRandomBreedCards` evita repetir razas ya mostradas via `excludeValues`
- Bootstrap importado completo (no tree-shaking), CSS custom con variables CSS
- Imagenes decorativas con `aria-hidden="true"`, imágenes de perros con `alt` descriptivo

## Tests

44 tests (7 suites), Vitest + React Testing Library + jsdom. Mocks con `vi.mock` sobre `api.ts`. `MemoryRouter` wrapper para páginas con ruteo.

| Suite | Tipo | Tests |
|-------|------|-------|
| httpClient | unitario | 4 |
| api | unitario | 9 |
| BreedSearch | componente | 4 |
| HomePage | integración | 9 |
| PhotosPage | integración | 6 |
| BreedsPage | integración | 7 |
| AboutUsPage | integración | 5 |

## Lighthouse

Mejoras aplicadas: preconnect a dog.ceo + Google Fonts, font-display swap, OG tags, favicon en `/public/`, theme-color, meta description descriptiva.

## Pendientes

- LocalStorage para favoritos
- Modo oscuro
- E2E con Playwright
