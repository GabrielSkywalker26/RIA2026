import 'bootstrap/dist/css/bootstrap.min.css'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'
import './index.css'

const PhotosPage = lazy(() =>
  import('./pages/PhotosPage').then((module) => ({ default: module.PhotosPage })),
)
const BreedsPage = lazy(() =>
  import('./pages/BreedsPage').then((module) => ({ default: module.BreedsPage })),
)
const AboutUsPage = lazy(() =>
  import('./pages/AboutUsPage').then((module) => ({ default: module.AboutUsPage })),
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'fotos', element: <PhotosPage /> },
      { path: 'razas', element: <BreedsPage /> },
      { path: 'aboutus', element: <AboutUsPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
