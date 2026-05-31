import { httpClient } from '../httpClient'

const TEST_URL = '/breeds/image/random/3'
const MOCK_RESPONSE = { message: ['img1.jpg', 'img2.jpg', 'img3.jpg'], status: 'success' }

beforeEach(() => {
  vi.spyOn(globalThis, 'fetch').mockReset()
})

it('makes a GET request and returns JSON', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => MOCK_RESPONSE,
  } as Response)

  const result = await httpClient<typeof MOCK_RESPONSE>(TEST_URL)

  expect(result).toEqual(MOCK_RESPONSE)
  expect(globalThis.fetch).toHaveBeenCalledWith(
    expect.stringContaining(TEST_URL),
    expect.objectContaining({
      headers: expect.objectContaining({ Accept: 'application/json' }),
    }),
  )
})

it('throws on non-ok response', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: false,
    status: 404,
    statusText: 'Not Found',
  } as Response)

  await expect(httpClient(TEST_URL)).rejects.toThrow('Error 404: Not Found')
})

it('passes custom headers and options', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => MOCK_RESPONSE,
  } as Response)

  await httpClient(TEST_URL, {
    method: 'POST',
    headers: { 'X-Custom': 'test' },
    body: JSON.stringify({ foo: 'bar' }),
  })

  expect(globalThis.fetch).toHaveBeenCalledWith(
    expect.stringContaining(TEST_URL),
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ 'X-Custom': 'test', Accept: 'application/json' }),
      body: JSON.stringify({ foo: 'bar' }),
    }),
  )
})

it('appends query params', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => MOCK_RESPONSE,
  } as Response)

  await httpClient(TEST_URL, { params: { limit: '5', page: '1' } })

  const url = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]
  expect(url).toContain('limit=5')
  expect(url).toContain('page=1')
})
