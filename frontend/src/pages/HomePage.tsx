import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { apiBaseUrl } from '../services/httpClient'

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <Row className="align-items-center g-4">
          <Col lg={6}>
            <span className="eyebrow">Dog API</span>
            <h1>Encontrá las mejores fotos de perros!</h1>
            <p>
              Disfrutá fotos aleatorias y explorá razas usando datos reales de Dog CEO.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/fotos" className="btn brand-button">
                Ver fotos
              </Link>
              <Link to="/razas" className="btn btn-outline-dark">
                Ver razas
              </Link>
            </div>
          </Col>
          <Col lg={6}>
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-dog">BuscaPerros</div>
            </div>
          </Col>
        </Row>
      </section>

      <section className="home-band">
        <Row className="g-4">
          <Col md={6}>
            <Card className="info-card h-100">
              <Card.Body>
                <span className="dog-tag">Ver Fotos</span>
                <Card.Title>Fotos aleatorias</Card.Title>
                <Card.Text>
                  Trae imágenes random desde <code>{apiBaseUrl}</code> y permite refrescar el listado.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="info-card h-100">
              <Card.Body>
                <span className="dog-tag">Ver Razas</span>
                <Card.Title>Elegir por raza</Card.Title>
                <Card.Text>
                  Carga el listado de razas, deja seleccionar una opción y muestra la siguiente foto.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  )
}
