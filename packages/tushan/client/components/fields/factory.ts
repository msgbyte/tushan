import type {
  BasicFieldOptions,
  FieldDetailComponent,
  FieldEditComponent,
} from './types';
import type { ViewType } from '../../context/viewtype';
import type { RulesProps, TableColumnProps } from '@arco-design/web-react';
import { createElement, ReactElement } from 'react';
import { FieldTitle } from '../FieldTitle';

export interface CreateFieldFactoryConfig<CustomOptions = {}> {
  detail: FieldDetailComponent<any, CustomOptions>;
  edit: FieldEditComponent<any, CustomOptions>;
}

export type ListFieldItem = {
  hidden: boolean;
  columnProps: TableColumnProps;
};

export interface EditFieldItem<T = any> {
  source: string;
  title: string;
  hidden: boolean;
  rules: RulesProps<any>[];
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

export function createFieldFactory<CustomOptions extends {} = {}>(
  config: CreateFieldFactoryConfig<CustomOptions>
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
            title: options?.label ?? createElement(FieldTitle, { source }),
            width: options?.list?.width,
            ellipsis: options?.list?.ellipsis,
            render: (val) => {
              return createElement(config.detail, {
                value: options?.preRenderTransform
                  ? options?.preRenderTransform(val)
                  : val,
                options: options ?? {},
              });
            },
          },
        } as ListFieldItem;
      } else if (viewType === 'edit') {
        return {
          source,
          title: options?.label ?? createElement(FieldTitle, { source }),
          hidden: options?.edit?.hidden ?? false,
          rules: options?.edit?.rules ?? [],
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
          title: options?.label ?? createElement(FieldTitle, { source }),
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
