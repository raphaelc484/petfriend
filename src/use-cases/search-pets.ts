import { PetRepository } from '@/repositories/pets-repository'
import { AgeType, Pet, SelfSupportType, SizeType } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age?: AgeType
  size?: SizeType
  self_support?: SelfSupportType
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
    age,
    self_support,
    size,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.findPets({
      city,
      age,
      self_support,
      size,
    })

    return { pets }
  }
}
