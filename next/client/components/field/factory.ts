import { FieldDetailComponent, FieldEditComponent } from './types';
import { ViewType } from '../../context/viewtype';
import { TableColumnProps } from '@arco-design/web-react';
import { createElement } from 'react';

export interface CreateFieldFactoryConfig {
  detail: FieldDetailComponent;
  edit: FieldEditComponent;
}

export interface FieldOptions {
  label?: string;
}

export type FieldHandler = <T extends ViewType>(
  viewType: T
) => T extends 'list' ? TableColumnProps : null;

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
        } as TableColumnProps;
      }

      return null as any;
    };
}
