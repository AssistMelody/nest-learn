import { Inject, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Repository } from 'typeorm';
import { ImageEntity, ImageStatus } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BrowserPoolService } from 'src/core/modules/browser/browser-pool.service';
import { Browser } from 'puppeteer-core';
import { resolve } from 'path';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly image: Repository<ImageEntity>,

    @InjectQueue('snapshot') private readonly snapshot: Queue,

    private Pool: BrowserPoolService,
  ) {}
  create(createImageDto: CreateImageDto) {
    return this.image.save(createImageDto).then(async (res) => {
      try {
        const browser = await this.Pool.getPool().acquire();
        await this.createImage(browser);
        this.Pool.getPool().release(browser);
        this.updateStatus(res.id, ImageStatus.RESOLVE);
      } catch (error) {
        await this.snapshot.add('emailSnapshot', {
          id: res.id,
        });
      }
    });
  }

  async createImage(browser: Browser) {
    const page = await browser.newPage();
    await page.goto('http://www.baidu.com');
    await page.screenshot({
      path: resolve(__dirname, '../../test/', `${Math.random() * 10000}.png`),
    });
  }

  findAll() {
    return this.image.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  updateStatus(id: number, status: ImageStatus) {
    console.log(id, status);
    const body = {
      id,
      imageStatus: status,
    };
    return this.image.update(id, body);
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
