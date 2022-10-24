import { ReactElement } from 'react'
import { Photo } from '@models/Products'

export interface CardProps {
  id?: number;
  images?: Photo[];
  title: string;
  description?: string;
  form?: ReactElement;
  formPhoto?: ReactElement;
  remove?: (id: number) => void;
  edit?: boolean;
  addPhotos?: boolean;
}
