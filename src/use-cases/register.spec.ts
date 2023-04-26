import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { AddressWhatsappError } from './errors/address-whatsapp-error'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000000',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register without address', async () => {
    expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        cep: '00000000',
        address: '',
        whatsapp: '21999999999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AddressWhatsappError)
  })

  it('should not be able to register without whatsapp', async () => {
    expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        cep: '00000000',
        address: 'Av. Nowhere',
        whatsapp: '',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AddressWhatsappError)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      cep: '00000000',
      address: 'Av. Nowhere',
      whatsapp: '21999999999',
      password: '123456',
    })

    expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        cep: '00000000',
        address: 'Av. Nowhere',
        whatsapp: '21999999999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
