import { render, screen } from '../../test/test-utils'
import { HomePage } from '../HomePage'
import * as api from '../../services/api'

vi.mock('../../services/api')

const mockedApi = vi.mocked(api)

beforeEach(() => {
  mockedApi.fetchRandomBreedCards.mockResolvedValue([
    { value: 'beagle', label: 'Beagle', image: 'https://example.com/beagle.jpg' },
    { value: 'pug', label: 'Pug', image: 'https://example.com/pug.jpg' },
    { value: 'husky', label: 'Husky', image: 'https://example.com/husky.jpg' },
    { value: 'labrador', label: 'Labrador', image: 'https://example.com/labrador.jpg' },
    { value: 'boxer', label: 'Boxer', image: 'https://example.com/boxer.jpg' },
    { value: 'doberman', label: 'Doberman', image: 'https://example.com/doberman.jpg' },
    { value: 'poodle', label: 'Poodle', image: 'https://example.com/poodle.jpg' },
    { value: 'rottweiler', label: 'Rottweiler', image: 'https://example.com/rottweiler.jpg' },
  ])
  mockedApi.fetchRandomDogImages.mockResolvedValue([
    'https://example.com/dog1.jpg',
    'https://example.com/dog2.jpg',
    'https://example.com/dog3.jpg',
  ])
})

it('renders hero section with heading', async () => {
  render(<HomePage />)

  expect(screen.getByText(/Encontr\u00E1 las mejores/)).toBeInTheDocument()
})

it('renders "Ver fotos" link and "Mostrar por raza" heading', () => {
  render(<HomePage />)

  expect(screen.getByText('Ver fotos')).toBeInTheDocument()
  expect(screen.getAllByText('Mostrar por raza').length).toBe(2)
})

it('renders products section', () => {
  render(<HomePage />)

  expect(screen.getByText('Productos asociados')).toBeInTheDocument()
  expect(screen.getByText('Eukanuba')).toBeInTheDocument()
  expect(screen.getByText('Balanced')).toBeInTheDocument()
  expect(screen.getByText('Grain Plus')).toBeInTheDocument()
})

it('renders promo section', () => {
  render(<HomePage />)

  expect(screen.getByText(/El mejor lugar para/i)).toBeInTheDocument()
})

it('renders breed carousel with cards after loading', async () => {
  render(<HomePage />)

  const cards = await screen.findAllByText('Beagle')
  expect(cards.length).toBeGreaterThan(0)
})

it('renders breed carousel in loading state initially', () => {
  mockedApi.fetchRandomBreedCards.mockImplementation(() => new Promise(() => {}))
  render(<HomePage />)

  const loadingCards = screen.getAllByText('Cargando...')
  expect(loadingCards.length).toBeGreaterThan(0)
})

it('handles breed carousel error', async () => {
  mockedApi.fetchRandomBreedCards.mockRejectedValue(new Error('Failed to load'))

  render(<HomePage />)

  const alert = await screen.findByRole('alert')
  expect(alert).toBeInTheDocument()
})

it('renders "Fotos Random" section', () => {
  render(<HomePage />)

  expect(screen.getByText('Fotos Random')).toBeInTheDocument()
})

it('renders "Ver mas fotos random" link', () => {
  render(<HomePage />)

  expect(screen.getByText('Ver mas fotos random')).toBeInTheDocument()
})
