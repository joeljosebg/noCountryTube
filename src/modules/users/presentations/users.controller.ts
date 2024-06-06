import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../applications/dtos/crear-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { USER_SERVICE_TOKEN } from '../provider.token';
import { UserServiceInterface } from '../domain/services/user-service.interface';
import { User } from '../domain/entities/user.entity';
import { UserResponseDto } from '../applications/dtos/create-user-response.dto';
import { GetUsersResponseDto } from '../applications/dtos/get-users-response.dto';
import { SuccessResponseDto } from '../applications/dtos/success-response.dto';
import { UpdateUserDto } from '../applications/dtos/update-user.dto';

@ApiTags('Users')
@Controller('users')
@Injectable()
export class UsersController {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: GetUsersResponseDto,
  })
  async getUsers(): Promise<GetUsersResponseDto> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: UserResponseDto,
  })
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: UserResponseDto,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserResponseDto> {
    console.log({ user, id });
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: SuccessResponseDto,
  })
  async deleteUser(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.userService.deleteUser(id);
  }
}
