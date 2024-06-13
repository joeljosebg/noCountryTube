import { UserServiceInterface } from '@/modules/users/domain/services/user-service.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/crear-user.dto';
import { User } from '@/modules/users/domain/entities/user.entity';
import {
  TOKEN_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '@/modules/users/provider.token';
import { UserRepositoryPort } from '@/modules/users/domain/port/user-repository.port';
import { UserRepository } from '@/modules/users/infrastructure/repository/user.repository';
import { BCRYPT_SERVICE_TOKEN } from '@/libs/bcrypt/bcrypt.module';
import { BcryptService } from '@/libs/bcrypt/bcrypt.service';
import { UserResponseDto } from '../../dtos/create-user-response.dto';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { GetUsersResponseDto } from '../../dtos/get-users-response.dto';
import { SuccessResponseDto } from '../../dtos/success-response.dto';
import {
  ResetPasswordDto,
  ResetPasswordResponseDto,
} from '../../dtos/reset-password.dto';
import { TokenServiceInterface } from '@/modules/users/domain/services/token-service.interface';
import { MAIL_SERVICE_TOKEN } from '@/libs/mailer/mailer.module';
import { MailService } from '@/libs/mailer/mailer.service';
import {
  ValidateCodeDto,
  ValidateCodeResponseDto,
} from '../../dtos/validate-code.dto';
import {
  NewPasswordDto,
  NewPasswordResponseDto,
} from '../../dtos/new-password.dto';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(BCRYPT_SERVICE_TOKEN) private bcryptService: BcryptService,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepositoryPort,
    @Inject(TOKEN_SERVICE_TOKEN) private tokenService: TokenServiceInterface,
    @Inject(MAIL_SERVICE_TOKEN) private readonly mailerService: MailService,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await this.bcryptService.hashPassword(user.password);

    const userEmail = await this.userRepository.findByEmail(user.email);
    if (userEmail) {
      throw new BadRequestException('Error creating user', {
        cause: new Error(),
        description: 'User already exists',
      });
    }

    const userUsername = await this.userRepository.findByUsername(
      user.userName,
    );
    if (userUsername) {
      throw new BadRequestException('Error creating user', {
        cause: new Error(),
        description: 'UserName already taken',
      });
    }

    const userSave = await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
    return {
      success: true,
      data: {
        ...userSave,
        password: '',
      },
    } as UserResponseDto;
  }
  async getUsers(): Promise<GetUsersResponseDto> {
    const users = await this.userRepository.getUsers();
    return {
      success: true,
      data: users,
    } as GetUsersResponseDto;
  }
  async getUser(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getUser(id);

    return {
      success: true,
      data: { ...user, password: '' },
    } as UserResponseDto;
  }
  async getUserProfileAndVideos(userName: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getUserProfileAndVideos(userName);

    return {
      success: true,
      data: { ...user, password: '' },
    } as UserResponseDto;
  }
  async updateUser(id: string, userUdate: User): Promise<UserResponseDto> {
    const user = await this.userRepository.updateUser(id, userUdate);
    return {
      success: true,
      data: { ...user, password: '' },
    } as UserResponseDto;
  }

  async deleteUser(id: string): Promise<SuccessResponseDto> {
    const user = await this.userRepository.deleteUser(id);
    return {
      success: true,
    };
  }
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async findByUsername(userName: string): Promise<User> {
    return await this.userRepository.findByUsername(userName);
  }

  async verifyEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return user !== null;
  }

  async verifyUsername(userName: string): Promise<boolean> {
    const user = await this.userRepository.findByUsername(userName);
    return user !== null;
  }
  async resetPasswordEmail(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<ResetPasswordResponseDto> {
    const user = await this.userRepository.findByEmail(resetPasswordDto.email);
    if (!user) {
      return {
        success: false,
        message:
          'Email no registrado, por favor verifique que el email sea correcto',
      };
    }
    const token = await this.tokenService.generateToken(user.id);

    const template = 'reset-password.hbs';
    const context = {
      user: {
        email: user.email,
        firstName: user.firstName,
      },
      code: token,
    };
    await this.mailerService.sendEmail(
      user.email,
      'Restablecer contraseña',
      template,
      context,
    );

    return {
      success: true,
      message:
        'Enviamos un correo electronico con el codigo para restablecer tu contraseña',
      userId: user.id,
    };
  }
  async validateCode(
    validateCodeDto: ValidateCodeDto,
  ): Promise<ValidateCodeResponseDto> {
    const isValid = await this.tokenService.validateToken(
      validateCodeDto.userId,
      validateCodeDto.code,
    );
    if (!isValid) {
      return {
        success: false,
        message: 'Codigo invalido',
      };
    }
    const token = await this.tokenService.generateToken(validateCodeDto.userId);
    return {
      success: true,
      message: 'Codigo valido',
      userId: validateCodeDto.userId,
      code: token,
    };
  }
  async newPassword(
    newPasswordDto: NewPasswordDto,
  ): Promise<NewPasswordResponseDto> {
    const isValid = await this.tokenService.validateToken(
      newPasswordDto.userId,
      newPasswordDto.code,
    );
    if (!isValid) {
      return {
        success: false,
        message: 'Codigo invalido',
      };
    }

    const hashedPassword = await this.bcryptService.hashPassword(
      newPasswordDto.password,
    );

    const user = await this.userRepository.updatePassword(
      newPasswordDto.userId,
      hashedPassword,
    );
    console.log({ user });
    return {
      success: true,
      message: 'Contraseña cambiada exitosamente',
    };
  }
}
