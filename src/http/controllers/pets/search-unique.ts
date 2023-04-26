import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSearchUniquePetUseCase } from '@/use-cases/factories/make-search-unique-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchUnique(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchUniquePetParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = searchUniquePetParamsSchema.parse(request.params)

  try {
    const searchUniquePetUseCase = makeSearchUniquePetUseCase()

    const { pet } = await searchUniquePetUseCase.execute({ pet_id })

    return reply.status(200).send(pet)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
