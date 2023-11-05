import * as jwt from 'jsonwebtoken';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}

  getSecretKey(): string {
    try {
      const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
      if (!secretKey) {
        throw new Error('JWT secret key not found in the configuration.');
      }
      return secretKey;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve JWT secret key: ${error.message}`,
      );
    }
  }

  generateToken(userId: string): string {
    try {
      const payload = { userId };
      const secretKey = this.getSecretKey();
      const expiresIn = this.configService.get<string>('JWT_EXPIRATION_TIME');
      const token = jwt.sign(payload, secretKey, { expiresIn });
      return token;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to generate token: ${error.message}`,
      );
    }
  }
}
