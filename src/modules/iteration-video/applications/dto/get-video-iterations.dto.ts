import { ApiProperty } from '@nestjs/swagger';
import { IterationVideo } from '../../domain/entities/iteration-video.entity';

export class GetVideoIterationsResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: [IterationVideo] })
  dataList: IterationVideo[];
}
