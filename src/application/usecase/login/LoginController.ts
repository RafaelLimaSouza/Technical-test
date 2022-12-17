import { Request, Response } from 'express'

import { container } from 'tsyringe'

import { LoginService } from './LoginService'

export class LoginController {

  async login(request: Request, response: Response){
    const payload = request.body

    const service = container.resolve(LoginService)

    const token = await service.execute(payload)

    return response.status(200).json(token)
  }

}
