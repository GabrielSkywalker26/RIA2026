import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>
      <footer className="py-3 text-center text-muted small border-top">
        RIA 2026 — UTU ESI Buceo
      </footer>
    </div>
  )
}
