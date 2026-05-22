const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com'
).replace(/\/$/, '')

export { apiBaseUrl }

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean>
}

function buildUrl(path: string, params?: RequestOptions['params']): string {
  const url = new URL(path.startsWith('http') ? path : `${apiBaseUrl}${path}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  }
  return url.toString()
}

export async function httpClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...init } = options
  const response = await fetch(buildUrl(path, params), {
    ...init,
    headers: { Accept: 'application/json', ...headers },
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}
