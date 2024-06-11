import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";



export class UpdateVideoDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPublic: boolean;


}