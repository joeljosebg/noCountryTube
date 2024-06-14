import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Video } from '@/modules/videos/domain/entities/video.entity';
import { User } from '@/modules/users/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ViewVideo extends BaseEntity {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 1 })
  @Column()
  videoId: string;

  @ApiProperty({ example: 1 })
  @Column()
  userId: string;

  @ApiProperty({ type: () => Video })
  @ManyToOne(() => Video, (video) => video.views)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @ManyToOne(() => User, (user) => user.viewVideos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: '2021-01-01' })
  @CreateDateColumn()
  createdAt: Date;
}
