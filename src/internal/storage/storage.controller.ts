import {
  Body,
  Controller,
  FileTypeValidator, Get, Headers,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { url } from 'inspector';
import { max } from 'rxjs';
import { StorageDomain, StorageInterop } from 'src/domain/storage.domain';

@Controller('v1/storage')
export class StorageController {
  constructor(@Inject('StorageInterop') private storageInterop: StorageInterop) { }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@Body() storage: StorageDomain,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png)' })
        ]
      })
    ) files: Express.Multer.File[], @Headers() headers:any
  ) {
    
    try {
    
      let token = headers['authorization'];
      return this.storageInterop.uploadFile(files, storage, token );
    } catch (e) {
      throw new Error("Error uploading file to storage");
    }
  }
}