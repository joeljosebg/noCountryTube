import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../applications/dtos/crear-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { USER_SERVICE_TOKEN } from '../provider.token';
import { UserServiceInterface } from '../domain/services/user-service.interface';
import { User } from '../domain/entities/user.entity';
import { ResponseCreateUserDto } from '../applications/dtos/response-create-user.dto';

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
    type: [ResponseCreateUserDto],
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: [User],
  })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: [User],
  })
  async getUser(id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: [User],
  })
  async updateUser(@Body() user: User): Promise<User> {
    return this.userService.updateUser(user);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: [User],
  })
  async deleteUser(id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
