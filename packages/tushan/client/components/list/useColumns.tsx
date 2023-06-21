import { Button, Dropdown, Menu, Space, Tooltip } from '@arco-design/web-react';
import {
  IconEdit,
  IconEye,
  IconMoreVertical,
} from '@arco-design/web-react/icon';
import { isFunction } from 'lodash-es';
import React, { useMemo } from 'react';
import type { BasicRecord } from '../../api';
import type { ViewType } from '../../context/viewtype';
import { useTranslation } from '../../i18n';
import { ListDeleteAction } from './actions/DeleteAction';
import type { ListTableCustomAction, ListTableProps } from './ListTable';

export function useColumns(
  props: ListTableProps,
  showTableDrawer: (viewType: ViewType, record: BasicRecord) => void
) {
  const { t } = useTranslation();
  const { action } = props;

  const columns = useMemo(() => {
    const c = [...props.fields]
      .map((fieldHandler) => fieldHandler('list'))
      .filter((item) => !item.hidden)
      .map((item) => item.columnProps);

    if (action) {
      c.push({
        key: 'actions',
        title: t('tushan.list.actions'),
        fixed: 'right',
        render: (val, record) => {
          return (
            <Space>
              {action.detail && (
                <Tooltip content={t('tushan.list.detail')}>
                  <Button
                    icon={<IconEye />}
                    onClick={() => showTableDrawer('detail', record)}
                  />
                </Tooltip>
              )}

              {action.edit && (
                <Tooltip content={t('tushan.list.edit')}>
                  <Button
                    icon={<IconEdit />}
                    onClick={() => showTableDrawer('edit', record)}
                  />
                </Tooltip>
              )}

              {action.delete && <ListDeleteAction record={record} />}

              {action.custom && (
                <CustomActions actions={action.custom} record={record} />
              )}
            </Space>
          );
        },
      });
    }

    return c;
  }, [props.fields, action, t]);

  return columns;
}

export const CustomActions: React.FC<{
  actions: ListTableCustomAction;
  record: BasicRecord;
}> = React.memo((props) => {
  const actions = useMemo(() => {
    return isFunction(props.actions)
      ? props.actions(props.record)
      : props.actions;
  }, [props.actions, props.record]);

  return (
    <Dropdown
      position="br"
      trigger="click"
      droplist={
        <Menu>
          {actions.map((item) => (
            <Menu.Item
              key={item.key}
              onClick={() => item.onClick(props.record)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <Button icon={<IconMoreVertical />} />
    </Dropdown>
  );
});
CustomActions.displayName = 'CustomActions';
