export default class CustomError extends Error {
  statusCode: number
  name: string
  constructor({ statusCode = 500, name, message }: CustomErrorParams) {
    super(message)
    Object.assign(this, { statusCode, name })
  }
}

type ErrorName =
  | 'BadRequestError'
  | 'NotFoundError'
  | 'InternalServerError'
  | 'UnauthorizedError'
  | 'ForbiddenError'

interface CustomErrorParams extends Partial<CustomError> {
  message?: string
  name: ErrorName
}
