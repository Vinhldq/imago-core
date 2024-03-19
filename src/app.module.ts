import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { CategoryModule } from './internal/category/category.module';
import { PostModule } from './internal/post/post.module';
import { RoleModule } from './internal/role/role.module';
import { AuthModule } from './internal/auth/auth.module';
import { ProfileModule } from './internal/profile/profile.module';
import { CommentModule } from './internal/comment/comment.module';
import { ReportModule } from './internal/report/report.module';
import { HashtagModule } from './internal/hashtag/hashtag.module';
import { StorageModule } from './internal/storage/storage.module';
import { AppController } from './app.controller';
import { SearchModule } from './internal/search/search.module';
import { NotificationModule } from './internal/notification/notification.module';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    PostModule,
    ProfileModule,
    CommentModule,
    ReportModule,
    RoleModule,
    HashtagModule,
    StorageModule,
    SearchModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
