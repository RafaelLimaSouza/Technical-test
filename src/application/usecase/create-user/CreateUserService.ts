import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@infra/repositories/IUserRepository";

import { CreateUserRequest, CreateUserRequestProps } from "./resources/CreateUserRequest";
import { CreateUserResponse } from "./resources/CreateUserResponse";

import { PasswordService } from "@application/services/PasswordService";
import { AppError } from "@shared/exceptions/AppError";

@injectable()
export class CreateUserservice {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
    ){}

  public async execute(request: CreateUserRequestProps): Promise<CreateUserResponse> {

    const userExists = await this.userRepository.findByEmail(request.email)

    if(userExists){
      throw new AppError("Email invalid", 400)
    }

    const userWithHashedPassword = {
      ...request,
      password: await PasswordService.createHashPassword(request.password)
    }

    const user = await this.userRepository.create(
      new CreateUserRequest({
        email: userWithHashedPassword.email.toLowerCase(),
        name: userWithHashedPassword.name,
        password: userWithHashedPassword.password
      }).toUser()
    )

    return CreateUserResponse.of(user)
  }
}

