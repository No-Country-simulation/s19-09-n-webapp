import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream({ folder: 'roomiefind' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }

  async getImageUrl(imageId: string): Promise<string | null> {
    const resource = await v2.api.resources_by_ids(imageId);
    if (resource.resources[0]) return resource.resources[0].secure_url;
    return null;
  }

  async deleteImage(imageId: string): Promise<boolean> {
    try {
      await v2.uploader.destroy(imageId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
