import express, { Response } from 'express'

import { CreateUserController } from "../../application/usecase/create-user/CreateUserController"
import { LoginController } from '../../application/usecase/login/LoginController'
import { FindOneUserController } from '../../application/usecase/find-one-user/FindOneUserController'

const Router = express.Router()

const createUserController = new CreateUserController()
const loginController = new LoginController()
const findOneUserController = new FindOneUserController()

Router.post('/user', createUserController.create)

Router.get('/user', findOneUserController.findOne)

Router.get('/login', loginController.login)

Router.get('/health-check', (_, response: Response) => {
  return response.status(200).json({
      status: 'Up',
      message: "I'm alive"
  })
})

export default Router
