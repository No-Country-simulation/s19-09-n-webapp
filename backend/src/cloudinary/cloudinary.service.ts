import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
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
