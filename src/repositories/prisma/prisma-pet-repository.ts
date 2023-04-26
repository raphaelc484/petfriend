import { Prisma } from '@prisma/client'
import { PetRepository } from '../pets-repository'
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
}
