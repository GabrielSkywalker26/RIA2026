import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import brandLogo from '../assets/dog-api-logo 1.png'
import cabezalCompuesto from '../assets/cabezal_compuesto.jpg'
import balancedImage from '../assets/Balanced.webp'
import eukanubaImage from '../assets/eukanuba.jpeg'
import flechaDer from '../assets/flecha_der.png'
import flechaIzq from '../assets/flecha_izq.png'
import grainPlusImage from '../assets/grain plus.webp'
import heroShape from '../assets/Shape.png'
import {
  fetchRandomBreedCards,
  fetchRandomDogImages,
  type BreedCard,
} from '../services/api'

const BREEDS_PER_PAGE = 4
const BREED_SLIDER_PAGES = 3
const BREED_SLIDER_TOTAL = 12
const BREED_BATCH_SIZE = 4

const PRODUCTS = [
  { name: 'Eukanuba', price: '$1900.99', image: eukanubaImage },
  { name: 'Balanced', price: '$2500.99', image: balancedImage },
  { name: 'Grain Plus', price: '$3500.99', image: grainPlusImage },
]

const PHOTOS_PER_PAGE = 3
const PHOTO_SLIDER_PAGES = 3
const PHOTO_SLIDER_TOTAL = 9
const PHOTO_BATCH_SIZE = 3

function createEmptyBreedSliderItems(): (BreedCard | null)[] {
  return Array.from<BreedCard | null>({ length: BREED_SLIDER_TOTAL }).fill(null)
}

function createEmptyPhotoSliderItems(): (string | null)[] {
  return Array.from<string | null>({ length: PHOTO_SLIDER_TOTAL }).fill(null)
}

