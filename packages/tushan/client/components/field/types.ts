import type { ComponentType } from 'react';

export interface FieldDetailComponentProps<T> {
  value: T;
}
export type FieldDetailComponent<T = any> = ComponentType<
  FieldDetailComponentProps<T>
>;

export interface FieldEditComponentProps<T> {
  value: T;
  onChange: (val: T) => void;
}
export type FieldEditComponent<T = any> = ComponentType<
  FieldEditComponentProps<T>
>;
