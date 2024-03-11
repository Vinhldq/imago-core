import { HttpException, HttpStatus } from '@nestjs/common';

export interface NotificationDomain{
  id: string;
  createdAt: Date;
  uid: string;
  postId: string;
  sender: string;
  isFollow: boolean;
  isLike: boolean;
  isComment: boolean;
}

export interface NotificationRepository {
  create(notification: NotificationDomain): Promise<boolean>;

  getNotificationsByUid(uid: string): Promise<NotificationDomain[]>;

  getNotificationsByFollow(uid: string): Promise<NotificationDomain[]>;

  getNotificationsByLike(uid: string): Promise<NotificationDomain[]>;

  getNotificationsByComment(uid: string): Promise<NotificationDomain[]>;
}

export interface NotificationUseCase {
  create(notification: NotificationDomain): Promise<boolean>;

  getNotificationsByUid(uid: string): Promise<NotificationDomain[]>;

  getNotificationsByFollow(uid: string): Promise<NotificationDomain[]>;

  getNotificationsByLike(uid: string): Promise<NotificationDomain[]>;

  getNotificationsByComment(uid: string): Promise<NotificationDomain[]>;
}

export interface NotificationInterop {
  create(token: string, notification: NotificationDomain): Promise<boolean>;

  getNotificationsByUid(uid: string, token: string): Promise<NotificationDomain[]>;

  getNotificationsByFollow(uid: string, token: string): Promise<NotificationDomain[]>;

  getNotificationsByLike(uid: string, token: string): Promise<NotificationDomain[]>;

  getNotificationsByComment(uid: string, token: string): Promise<NotificationDomain[]>;
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

