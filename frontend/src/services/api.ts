import { httpClient } from './httpClient'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export function fetchPosts(limit = 5) {
  return httpClient<Post[]>('/posts', {
    params: { _limit: limit },
  })
}
