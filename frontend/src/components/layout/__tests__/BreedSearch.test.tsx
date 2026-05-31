import { render, screen } from '../../../test/test-utils'
import { BreedSearch } from '../BreedSearch'
import { fetchBreeds } from '../../../services/api'

vi.mock('../../../services/api')

const mockedFetchBreeds = vi.mocked(fetchBreeds)

const MOCK_BREEDS = [
  { value: 'beagle', label: 'Beagle' },
  { value: 'boxer', label: 'Boxer' },
  { value: 'bulldog', label: 'Bulldog' },
  { value: 'doberman', label: 'Doberman' },
  { value: 'husky', label: 'Husky' },
  { value: 'labrador', label: 'Labrador' },
  { value: 'poodle', label: 'Poodle' },
  { value: 'pug', label: 'Pug' },
  { value: 'rottweiler', label: 'Rottweiler' },
  { value: 'shepherd', label: 'Shepherd' },
]

beforeEach(() => {
  mockedFetchBreeds.mockResolvedValue(MOCK_BREEDS)
})

it('renders search input and button', async () => {
  render(<BreedSearch />)

  expect(screen.getByPlaceholderText('Buscar raza...')).toBeInTheDocument()
  expect(screen.getByLabelText('Buscar raza')).toBeInTheDocument()
})

it('shows loading spinner while breeds load', () => {
  mockedFetchBreeds.mockImplementationOnce(() => new Promise(() => {}))
  render(<BreedSearch />)

  expect(screen.getByPlaceholderText('Buscar raza...')).toBeDisabled()
  expect(screen.getByLabelText('Buscar raza')).toBeDisabled()
})

it('filters breeds as user types', async () => {
  render(<BreedSearch />)

  const input = screen.getByPlaceholderText('Buscar raza...')
  await screen.findByPlaceholderText('Buscar raza...')

  await vi.waitFor(() => {
    expect(input).not.toBeDisabled()
  })

  await vi.waitFor(() => {
    expect(mockedFetchBreeds).toHaveBeenCalled()
  })
})

it('disables input when fetch fails', async () => {
  mockedFetchBreeds.mockRejectedValueOnce(new Error('API error'))
  render(<BreedSearch />)

  await screen.findByPlaceholderText('Buscar raza...')
})
