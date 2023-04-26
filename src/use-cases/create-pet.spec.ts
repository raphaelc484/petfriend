import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memoty-pets-repository'
import { User } from '@prisma/client'

let userRepository: InMemoryUsersRepository
let petRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

let user: User

describe('Create pet use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petRepository)

    user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      user_id: user.id,
      name: 'Fuji',
      description: 'Coisa mais fofa',
      age: 'ADULT',
      size: 'MEDIUM',
      self_support: 'MEDIUM',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.user_id).toEqual(user.id)
  })
})
