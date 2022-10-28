import { ReactElement } from 'react'
import { PhotosModal } from '@models/Products'

export interface CardProps {
  id?: string;
  images?: PhotosModal[];
  title: string;
  description?: string;
  form?: ReactElement;
  formPhoto?: ReactElement;
  remove?: (id: string) => void;
  edit?: boolean;
  addPhotos?: boolean;
  buttonName?: string;
}
