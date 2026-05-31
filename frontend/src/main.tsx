import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import './index.css'
import { AboutUsPage } from './pages/AboutUsPage'
import { BreedsPage } from './pages/BreedsPage'
import { HomePage } from './pages/HomePage'
import { PhotosPage } from './pages/PhotosPage'

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
    <RouterProvider router={router} />
  </StrictMode>,
)
