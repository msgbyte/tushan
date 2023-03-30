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

export type FieldHandler = <T extends ViewType>(
  viewType: T
) => T extends 'list' ? ListFieldItem : T extends 'edit' ? EditFieldItem : null;

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
      }

      return null as any;
    };
}
