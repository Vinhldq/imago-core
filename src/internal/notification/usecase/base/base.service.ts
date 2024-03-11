import { Inject, Injectable } from '@nestjs/common';
import {
    NotificationDomain,
    NotificationRepository,
    NotificationUseCase,
} from '../../../../domain/notification.domain';

@Injectable()
export class NotificationUseCaseBaseService implements NotificationUseCase {

    constructor(@Inject('NotificationRepository') private notificationRepository: NotificationRepository){
    }
    async create(notification: NotificationDomain): Promise<boolean> {
        if (!this.validateNotification(notification)) {
            return false;
        }
        return this.notificationRepository.create(notification);
    }
    async getNotificationsByUid(uid: string): Promise<NotificationDomain[]> {
        return this.notificationRepository.getNotificationsByUid(uid);
    }
    async getNotificationsByFollow(uid: string): Promise<NotificationDomain[]> {
        let notifications = await this.notificationRepository.getNotificationsByUid(uid);
        if(!notifications){
            return [];
        }
        let data = [];
        notifications.forEach((notification) => {
            if(notification.isFollow){
                data.push(notification);
            }
        });
        return data;
    }
    async getNotificationsByLike(uid: string): Promise<NotificationDomain[]> {
        let notifications = await this.notificationRepository.getNotificationsByUid(uid);
        if(!notifications){
            return [];
        }
        let data = [];
        notifications.forEach((notification) => {
            if(notification.isLike){
                data.push(notification);
            }
        });
        return data;
    }
    async getNotificationsByComment(uid: string): Promise<NotificationDomain[]> {
        let notifications = await this.notificationRepository.getNotificationsByUid(uid);
        if(!notifications){
            return [];
        }
        let data = [];
        notifications.forEach((notification) => {
            if(notification.isComment){
                data.push(notification);
            }
        });
        return data;
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
        return notification.isComment !== undefined;
    }
}
