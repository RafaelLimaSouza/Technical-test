import { User } from "@infra/entities/User";

export class UserConverter {

  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt
    }
  }

  static toDomain(user: Partial<User>): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt
    })
  }
}
