import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CommentEntity } from './comments.entity';
import { CommentsService } from './comments.service';
import { SetCommentsDto } from './dto/setcomments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiTags("Comments")
  @ApiBody({ type: SetCommentsDto })
  async setComments(@Body() setCommentsDto: SetCommentsDto): Promise<CommentEntity> {
    return await this.commentsService.setComments(setCommentsDto);
  }

  @Get(':id')
  @ApiTags("Comments")
  async getComments(@Param('id') id: string): Promise<CommentEntity[]> {
    return await this.commentsService.getComments(id);
  }  
}
