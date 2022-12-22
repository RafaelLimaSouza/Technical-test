import { User } from "../../../../infra/entities/User";

export interface CreateUserRequestProps {
  name: string
  email: string
  password: string
}

export class CreateUserRequest {
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;

  constructor({name, email, password}: CreateUserRequestProps){
    this.name = name
    this.email = email
    this.password = password
  }

  public toUser(): User {
    return new User({
      email: this.email,
      name: this.name,
      password: this.password
    })
  }
}
