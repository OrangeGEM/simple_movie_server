import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './movies.entity';
import axios from 'axios';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}

  async parseMovie() {
    const token = await axios({ //GET TOKEN 
      method: "POST",
      url: process.env['GET_TOKEN_URL'],
      data: {
        username: process.env['USERNAME_MOVIE_API'],
        password: process.env['PASSWORD_MOVIE_API'],
        grant_type: "password"
      }
    }).then(response => {
      return response.data.access_token;
    })

    const movies = await axios({ //GET MOVIES WITH TOKEN
      method: "GET",
      url: process.env['GET_MOVIE_URL'],
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.data;
    })

    movies.forEach( async (element) => { //Add all movies in DB
      const cast = await axios({
        method: "GET",
        url: `${process.env['BASE_MOVIE_URL']}${element.id}/Cast`,
        headers: {
          Authorization: `Bearer ${token}`  
        }
      }).then(response => {
        return response.data;
      })
      element = {
        ...element,
        cast: cast
      }

      const movie = new MovieEntity();
      Object.assign(movie, element);
      await this.moviesRepository.save(movie);
    })

    return this.moviesRepository.find();
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.moviesRepository.find();
  }

  async findOne(id: number) {
    return await this.moviesRepository.findOne(id);
  }
}
