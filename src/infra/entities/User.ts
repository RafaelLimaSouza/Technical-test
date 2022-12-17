import { randomUUID } from 'node:crypto'

export interface UserProps {
  id?: string 
  name : string
  email: string
  password: string
  createdAt?: Date
}

export class User {
  private props: UserProps

  constructor(props: UserProps){
    this.props = props
    this.props.id = randomUUID()
    this.props.createdAt = new Date()
  }

  public get id(): string {
    return this.props.id
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get name(): string{
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get email(): string{
    return this.props.email
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get password(): string{
    return this.props.password
  }

  public set password(password: string) {
    this.props.password = password
  }
}


