import "reflect-metadata"

import { Request } from "express"

import { InMemoryUserRepository } from "../../../infra/repositories/InMemoryUserRepository"
import { FindOneUserService } from "../../../../src/application/usecase/find-one-user/FindOneUserService"
import { CreateUserFactory } from "../../../infra/factories/CreateUserFactory"
import { TokenService } from "../../../../src/application/services/TokenService"
import { IUserRepository } from "../../../../src/infra/repositories/IUserRepository"
import { AppError } from "../../../../src/shared/exceptions/AppError";

describe('Find one user', () => {
  let service: FindOneUserService
  let repository: IUserRepository

  beforeEach(() =>  {
    repository = new InMemoryUserRepository()
    service = new FindOneUserService(repository)
   })

  it('should be able to find an user', async () => {
    const user = await CreateUserFactory.build(repository)

    const token = TokenService.encryptedToken(user)

    const mockRequest = {
      headers: {
        authorization: `Bearer ${token}` 
      }
  } as Request;

    const result = await service.execute(mockRequest)
    
    expect(result).toMatchObject({
      name: "name",
      email: "email@email.com"
    })
  })

  it('should be not able to find a user with invalid token', async () => {

    const request = {
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVmMjkyMDIzLTBkMjktNGEwNC05MzAwLTBhMjY0NDkzNWY0ZCIsImlhdCI6MTY3MTcxMDkwNywiZXhwIjoxNjcxNzI4OTA3fQ.WUV9bRoVSaZ8JlswBYQk2LkfSYdhlX8IloaK9UvLHfc'
      }
    } as Request

    let result

    try{
      result = await service.execute(request)
    }catch(err) {
      result = err
    }

   expect(result).toBeInstanceOf(AppError)
   expect(result).toMatchObject({
    message: "Access denied. Token invalid!",
    statusCode: 401
   })
  })
})
