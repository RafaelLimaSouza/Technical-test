import { inject, injectable } from "tsyringe";

import { TokenService } from "@application/services/TokenService";

import { IUserRepository } from "@infra/repositories/IUserRepository";

import { LoginRequest } from "./resources/LoginRequest";
import { LoginResponse } from "./resources/LoginResponse";
import { AppError } from "@shared/exceptions/AppError";
import { PasswordService } from "@application/services/PasswordService";

@injectable()
export class LoginService {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}

  public async execute(request: LoginRequest): Promise<LoginResponse>{

    const user = await this.userRepository.findByEmail(request.email.toLowerCase())

    if(!user) {
      throw new AppError("Email or password invalid", 400);
    }

    const passwordIsValid = await PasswordService.comparePassword(request.password, user.password)

    if(!passwordIsValid){
      throw new AppError("Email or password invalid", 400);
    }

    const token = TokenService.encryptedToken(user)

    return {
      token
    }
  }
}
