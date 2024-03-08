import { Inject, Injectable } from '@nestjs/common';
import {
  AllPosts,
  ErrorIllegalUpdate,
  PostDomain,
  PostInterop,
  PostResponse,
  PostUseCase,
} from '../../../../domain/post.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';

@Injectable()
export class BaseInteropService implements PostInterop {
  constructor(
    @Inject('PostUseCase') private useCase: PostUseCase,
    @Inject('AuthUseCase') private authUsecase: AuthUseCase,
  ) {}

  async getDetail(id: string, token: string): Promise<PostDomain> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getDetail(id);
    } catch (e) {
      throw e;
    }
  }

  async getByMentionId(
    mention: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getByMentionId(mention, page, size);
    } catch (e) {
      throw e;
    }
  }

  async getMine(
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      return this.useCase.getMine(idToken.uid, page, size);
    } catch (e) {
      throw e;
    }
  }

  async getAllByUid(
    token: string,
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getAllByUid(creatorId, page, size);
    } catch (e) {
      throw e;
    }
  }

  async getAllPost(token: string, page: number): Promise<AllPosts> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getAllPost(page);
    } catch (e) {
      throw e;
    }
  }

  async getByCateId(
    cateId: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getByCateId(cateId, page, size);
    } catch (e) {
      throw e;
    }
  }

  async getShare(
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      return this.useCase.getShare(idToken.uid, page, size);
    } catch (e) {
      throw e;
    }
  }

  async create(post: PostDomain, token: string): Promise<boolean> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      post.id = idToken.uid.slice(0, 10) + Date.now().toString();
      post.creatorId = idToken.uid;
      post.comments = [];
      post.reaction = [];
      post.share = [];
      post.createdAt = new Date();
      if (post.cateId == undefined || post.cateId == null) {
        post.cateId = [];
      }

      if (post.mention == undefined || post.mention == null) {
        post.mention = [];
      }
      if (post.hashtag == undefined || post.hashtag == null) {
        post.hashtag = [];
      }
      post.updatedAt = null;
      post.deletedAt = null;
      return this.useCase.create(post);
    } catch (e) {
      throw e;
    }
  }

  async update(post: PostDomain, token: string): Promise<boolean> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      if (post.creatorId == idToken.uid) {
        post.updatedAt = new Date();
        return this.useCase.update(post);
      } else {
        throw ErrorIllegalUpdate;
      }
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string, token: string): Promise<boolean> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
