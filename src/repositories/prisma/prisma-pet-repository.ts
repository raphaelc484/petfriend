import { Prisma } from '@prisma/client'
import { PetRepository, SearchParams } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findUnique(pet_id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: pet_id,
      },
    })

    return pet
  }

  async findPets(searchParams: SearchParams) {
    const { city, age, self_support, size } = searchParams

    const pets = await prisma.pet.findMany({
      where: {
        user: {
          city,
        },
        age,
        self_support,
        size,
      },
    })

    return pets
  }
}
