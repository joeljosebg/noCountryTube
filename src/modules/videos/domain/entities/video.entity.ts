import { CommentVideo } from '@/modules/iteration-video/domain/entities/comment-video.entity';
import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';
import { ViewVideo } from '@/modules/iteration-video/domain/entities/view-video.entity';
import { User } from '@/modules/users/domain/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column('text', {
    nullable: false,
  })
  duration?: string;

  @Column('bool', {
    default: true,
  })
  isPublic: boolean;

  @Column()
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => IterationVideo, (interactions) => interactions.video)
  interactions: IterationVideo[];

  @OneToMany(() => CommentVideo, (coment) => coment.video)
  comments: CommentVideo[];

  @OneToMany(() => ViewVideo, (view) => view.video)
  views: ViewVideo[];
}
