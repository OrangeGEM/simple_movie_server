import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './movies.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Put()
  async parseMovie() {
    return await this.moviesService.parseMovie();
  }

  @Get()
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MovieEntity> {
    return await this.moviesService.findOne(+id);
  }

}
