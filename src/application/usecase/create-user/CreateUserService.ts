import { inject, injectable } from "tsyringe";

import Joi from "joi";

import { IUserRepository } from "../../../infra/repositories/IUserRepository";

import { CreateUserRequest, CreateUserRequestProps } from "./resources/CreateUserRequest";
import { CreateUserResponse } from "./resources/CreateUserResponse";

import { PasswordService } from "../../../application/services/PasswordService";
import { AppError } from "../../../shared/exceptions/AppError";


import { ValidateBody } from "../../../shared/helpers/ValidateBody";

@injectable()
export class CreateUserservice {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
    ){}

  public async execute(request: CreateUserRequestProps): Promise<CreateUserResponse> {

    this.validateBody(request)

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

  private validateBody(request: CreateUserRequestProps){
    const schema = Joi.object({
      name: Joi.string().max(255).required(),
      email: Joi.string().email().required().trim(),
      password: Joi.string().min(8).required()
    })

    return ValidateBody.execute(request, schema)
  }
}

