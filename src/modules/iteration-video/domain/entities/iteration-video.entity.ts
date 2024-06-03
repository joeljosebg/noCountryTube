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
import { Video } from './video.entity';
import { User } from '@/modules/users_test/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class IterationVideo extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: true })
  @Column({ default: false })
  like: boolean;

  @ApiProperty({ example: true })
  @Column({ default: false })
  disLike: boolean;

  @ApiProperty({ example: 1 })
  @Column()
  videoId: number;

  @ApiProperty({ example: 1 })
  @Column()
  userId: number;

  @ApiProperty({ type: () => Video })
  @ManyToOne(() => Video, (video) => video.interactions)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @ManyToOne(() => User, (user) => user.interactionVideos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: '2021-01-01' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2021-01-01' })
  @UpdateDateColumn()
  updatedAt: Date;
}
