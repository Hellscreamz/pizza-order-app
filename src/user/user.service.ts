import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Users } from './user.entity';
import {
  CreateUserInput,
  FindUserByEmailInput,
  UpdateUserInput,
  DeleteUserByEmailInput,
  UserType,
} from './user.type';
import { UserValidationService } from 'src/validation/user/user-validation.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private userValidationService: UserValidationService,
  ) {}

  async getAllUsers(): Promise<UserType[]> {
    return this.userRepository.find();
  }

  async findUserByEmail(input: FindUserByEmailInput): Promise<UserType> {
    try {
      return this.userRepository.findOneOrFail({
        where: { email: input.email },
        relations: ['orders'],
      });
    } catch (error) {
      throw new NotFoundException(`User not found! Error: ${error.message}`);
    }
  }

  async createUser(input: CreateUserInput): Promise<UserType> {
    const user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const isPasswordValid = await this.userValidationService.passwordValidation(
      input.password,
    );

    if (!isPasswordValid) {
      throw new Error(
        'Invalid password. Password must meet the specified criteria.',
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const newUser = this.userRepository.create({
        ...input,
        password: hashedPassword,
      });

      return this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(`Failed to create the user!  Error: ${error.message}`);
    }
  }

  async updateUser(input: UpdateUserInput): Promise<UserType> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email: input.email },
      });

      Object.assign(user, input);
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`User not found! Error: ${error.message}`);
    }
  }

  async deleteUser(input: DeleteUserByEmailInput): Promise<UserType> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email: input.email },
      });
      const deletedUser = { ...user };
      await this.userRepository.remove(user);
      return deletedUser;
    } catch (error) {
      throw new NotFoundException(`User not found! Error: ${error.message}`);
    }
  }
}
