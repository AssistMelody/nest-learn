import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { ImageService } from './image.service';
import { BrowserPoolService } from 'src/core/modules/browser/browser-pool.service';
import { Job } from 'bull';
import * as path from 'node:path';
import { Exception } from 'src/utils/exception';
import { ImageStatus } from './entities/image.entity';

@Processor('snapshot')
export class ImageProcessor {
  constructor(
    private readonly imageService: ImageService,
    private readonly browserService: BrowserPoolService,
  ) {}
  @Process('emailSnapshot')
  async createEmailSnapshot(job: Job) {
    try {
      const browser = await this.browserService.getPool().acquire();
      await this.imageService.createImage(browser);
      await job.isCompleted();
      await this.browserService.getPool().release(browser);
    } catch (error) {
      await this.imageService.updateStatus(job.data.id, ImageStatus.REJECTED);
    }
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    job.remove();
    await this.imageService.updateStatus(job.data.id, ImageStatus.RESOLVE);
  }
}
