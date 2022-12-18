export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly details?: string[];

  constructor(message: string, statusCode = 500, details?: string[]){
      this.message = message;
      this.statusCode = statusCode;
      this.details = details ?? null;
  }
}
