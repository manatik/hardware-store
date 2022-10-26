import { ReactElement } from 'react'
import { PhotosModal } from '@models/Products'

export interface CardProps {
  id?: number;
  images?: PhotosModal[];
  title: string;
  description?: string;
  form?: ReactElement;
  formPhoto?: ReactElement;
  remove?: (id: number) => void;
  edit?: boolean;
  addPhotos?: boolean;
}
