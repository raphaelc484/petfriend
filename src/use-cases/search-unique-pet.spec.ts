import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memoty-pets-repository'
import { User } from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchUniquePetUseCase } from './search-unique-pet'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let petRepository: InMemoryPetsRepository
let sut: SearchUniquePetUseCase

let user: User

describe('Search unique pet use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new SearchUniquePetUseCase(petRepository)

    user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to find a unique pet', async () => {
    const petCreate = await petRepository.create({
      user_id: user.id,
      name: 'Fuji',
      description: 'Coisa mais fofa',
      age: 'ADULT',
      size: 'MEDIUM',
      self_support: 'MEDIUM',
    })

    const { pet } = await sut.execute({ pet_id: petCreate.id })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be not able to find a pet that not exist', async () => {
    await expect(() =>
      sut.execute({ pet_id: 'pet-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
