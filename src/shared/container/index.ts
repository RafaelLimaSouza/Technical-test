import { container } from "tsyringe";

import { UserRepository } from "@infra/repositories/UserRepository";
import { IUserRepository} from "@infra/repositories/IUserRepository"

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
)
