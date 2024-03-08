import { Module } from '@nestjs/common';
import { FirestoreRepositoryService } from './firestore-repository/firestore-repository.service';
import { BaseUseCaseService } from './base-use-case/base-use-case.service';
import { RoleBaseInteropService } from './role-base-interop/role-base-interop.service';
import { RoleController } from './delivery/role.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
    {
      provide: 'RoleRepository',
      useClass: FirestoreRepositoryService,
    },
    {
      provide: 'RoleUseCase',
      useClass: BaseUseCaseService,
    },
    {
      provide: 'RoleInterop',
      useClass: RoleBaseInteropService,
    },
  ],
  controllers: [RoleController],
  exports: ['RoleRepository', 'RoleUseCase', 'RoleInterop'],
  imports: [AuthModule],
})
export class RoleModule {}
