import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '@app/movies/movies.entity';
import { CommentEntity } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, CommentEntity])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
