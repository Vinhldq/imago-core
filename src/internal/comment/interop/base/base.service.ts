import { Body, Inject, Injectable } from '@nestjs/common';
import {
  Comment,
  CommentInterop,
  CommentRespone,
  CommentUseCase,
  ErrorCommentPostId, ErrorPostIdNotExist,
} from '../../../../domain/comment.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';
import { PostDomain, PostUseCase } from '../../../../domain/post.domain';

@Injectable()
export class CommentInteropBaseService implements CommentInterop {

    constructor(@Inject('CommentUseCase') private useCase: CommentUseCase, @Inject('AuthUseCase') private auth: AuthUseCase, @Inject('PostUseCase') private postUseCase: PostUseCase) {}


    async createComment(token: string,comment: Comment) {
        try {
          let decoded = await this.auth.verifyToken(token);
          comment.authorId = decoded.uid;
          comment.createdAt = new Date().toString();
          return await this.useCase.createComment(comment);
        }catch (e) {
            throw e;
        }
    }
    async updateComment(token: string,id: string, comment: Comment) {
      try {
        await this.auth.verifyToken(token);
        return this.useCase.updateComment(id,comment);
      }
      catch (e) {
        throw e;
      }
    }
    async deleteComment(token: string,id: string,comment: Comment){
      try {
        await this.auth.verifyToken(token);
        return await this.useCase.deleteComment(id,comment);
      }
      catch (e) {
        throw e;
      }
    }
    async getCommentById(token: string,id: string): Promise<Comment> {
      try {
        await this.auth.verifyToken(token);
        return await this.useCase.getCommentById(id);
      }
      catch (e) {
          throw e;
      }
    }
  async getCommentsByPostId(token: string, postId: string,page: number): Promise<CommentRespone> {
    try {
      let decoded = await this.auth.verifyToken(token);
      let post= await this.postUseCase.getDetail(postId);
      if(post === undefined || post === null ){
        return {
          data: [],
          endpage: 0,
        };
        
      }
      return await this.useCase.getCommentsByPostId(postId,page);
    } catch (e) {
      throw e;
    }
  }
    async getComments(token: string): Promise<Comment[]> {
      try {
        await this.auth.verifyToken(token);
        return await this.useCase.getComments();
      }
      catch (e) {
          throw e;
      }
    }
}

