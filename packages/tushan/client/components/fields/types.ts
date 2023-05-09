import type { ComponentType } from 'react';

export interface BasicFieldOptions {
  label?: string;

  list?: {
    /**
     * whether allow to sort, work in list table
     */
    sort?: boolean;
    width?: string | number;
    hidden?: boolean;
  };

  edit?: {
    placeholder?: string;
    hidden?: boolean;
  };

  detail?: {
    hidden?: boolean;
  };
}

// Detail
export interface FieldDetailComponentProps<
  T,
  Options extends BasicFieldOptions
> {
  value: T;
  options: Partial<Options>;
}
export type FieldDetailComponent<T = any, CustomOptions = {}> = ComponentType<
  FieldDetailComponentProps<T, CustomOptions & BasicFieldOptions>
>;

export interface FieldEditComponentProps<T, Options extends BasicFieldOptions> {
  value: T;
  onChange: (val: T) => void;
  options: Partial<Options>;
}
export type FieldEditComponent<T = any, CustomOptions = {}> = ComponentType<
  FieldEditComponentProps<T, CustomOptions & BasicFieldOptions>
>;
