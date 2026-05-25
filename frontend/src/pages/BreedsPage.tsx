import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import {
  fetchBreeds,
  fetchRandomImageByBreed,
  getBreedLabel,
  type BreedOption,
} from '../services/api'

export function BreedsPage() {
  const [breeds, setBreeds] = useState<BreedOption[]>([])
  const [selectedBreed, setSelectedBreed] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loadingBreeds, setLoadingBreeds] = useState(true)
  const [loadingImage, setLoadingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchBreeds()
      .then((data) => {
        if (cancelled) return
        setBreeds(data)
        const firstBreed = data[0]?.value ?? ''
        setSelectedBreed(firstBreed)

        if (!firstBreed) return
        setLoadingImage(true)
        return fetchRandomImageByBreed(firstBreed).then((firstImage) => {
          if (!cancelled) setImage(firstImage)
        })
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Error al cargar razas')
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingBreeds(false)
          setLoadingImage(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  function loadBreedImage(breedValue = selectedBreed) {
    if (!breedValue) return

    setLoadingImage(true)
    setError(null)

    fetchRandomImageByBreed(breedValue)
      .then(setImage)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar la raza'))
      .finally(() => setLoadingImage(false))
  }

  function handleBreedChange(breedValue: string) {
    setSelectedBreed(breedValue)
    loadBreedImage(breedValue)
  }

  return (
    <>
      <div className="section-heading">
        <span>Dog API</span>
        <h1>Ver razas</h1>
        <p>Elegí una raza y navegá entre fotos con el botón siguiente.</p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4 align-items-start">
        <Col lg={4}>
          <Card className="control-card">
            <Card.Body>
              <Form.Group className="mb-3" controlId="breed">
                <Form.Label>Raza</Form.Label>
                <Form.Select
                  value={selectedBreed}
                  onChange={(event) => handleBreedChange(event.target.value)}
                  disabled={loadingBreeds}
                >
                  {breeds.map((breed) => (
                    <option value={breed.value} key={breed.value}>
                      {breed.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button
                className="brand-button w-100"
                onClick={() => loadBreedImage()}
                disabled={loadingBreeds || loadingImage || !selectedBreed}
              >
                {loadingImage ? 'Buscando...' : 'Next'}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="featured-dog-card">
            {loadingBreeds || loadingImage ? (
              <div className="loading-box">
                <Spinner animation="border" />
              </div>
            ) : (
              image && (
                <>
                  <Card.Img src={image} alt={getBreedLabel(selectedBreed)} />
                  <Card.Body>
                    <span className="dog-tag">Raza</span>
                    <Card.Title>{getBreedLabel(selectedBreed)}</Card.Title>
                  </Card.Body>
                </>
              )
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}
