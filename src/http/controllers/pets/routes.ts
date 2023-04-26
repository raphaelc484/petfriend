import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifiyJWT } from '@/http/middleware/verify-jwt'
import { searchUnique } from './search-unique'

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifiyJWT)

  app.post('/pet', create)

  app.get('/pet/:pet_id', searchUnique)
}
