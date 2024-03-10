import { HttpException } from '@nestjs/common';

export interface StorageDomain {
  urls: string,
  fileName: string,
}

export interface StorageRepository {
  uploadFile(files: Express.Multer.File[], storage: StorageDomain): Promise<string[]>;
}

export interface StorageUseCase {
  uploadFile(files: Express.Multer.File[], storage: StorageDomain): Promise<string[]>;
}

export interface StorageInterop {
  uploadFile(files: Express.Multer.File[], storage: StorageDomain, token: string): Promise<string[]>;
}

//Error Quantity can not be more than 5
export const ErrorQuantity = new HttpException('Quantity can not be more than 5', 400);

//Error File not found
export const ErrorFileRequired = new HttpException('File is required test', 400);