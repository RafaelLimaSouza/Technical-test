import { Request, Response } from "express";

import { container } from "tsyringe"

import { CreateUserservice } from './CreateUserService'

export class CreateUserController {
  
  async create(request: Request, response: Response) {

    const service = container.resolve(CreateUserservice)

    const payload = request.body

    const user = await service.execute(payload)

    return response.status(201).json(user)
  }
}
