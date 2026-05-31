import { render, screen } from '../../test/test-utils'
import { PhotosPage } from '../PhotosPage'
import * as api from '../../services/api'

vi.mock('../../services/api')

const mockedApi = vi.mocked(api)

const MOCK_IMAGES = [
  'https://example.com/dog1.jpg',
  'https://example.com/dog2.jpg',
  'https://example.com/dog3.jpg',
  'https://example.com/dog4.jpg',
  'https://example.com/dog5.jpg',
  'https://example.com/dog6.jpg',
]

beforeEach(() => {
  mockedApi.fetchRandomDogImages.mockResolvedValue(MOCK_IMAGES)
})

it('renders heading and button switches to "Ver otras fotos" after load', async () => {
  render(<PhotosPage />)

  expect(screen.getByText('Fotos random')).toBeInTheDocument()
  const button = await screen.findByText('Ver otras fotos')
  expect(button).toBeInTheDocument()
})

it('renders loading spinner initially', () => {
  mockedApi.fetchRandomDogImages.mockImplementationOnce(() => new Promise(() => {}))
  render(<PhotosPage />)

  expect(screen.getByText('Cargando...')).toBeInTheDocument()
})

it('renders images after loading', async () => {
  render(<PhotosPage />)

  const images = await screen.findAllByRole('img')
  expect(images.length).toBeGreaterThanOrEqual(6)
})

it('renders "Ampliar" button for each image', async () => {
  render(<PhotosPage />)

  const buttons = await screen.findAllByText('Ampliar')
  expect(buttons.length).toBeGreaterThanOrEqual(6)
})

it('shows error alert on fetch failure', async () => {
  mockedApi.fetchRandomDogImages.mockRejectedValue(new Error('API error'))
  render(<PhotosPage />)

  const alert = await screen.findByRole('alert')
  expect(alert).toBeInTheDocument()
})

it('opens modal when clicking "Ampliar" button', async () => {
  render(<PhotosPage />)

  const buttons = await screen.findAllByText('Ampliar')
  await buttons[0].click()

  expect(screen.getByText('Foto ampliada')).toBeInTheDocument()
  expect(screen.getByText('Abrir original')).toBeInTheDocument()
})
