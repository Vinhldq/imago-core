import { Inject, Injectable } from '@nestjs/common';
import {
  StorageDomain,
  StorageRepository,
} from '../../../domain/storage.domain';
import * as admin from 'firebase-admin';

import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class RepositoryService implements StorageRepository {
  storage: admin.storage.Storage;
  constructor() {
    this.storage = admin.storage();
  }

  //how to upload a file to firebase storage
  async uploadFile(files: Express.Multer.File[], storage: StorageDomain): Promise<string[]> {
    //how to upload a file to firebase storage
    const bucket = this.storage.bucket('gs://itss-imago-0000.appspot.com');
    const publicUrls: string[] = [];

    await Promise.all(
      files.map(async(file)=>{
        const fileName = `images/${storage.fileName}/${file.originalname}`;
        const fileUpload = bucket.file(fileName);

        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        await new Promise((resolve, reject) => {
          blobStream.on('error', async(error)=>{
            reject(error)
          })

          blobStream.on('finish', async()=>{
            const [imageUrl] = await fileUpload.getSignedUrl({
              action: 'read',
              expires: '01-01-2500',
            });
            console.log(imageUrl);
            publicUrls.push(imageUrl);
            resolve(imageUrl);
          })
          blobStream.end(file.buffer);

        });
      })
    );
    return publicUrls;

  }

}