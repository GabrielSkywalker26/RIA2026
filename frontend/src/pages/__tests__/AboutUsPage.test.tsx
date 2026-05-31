import { render, screen } from '../../test/test-utils'
import { AboutUsPage } from '../AboutUsPage'

it('renders heading', () => {
  render(<AboutUsPage />)

  expect(screen.getByText('Sobre nosotros')).toBeInTheDocument()
})

it('renders objective card', () => {
  render(<AboutUsPage />)

  expect(screen.getByText('Objetivo')).toBeInTheDocument()
  expect(screen.getByText('Aprender consumiendo APIs')).toBeInTheDocument()
})

it('renders secciones card', () => {
  render(<AboutUsPage />)

  expect(screen.getByText('Secciones')).toBeInTheDocument()
  expect(screen.getByText('Fotos y razas')).toBeInTheDocument()
})

it('renders materia card', () => {
  render(<AboutUsPage />)

  expect(screen.getByText('Materia')).toBeInTheDocument()
  expect(screen.getByText('RIA 2026')).toBeInTheDocument()
})

it('renders description paragraph', () => {
  render(<AboutUsPage />)

  expect(
    screen.getByText(/Somos una app de pr\u00E1ctica RIA/),
  ).toBeInTheDocument()
})
