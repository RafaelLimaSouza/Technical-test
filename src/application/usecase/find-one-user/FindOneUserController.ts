import { Request, Response } from "express";

import { container } from "tsyringe";

import { FindOneUserService } from './FindOneUserService'

export class FindOneUserController {

  async findOne(request: Request, response: Response) {
    const service = container.resolve(FindOneUserService)

    const user = await service.execute(request)

    return response.status(200).json(user)
  }

}
