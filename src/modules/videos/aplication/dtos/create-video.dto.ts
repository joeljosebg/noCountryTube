import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateVideoDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    video: Express.Multer.File

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    miniature: Express.Multer.File;


    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsNumber()
    userId: string;

}