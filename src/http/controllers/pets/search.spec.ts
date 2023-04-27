import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet', async () => {
    const { user_id } = await createAndAuthenticateUser(app)

    await prisma.pet.create({
      data: {
        user_id,
        name: 'Pepe',
        description: 'Essa não para',
        age: 'ADULT',
        size: 'MEDIUM',
        self_support: 'MEDIUM',
      },
    })

    await prisma.pet.create({
      data: {
        user_id,
        name: 'Fuji',
        description: 'Coisa mais fofa',
        age: 'ADULT',
        size: 'MEDIUM',
        self_support: 'MEDIUM',
      },
    })

    await prisma.pet.create({
      data: {
        user_id,
        name: 'Luna',
        description: 'Essa não para',
        age: 'WISE',
        size: 'LARGE',
        self_support: 'LARGE',
      },
    })

    const city = 'São Paulo'

    const response = await request(app.server)
      .get(`/pets/${city}`)
      .query({ age: 'WISE', size: 'LARGE', self_support: 'LARGE' })
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
