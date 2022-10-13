import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('유효하지 않은 토큰입니다.', HttpStatus.UNAUTHORIZED);
  }
}
