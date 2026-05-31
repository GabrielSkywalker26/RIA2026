import {
  getBreedLabel,
  fetchBreeds,
  fetchRandomDogImages,
  fetchRandomImageByBreed,
  resetBreedsCache,
} from '../api'
import { httpClient } from '../httpClient'

vi.mock('../httpClient')

const mockedHttpClient = vi.mocked(httpClient)

describe('getBreedLabel', () => {
  it('formats simple breed', () => {
    expect(getBreedLabel('hound')).toBe('Hound')
  })

  it('formats multi-word breed with slash', () => {
    expect(getBreedLabel('hound/afghan')).toBe('Hound Afghan')
  })

  it('formats breed with hyphen', () => {
    expect(getBreedLabel('german-shepherd')).toBe('German Shepherd')
  })
})

describe('fetchBreeds', () => {
  beforeEach(() => {
    resetBreedsCache()
  })

  it('returns sorted breed options', async () => {
    mockedHttpClient.mockResolvedValueOnce({
      message: {
        hound: ['afghan', 'basset'],
        retriever: ['golden', 'labrador'],
        pug: [],
      },
      status: 'success',
    })

    const breeds = await fetchBreeds()
    const breedsAgain = await fetchBreeds()

    expect(breeds).toEqual([
      { value: 'hound/afghan', label: 'Afghan Hound' },
      { value: 'hound/basset', label: 'Basset Hound' },
      { value: 'retriever/golden', label: 'Golden Retriever' },
      { value: 'retriever/labrador', label: 'Labrador Retriever' },
      { value: 'pug', label: 'Pug' },
    ])
    expect(breedsAgain).toEqual(breeds)
    expect(httpClient).toHaveBeenCalledTimes(1)
  })

  it('handles empty sub-breeds', async () => {
    mockedHttpClient.mockResolvedValueOnce({
      message: { pug: [] },
      status: 'success',
    })

    const breeds = await fetchBreeds()
    expect(breeds).toHaveLength(1)
    expect(breeds[0]).toEqual({ value: 'pug', label: 'Pug' })
  })

})

describe('fetchRandomDogImages', () => {
  it('returns image URLs', async () => {
    mockedHttpClient.mockResolvedValueOnce({
      message: ['https://images.dog.ceo/1.jpg', 'https://images.dog.ceo/2.jpg'],
      status: 'success',
    })

    const images = await fetchRandomDogImages(2)

    expect(images).toHaveLength(2)
    expect(images[0]).toBe('https://images.dog.ceo/1.jpg')
    expect(httpClient).toHaveBeenCalledWith('/breeds/image/random/2')
  })

  it('defaults to 6 images', async () => {
    mockedHttpClient.mockResolvedValueOnce({
      message: Array.from({ length: 6 }, (_, i) => `img${i}.jpg`),
      status: 'success',
    })

    const images = await fetchRandomDogImages()
    expect(images).toHaveLength(6)
  })
})

describe('fetchRandomImageByBreed', () => {
  it('builds URL for simple breed', async () => {
    mockedHttpClient.mockResolvedValueOnce({
      message: 'https://images.dog.ceo/hound.jpg',
      status: 'success',
    })

    const image = await fetchRandomImageByBreed('hound')

    expect(image).toBe('https://images.dog.ceo/hound.jpg')
    expect(httpClient).toHaveBeenCalledWith('/breed/hound/images/random')
  })

  it('builds URL for sub-breed', async () => {
    mockedHttpClient.mockResolvedValueOnce({
      message: 'https://images.dog.ceo/afghan.jpg',
      status: 'success',
    })

    const image = await fetchRandomImageByBreed('hound/afghan')

    expect(image).toBe('https://images.dog.ceo/afghan.jpg')
    expect(httpClient).toHaveBeenCalledWith('/breed/hound/afghan/images/random')
  })
})
