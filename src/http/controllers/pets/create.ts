import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    age: z.enum(['PUPPY', 'ADULT', 'WISE']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    self_support: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  })

  const { name, description, age, size, self_support } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    user_id: request.user.sub,
    name,
    description,
    age,
    size,
    self_support,
  })

  return reply.status(201).send()
}
