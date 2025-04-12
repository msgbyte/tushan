import type { RulesProps } from '@arco-design/web-react';
import type { ComponentType } from 'react';

export interface BasicFieldEditOptions {
  placeholder?: string;
  hidden?: boolean;
  rules?: RulesProps<any>[];
  /**
   * default value on create.
   */
  default?: any;
}

export interface BasicFieldOptions {
  key?: string;

  label?: string;

  /**
   * preprocess data before transfer to render component
   */
  preRenderTransform?: (value: unknown) => unknown;

  list?: {
    /**
     * whether allow to sort, work in list table
     */
    sort?: boolean;
    width?: string | number;
    hidden?: boolean;
    /**
     * If the cell content exceeds the length, whether it is automatically omitted and displays .... After setting this property, the table-layout of the table will automatically become fixed.
     */
    ellipsis?: boolean;
  };

  edit?: BasicFieldEditOptions;

  /**
   * Options which will be override edit
   * Useful if you wanna edit and create has any different.
   *
   * If you dont need different, you can ignore it.
   */
  create?: BasicFieldEditOptions;

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
