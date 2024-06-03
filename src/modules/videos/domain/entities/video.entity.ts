import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';
import { User } from '@/modules/users_test/domain/entities/user.entity';
import { Optional } from '@nestjs/common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  videoUrl: string;

  @Column('text', {
    default: 'Ejemplo',
  })
  miniatureUrl: string;

  @Column('text', {
    nullable: true,
  })
  description?: string;

  @Column('numeric', {
    nullable: true,
  })
  duration?: number;

  @Column('bool', {
    default: true,
  })
  isPublic: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => IterationVideo, (interactions) => interactions.video)
  interactions: IterationVideo[];
}
