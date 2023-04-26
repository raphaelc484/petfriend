import { PetRepository } from '@/repositories/pets-repository'
import { AgeType, Pet, SelfSupportType, SizeType } from '@prisma/client'

interface CreatePetUseCaseRequest {
  user_id: string
  name: string
  description: string
  age: AgeType
  size: SizeType
  self_support: SelfSupportType
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    user_id,
    name,
    description,
    age,
    size,
    self_support,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      user_id,
      name,
      description,
      age,
      size,
      self_support,
    })

    return { pet }
  }
}
