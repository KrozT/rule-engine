export interface Rule<T> {
  property: keyof T;
  operator: string;
  value: number;
}
