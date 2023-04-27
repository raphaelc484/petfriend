import { AgeType, Pet, Prisma, SelfSupportType, SizeType } from '@prisma/client'

export interface SearchParams {
  city: string
  age?: AgeType
  self_support?: SelfSupportType
  size?: SizeType
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findUnique(pet_id: string): Promise<Pet | null>
  findPets(searchParams: SearchParams): Promise<Pet[]>
}
