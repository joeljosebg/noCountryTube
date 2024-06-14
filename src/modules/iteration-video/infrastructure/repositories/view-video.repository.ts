import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ViewVideo } from '@/modules/iteration-video/domain/entities/view-video.entity';
import { SaveViewVideoWithUserDto } from '@/modules/iteration-video/applications/dto/save-view-video.dto';
import { ViewVideoRepositoryPort } from '@/modules/iteration-video/domain/ports/view-video.port';

@Injectable()
export class ViewVideoRepository implements ViewVideoRepositoryPort {
  constructor(
    @InjectRepository(ViewVideo)
    private viewVideoRepository: Repository<ViewVideo>,
  ) {}

  async saveViewVideo(saveView: SaveViewVideoWithUserDto): Promise<ViewVideo> {
    return this.viewVideoRepository.save({
      ...saveView,
    });
  }
}
