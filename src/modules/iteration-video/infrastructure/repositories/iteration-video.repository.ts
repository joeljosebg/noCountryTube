import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';
import { SaveLikeVideoWithUserDto } from '@/modules/iteration-video/applications/dto/save-like-video.dto';
import { IterationVideoRepositoryPort } from '@/modules/iteration-video/domain/ports/interation-video';
import { User } from '@/modules/users/domain/entities/user.entity';
import { Video } from '@/modules/videos/domain/entities/video.entity';
import { SaveDisLikeVideoWithUserDto } from '@/modules/iteration-video/applications/dto/save-dislike-video.dto';

@Injectable()
export class IterationVideoRepository implements IterationVideoRepositoryPort {
  constructor(
    @InjectRepository(IterationVideo)
    private iterationVideoRepository: Repository<IterationVideo>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  async getVideoIterations(userId: number): Promise<IterationVideo[]> {
    return this.iterationVideoRepository.find({
      where: { userId },
      relations: ['video'],
    });
  }

  async saveLike(saveLike: SaveLikeVideoWithUserDto): Promise<IterationVideo> {
    console.log({
      saveLike1: saveLike,
    });
    const { userId, videoId } = saveLike;

    // Esta implementado pero la validacion se tiene que hacer en el servicio para respetar el principio de responsabilidad unica
    // const video = await this.videoRepository.findOne({
    //   where: { id: videoId },
    // });

    // if (!video) {
    //   throw new NotFoundException(`Video with id ${videoId} not found`);
    // }

    // Esta implementado pero la validacion se tiene que hacer en el servicio para respetar el principio de responsabilidad unica

    // const user = await this.userRepository.findOne({ where: { id: userId } });
    // if (!user) {
    //   throw new NotFoundException(`User with id ${userId} not found`);
    // }

    const iterationVideo = await this.iterationVideoRepository.findOne({
      where: {
        userId: saveLike.userId,
        videoId: saveLike.videoId,
      },
    });
    if (iterationVideo) {
      return this.iterationVideoRepository.save({
        ...iterationVideo,
        like: saveLike.like ? saveLike.like : false,
        disLike: false,
      });
    }
    return this.iterationVideoRepository.save({
      ...saveLike,
      like: true,
      disLike: false,
    });
  }
  async saveDisLike(
    saveDisLike: SaveDisLikeVideoWithUserDto,
  ): Promise<IterationVideo> {
    console.log({
      saveDisLike1: saveDisLike,
    });
    const { userId, videoId } = saveDisLike;

    // Esta implementado pero la validacion se tiene que hacer en el servicio para respetar el principio de responsabilidad unica
    // const video = await this.videoRepository.findOne({
    //   where: { id: videoId },
    // });

    // if (!video) {
    //   throw new NotFoundException(`Video with id ${videoId} not found`);
    // }

    // Esta implementado pero la validacion se tiene que hacer en el servicio para respetar el principio de responsabilidad unica
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const iterationVideo = await this.iterationVideoRepository.findOne({
      where: {
        userId: saveDisLike.userId,
        videoId: saveDisLike.videoId,
      },
    });
    if (iterationVideo) {
      return this.iterationVideoRepository.save({
        ...iterationVideo,
        like: false,
        disLike: saveDisLike.disLike ? saveDisLike.disLike : false,
      });
    }
    return this.iterationVideoRepository.save({
      ...saveDisLike,
      like: false,
      disLike: true,
    });
  }
}
