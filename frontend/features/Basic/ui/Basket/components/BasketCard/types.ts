import { PlywoodItem } from '@models/Products'

export interface BlockProps {
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  id: string;
  item: PlywoodItem;
}
