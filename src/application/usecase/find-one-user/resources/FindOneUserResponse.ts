import { User } from "@infra/entities/User";

export class FindOneUserResponse {
  public static of(user: User){
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}
