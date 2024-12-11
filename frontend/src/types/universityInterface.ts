export interface ReturnUniversityDto {
  id: string;
  name: string;
  city: string;
  country: string;
  address?: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
}


export interface CityUniversity {
  city: string,
  image_url: string;
}