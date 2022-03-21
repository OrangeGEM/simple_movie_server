import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './movies.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  
  @Put()
  @ApiTags("Movie")
  async parseMovie() {
    return await this.moviesService.parseMovie();
  }

  @Get()
  @ApiTags("Movie")
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  @ApiTags("Movie")
  async findOne(@Param('id') id: string): Promise<MovieEntity> {
    return await this.moviesService.findOne(+id);
  }

}
