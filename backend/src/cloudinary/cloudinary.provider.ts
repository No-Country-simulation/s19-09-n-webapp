import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { envs } from 'src/config';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: envs.cloudinary.name,
      api_key: envs.cloudinary.key,
      api_secret: envs.cloudinary.secret,
    });
  },
};
