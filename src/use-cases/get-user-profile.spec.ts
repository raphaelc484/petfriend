import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to return a user', async () => {
    const createUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      city: 'São Paulo',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: createUser.id })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })
})
