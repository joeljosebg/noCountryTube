import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';
import { Video } from '@/modules/iteration-video/domain/entities/video.entity';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'username' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'exaple@gmail.com' })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({ example: 'lastName' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'firstName' })
  @Column()
  firstName: string;

  @ApiProperty({ example: '2000-01-01' })
  @Column({ type: 'date' })
  birthday: Date;

  @ApiProperty({ example: 'phone' })
  @Column()
  phone: string;

  @ApiProperty({ example: 'true' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: 'photo' })
  @Column({ nullable: true })
  photo: string;

  @ApiProperty({ example: 'user', enum: ['admin', 'user'] })
  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: string;

  @ApiProperty({ example: '2021-01-01' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2021-01-01' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @OneToMany(() => IterationVideo, (iterationVideo) => iterationVideo.user)
  interactionVideos: IterationVideo[];
}
