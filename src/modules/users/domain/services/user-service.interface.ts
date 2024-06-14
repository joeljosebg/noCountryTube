import { CreateUserDto } from '@/modules/users/applications/dtos/crear-user.dto';
import { UserResponseDto } from '@/modules/users/applications/dtos/create-user-response.dto';
import { GetUsersResponseDto } from '@/modules/users/applications/dtos/get-users-response.dto';
import { SuccessResponseDto } from '@/modules/users/applications/dtos/success-response.dto';
import { UpdateUserDto } from '@/modules/users/applications/dtos/update-user.dto';
import { User } from '@/modules/users/domain/entities/user.entity';
import {
  ResetPasswordDto,
  ResetPasswordResponseDto,
} from '@/modules/users/applications/dtos/reset-password.dto';
import {
  ValidateCodeDto,
  ValidateCodeResponseDto,
} from '../../applications/dtos/validate-code.dto';
import {
  NewPasswordDto,
  NewPasswordResponseDto,
} from '../../applications/dtos/new-password.dto';
import { UserWithVideoResponseDto } from '../../applications/dtos/create-user-with-video-response.dto';

export interface UserServiceInterface {
  createUser(user: CreateUserDto): Promise<UserResponseDto>;
  getUsers(): Promise<GetUsersResponseDto>;
  getUserWithVideos(): Promise<UserWithVideoResponseDto>;
  updateUser(id: string, user: UpdateUserDto): Promise<UserResponseDto>;
  deleteUser(id: string): Promise<SuccessResponseDto>;
  getUser(id: string): Promise<UserResponseDto>;
  getUserProfileAndVideos(userName: string): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<User>;
  findByUsername(userName: string): Promise<User>;
  verifyEmail(email: string): Promise<boolean>;
  verifyUsername(userName: string): Promise<boolean>;
  resetPasswordEmail(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<ResetPasswordResponseDto>;
  newPassword(newPasswordDto: NewPasswordDto): Promise<NewPasswordResponseDto>;
  validateCode(
    ValidateCodeDto: ValidateCodeDto,
  ): Promise<ValidateCodeResponseDto>;
}
