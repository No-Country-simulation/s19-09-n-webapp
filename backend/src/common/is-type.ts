import { UploadApiResponse } from 'cloudinary';

export const isApiResponse = (response: any): response is UploadApiResponse =>
  (response as UploadApiResponse).secure_url !== undefined;
