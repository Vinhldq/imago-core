import { Injectable } from '@nestjs/common';
import {
  NotificationDomain,
  NotificationRepository,
} from '../../../../domain/notification.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationRepositoryBaseService
  implements NotificationRepository
{
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }
  async create(notification: NotificationDomain): Promise<boolean> {
    try {
      await this.db
        .collection('notifications')
        .doc(notification.id)
        .set(notification);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async getNotificationsByUid(uid: string): Promise<NotificationDomain[]> {
    const notificationsRef = this.db.collection('notifications');
    const query = notificationsRef.where('uid', '==', uid)
    .orderBy('createdAt', 'desc');

    return query.get().then((snapshot) => {
      return snapshot.docs.map((doc) => doc.data() as NotificationDomain);
    });
  }
  async getNotificationsByFollow(uid: string): Promise<NotificationDomain[]> {
    const notificationsRef = this.db.collection('notifications');
    const query = notificationsRef
      .where('uid', '==', uid)
      .where('type', '==', 'follow')
      .orderBy('createdAt', 'desc');
    return query.get().then((snapshot) => {
      return snapshot.docs.map((doc) => doc.data() as NotificationDomain);
    });
  }

  async getNotificationsByLike(uid: string): Promise<NotificationDomain[]> {
    const notificationsRef = this.db.collection('notifications');
    const query = notificationsRef
      .where('uid', '==', uid)
      .where('type', '==', 'like')
      .orderBy('createdAt', 'desc');
    return query.get().then((snapshot) => {
      return snapshot.docs.map((doc) => doc.data() as NotificationDomain);
    });
  }

  async getNotificationsByComment(uid: string): Promise<NotificationDomain[]> {
    const notificationsRef = this.db.collection('notifications');
    const query = notificationsRef
      .where('uid', '==', uid)
      .where('type', '==', 'comment')
      .orderBy('createdAt', 'desc');
    return query.get().then((snapshot) => {
      return snapshot.docs.map((doc) => doc.data() as NotificationDomain);
    });
  }
}
