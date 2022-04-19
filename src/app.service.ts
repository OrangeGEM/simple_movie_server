import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './movies/movies.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>
  ) {}

  initializeHello(): string {
    return 'Hello World!';
  }
}
