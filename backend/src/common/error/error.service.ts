import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  success<T>(message: string, args: T) {
    return {
      error: false,
      success: true,
      message,
      ...args,
    };
  }

  internal(message: string, error: string) {
    return new HttpException(
      { message, error, success: false },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  forbidden(message: string, error: string) {
    return new HttpException(
      { message, error, success: false },
      HttpStatus.FORBIDDEN,
    );
  }
}
