import { Inject, Injectable } from '@nestjs/common';
import {
  ErrorEmptyPage,
  ErrorEmptyPageData,
  ErrorPostDeleteFailed,
  ErrorPostNotFound,
  PageError,
  ErrorContentInvalid,
  ErrorEmptySize,
  ErrorInvalidPostBody,
  ErrorMinusPage,
  ErrorPageIsNaN,
  ErrorPhotoInvalid,
  ErrorPostIdInvalid,
  PostDomain,
  PostRepository,
  PostResponse,
  PostUseCase,
  SizeError,
} from '../../../../domain/post.domain';
import { isNumber } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class BaseUseCaseService implements PostUseCase {
  constructor(
    @Inject('PostRepository') private postRepository: PostRepository,
  ) {}
  getProfilePost(): Promise<any> {
    return this.postRepository.getProfilePost();
  }

  async getAllPost(page: number, size: number): Promise<PostResponse> {
    let endPage: number;
    const postRef = await this.postRepository.getAllPost(page, size);
    endPage = postRef.endPage;
    if (page < 1) {
      throw PageError;
    } else if (page === undefined || page === null || isNaN(page)) {
      throw ErrorEmptyPage;
    } else if (page > endPage) {
      throw ErrorEmptyPageData;
    } else {
      return this.postRepository.getAllPost(page, size);
    }
  }

  async getDetail(id: string): Promise<PostDomain> {
    if (!id || id.trim() === '') {
      throw ErrorPostIdInvalid;
    }
    const postDetail = await this.postRepository.getDetail(id);

    if (!postDetail) {
      throw ErrorPostNotFound;
    }

    return postDetail;
  }

  async getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null) {
      throw ErrorEmptyPage;
    } else if (isNaN(page)) {
      throw ErrorPageIsNaN;
    } else if (page <= 0) {
      throw ErrorMinusPage;
    } else {
      return this.postRepository.getByMentionId(mention, page, size);
    }
  }

  getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null) {
      throw ErrorEmptyPage;
    } else if (isNaN(page)) {
      throw ErrorPageIsNaN;
    } else if (page <= 0) {
      throw ErrorMinusPage;
    } else {
      return this.postRepository.getAllByUid(creatorId, page, size);
    }
  }

  getMine(id: string, page: number, size: number): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null) {
      throw ErrorEmptyPage;
    } else if (isNaN(page)) {
      throw ErrorPageIsNaN;
    } else if (page <= 0) {
      throw ErrorMinusPage;
    } else {
      return this.postRepository.getMine(id, page, size);
    }
  }

  getByCateId(
    cateId: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null) {
      throw ErrorEmptyPage;
    } else if (isNaN(page)) {
      throw ErrorPageIsNaN;
    } else if (page <= 0) {
      throw ErrorMinusPage;
    } else {
      return this.postRepository.getByCateId(cateId, page, size);
    }
  }

  getShare(shareId: string, page: number, size: number): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null) {
      throw ErrorEmptyPage;
    } else if (isNaN(page)) {
      throw ErrorPageIsNaN;
    } else if (page <= 0) {
      throw ErrorMinusPage;
    } else {
      return this.postRepository.getShare(shareId, page, size);
    }
  }

  create(post: PostDomain): Promise<boolean> {
    if (!this.isEmptyPhotoUrl(post)) {
      throw ErrorPhotoInvalid;
    }
    if (!this.isEmptyContent(post)) {
      throw ErrorContentInvalid;
    }
    return this.postRepository.create(post);
  }

  update(post: PostDomain): Promise<boolean> {
    if (this.isEmptyPhotoUrl(post)) {
      throw ErrorPhotoInvalid;
    }
    if (this.isEmptyContent(post)) {
      throw ErrorContentInvalid;
    }
    return this.postRepository.update(post);
  }

  async delete(id: string): Promise<boolean> {
    const existed = await this.postRepository.getDetail(id);
    if (!existed) {
      throw ErrorPostDeleteFailed;
    }
    return this.postRepository.delete(id);
  }

  isEmptyContent(post: PostDomain): boolean {
    if (
      post.content === '' ||
      post.content === undefined ||
      post.content === null
    ) {
      throw ErrorInvalidPostBody;
    }
    return true;
  }

  isEmptyPhotoUrl(post: PostDomain): boolean {
    if (
      post.photoUrl.length === 0 ||
      post.photoUrl.values().next().value === '' ||
      isNumber(post.photoUrl.values().next().value)
    ) {
      throw ErrorPhotoInvalid;
    }
    return true;
  }
}
