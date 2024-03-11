import { Module } from '@nestjs/common';
import { NotificationInteropBaseService } from './interop/base/base.service';
import { NotificationRepositoryBaseService } from './repository/base/base.service';
import { NotificationUseCaseBaseService } from './usecase/base/base.service';
import { AuthModule } from '../auth/auth.module';
import { NotificationController } from './delivery/notification.controller';

@Module({
  providers: [{
    provide: 'NotificationRepository',
    useClass: NotificationRepositoryBaseService,
  },
    {
      provide: 'NotificationUseCase',
      useClass: NotificationUseCaseBaseService,
    },
    {
      provide: 'NotificationInterop',
      useClass: NotificationInteropBaseService,
    }],
  imports: [AuthModule ],
  controllers: [NotificationController],
  exports: ['NotificationRepository', 'NotificationUseCase', 'NotificationInterop'],
})
export class NotificationModule {}
