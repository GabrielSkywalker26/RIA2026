import { Card, Col, Row } from 'react-bootstrap'

export function AboutUsPage() {
  return (
    <>
      <div className="section-heading">
        <span>BuscaPerros</span>
        <h1>Sobre nosotros</h1>
        <p>
          Somos una app de práctica RIA creada para explorar fotos y razas de perros
          consumiendo una API pública.
        </p>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="info-card h-100">
            <Card.Body>
              <span className="dog-tag">Objetivo</span>
              <Card.Title>Aprender consumiendo APIs</Card.Title>
              <Card.Text>
                La app usa React, TypeScript, Bootstrap y Dog CEO para resolver una
                experiencia concreta con datos externos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="info-card h-100">
            <Card.Body>
              <span className="dog-tag">Secciones</span>
              <Card.Title>Fotos y razas</Card.Title>
              <Card.Text>
                Incluye una vista de fotos aleatorias y otra para elegir una raza y ver
                nuevas imágenes con el botón Next.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="info-card h-100">
            <Card.Body>
              <span className="dog-tag">Materia</span>
              <Card.Title>RIA 2026</Card.Title>
              <Card.Text>
                Proyecto para Rich Internet Applications, UTU ESI Buceo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
