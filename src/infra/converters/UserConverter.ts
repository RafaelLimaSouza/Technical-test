import { CreateUserRequest } from "@application/usecase/create-user/resources/CreateUserRequest";
import { User } from "@infra/entities/User";

export class UserConverter {

  public static of(createUserRequest: CreateUserRequest): User {
    return new User({
      email: createUserRequest.email,
      name: createUserRequest.name,
      password: createUserRequest.password
    })
  }
}
