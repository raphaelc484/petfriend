import { Prisma, Pet } from '@prisma/client'
import { PetRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetRepository {
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
}
