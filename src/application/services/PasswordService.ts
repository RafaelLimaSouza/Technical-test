import { hash, compare } from 'bcrypt';

export class PasswordService {
  static async createHashPassword(password: string) {
    return hash(password, 8);
  }

  static async comparePassword(requestPassword: string, storePassword: string) {
    return compare(
      requestPassword,
      storePassword
    );
  }
}
