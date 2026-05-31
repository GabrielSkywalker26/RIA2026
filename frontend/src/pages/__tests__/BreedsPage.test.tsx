import { render, screen } from '../../test/test-utils'
import { BreedsPage } from '../BreedsPage'
import * as api from '../../services/api'

vi.mock('../../services/api')

const mockedApi = vi.mocked(api)

const MOCK_BREEDS = [
  { value: 'beagle', label: 'Beagle' },
  { value: 'boxer', label: 'Boxer' },
  { value: 'husky', label: 'Husky' },
  { value: 'labrador', label: 'Labrador' },
  { value: 'pug', label: 'Pug' },
]

beforeEach(() => {
  mockedApi.fetchBreeds.mockResolvedValue(MOCK_BREEDS)
  mockedApi.fetchRandomImageByBreed.mockResolvedValue('https://example.com/dog.jpg')
})

it('renders heading and description', () => {
  render(<BreedsPage />)

  expect(screen.getByText('Ver razas')).toBeInTheDocument()
  expect(screen.getByText(/Eleg\u00ED una raza/)).toBeInTheDocument()
})

it('renders breed selector', async () => {
  render(<BreedsPage />)

  const select = await screen.findByRole('combobox')
  expect(select).toBeInTheDocument()
})

it('renders "Next" button', async () => {
  render(<BreedsPage />)

  const button = await screen.findByText('Next')
  expect(button).toBeInTheDocument()
})

it('loads breed image on mount', async () => {
  render(<BreedsPage />)

  await vi.waitFor(() => {
    expect(mockedApi.fetchRandomImageByBreed).toHaveBeenCalled()
  })
})

it('handles breed from URL query param', async () => {
  render(<BreedsPage />, { initialEntries: ['/razas?breed=husky'] })

  await vi.waitFor(() => {
    expect(mockedApi.fetchRandomImageByBreed).toHaveBeenCalledWith('husky')
  })
})

it('shows error alert on fetch failure', async () => {
  mockedApi.fetchBreeds.mockRejectedValue(new Error('API error'))
  render(<BreedsPage />)

  const alert = await screen.findByRole('alert')
  expect(alert).toBeInTheDocument()
})

it('loads new image when clicking Next', async () => {
  render(<BreedsPage />)

  const button = await screen.findByText('Next')
  mockedApi.fetchRandomImageByBreed.mockResolvedValue('https://example.com/new-dog.jpg')
  await button.click()

  expect(mockedApi.fetchRandomImageByBreed).toHaveBeenCalled()
})
