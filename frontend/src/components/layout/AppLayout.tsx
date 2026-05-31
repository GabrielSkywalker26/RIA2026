import { Col, Container, Row } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <footer className="site-footer">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <strong className="footer-brand">BuscaPerros</strong>
              <p className="footer-copy">
                Sed viverra eget fames sit varius. Pellentesque mattis libero viverra
                dictumst ornaresed justo convallis vitae
              </p>
            </Col>
            <Col sm={6} md={2}>
              <h3 className="footer-heading">Sitemap</h3>
              <nav className="footer-links" aria-label="Mapa del sitio">
                <Link to="/">Home</Link>
                <Link to="/fotos">Ver Fotos</Link>
                <Link to="/razas">Ver Razas</Link>
                <Link to="/aboutus">Sobre Nosotros</Link>
              </nav>
            </Col>
            <Col sm={6} md={3}>
              <h3 className="footer-heading">Tienda</h3>
              <p className="footer-copy mb-0">
                1234 Montevideo,
                <br />
                Uruguay
              </p>
            </Col>
            <Col md={3}>
              <h3 className="footer-heading">Contacto</h3>
              <p className="footer-copy mb-1">+095 999 123</p>
              <a className="footer-email" href="mailto:info@buscaperros.com">
                info@buscaperros.com
              </a>
            </Col>
          </Row>
          <p className="footer-copyright">© Copyright RIA 2026</p>
        </Container>
      </footer>
    </div>
  )
}
