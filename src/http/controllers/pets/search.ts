import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsParamsSchema = z.object({
    city: z.string().nonempty(),
  })

  const searchPetsQuerySchema = z.object({
    age: z.enum(['PUPPY', 'ADULT', 'WISE']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    self_support: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  })

  const { city } = searchPetsParamsSchema.parse(request.params)

  const { age, self_support, size } = searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    self_support,
    size,
  })

  return reply.status(200).send(pets)
}
