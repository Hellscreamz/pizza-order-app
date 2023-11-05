import { HttpException, HttpStatus } from '@nestjs/common';

export class NotEnoughProductAmountException extends HttpException {
  constructor() {
    super('Not enough amount of this product', HttpStatus.BAD_REQUEST);
  }
}

export class SizeProductOverException extends HttpException {
  constructor() {
    super('This size of product is over', HttpStatus.BAD_REQUEST);
  }
}

export class AmountProductException extends HttpException {
  constructor() {
    super('Not enough amount of this product', HttpStatus.BAD_REQUEST);
  }
}
