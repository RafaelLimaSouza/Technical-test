
import { User } from "../../../src/infra/entities/User"
import { IUserRepository } from "../../../src/infra/repositories/IUserRepository"

import { PasswordService } from "../../../src/application/services/PasswordService"

export class CreateUserFactory {
 public static async build(repository: IUserRepository) {
    const user = new User({
      name: "name",
      email: "email@email.com",
      password: "password"
    })

    user.password = await PasswordService.createHashPassword(user.password)

    return repository.create(user)
  }
}
