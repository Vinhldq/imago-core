import { Inject, Injectable } from '@nestjs/common';
import {
  ErrorIllegalUpdate,
  PostDomain,
  PostInterop,
  PostResponse,
  PostUseCase,
} from '../../../../domain/post.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';
import { SearchResult, SearchUseCase } from 'src/domain/search.domain';

@Injectable()
export class BaseInteropService implements PostInterop {
  constructor(
    @Inject('PostUseCase') private useCase: PostUseCase,
    @Inject('AuthUseCase') private authUsecase: AuthUseCase,
    @Inject('SearchUseCase') private searchUsecase: SearchUseCase<PostDomain>,
  ) {}
  async getProfilePost(token: string): Promise<any> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getProfilePost();
    } catch (e) {
      throw e;
    }
  }

  search(index: string, query: string): Promise<SearchResult<PostDomain>> {
    return this.searchUsecase.search(index, query);
  }

  async getDetail(id: string, token: string): Promise<PostDomain> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getDetail(id);
    } catch (e) {
      throw e;
    }
  }

  async getByMentionId(
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      return this.useCase.getByMentionId(idToken.uid, page, size);
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

  async getAllPost(
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getAllPost(page, size);
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
      await this.useCase.create(post);
      await this.searchUsecase.create('posts', post, post.id);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async update(post: PostDomain, token: string): Promise<boolean> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      if (post.creatorId == idToken.uid) {
        post.updatedAt = new Date();
        await this.useCase.update(post);
        await this.searchUsecase.update('posts', post, post.id);
        return true;
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
      await this.useCase.delete(id);
      await this.searchUsecase.delete('posts', id);
      return true;
    } catch (e) {
      throw e;
    }
  }
}
