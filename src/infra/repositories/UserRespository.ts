import { User } from "@infra/entities/User";
import { IUserRepository } from "./IUserRepository";


export class UserRepository implements IUserRepository {
  private users: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = await this.users.find(user => user.id === id)

    if(!user) return null

    return user
  }


  async findByEmail(email: string): Promise<User | null> {
    const user = await this.users.find(user => user.email === email)

    if(!user) return null

    return user
  }

  async create(user: User): Promise<User> {
    await this.users.push(user)

    return user
  }
}
