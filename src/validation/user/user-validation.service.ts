import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Users } from 'src/user/user.entity';

@Injectable()
export class UserValidationService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async verifyUserCredentials(
    email: string,
    password: string,
  ): Promise<Users | null> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }

  async passwordValidation(password: string): Promise<boolean> {
    // This regex pattern enforces a password requirement of at least 8 characters, including:
    // - At least one letter (uppercase or lowercase)
    // - At least one digit (0-9)
    // - At least one special character from [!#$%&? "]
    // Example: Abc123#xyz
    // Resource: https://stackoverflow.com/questions/2370015/regular-expression-for-password-validation

    const passwordRegex =
      /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
    return passwordRegex.test(password);
  }
}
