import { User } from "../../../src/infra/entities/User";
import { IUserRepository } from "../../../src/infra/repositories/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = []

  async create(user: User): Promise<User> {
    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    if(!user) return null

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id)

    if(!user) return null

    return user
  }

  async remove() {
    this.users = []
  }

}
