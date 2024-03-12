import { HttpException, HttpStatus } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import Timestamp = firestore.Timestamp;

export interface NotificationDomain{
  id: string;
  createdAt: string;
  uid: string;
  postId: string;
  sender: string;
  isFollow: boolean;
  isLike: boolean;
  isComment: boolean;
}

export interface LikeNotificationDomain {
  id: string;
  createdAt: string;
  uid: string;
  postId: string;
  sender: string;
  isLike: boolean;
}

export interface CommentNotificationDomain {
  id: string;
  createdAt: string;
  uid: string;
  postId: string;
  sender: string;
  isComment: boolean;
}

export interface FollowNotificationDomain {
  id: string;
  createdAt: string;
  uid: string;
  postId: string;
  sender: string;
  isFollow: boolean;
}

export interface NotificationRepository {
  create(notification: NotificationDomain): Promise<boolean>;

  getNotificationsByUid(uid: string): Promise<NotificationDomain[]>;

  getNotificationsByFollow(uid: string): Promise<FollowNotificationDomain[]>;

  getNotificationsByLike(uid: string): Promise<LikeNotificationDomain[]>;

  getNotificationsByComment(uid: string): Promise<CommentNotificationDomain[]>;
}

export interface NotificationUseCase {
  create(notification: NotificationDomain): Promise<boolean>;

  getNotificationsByUid(uid: string): Promise<NotificationDomain[]>;

  getNotificationsByFollow(uid: string): Promise<FollowNotificationDomain[]>;

  getNotificationsByLike(uid: string): Promise<LikeNotificationDomain[]>;

  getNotificationsByComment(uid: string): Promise<CommentNotificationDomain[]>;
}

export interface NotificationInterop {
  create(token: string, notification: NotificationDomain): Promise<boolean>;

  getNotificationsByUid(uid: string, token: string): Promise<NotificationDomain[]>;

  getNotificationsByFollow(uid: string, token: string): Promise<FollowNotificationDomain[]>;

  getNotificationsByLike(uid: string, token: string): Promise<LikeNotificationDomain[]>;

  getNotificationsByComment(uid: string, token: string): Promise<CommentNotificationDomain[]>;
}

export const ErrorNotificationCreateFailed = new HttpException(
  'Notification create failed',
  HttpStatus.BAD_REQUEST,
);

export const ErrorNotificationNotFound = new HttpException(
  'Notification not found',
  HttpStatus.NOT_FOUND,
);

export const ErrorNotificationNotCreated = new HttpException(
  'Notification not created',
  HttpStatus.BAD_REQUEST,
);

export const ErrorNotificationNotString = new HttpException(
  'Notification id not string',
  HttpStatus.BAD_REQUEST,
);

export const ErrorNotificationUidRequired = new HttpException(
  'Notification uid required',
  HttpStatus.BAD_REQUEST,
);

export const ErrorNotificationSenderRequired = new HttpException(
  'Notification sender required',
  HttpStatus.BAD_REQUEST,
);

export const ErrorNotificationFollowRequired = new HttpException(
  'Notification follow required',
  HttpStatus.BAD_REQUEST,
);

export const ErrorNotificationLikeRequired = new HttpException(
  'Notification like required',
  HttpStatus.BAD_REQUEST,
);

export const ErrorNotificationCommentRequired = new HttpException(
  'Notification comment required',
  HttpStatus.BAD_REQUEST,
);

