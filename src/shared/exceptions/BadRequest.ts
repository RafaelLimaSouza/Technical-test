import { AppError } from "./AppError";

export class BadRequest extends AppError{
  constructor(details: string[]){
    super("Bad Request!", 400, details)
  }
}
