import { PetRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchUniquePetUseCaseRequest {
  pet_id: string
}

interface SearchUniquePetUseCaseResponse {
  pet: Pet
}

export class SearchUniquePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    pet_id,
  }: SearchUniquePetUseCaseRequest): Promise<SearchUniquePetUseCaseResponse> {
    const pet = await this.petRepository.findUnique(pet_id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
