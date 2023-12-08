import { Process, Processor } from '@nestjs/bull';
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
    this.logger.debug(job.data);
    const result = await test(Math.random() * 5000);
    this.logger.debug('Transcoding completed' + result);
  }
}
