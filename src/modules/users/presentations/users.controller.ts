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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../applications/dtos/crear-user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { USER_SERVICE_TOKEN } from '../provider.token';
import { UserServiceInterface } from '../domain/services/user-service.interface';
import { UserResponseDto } from '../applications/dtos/create-user-response.dto';
import { GetUsersResponseDto } from '../applications/dtos/get-users-response.dto';
import { SuccessResponseDto } from '../applications/dtos/success-response.dto';
import { UpdateUserDto } from '../applications/dtos/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@/modules/common/decorators/roles.decorator';
import { RolesGuard } from '@/modules/common/guards/roles.guard';
import { VerifyEmailDto } from '../applications/dtos/verify-email-dto';
import { VerifyUsernameDto } from '../applications/dtos/verify-username-dto';
import {
  ResetPasswordDto,
  ResetPasswordResponseDto,
} from '../applications/dtos/reset-password.dto';
import {
  ValidateCodeDto,
  ValidateCodeResponseDto,
} from '../applications/dtos/validate-code.dto';
import {
  NewPasswordDto,
  NewPasswordResponseDto,
} from '../applications/dtos/new-password.dto';

@ApiTags('Users')
@Controller('users')
@Injectable()
export class UsersController {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Para registrar nuevos usuarios' })
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Post('verifiy-email')
  @ApiOperation({ summary: 'Verificar si el email esta registrado' })
  @ApiOkResponse({
    description: 'Returns true if the email has been successfully verified.',
    type: Boolean,
  })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<boolean> {
    return this.userService.verifyEmail(verifyEmailDto.email);
  }

  @Post('verifiy-username')
  @ApiOperation({ summary: 'Verificar si el userName esta registrado' })
  @ApiOkResponse({
    description: 'Returns true if the email has been successfully verified.',
    type: Boolean,
  })
  async verifyUsername(
    @Body() verifyUsernameDto: VerifyUsernameDto,
  ): Promise<boolean> {
    return this.userService.verifyUsername(verifyUsernameDto.userName);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Genera y envia un token al Correo electronico' })
  @ApiOkResponse({
    description: 'Retorna que la operacion fue exitosa.',
    type: ResetPasswordResponseDto,
  })
  async resetPasswordEmail(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResetPasswordResponseDto> {
    return this.userService.resetPasswordEmail(resetPasswordDto);
  }

  @Post('validate-code')
  @ApiOperation({ summary: 'Valida el token para cambiar el password' })
  @ApiOkResponse({
    description: 'Retorna que la operacion fue exitosa.',
    type: ValidateCodeResponseDto,
  })
  async validateCode(
    @Body() ValidateCodeDto: ValidateCodeDto,
  ): Promise<ValidateCodeResponseDto> {
    return this.userService.validateCode(ValidateCodeDto);
  }

  @Post('new-password')
  @ApiOperation({ summary: 'Crea una nueva contraseña' })
  @ApiOkResponse({
    description: 'Retorna que la operacion fue exitosa.',
    type: NewPasswordResponseDto,
  })
  async newPassword(
    @Body() newPasswordDto: NewPasswordDto,
  ): Promise<NewPasswordResponseDto> {
    console.log({ newPasswordDto });
    return this.userService.newPassword(newPasswordDto);
  }

  @Get('get-user-profile/:userName')
  @ApiOperation({
    summary: 'Obtener la informacion de un usuario en especifico',
  })
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: UserResponseDto,
  })
  async getUserProfileAndVideos(
    @Param('userName') userName: string,
  ): Promise<UserResponseDto> {
    return this.userService.getUserProfileAndVideos(userName);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtener todos los usuarios registrados' })
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: GetUsersResponseDto,
  })
  async getUsers(): Promise<GetUsersResponseDto> {
    return this.userService.getUsers();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtener la informacion de un usuario' })
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: GetUsersResponseDto,
  })
  async getUserProfile(@Req() req): Promise<UserResponseDto> {
    return this.userService.getUser(req.user.userId);
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: 'Obtener la informacion de un usuario en especifico',
  })
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: UserResponseDto,
  })
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Actualizar un usuario en especifico' })
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
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiOkResponse({
    description: 'Returns the user has been successfully created.',
    type: SuccessResponseDto,
  })
  async deleteUser(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.userService.deleteUser(id);
  }
}
