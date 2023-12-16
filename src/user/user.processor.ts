import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

function test(number: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(number);
    }, number);
  });
}

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcode')
  async handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job);
    const result = await test(Math.random() * 10000);
    job.progress(10);
    this.logger.debug('Transcoding completed' + result);
    return {
      complete: true,
    };
  }

  @OnQueueCompleted()
  handleComplete(job: Job, result: any) {
    this.logger.debug(job.data, job.id, result);
  }
}
