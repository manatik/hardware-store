import { Photo } from '@models/Products'
import { CalcData } from '@models/Calc'

export interface UpdateData {
  name: string;
  price: number;
}

export interface PropsCardGrid {
  title: string;
  price: number;
  id: number;
  endpoint: number;
  onUpdate?: (id: number, endpoint: number, data: CalcData) => void;
  onRemove?: (id: number, endpoint: number) => void;
  images?: Photo[]
}
