import { httpClient } from './httpClient'

type DogApiResponse<T> = {
  message: T
  status: string
}

export type BreedOption = {
  value: string
  label: string
}

function formatBreedName(value: string) {
  return value
    .split(/[/-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function getBreedLabel(value: string) {
  return formatBreedName(value)
}

export async function fetchRandomDogImages(count = 6) {
  const data = await httpClient<DogApiResponse<string[]>>(`/breeds/image/random/${count}`)
  return data.message
}

export async function fetchBreeds() {
  const data = await httpClient<DogApiResponse<Record<string, string[]>>>('/breeds/list/all')

  return Object.entries(data.message)
    .flatMap(([breed, subBreeds]) => {
      if (subBreeds.length === 0) {
        return [{ value: breed, label: formatBreedName(breed) }]
      }

      return subBreeds.map((subBreed) => ({
        value: `${breed}/${subBreed}`,
        label: `${formatBreedName(subBreed)} ${formatBreedName(breed)}`,
      }))
    })
    .sort((a, b) => a.label.localeCompare(b.label))
}

export async function fetchRandomImageByBreed(breedValue: string) {
  const pathParts = breedValue.split('/')
  const path = pathParts.length === 2
    ? `/breed/${pathParts[0]}/${pathParts[1]}/images/random`
    : `/breed/${breedValue}/images/random`
  const data = await httpClient<DogApiResponse<string>>(path)
  return data.message
}

export type BreedCard = {
  value: string
  label: string
  image: string
}

function shuffleBreeds<T>(items: T[]) {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }
  return copy
}

export async function fetchRandomBreedCards(count: number, excludeValues: string[] = []) {
  const breeds = await fetchBreeds()
  const excluded = new Set(excludeValues)
  const available = breeds.filter((breed) => !excluded.has(breed.value))
  const picked = shuffleBreeds(available).slice(0, count)

  return Promise.all(
    picked.map(async (breed) => ({
      value: breed.value,
      label: breed.label,
      image: await fetchRandomImageByBreed(breed.value),
    })),
  )
}
