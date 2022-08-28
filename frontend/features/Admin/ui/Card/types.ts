import { ReactElement } from 'react'

export interface CardProps {
  image?: any;
  title: string;
  description?: string;
  form?: ReactElement;
  remove?: boolean;
  edit?: boolean;
}
