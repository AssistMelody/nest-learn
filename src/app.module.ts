import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'mysql.sqlpub.com',
    //   port: 3306,
    //   username: 'root_ys',
    //   password: 'b945c410f24c727a',
    //   database: 'nest_root_ys',
    //   logging: true,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
