import type {
  BasicFieldOptions,
  FieldDetailComponent,
  FieldEditComponent,
} from './types';
import type { ViewType } from '../../context/viewtype';
import type { TableColumnProps } from '@arco-design/web-react';
import { createElement, ReactElement } from 'react';

export interface CreateFieldFactoryConfig {
  detail: FieldDetailComponent;
  edit: FieldEditComponent;
}

export type ListFieldItem = {
  hidden: boolean;
  columnProps: TableColumnProps;
};

export interface EditFieldItem<T = any> {
  source: string;
  title: string;
  hidden: boolean;
  render: (value: T, onChange: (val: T) => void) => ReactElement;
}

export interface DetailFieldItem<T = any> {
  source: string;
  title: string;
  hidden: boolean;
  render: (value: T) => ReactElement;
}

export type FieldHandler = <T extends ViewType>(
  viewType: T
) => T extends 'list'
  ? ListFieldItem
  : T extends 'edit'
  ? EditFieldItem
  : T extends 'detail'
  ? DetailFieldItem
  : never;

export function createFieldFactory<CustomOptions = {}>(
  config: CreateFieldFactoryConfig
) {
  return (
      source: string,
      options?: BasicFieldOptions & CustomOptions
    ): FieldHandler =>
    (viewType) => {
      if (viewType === 'list') {
        return {
          hidden: options?.list?.hidden ?? false,
          columnProps: {
            dataIndex: source,
            sorter: options?.list?.sort ?? false,
            sortDirections: ['ascend', 'descend'],
            title: options?.label ?? source,
            width: options?.list?.width,
            render: (val) => {
              return createElement(config.detail, {
                value: val,
                options: options ?? {},
              });
            },
          },
        } as ListFieldItem;
      } else if (viewType === 'edit') {
        return {
          source,
          title: options?.label ?? source,
          hidden: options?.edit?.hidden ?? false,
          render: (value, onChange) => {
            return createElement(config.edit, {
              value,
              onChange,
              options: options ?? {},
            });
          },
        } as EditFieldItem;
      } else if (viewType === 'detail') {
        return {
          source,
          title: options?.label ?? source,
          hidden: options?.detail?.hidden ?? false,
          render: (value) => {
            return createElement(config.detail, {
              value,
              options: options ?? {},
            });
          },
        } as DetailFieldItem;
      }

      return null as any;
    };
}
