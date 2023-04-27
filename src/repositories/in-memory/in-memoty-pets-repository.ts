import { Prisma, Pet } from '@prisma/client'
import { PetRepository, SearchParams } from '../pets-repository'
import { randomUUID } from 'crypto'
import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryPetsRepository implements PetRepository {
  constructor(private userRepository: InMemoryUsersRepository) {}

  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.user_id,
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      self_support: data.self_support,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(pet)

    return pet
  }

  async findUnique(pet_id: string) {
    const pet = this.items.find((item) => item.id === pet_id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findPets(searchParams: SearchParams) {
    const users = await this.userRepository.findByCity(searchParams.city)

    const petsByCity = this.items.filter((pet) => {
      return users.find((user) => user.id === pet.user_id)
    })

    const { age, self_support, size } = searchParams

    if (!age && !self_support && !size) {
      return petsByCity
    }

    const petFilter = petsByCity.filter(
      (item) =>
        item.age === age ||
        item.self_support === self_support ||
        item.size === size,
    )

    return petFilter
  }
}
