import { ReactElement } from 'react'

export interface CardProps {
  image?: any;
  title: string;
  description?: string;
  form?: ReactElement;
  formPhoto?: ReactElement;
  remove?: boolean;
  edit?: boolean;

  addPhotos?: boolean;
}
