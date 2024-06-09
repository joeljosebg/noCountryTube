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
export class CommentVideo extends BaseEntity {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Esta es la descripcion' })
  @Column()
  commentText: string;

  @ApiProperty({ example: 1 })
  @Column()
  videoId: string;

  @ApiProperty({ example: 1 })
  @Column()
  userId: string;

  @ApiProperty({ type: () => Video })
  @ManyToOne(() => Video, (video) => video.comments)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @ManyToOne(() => User, (user) => user.commentVideos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: '2021-01-01' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2021-01-01' })
  @UpdateDateColumn()
  updatedAt: Date;
}
