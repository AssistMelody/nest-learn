import { Inject, Injectable } from '@nestjs/common';
import { Pool, createPool } from 'generic-pool';
import { Browser, launch } from 'puppeteer-core';

@Injectable()
export class ServiceNameService {
  public pool: Pool<Browser>;
  constructor(@Inject('HTTP_OPTIONS') public test: any) {
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
          return browser.pages().then((pages) => {
            if (pages.length <= 3) {
              return true;
            }
            return false;
          });
        },
      },
      {
        max: 3, // 最大资源数
        min: 0, // 最小资源数
        // autostart: true, // 自动开始
        testOnBorrow: true, // 验证资源
        acquireTimeoutMillis: 10000, // 资源获取超时时间
        // fifo: true, // 先进先出
        // priorityRange: 3, // 优先级范围 acquire(优先级)排队
        // maxWaitingClients: 1000, // 允许最大的排队请求数
        // evictionRunIntervalMillis: 10 * 1000, // 运行驱逐检查的时间频率, 会将闲置状态的资源释放掉
        // idleTimeoutMillis: 10000, // 超过时间，资源将转化为闲置状态
      },
    );
  }
}
