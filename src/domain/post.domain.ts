import { HttpException } from '@nestjs/common';
import { Comment } from './comment.domain';
import { SearchResult } from './search.domain';

export interface PostDomain {
  id: string;
  creatorId: string;
  share: string[];
  photoUrl: string[];
  content: string;
  hashtag: string[];
  cateId: string[];
  reaction: string[];
  comments: Comment[];
  mention: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface PostResponse {
  data: PostDomain[];
  endPage: number;
}
export interface AllPosts {
  data: PostDomain[];
  endpage: number;
}

export interface PostRepository {
  getDetail(id: string): Promise<PostDomain>;

  getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getMine(id: string, page: number, size: number): Promise<PostResponse>;

  getByCateId(
    cateId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getShare(shareId: string, page: number, size: number): Promise<PostResponse>;

  create(post: PostDomain): Promise<boolean>;

  update(post: PostDomain): Promise<boolean>;

  delete(id: string): Promise<boolean>;

  getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getAllPost(page: number): Promise<AllPosts>;
}

export interface PostUseCase {
  getDetail(id: string): Promise<PostDomain>;

  getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;
  getByCateId(
    cateId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getMine(id: string, page: number, size: number): Promise<PostResponse>;

  getShare(shareId: string, page: number, size: number): Promise<PostResponse>;

  create(post: PostDomain): Promise<boolean>;

  update(post: PostDomain): Promise<boolean>;

  delete(id: string): Promise<boolean>;

  getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getAllPost(page: number): Promise<AllPosts>;
}

export interface PostInterop {
  getDetail(id: string, token: string): Promise<PostDomain>;

  getAllByUid(
    token: string,
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getMine(token: string, page: number, size: number): Promise<PostResponse>;

  getByCateId(
    cateId: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getShare(token: string, page: number, size: number): Promise<PostResponse>;

  create(post: PostDomain, token: string): Promise<boolean>;

  update(post: PostDomain, token: string): Promise<boolean>;

  delete(id: string, token: string): Promise<boolean>;

  getByMentionId(
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getAllPost(token: string, page: number): Promise<AllPosts>;

  search(index: string, query: string): Promise<SearchResult<PostDomain>>;
}

export const ErrorPostNotFound: HttpException = new HttpException(
  'Post not found',
  404,
);
export const ErrorPostIdInvalid: HttpException = new HttpException(
  'id is invalid',
  400,
);
export const ErrorPostDeleteFailed: HttpException = new HttpException(
  'Post not found to delete',
  400,
);
export const ErrorPostCreateFailed: HttpException = new HttpException(
  'Post create failed',
  400,
);
export const ErrorEmptySize: HttpException = new HttpException(
  'Post size must be a number',
  400,
);
export const ErrorEmptyPage: HttpException = new HttpException(
  'Post page is empty',
  400,
);
export const ErrorEmptyPageData: HttpException = new HttpException(
  'Page is no data',
  400,
);

export const ErrorPageIsNaN: HttpException = new HttpException(
  'Page must be a number',
  400,
);
export const ErrorMinusPage: HttpException = new HttpException(
  ' page cannot be greater than 0',
  400,
);
export const ErrorPostIdIsEmty: HttpException = new HttpException(
  'PostId cannot be empty',
  400,
);
export const SizeError: HttpException = new HttpException(
  ' Size must be greater than 0',
  400,
);

export const PageError: HttpException = new HttpException(
  ' Page must be greater than 0',

  400,
);
export const ErrorContentInvalid: HttpException = new HttpException(
  'Content is invalid',
  400,
);

export const ErrorPhotoInvalid: HttpException = new HttpException(
  'Photo is invalid',
  400,
);
export const ErrorInvalidPostBody: HttpException = new HttpException(
  'Body is invalid',
  400,
);
export const ErrorIllegalUpdate: HttpException = new HttpException(
  'Have no right to update',
  400,
);
