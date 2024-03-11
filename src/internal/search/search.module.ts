import { Module } from '@nestjs/common';
import { BaseRepositoryService } from './repository/base.service';
import { BaseInteropService } from './interop/base.service';
import { BaseUseCaseService } from './usecase/base.service';

@Module({
  providers: [
    {
      provide: 'SearchRepository',
      useClass: BaseRepositoryService,
    },
    {
      provide: 'SearchUseCase',
      useClass: BaseUseCaseService,
    },
    {
      provide: 'SearchInterop',
      useClass: BaseInteropService,
    },
  ],
  exports: ['SearchRepository', 'SearchUseCase', 'SearchInterop'],
})
export class SearchModule {}
