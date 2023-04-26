import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search a unique pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet', async () => {
    const { token, user_id } = await createAndAuthenticateUser(app)

    const pet = await prisma.pet.create({
      data: {
        user_id,
        name: 'Fuji',
        description: 'Coisa mais fofa',
        age: 'ADULT',
        size: 'MEDIUM',
        self_support: 'MEDIUM',
      },
    })

    const response = await request(app.server)
      .get(`/pet/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fuji',
        description: 'Coisa mais fofa',
        age: 'ADULT',
        size: 'MEDIUM',
        self_support: 'MEDIUM',
      })

    expect(response.statusCode).toEqual(200)
  })
})
