import "reflect-metadata"
import "express-async-errors";

import { IUserRepository } from "../../../../src/infra/repositories/IUserRepository"
import { InMemoryUserRepository } from '../../../infra/repositories/InMemoryUserRepository'

import { CreateUserservice } from "../../../../src/application/usecase/create-user/CreateUserService"
import { CreateUserFactory } from "../../../infra/factories/CreateUserFactory"
import { AppError } from "../../../../src/shared/exceptions/AppError";

describe('Create User', () => {
  let service: CreateUserservice
  let repository: IUserRepository

  beforeEach(() =>  {
    repository = new InMemoryUserRepository()
    service = new CreateUserservice(repository)
   })

  it('should be able to create a new user', async () => {

    const newUser = {
      name: "name",
      email: "email@email.com",
      password: "password"
    }

    const result = await service.execute(newUser)

    expect(result).toMatchObject({
      name: "name",
      email: "email@email.com"
    })

  })

  it('should be not able to create a new user with body invalid', async () => {
    const newUser = {
      name: "name",
      email: "",
      password: ""
    }

    let result

    try{
      result = await service.execute(newUser)
    }catch(err) {
      result = err
    }

   expect(result).toBeInstanceOf(AppError)
   expect(result).toMatchObject({
    message: "Bad Request!",
    statusCode: 400
   })
  })

  it('should be not able to create a new user with same email', async () => {
    await CreateUserFactory.build(repository)

    const newUser = {
      name: "name",
      email: "email@email.com",
      password: "password"
    }

    let result

    try{
      result = await service.execute(newUser)
    }catch(err) {
      result = err
    }

   expect(result).toBeInstanceOf(AppError)
   expect(result).toMatchObject({
    message: "Email invalid",
    statusCode: 400
   })
  })
})
