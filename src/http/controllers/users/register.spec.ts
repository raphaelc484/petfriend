import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      address: 'Av. Nowhere',
      city: 'São Paulo',
      whatsapp: '21999999999',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
