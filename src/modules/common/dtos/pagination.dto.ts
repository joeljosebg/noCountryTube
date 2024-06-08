import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

    @ApiProperty({ description: 'The number of items to skip before starting to collect the result set.' })
    @IsOptional()
    @IsPositive()
    @Type( ()  => Number )
    limit?: number;

    @ApiProperty({ description: 'The numbers of items to return.' })
    @IsOptional()
    @Type( ()  => Number )
    @Min(0)
    offset?: number;
}