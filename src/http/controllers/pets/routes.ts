import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifiyJWT } from '@/http/middleware/verify-jwt'
import { searchUnique } from './search-unique'
import { search } from './search'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pet/:pet_id', searchUnique)

  app.get('/pets/:city', search)

  app.post('/pet', { onRequest: [verifiyJWT] }, create)
}
