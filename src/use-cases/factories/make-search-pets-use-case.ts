import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetsUseCase() {
  const prismaRepository = new PrismaPetRepository()
  const useCase = new SearchPetsUseCase(prismaRepository)

  return useCase
}
