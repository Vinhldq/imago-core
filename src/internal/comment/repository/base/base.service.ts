import { Body, HttpException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Comment, CommentRepository, CommentRespone } from '../../../../domain/comment.domain';
import {
  ErrorCommentNotDeleted,
  ErrorCommentNotUpdatedByIdNotTheSame,
} from '../../../../domain/comment.domain';

@Injectable()
export class CommentRepositoryBaseService implements CommentRepository{
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }
  async getCommentsByPostId(
    postId: string,
    page: number,
  ): Promise<CommentRespone> {
    try {
      const commentRef = this.db.collection('comments');
      const snapshot = await commentRef.where('postId', '==', postId).get();
      const comments = snapshot.docs.map((doc) => doc.data() as Comment);
      const size = 10;

      // don't have data return []
      if (comments.length === 0) {
        return {
          data: [],
          endpage: 0,
        };
      }
      else {
        return {
          data: comments.slice((page - 1) * size, page * size),
          endpage: Math.ceil(comments.length / size),
        };
      }
    } catch (e) {
      throw e;
    }
  }
  async createComment(comment: Comment): Promise<boolean> {
    try {

      const Comment = await this.db.collection('comments').doc(comment.id).set(comment);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async updateComment(id: string,comment: Partial<Comment>): Promise<boolean> {
    try {
      const Comment = await this.db.collection('comments').doc(id).update(comment);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async deleteComment(id: string, comment: Comment): Promise<boolean> {
    try {
      const docRef = this.db.collection('comments').doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        return false;
      }
      await docRef.delete();
      return true;
    } catch (e) {
      throw e;
    }
  }
  async getCommentById(id: string): Promise<Comment> {
    try {
      const comment = await this.db.collection('comments').doc(id).get();
      return comment.data() as Comment;
    } catch (e) {
      throw e;
    }
  }
  async getComments(): Promise<Comment[]> {
    try {
      const comments = await this.db.collection('comments').get();
      return comments.docs.map(doc => doc.data() as Comment);
    } catch (e) {
      throw e;
    }
  }
}

