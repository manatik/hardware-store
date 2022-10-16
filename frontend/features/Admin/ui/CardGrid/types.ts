export interface updateData {
  name: string;
  price: number;
}

export interface PropsCardGrid {
  title: string;
  price: number;
  id: number;
  endpoint: number;
  onUpdate: (id: number, endpoint: number, data: updateData) => void
  onRemove: (id: number, endpoint: number) => void
}
