import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsDate, IsEmail } from 'class-validator';
import { Video } from '@/modules/videos/domain/entities/video.entity';
import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';

@Entity()
export class User1 {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'date' })
  @IsDate()
  birthday: Date;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/daux5omzt/image/upload/v1716906380/defaultProfileImage_baf38c.png',
  })
  photo: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: 'admin' | 'user';

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @OneToMany(() => IterationVideo, (iterationVideo) => iterationVideo.user)
  interactionVideos: IterationVideo[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
