import { Inject, Injectable } from '@nestjs/common';
import {
  CommentNotificationDomain,
  FollowNotificationDomain,
  LikeNotificationDomain,
  NotificationDomain,
  NotificationRepository,
  NotificationUseCase,
} from '../../../../domain/notification.domain';

@Injectable()
export class NotificationUseCaseBaseService implements NotificationUseCase {
  constructor(
    @Inject('NotificationRepository')
    private notificationRepository: NotificationRepository,
  ) {}
  async create(notification: NotificationDomain): Promise<boolean> {
    if (!this.validateNotification(notification)) {
      return false;
    }
    return this.notificationRepository.create(notification);
  }

  async getNotificationsByUid(uid: string): Promise<NotificationDomain[]> {
    return this.notificationRepository.getNotificationsByUid(uid);
  }

  async getNotificationsByFollow(
    uid: string,
  ): Promise<FollowNotificationDomain[]> {
    let notifications =
      await this.notificationRepository.getNotificationsByUid(uid);
    if (!notifications) {
      return [];
    } else {
      let data: FollowNotificationDomain[] = [];
      let followNotifications = this.assignNotification(notifications, data);
      return followNotifications.filter(
        (notification) => notification.isFollow,
      );
    }
  }

  async getNotificationsByLike(uid: string): Promise<LikeNotificationDomain[]> {
    let notifications =
      await this.notificationRepository.getNotificationsByUid(uid);
    if (!notifications) {
      return [];
    } else {
      let data: LikeNotificationDomain[] = [];
      let likeNotifications = this.assignNotification(notifications, data);
      return likeNotifications.filter((notification) => notification.isLike);
    }
  }
  async getNotificationsByComment(
    uid: string,
  ): Promise<CommentNotificationDomain[]> {
    let notifications =
      await this.notificationRepository.getNotificationsByUid(uid);
    if (!notifications) {
      return [];
    } else {
      let data: CommentNotificationDomain[] = [];
      let commentNotifications = this.assignNotification(notifications, data);
      return commentNotifications.filter(
        (notification) => notification.isComment,
      );
    }
  }

  public validateNotification(notification: NotificationDomain): boolean {
    if (!notification.id || notification.id.trim() === '') {
      return false;
    }
    if (!notification.createdAt) {
      return false;
    }
    if (!notification.uid || notification.uid.trim() === '') {
      return false;
    }
    if (!notification.sender || notification.sender.trim() === '') {
      return false;
    }
    if (notification.isFollow === undefined) {
      return false;
    }
    if (notification.isLike === undefined) {
      return false;
    }
    if (notification.isComment === undefined) {
      return false;
    }
    if (!notification.postId || notification.postId.trim() === '') {
      return false;
    }
    if (
      (notification.isFollow == true &&
        notification.isLike == true &&
        notification.isComment == true) ||
      (notification.isFollow == false &&
        notification.isLike == false &&
        notification.isComment == false) ||
      (notification.isFollow == true &&
        notification.isLike == true &&
        notification.isComment == false) ||
      (notification.isFollow == true &&
        notification.isLike == false &&
        notification.isComment == true) ||
      (notification.isFollow == false &&
        notification.isLike == true &&
        notification.isComment == true)
    ) {
      return false;
    }
    return true;
  }

  public assignNotification(
    notification: NotificationDomain[],
    data: any[],
  ): any[] {
    for (let i = 0; i < notification.length; i++) {
      let temp = {
        id: notification[i].id,
        createdAt: notification[i].createdAt,
        uid: notification[i].uid,
        postId: notification[i].postId,
        sender: notification[i].sender,
      };
      if (notification[i].isFollow) {
        data.push({
          ...temp,
          isFollow: notification[i].isFollow,
        });
      }
      if (notification[i].isLike) {
        data.push({
          ...temp,
          isLike: notification[i].isLike,
        });
      }
      if (notification[i].isComment) {
        data.push({
          ...temp,
          isComment: notification[i].isComment,
        });
      }
    }
    return data;
  }
}
