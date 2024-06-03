import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@/modules/users_test/domain/entities/user.entity';
import { IterationVideo } from './iteration-video.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Video {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'url' })
  @Column()
  url: string;

  @ApiProperty({ example: 'description' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: true })
  @Column({ default: false })
  isPrivate: boolean;

  @ApiProperty({ example: 'image' })
  @Column({ nullable: true })
  image: string;

  @ApiProperty({ example: 1 })
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => IterationVideo, (interactions) => interactions.video)
  interactions: IterationVideo[];
}
