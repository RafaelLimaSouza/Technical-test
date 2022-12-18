import { BadRequest } from '@shared/exceptions/BadRequest'
import { ObjectSchema } from 'joi'

export class ValidateBody {

  static execute(request: Record<string, any>, schema: ObjectSchema ){
    const { error } = schema.validate(request)

    if (error) throw new BadRequest(error.details.map(item => item.message))

    return true
  }

}
