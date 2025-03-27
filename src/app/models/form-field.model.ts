export interface FormField {
  id: number;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  selectedValue?: string | null;
}
