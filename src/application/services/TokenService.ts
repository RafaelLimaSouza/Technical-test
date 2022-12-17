import * as jwt from 'jsonwebtoken'

import { User } from "@infra/entities/User";

import { TokenData } from "./resources/TokenData";
import { AppError } from '@shared/exceptions/AppError';

export class TokenService {

  public static encryptedToken(user: User): string {
    const privateKey = process.env.PRIVATE_KEY_TOKEN

    return jwt.sign(
      { id: user.id }, 
      privateKey,
      { expiresIn: 18000 }
    )
  }

  public static decryptToken(token: string): TokenData | null {
    const privateKey = process.env.PRIVATE_KEY_TOKEN

    const decoded = jwt.verify(token, privateKey, (err, decoded) => {
      if (err)
        throw new AppError("Access denied. Token invalid!", 401);

      return decoded;
    }) as unknown as TokenData
    
    return { exp: decoded.exp, id: decoded.id }
  }
}
