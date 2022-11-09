import { Photo } from '@models/Products'
import { CalcData } from '@models/Calc'

export interface UpdateData {
  name: string;
  price: number;
}

export interface PropsCardGrid {
  title: string;
  description?: string;
  paramValue?: string;
  price: number;
  id: string;
  endpoint: number;
  onUpdate?: (id: string, data: CalcData, endpoint: number) => void;
  onRemove?: (id: string, endpoint: number) => void;
  images?: Photo[],
  type: string,
}
