import { useEffect, useState } from 'react'
import { Alert, Card, ListGroup, Spinner } from 'react-bootstrap'
import { fetchPosts, type Post } from '../services/api'

export function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchPosts(5)
      .then((data) => { if (!cancelled) setPosts(data) })
      .catch((e) => { if (!cancelled) setError(e instanceof Error ? e.message : 'Error al cargar') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <>
      <h1 className="mb-3">Explorar</h1>
      <p className="text-muted mb-4">Prueba de consumo de API (JSONPlaceholder).</p>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <Card>
          <Card.Header>Posts de ejemplo</Card.Header>
          <ListGroup variant="flush">
            {posts.map((post) => (
              <ListGroup.Item key={post.id}>
                <strong>{post.title}</strong>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </>
  )
}
