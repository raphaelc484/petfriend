import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchUniquePetUseCase } from '../search-unique-pet'

export function makeSearchUniquePetUseCase() {
  const prismaRepository = new PrismaPetRepository()
  const useCase = new SearchUniquePetUseCase(prismaRepository)

  return useCase
}
