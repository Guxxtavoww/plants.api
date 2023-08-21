import {
  Controller,
  Get,
  Param,
  BadRequestException,
  Delete,
  Body,
  Put,
  Post,
} from '@nestjs/common';

import { requestDataValidation } from 'src/shared/utils';

import { UsersService } from './users.service';
import { userIdSchema, userSchema } from './dto/users-common.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async listAllUsers() {
    return await this.usersService.listAllUsers();
  }

  @Get(':user_id')
  async getUser(@Param('user_id') user_id: string) {
    const id = requestDataValidation(user_id, userIdSchema);

    if (id === null) {
      throw new BadRequestException('ID NOT VALID');
    }

    return await this.usersService.getOneUser(id);
  }

  @Post('')
  async createUser(@Body() userData: unknown) {
    const correctUserData = requestDataValidation(userData, userSchema);

    return await this.usersService.registerUser(correctUserData);
  }

  @Put('')
  async editUser(@Body() userData: unknown) {
    const correctUserData = requestDataValidation(userData, userSchema);

    return await this.usersService.editUser(correctUserData);
  }

  @Delete(':user_id')
  async deleteUser(@Param('user_id') user_id: string) {
    const id = requestDataValidation(user_id, userIdSchema);

    if (id === null) {
      throw new BadRequestException('ID NOT VALID');
    }

    return await this.usersService.deleteUser(id);
  }
}
