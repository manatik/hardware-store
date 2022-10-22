export interface PropsInputField {
  type: InputType,
  name: string;
  value: string | number;
  placeholder?: string;
  size: 'lg' | 'md' | 'sm';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  withRef?: React.RefObject<HTMLInputElement>;
  pattern?: string;
}

export enum InputType {
  Email = 'email',
  Password = 'password',
  Text = 'text',
  Search = 'search',
  Number = 'number',
}
