import { CommentVideo } from '@/modules/iteration-video/domain/entities/comment-video.entity';
import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';
import { ViewVideo } from '@/modules/iteration-video/domain/entities/view-video.entity';
import { Video } from '@/modules/videos/domain/entities/video.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'email' })
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'userName' })
  @Column({ unique: true })
  userName: string;

  @ApiProperty({ example: 'firstName' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'lastName' })
  @Column()
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({ example: 'birthday' })
  @Column({ type: 'date' })
  @IsDate()
  birthday: Date;

  @Column({ type: 'varchar', length: 20 })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'isActive' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/daux5omzt/image/upload/v1716906380/defaultProfileImage_baf38c.png',
  })
  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/daux5omzt/image/upload/v1716906380/defaultProfileImage_baf38c.png',
  })
  photo: string;

  @ApiProperty({ example: 'admin' })
  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: 'admin' | 'user';

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @OneToMany(() => IterationVideo, (iterationVideo) => iterationVideo.user)
  interactionVideos: IterationVideo[];

  @OneToMany(() => CommentVideo, (commentVideo) => commentVideo.user)
  commentVideos: CommentVideo[];

  @OneToMany(() => ViewVideo, (viewVideo) => viewVideo.user)
  viewVideos: ViewVideo[];

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Date of creation',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Date of last update',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
