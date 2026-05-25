import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <>
      <div className="top-strip">
        <Container className="d-flex justify-content-between gap-3">
          <span>+095 999 123</span>
          <span>1234 Montevideo, Uruguay</span>
        </Container>
      </div>
      <BSNavbar expand="md" className="main-nav">
        <Container>
          <BSNavbar.Brand as={NavLink} to="/">
            <span className="brand-mark">BP</span> BuscaPerros
          </BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls="main-nav" />
          <BSNavbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/fotos">
                Ver Fotos
              </Nav.Link>
              <Nav.Link as={NavLink} to="/razas">
                Ver Razas
              </Nav.Link>
              <Nav.Link as={NavLink} to="/aboutus">
                Sobre Nosotros
              </Nav.Link>
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
    </>
  )
}
