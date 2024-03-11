import { Inject, Injectable } from '@nestjs/common';
import { NotificationDomain, NotificationInterop, NotificationUseCase } from '../../../../domain/notification.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';

@Injectable()
export class NotificationInteropBaseService implements NotificationInterop {

    constructor(@Inject('NotificationUseCase') private useCase: NotificationUseCase,
                @Inject('AuthUseCase') private authUseCase: AuthUseCase) {}
    async create(token: string, notification: NotificationDomain): Promise<boolean> {
        try{
            let idToken = await this.authUseCase.verifyToken(token);
            notification.id = Date.now().toString();
            notification.createdAt = new Date();
            notification.sender = idToken.uid;
            return this.useCase.create(notification);
        }catch(e){
            throw e;
        }
    }
    async getNotificationsByUid(uid: string, token: string): Promise<NotificationDomain[]> {
        try {
            let idToken = await this.authUseCase.verifyToken(token);
            if (idToken.uid !== uid) {
                throw Error('Unauthorized');
            }
            return this.useCase.getNotificationsByUid(uid);
        } catch (e) {
            throw e;
        }
    }
    async getNotificationsByFollow(uid: string, token: string): Promise<NotificationDomain[]> {
        try {
            let idToken = await this.authUseCase.verifyToken(token);
            if (idToken.uid !== uid) {
                throw Error('Unauthorized');
            }
            return this.useCase.getNotificationsByFollow(uid);
        } catch (e) {
            throw e;
        }
    }
    async getNotificationsByLike(uid: string, token: string): Promise<NotificationDomain[]> {
        try {
            let idToken = await this.authUseCase.verifyToken(token);
            if (idToken.uid !== uid) {
                throw Error('Unauthorized');
            }
            return this.useCase.getNotificationsByLike(uid);
        } catch (e) {
            throw e;
        }
    }
    async getNotificationsByComment(uid: string, token: string): Promise<NotificationDomain[]> {
        try {
            let idToken = await this.authUseCase.verifyToken(token);
            if (idToken.uid !== uid) {
                throw Error('Unauthorized');
            }
            return this.useCase.getNotificationsByComment(uid);
        }
        catch (e) {
            throw e;
        }
    }
}
