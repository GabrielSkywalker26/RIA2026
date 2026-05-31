import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Modal, Row, Spinner } from 'react-bootstrap'
import { fetchRandomDogImages } from '../services/api'

export function PhotosPage() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  function loadImages(showLoading = true) {
    if (showLoading) {
      setLoading(true)
      setError(null)
    }
    fetchRandomDogImages(6)
      .then(setImages)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar fotos'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let cancelled = false

    fetchRandomDogImages(6)
      .then((data) => {
        if (!cancelled) setImages(data)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Error al cargar fotos')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <div className="section-heading">
        <span>Dog API</span>
        <h1>Fotos random</h1>
        <Button className="brand-button" onClick={() => loadImages()} disabled={loading}>
          {loading ? 'Cargando...' : 'Ver otras fotos'}
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading && (
        <div className="loading-box">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && !error && (
        <Row className="g-4">
          {images.map((image, index) => (
            <Col md={6} lg={4} key={image}>
              <Card className="dog-card h-100">
                <button
                  type="button"
                  className="photo-preview"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Ampliar foto del perro ${index + 1}`}
                >
                  <Card.Img variant="top" src={image} alt={`Perro ${index + 1}`} />
                </button>
                <Card.Body>
                  <button
                    type="button"
                    className="dog-tag dog-tag-button"
                    onClick={() => setSelectedImage(image)}
                  >
                    Ampliar
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        show={Boolean(selectedImage)}
        onHide={() => setSelectedImage(null)}
        centered
        size="xl"
        className="photo-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Foto ampliada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && <img src={selectedImage} alt="Perro ampliado" />}
        </Modal.Body>
        <Modal.Footer>
          {selectedImage && (
            <Button
              as="a"
              className="brand-button"
              href={selectedImage}
              target="_blank"
              rel="noreferrer"
            >
              Abrir original
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}
