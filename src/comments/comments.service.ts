import { MovieEntity } from '@app/movies/movies.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comments.entity';
import { SetCommentsDto } from './dto/setcomments.dto';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) {}

  async getComments(id: string): Promise<CommentEntity[]> {
    return await this.commentRepository.find({ where: { movie_id: id } });
  }

  async setComments(setCommentsDto: SetCommentsDto): Promise<CommentEntity> {
    const newComment = new CommentEntity();
    Object.assign(newComment, setCommentsDto);
    return await this.commentRepository.save(newComment)
  }
}
