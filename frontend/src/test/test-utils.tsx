import { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]
}

function Wrappers({ children, initialEntries }: { children: React.ReactNode; initialEntries?: string[] }) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  )
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions,
) {
  const { initialEntries, ...renderOptions } = options ?? {}
  return render(ui, {
    wrapper: () => <Wrappers initialEntries={initialEntries}>{ui}</Wrappers>,
    ...renderOptions,
  })
}

export * from '@testing-library/react'
export { customRender as render }
