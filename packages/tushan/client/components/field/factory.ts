import { FieldDetailComponent, FieldEditComponent } from './types';
import { ViewType } from '../../context/viewtype';
import { TableColumnProps } from '@arco-design/web-react';
import { createElement, ReactElement } from 'react';

export interface CreateFieldFactoryConfig {
  detail: FieldDetailComponent;
  edit: FieldEditComponent;
}

export interface FieldOptions {
  label?: string;
}

export type ListFieldItem = TableColumnProps;

export interface EditFieldItem<T = any> {
  source: string;
  title: string;
  render: (value: T, onChange: (val: T) => void) => ReactElement;
}

export interface DetailFieldItem<T = any> {
  source: string;
  title: string;
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
  : null;

export function createFieldFactory(config: CreateFieldFactoryConfig) {
  return (source: string, options?: FieldOptions): FieldHandler =>
    (viewType) => {
      if (viewType === 'list') {
        return {
          dataIndex: source,
          title: options?.label ?? source,
          render: (val) => {
            return createElement(config.detail, {
              value: val,
            });
          },
        } as ListFieldItem;
      } else if (viewType === 'edit') {
        return {
          source,
          title: options?.label ?? source,
          render: (value, onChange) => {
            return createElement(config.edit, {
              value,
              onChange,
            });
          },
        } as EditFieldItem;
      } else if (viewType === 'detail') {
        return {
          source,
          title: options?.label ?? source,
          render: (value) => {
            return createElement(config.detail, {
              value,
            });
          },
        } as DetailFieldItem;
      }

      return null as any;
    };
}
