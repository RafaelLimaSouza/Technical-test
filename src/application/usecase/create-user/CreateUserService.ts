import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@infra/repositories/IUserRepository";

import { CreateUserRequest } from "./resources/CreateUserRequest";
import { CreateUserResponse } from "./resources/CreateUserResponse";

import { UserConverter } from "@infra/converters/UserConverter";
import { PasswordService } from "@application/services/PasswordService";

@injectable()
export class CreateUserservice {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
    ){}

  public async execute(request: CreateUserRequest): Promise<Partial<CreateUserResponse>> {

    const newUser = {
      ...request,
      password: await PasswordService.createHashPassword(request.password)
    }

    const user = await this.userRepository.create(
      UserConverter.of(newUser)
      )

    return CreateUserResponse.of(user)
  }
}

