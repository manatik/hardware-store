import { PhotoDto } from 'types/photo.dto';

export interface IPlywood {
  id: number;
  name: string;
  article: string;
  photos: PhotoDto[] | null;
  categoryId: number;
  width: number;
  class: string;
  densityPlywood: string;
  glue: string;
  membraneType: string;
  densityMembrane: string;
  guaranteePeriod: string;
  humidity: string;
  wearResistance: string;
  price: number;
  createdAt: string;
  updatedAt: string | null;
  deleted: string | null;
}
