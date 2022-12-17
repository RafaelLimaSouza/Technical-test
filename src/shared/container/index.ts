import { container } from "tsyringe";

import { UserRepository } from "@infra/repositories/UserRespository";
import { IUserRepository} from "@infra/repositories/IUserRepository"

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
)
