import { Body, HttpException, Inject, Injectable } from '@nestjs/common';
import {
  Comment,
  CommentRepository, CommentRespone,
  CommentUseCase, ErrorCommentAlreadyExits, ErrorCommentAuthorId,
  ErrorCommentContent, ErrorCommentNotDeleted, ErrorPostId,ErrorEmptyPage, ErrorCommentNotfound, ErrorCommentNotUpdatedByIdNotTheSame, ErrorCommentNotString, ErrorCommentNotCreated
} from '../../../../domain/comment.domain';

import { isNumber } from '@nestjs/common/utils/shared.utils';
import { ErrorEmptyPageData, PageError } from 'src/domain/post.domain';

@Injectable()
export class CommentUseCaseBaseService implements CommentUseCase {
  constructor(@Inject('CommentRepository') private repository: CommentRepository) {
  }



  async createComment(comment: Comment): Promise<boolean> {
    if (typeof (comment.id) !== 'string') {
      throw ErrorCommentNotString;
    }

    if(comment.content === '' || comment.content === null || comment.content === undefined){
      throw ErrorCommentContent;
    }
    if (comment.authorId === '' || comment.authorId === null || comment.authorId === undefined) {
      throw ErrorCommentAuthorId;
    }

    let exists = await this.repository.getCommentById(comment.id);
    if (exists) {
      throw ErrorCommentAlreadyExits;
    }
    if (!comment.id || !comment.postId || !comment.content || !comment.authorId) {
      throw ErrorCommentNotCreated;
    }
    return this.repository.createComment(comment);
  }
     updateComment(id:string, comment: Comment): Promise<boolean> {
       if(id !== comment.id){
        throw ErrorCommentNotUpdatedByIdNotTheSame;
      }
      if(comment.content.trim()===""){
        throw ErrorCommentContent;
      }
        return  this.repository.updateComment(id, comment);
    }
    async deleteComment(id: string, comment: Comment): Promise<boolean> {
        let exists = await this.repository.getCommentById(id);
        if (!exists) {
          throw ErrorCommentNotDeleted;
        }
        return this.repository.deleteComment(id, comment);
    }
    async getCommentById(id: string): Promise<Comment> {
      let exists = await this.repository.getCommentById(id);
      if (!exists) {
        throw ErrorCommentNotfound;
      }
        return await this.repository.getCommentById(id);
    }
  async getCommentsByPostId(
    postId: string,
    page: number,
    ): Promise<CommentRespone> {
    // if don't have data return []
    if (postId === '' || postId === null || postId === undefined) {
      throw ErrorPostId;
    }
    if (page === undefined || page === null) {
      throw ErrorEmptyPage;
    }
    if (isNaN(page)) {
      throw PageError;
    }
    if (page < 1) {
      throw PageError;
    }
    const comments = await this.repository.getCommentsByPostId(postId, page);
    const size = 10;
    if (comments.data.length === 0) {
      return {
        data: [],
        endpage: 0,
      };
    }
    else {
      return {
        data: comments.data.slice((page - 1) * size, page * size),
        endpage: Math.ceil(comments.data.length / size),
      };
    }
  }
    async getComments(): Promise<Comment[]> {

      return await this.repository.getComments();

    }
}
