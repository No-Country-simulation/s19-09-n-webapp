import { Exclude, Expose } from 'class-transformer';
import { PropertyPhoto } from '@prisma/client';

export class Photo implements PropertyPhoto {
  @Exclude() id: string;
  @Expose() photo_url: string;
  @Exclude() photo_service_id: string;
  @Exclude() property_id: string;
}
