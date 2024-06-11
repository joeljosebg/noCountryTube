import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewPasswordDto {
  @ApiProperty({ example: 'userid' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'code' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Nueva Contraseña' })
  @IsString()
  password: string;
}

export class NewPasswordResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Contraseña cambiada exitosamente' })
  message: string;
}
