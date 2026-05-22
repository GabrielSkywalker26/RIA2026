import { Alert, Card } from 'react-bootstrap'
import { apiBaseUrl } from '../services/httpClient'

export function HomePage() {
  return (
    <>
      <h1 className="mb-3">RIA 2026 — Tarea 2</h1>
      <p className="text-muted">
        Base del proyecto. Cuando elijan el tema, conectamos la API correspondiente y
        armamos las pantallas definitivas.
      </p>
      <Alert variant="info" className="mb-4">
        API actual: <code>{apiBaseUrl}</code>
      </Alert>
      <Card body>
        <p className="mb-2">Listo: React, Bootstrap, rutas <code>/</code> y <code>/explorar</code>.</p>
        <p className="mb-0 text-muted">
          Pendiente: tema, API definitiva, LocalStorage si aplica, documentación de entrega.
        </p>
      </Card>
    </>
  )
}
