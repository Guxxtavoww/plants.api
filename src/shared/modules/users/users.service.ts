import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { z } from 'zod';

import { DatabaseService } from 'src/shared/modules/database/database.service';

import {
  UserResponse,
  usersResponseSchema,
  UserType,
  userSchema,
  userResponseSchema,
} from './dto/users-common.dto';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async listAllUsers(): Promise<UserResponse[]> {
    const usersResponse = await this.databaseService.users_table.findMany({
      select: {
        created_at: true,
        email: true,
        password: false,
        profile_pic_url: true,
        updated_at: true,
        user_id: true,
        user_name: true,
      },
    });

    const parsedUsers = usersResponseSchema.parse(usersResponse);

    return parsedUsers;
  }

  async getOneUser(user_id: number) {
    try {
      const storageUser = await this.databaseService.users_table.findUnique({
        where: {
          user_id,
        },
        select: {
          created_at: true,
          email: true,
          profile_pic_url: true,
          updated_at: true,
          password: false,
          user_id: true,
          user_name: true,
        },
      });

      const responseUser = userResponseSchema.parse(storageUser);

      return responseUser;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async registerUser({
    email,
    password,
    profile_pic_url,
    user_id,
    user_name,
  }: UserType) {
    try {
      const createdUser = await this.databaseService.users_table.create({
        data: {
          email,
          password,
          profile_pic_url,
          user_id,
          user_name,
        },
      });

      const parsedUser = userSchema.parse(createdUser);

      return parsedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editUser({
    email,
    password,
    profile_pic_url,
    user_id,
    user_name,
  }: UserType) {
    try {
      const editedUser = await this.databaseService.users_table.update({
        where: {
          user_id,
        },
        data: {
          updated_at: new Date(Date.now()),
          email,
          password,
          user_name,
          profile_pic_url,
        },
        select: {
          created_at: true,
          email: true,
          password: false,
          profile_pic_url: true,
          updated_at: true,
          user_id: true,
          user_name: true,
        },
      });

      const response = userResponseSchema.parse(editedUser);

      return response;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error('USER WAS EDITED BUT RETURNED WRONG CHECK DATABASE');
      }

      throw new InternalServerErrorException('FAIL TO EDIT USER');
    }
  }

  async deleteUser(user_id: number) {
    try {
      await this.databaseService.users_table.delete({
        where: {
          user_id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('FAIL TO DELETE USER' + error);
    }
  }
}
