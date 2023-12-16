import { Inject, Injectable } from '@nestjs/common';
import { Options, Pool, createPool } from 'generic-pool';
import { Browser, launch } from 'puppeteer-core';
import { Config } from './browser.type';

@Injectable()
export class BrowserPoolService {
  protected pool: Pool<Browser>;
  constructor(@Inject('config') private config: Config) {
    this.init();
  }

  private init() {
    this.pool = createPool(
      {
        create: async () => {
          const browser = await launch({
            executablePath:
              '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          });
          return browser;
        },
        destroy: async (browser) => {
          await browser.close();
        },
        validate: async (browser) => {
          const count = await browser.pages();
          return count.length < this.config.pageTables;
        },
      },
      this.config,
    );
  }

  public getPool(): Pool<Browser> {
    return this.pool;
  }
}
