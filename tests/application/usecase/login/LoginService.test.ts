import "reflect-metadata"

import { InMemoryUserRepository } from "../../../infra/repositories/InMemoryUserRepository"
import { LoginService } from "../../../../src/application/usecase/login/LoginService"
import { CreateUserFactory } from "../../../infra/factories/CreateUserFactory"
import { IUserRepository } from "../../../../src/infra/repositories/IUserRepository"
import { AppError } from "../../../../src/shared/exceptions/AppError";

describe('Find one user', () => {
  let service: LoginService
  let repository: IUserRepository

  beforeEach(() =>  {
   repository = new InMemoryUserRepository()
   service = new LoginService(repository)
  })

  it('should be able to find an user', async () => { 
    await CreateUserFactory.build(repository)

    const request = {
      email: "email@email.com",
      password: "password"
    }

    const result = await service.execute(request)
    
    expect(result).toHaveProperty("token")
  })

  it('should be not able to logon with body invalid', async () => {
    const newUser = {
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

  
  it('should be not able to logon when an email not exist', async () => {
    const newUser = {
      email: "email@test.com",
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
    message: "Email or password invalid",
    statusCode: 400
   })
  })

  it('should be not able to logon when an password is invalid', async () => {
    await CreateUserFactory.build(repository)

    const newUser = {
      email: "email@email.com",
      password: "12345678"
    }

    let result

    try{
      result = await service.execute(newUser)
    }catch(err) {
      result = err
    }

   expect(result).toBeInstanceOf(AppError)
   expect(result).toMatchObject({
    message: "Email or password invalid",
    statusCode: 400
   })
  })
})
