import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <BSNavbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <BSNavbar.Brand as={NavLink} to="/">
          RIA 2026
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-nav" />
        <BSNavbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/explorar">
              Explorar
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}
