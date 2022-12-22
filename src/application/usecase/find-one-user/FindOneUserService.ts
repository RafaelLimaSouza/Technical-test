import { Request } from "express";

import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../../infra/repositories/IUserRepository";

import { TokenService } from '../../services/TokenService'
import { AuthorizationService } from "../../../application/services/AuthorizationService";

import { FindOneUserResponse } from './resources/FindOneUserResponse';
import { AppError } from "../../../shared/exceptions/AppError";

@injectable()
export class FindOneUserService {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}

  async execute(request: Request): Promise<FindOneUserResponse> {

    const token = AuthorizationService.getBearerToken(request)

    const data = TokenService.decryptToken(token)

    const user = await this.userRepository.findById(data.id)

    if(!user) {
      throw new AppError("Token invalid!", 401);
    }

    return FindOneUserResponse.of(user)
  }
  
}
