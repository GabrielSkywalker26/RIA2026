import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { fetchBreeds, type BreedOption } from '../../services/api'

const MAX_RESULTS = 8

function filterBreeds(breeds: BreedOption[], query: string) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return []

  return breeds
    .filter((breed) => breed.label.toLowerCase().includes(normalizedQuery))
    .slice(0, MAX_RESULTS)
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M10.5 4a6.5 6.5 0 0 1 5.02 10.57l4.36 4.36-1.42 1.42-4.36-4.36A6.5 6.5 0 1 1 10.5 4Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BreedSearch() {
  const navigate = useNavigate()
  const listboxId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [breedCatalog, setBreedCatalog] = useState<BreedOption[]>([])
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)

  const results = useMemo(() => filterBreeds(breedCatalog, query), [breedCatalog, query])
  const catalogRequestedRef = useRef(false)

  function ensureCatalogLoaded() {
    if (catalogRequestedRef.current || breedCatalog.length > 0) return

    catalogRequestedRef.current = true
    setLoading(true)

    fetchBreeds()
      .then((breeds) => {
        setBreedCatalog(breeds)
      })
      .catch(() => {
        catalogRequestedRef.current = false
        setLoadError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectBreed(breed: BreedOption) {
    navigate(`/razas?breed=${encodeURIComponent(breed.value)}`)
    setQuery('')
    setIsOpen(false)
    setActiveIndex(-1)
  }

  function runSearch() {
    if (loading || loadError) return

    if (!query.trim()) return

    const match = results[activeIndex >= 0 ? activeIndex : 0]
    if (match) {
      selectBreed(match)
      return
    }

    setIsOpen(true)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    runSearch()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' && results.length > 0) {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((current) => (current + 1) % results.length)
      return
    }

    if (event.key === 'ArrowUp' && results.length > 0) {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((current) => (current <= 0 ? results.length - 1 : current - 1))
      return
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div className="nav-breed-search" ref={containerRef}>
      <Form
        className="nav-breed-search-form"
        onSubmit={handleSubmit}
        role="search"
        aria-label="Buscar raza de perro"
      >
        <div className="nav-breed-search-field">
          {loading ? (
            <Spinner animation="border" size="sm" className="nav-breed-search-spinner" />
          ) : null}
          <Form.Control
            type="search"
            className="nav-breed-search-input"
            placeholder="Buscar raza..."
            value={query}
            disabled={loading || loadError}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={isOpen && results.length > 0}
            onChange={(event) => {
              ensureCatalogLoaded()
              setQuery(event.target.value)
              setIsOpen(true)
              setActiveIndex(-1)
            }}
            onFocus={() => {
              ensureCatalogLoaded()
              if (query.trim()) setIsOpen(true)
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="nav-breed-search-button"
            aria-label="Buscar raza"
            disabled={loading || loadError || !query.trim()}
          >
            <SearchIcon />
          </button>
        </div>
      </Form>

      {isOpen && query.trim() && !loading && !loadError ? (
        <ul className="nav-breed-search-results" id={listboxId} role="listbox">
          {results.length > 0 ? (
            results.map((breed, index) => (
              <li key={breed.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={
                    index === activeIndex
                      ? 'nav-breed-search-option active'
                      : 'nav-breed-search-option'
                  }
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectBreed(breed)}
                >
                  {breed.label}
                </button>
              </li>
            ))
          ) : (
            <li className="nav-breed-search-empty" role="presentation">
              No hay razas que coincidan
            </li>
          )}
        </ul>
      ) : null}
    </div>
  )
}
