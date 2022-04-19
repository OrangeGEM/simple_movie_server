import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';
import { MovieEntity } from './movies/movies.entity';
import { ConfigModule } from '@nestjs/config';

import ormconfig from '@app/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([MovieEntity]),
    ConfigModule.forRoot(),
    UserModule,
    MoviesModule,
    CommentsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path:'*',
      method: RequestMethod.ALL
    })
  }
}
