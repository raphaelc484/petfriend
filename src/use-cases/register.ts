import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { AddressWhatsappError } from './errors/address-whatsapp-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cep: string
  city: string
  address: string
  whatsapp: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    cep,
    city,
    address,
    whatsapp,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    if (address.length === 0) {
      throw new AddressWhatsappError()
    }

    if (whatsapp.length === 0) {
      throw new AddressWhatsappError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      cep,
      city,
      address,
      whatsapp,
      password_hash,
    })

    return { user }
  }
}
