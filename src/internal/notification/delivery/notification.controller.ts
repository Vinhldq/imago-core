import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  Query,
  Get,
} from '@nestjs/common';
import {
  NotificationDomain,
  NotificationInterop,
} from '../../../domain/notification.domain';

@Controller('v1/notification')
export class NotificationController {
  constructor(
    @Inject('NotificationInterop') private interop: NotificationInterop,
  ) {}

  @Post()
  async createNotification(
    @Headers() headers: any,
    @Body() notification: NotificationDomain,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.create(token, notification);
    } catch (e) {
      throw e;
    }
  }

  @Get('all')
  async getNotifications(@Headers() headers: any, @Query('uid') uid: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.getNotificationsByUid(uid, token);
    } catch (e) {
      throw e;
    }
  }

  @Get('follow')
  async getFollowNotifications(
    @Headers() headers: any,
    @Query('uid') uid: string,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getNotificationsByFollow(uid, token);
    } catch (e) {
      throw e;
    }
  }

  @Get('like')
  async getLikeNotifications(
    @Headers() headers: any,
    @Query('uid') uid: string,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getNotificationsByLike(uid, token);
    } catch (e) {
      throw e;
    }
  }

  @Get('comment')
  async getCommentNotifications(
    @Headers() headers: any,
    @Query('uid') uid: string,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getNotificationsByComment(uid, token);
    } catch (e) {
      throw e;
    }
  }
}
