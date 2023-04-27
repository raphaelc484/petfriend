import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memoty-pets-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { SearchPetsUseCase } from './search-pets'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

let userRepository: InMemoryUsersRepository
let petRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

let user1: User
let user2: User

describe('search pets use cases', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    petRepository = new InMemoryPetsRepository(userRepository)
    sut = new SearchPetsUseCase(petRepository)

    user1 = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      city: 'São Paulo',
      cep: '00000000',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password_hash: await hash('123456', 6),
    })

    user2 = await userRepository.create({
      name: 'Johna Doe',
      email: 'johndoe2@example.com',
      city: 'Rio de Janeiro',
      cep: '00000000',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password_hash: await hash('123456', 6),
    })

    user2 = await userRepository.create({
      name: 'Johna Doe',
      email: 'johndoe3@example.com',
      city: 'Rio de Janeiro',
      cep: '00000000',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to filter pets using city', async () => {
    await petRepository.create({
      user_id: user1.id,
      name: 'Fuji',
      description: 'Coisa mais fofa',
      age: 'ADULT',
      size: 'MEDIUM',
      self_support: 'MEDIUM',
    })

    await petRepository.create({
      user_id: user2.id,
      name: 'Pepe',
      description: 'Essa não para',
      age: 'ADULT',
      size: 'MEDIUM',
      self_support: 'MEDIUM',
    })

    await petRepository.create({
      user_id: user2.id,
      name: 'Luna',
      description: 'Essa não para',
      age: 'ADULT',
      size: 'LARGE',
      self_support: 'MEDIUM',
    })

    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
    })

    expect(pets).toEqual(expect.any(Array))
    expect(pets).toHaveLength(2)
  })

  it('should be able to filter pets using age,size and self support', async () => {
    await petRepository.create({
      user_id: user1.id,
      name: 'Fuji',
      description: 'Coisa mais fofa',
      age: 'ADULT',
      size: 'MEDIUM',
      self_support: 'MEDIUM',
    })

    await petRepository.create({
      user_id: user2.id,
      name: 'Pepe',
      description: 'Essa não para',
      age: 'ADULT',
      size: 'MEDIUM',
      self_support: 'MEDIUM',
    })

    await petRepository.create({
      user_id: user2.id,
      name: 'Luna',
      description: 'Essa não para',
      age: 'WISE',
      size: 'LARGE',
      self_support: 'LARGE',
    })

    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      age: 'WISE',
      size: 'LARGE',
      self_support: 'LARGE',
    })

    expect(pets).toEqual(expect.any(Array))
    expect(pets).toHaveLength(1)
  })
})
