import {  Request } from 'express'

export class AuthorizationService {

  public static getBearerToken(request: Request) {
    const authHeader = request.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    return token
  }
}
