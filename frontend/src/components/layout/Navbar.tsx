import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import brandLogo from '../../assets/dog-api-logo 1.png'
import { BreedSearch } from './BreedSearch'

export function Navbar() {
  return (
    <>
      <div className="top-strip">
        <Container className="top-strip-inner">
          <span>+095 999 123</span>
          <span className="top-strip-email">info@buscaperros.com</span>
          <span>1234 Montevideo, Uruguay</span>
        </Container>
      </div>
      <div className="nav-shell">
        <BSNavbar expand="md" className="main-nav">
          <Container>
            <BSNavbar.Brand as={NavLink} to="/">
              <span className="brand-mark">
                <img src={brandLogo} alt="" className="brand-logo" />
              </span>
              BuscaPerros
            </BSNavbar.Brand>
            <BSNavbar.Toggle aria-controls="main-nav" />
            <BSNavbar.Collapse id="main-nav">
              <Nav className="ms-auto align-items-md-center">
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
                <li className="nav-item nav-item-search">
                  <BreedSearch />
                </li>
              </Nav>
            </BSNavbar.Collapse>
          </Container>
        </BSNavbar>
      </div>
    </>
  )
}
