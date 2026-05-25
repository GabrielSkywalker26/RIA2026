import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Container className="py-5">
          <Outlet />
        </Container>
      </main>
      <footer id="sobre-nosotros" className="site-footer">
        <Container>
          <strong>BuscaPerros</strong>
          <p>RIA 2026 - UTU ESI Buceo</p>
        </Container>
      </footer>
    </div>
  )
}
