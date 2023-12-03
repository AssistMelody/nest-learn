import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { CoreModule } from './core/modules/core.module';

const isProd = process.env.NODE_ENV == 'prod';

@Module({
  imports: [
    UserModule,

    ConfigModule.forRoot({
      envFilePath: `./${isProd ? 'dist/' : ''}env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),

    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          ),
        }),
      ],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('DATABASE_HOST'),
          port: config.get<number>('DATABASE_PORT'),
          username: config.get<string>('DATABASE_USERNAME'),
          password: config.get<string>('DATABASE_PASSWORD'),
          database: config.get<string>('DATABASE_DB_NAME'),
          logging: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: isProd,
        };
      },
    }),

    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