export function HomePage() {
  const [breedSliderItems, setBreedSliderItems] = useState(createEmptyBreedSliderItems)
  const [breedSlideIndex, setBreedSlideIndex] = useState(0)
  const [breedSliderLoading, setBreedSliderLoading] = useState(false)
  const [breedSliderError, setBreedSliderError] = useState<string | null>(null)
  const [photoSliderItems, setPhotoSliderItems] = useState(createEmptyPhotoSliderItems)
  const [photoSlideIndex, setPhotoSlideIndex] = useState(0)
  const [photoSliderLoading, setPhotoSliderLoading] = useState(false)
  const [photoSliderError, setPhotoSliderError] = useState<string | null>(null)
  const loadedBreedBatchesRef = useRef(new Set<number>())
  const loadedPhotoBatchesRef = useRef(new Set<number>())
  const usedBreedValuesRef = useRef<string[]>([])

  const loadBreedBatch = useCallback(async (batchIndex: number) => {
    if (loadedBreedBatchesRef.current.has(batchIndex)) return

    const cards = await fetchRandomBreedCards(BREED_BATCH_SIZE, usedBreedValuesRef.current)
    loadedBreedBatchesRef.current.add(batchIndex)
    usedBreedValuesRef.current = [
      ...usedBreedValuesRef.current,
      ...cards.map((card) => card.value),
    ]

    setBreedSliderItems((current) => {
      const next = [...current]
      const startIndex = batchIndex * BREED_BATCH_SIZE

      cards.forEach((card, index) => {
        next[startIndex + index] = card
      })

      return next
    })
  }, [])

  const loadPhotoBatch = useCallback(async (batchIndex: number) => {
    if (loadedPhotoBatchesRef.current.has(batchIndex)) return

    const images = await fetchRandomDogImages(PHOTO_BATCH_SIZE)
    loadedPhotoBatchesRef.current.add(batchIndex)

    setPhotoSliderItems((current) => {
      const next = [...current]
      const startIndex = batchIndex * PHOTO_BATCH_SIZE

      images.forEach((image, index) => {
        next[startIndex + index] = image
      })

      return next
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    loadBreedBatch(0)
      .catch((error) => {
        if (!cancelled) {
          loadedBreedBatchesRef.current.delete(0)
          setBreedSliderError(
            error instanceof Error ? error.message : 'Error al cargar razas destacadas',
          )
        }
      })

    loadPhotoBatch(0)
      .catch((error) => {
        if (!cancelled) {
          loadedPhotoBatchesRef.current.delete(0)
          setPhotoSliderError(
            error instanceof Error ? error.message : 'Error al cargar fotos random',
          )
        }
      })

    return () => {
      cancelled = true
    }
  }, [loadBreedBatch, loadPhotoBatch])

  async function handleBreedSlideNext() {
    if (breedSlideIndex >= BREED_SLIDER_PAGES - 1 || breedSliderLoading) return

    setBreedSliderLoading(true)
    setBreedSliderError(null)

    try {
      const nextSlide = breedSlideIndex + 1
      await loadBreedBatch(nextSlide)
      setBreedSlideIndex(nextSlide)
    } catch (error) {
      loadedBreedBatchesRef.current.delete(breedSlideIndex + 1)
      setBreedSliderError(
        error instanceof Error ? error.message : 'Error al cargar más razas',
      )
    } finally {
      setBreedSliderLoading(false)
    }
  }

  function handleBreedSlidePrev() {
    if (breedSlideIndex <= 0 || breedSliderLoading) return
    setBreedSlideIndex((current) => current - 1)
  }

  async function handlePhotoSlideNext() {
    if (photoSlideIndex >= PHOTO_SLIDER_PAGES - 1 || photoSliderLoading) return

    setPhotoSliderLoading(true)
    setPhotoSliderError(null)

    try {
      const nextSlide = photoSlideIndex + 1
      await loadPhotoBatch(nextSlide)
      setPhotoSlideIndex(nextSlide)
    } catch (error) {
      loadedPhotoBatchesRef.current.delete(photoSlideIndex + 1)
      setPhotoSliderError(
        error instanceof Error ? error.message : 'Error al cargar más fotos',
      )
    } finally {
      setPhotoSliderLoading(false)
    }
  }

  function handlePhotoSlidePrev() {
    if (photoSlideIndex <= 0 || photoSliderLoading) return
    setPhotoSlideIndex((current) => current - 1)
  }

  return (
    <>
      <div className="hero-breeds-stack">
        <section className="hero-section">
          <Container>
            <Row className="align-items-center g-4 g-lg-5">
              <Col lg={6}>
                <span className="eyebrow">Dog API</span>
                <h1>
                  Encontrá las mejores
                  <br />
                  fotos de perros!
                </h1>
                <p>
                  Disfrutá de nuestra selección de fotos diarias y descubrí miles de
                  ejemplares en nuestra búsqueda aleatoria!
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/fotos" className="btn brand-button">
                    Ver fotos
                  </Link>
                  <Link to="/razas" className="btn btn-outline-dark hero-outline-button">
                    Mostrar por raza
                  </Link>
                </div>
              </Col>
              <Col lg={6} className="hero-visual-col">
                <div className="hero-visual" aria-hidden="true">
                  <img className="hero-composite" src={cabezalCompuesto} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="home-section breeds-section breeds-floor">
          <Container>
            <div className="breeds-header">
              <h2 className="home-section-title breeds-header-title">Mostrar por raza</h2>
              <div className="breeds-arrows">
                <button
                  type="button"
                  className="carousel-arrow"
                  aria-label="Ver razas anteriores"
                  disabled={breedSlideIndex === 0 || breedSliderLoading}
                  onClick={handleBreedSlidePrev}
                >
                  <img src={flechaIzq} alt="" />
                </button>
                <button
                  type="button"
                  className="carousel-arrow"
                  aria-label="Ver más razas"
                  disabled={
                    breedSlideIndex >= BREED_SLIDER_PAGES - 1 || breedSliderLoading
                  }
                  onClick={handleBreedSlideNext}
                >
                  {breedSliderLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <img src={flechaDer} alt="" />
                  )}
                </button>
              </div>
            </div>

            {breedSliderError && <Alert variant="danger">{breedSliderError}</Alert>}

            <div className="breeds-carousel-viewport">
              <div
                className="breeds-carousel-track"
                style={{ transform: `translateX(-${breedSlideIndex * 100}%)` }}
              >
                {Array.from({ length: BREED_SLIDER_PAGES }, (_, pageIndex) => (
                  <div className="breeds-carousel-page" key={pageIndex}>
                    <Row className="g-4">
                      {breedSliderItems
                        .slice(
                          pageIndex * BREEDS_PER_PAGE,
                          pageIndex * BREEDS_PER_PAGE + BREEDS_PER_PAGE,
                        )
                        .map((breed, itemIndex) => {
                          const slotIndex = pageIndex * BREEDS_PER_PAGE + itemIndex

                          if (!breed) {
                            return (
                              <Col sm={6} lg={3} key={`breed-slot-${slotIndex}`}>
                                <div className="breed-card breed-card--loading">
                                  <div className="breed-card-image">
                                    <div className="breed-card-image-loading">
                                      <Spinner animation="border" size="sm" />
                                    </div>
                                  </div>
                                  <div className="breed-card-body">
                                    <strong>Cargando...</strong>
                                  </div>
                                </div>
                              </Col>
                            )
                          }

                          return (
                            <Col sm={6} lg={3} key={breed.value}>
                              <Link
                                to={`/razas?breed=${encodeURIComponent(breed.value)}`}
                                className="breed-card"
                              >
                                <div className="breed-card-image">
                                  <img src={breed.image} alt={breed.label} loading="lazy" />
                                </div>
                                <div className="breed-card-body">
                                  <strong>{breed.label}</strong>
                                </div>
                              </Link>
                            </Col>
                          )
                        })}
                    </Row>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </div>

      <section className="home-section products-section">
        <Container>
          <h2 className="home-section-title">Productos asociados</h2>
          <Row className="g-4">
            {PRODUCTS.map((product) => (
              <Col md={4} key={product.name}>
                <Card className="product-card h-100">
                  <div className="product-card-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <p className="product-price">{product.price}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="home-promo">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <span className="eyebrow eyebrow-light">Dog API</span>
              <h2>
                El mejor lugar para
                <br />
                encontrar fotos de perros!
              </h2>
              <p>
                Disfrutá ahora de nuestra sección RAZAS para que tu búsqueda sea
                directa y divertida!
              </p>
              <Link to="/razas" className="btn brand-button">
                Ver razas
              </Link>
            </Col>
            <Col lg={6} className="text-center text-lg-end">
              <div className="promo-visual" aria-hidden="true">
                <img className="promo-shape" src={heroShape} alt="" />
                <img className="promo-logo" src={brandLogo} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="home-section featured-photos-section">
        <Container>
          <div className="featured-photos-header">
            <h2 className="home-section-title featured-header-title">Fotos Random</h2>
            <div className="featured-arrows">
              <button
                type="button"
                className="carousel-arrow"
                aria-label="Ver fotos anteriores"
                disabled={photoSlideIndex === 0 || photoSliderLoading}
                onClick={handlePhotoSlidePrev}
              >
                <img src={flechaIzq} alt="" />
              </button>
              <button
                type="button"
                className="carousel-arrow"
                aria-label="Ver más fotos"
                disabled={
                  photoSlideIndex >= PHOTO_SLIDER_PAGES - 1 || photoSliderLoading
                }
                onClick={handlePhotoSlideNext}
              >
                {photoSliderLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <img src={flechaDer} alt="" />
                )}
              </button>
            </div>
          </div>

          {photoSliderError && <Alert variant="danger">{photoSliderError}</Alert>}

          <div className="breeds-carousel-viewport">
            <div
              className="breeds-carousel-track"
              style={{ transform: `translateX(-${photoSlideIndex * 100}%)` }}
            >
              {Array.from({ length: PHOTO_SLIDER_PAGES }, (_, pageIndex) => (
                <div className="breeds-carousel-page" key={pageIndex}>
                  <Row className="g-4">
                    {photoSliderItems
                      .slice(
                        pageIndex * PHOTOS_PER_PAGE,
                        pageIndex * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE,
                      )
                      .map((photo, itemIndex) => {
                        const slotIndex = pageIndex * PHOTOS_PER_PAGE + itemIndex

                        return (
                          <Col md={4} key={`photo-slot-${slotIndex}`}>
                            <Card className="featured-dog-card h-100">
                              {photo ? (
                                <Card.Img
                                  variant="top"
                                  src={photo}
                                  alt={`Perro ${slotIndex + 1}`}
                                  loading="lazy"
                                />
                              ) : (
                                <div className="featured-photo-placeholder" aria-hidden="true">
                                  <Spinner animation="border" size="sm" />
                                </div>
                              )}
                            </Card>
                          </Col>
                        )
                      })}
                  </Row>
                </div>
              ))}
            </div>
          </div>

          <div className="featured-photos-footer">
            <Link to="/fotos" className="featured-photos-link">
              Ver mas fotos random
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
