import { User } from "../../infra/entities/User";
import { IUserRepository } from "./IUserRepository";
import { UserConverter } from "../../infra/converters/UserConverter";

import prisma from "../../infra/database";

export class UserRepository implements IUserRepository {

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    }).catch(err => console.error(err))

    if(!user) return null

    return UserConverter.toDomain(user)
  }


  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    }).catch(err => console.error(err))

    if(!user) return null

    return UserConverter.toDomain(user)
  }

  async create(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: UserConverter.toPrisma(user)
    }).catch(err => console.error(err))

    if(!newUser){
      throw new Error("Error to create new user!")
    }

    return UserConverter.toDomain(newUser)
  }
}
