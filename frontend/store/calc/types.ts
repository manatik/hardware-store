interface CalcData {
  id: number;
  name: string;
  price: number
}

export interface CalcState {
  globalError: any;
  coatingDensity: CalcData[] | null;
  formats: CalcData[] | null;
  sorts: CalcData[] | null;
  types: CalcData[] | null;
  widthPlywood: CalcData[] | null;
  isLoading: boolean;
  isError: boolean;
}
