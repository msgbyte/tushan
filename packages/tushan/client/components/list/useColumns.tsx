import { Button, Dropdown, Menu, Space, Tooltip } from '@arco-design/web-react';
import {
  IconEdit,
  IconEye,
  IconMoreVertical,
} from '@arco-design/web-react/icon';
import React, { useMemo } from 'react';
import { BasicRecord } from '../../api';
import { ViewType } from '../../context/viewtype';
import { useTranslation } from '../../i18n';
import { ListDeleteAction } from './actions/DeleteAction';
import type { ListTableProps } from './ListTable';

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
                <Dropdown
                  position="br"
                  trigger="click"
                  droplist={
                    <Menu>
                      {action.custom.map((item) => (
                        <Menu.Item
                          key={item.key}
                          onClick={() => item.onClick(record)}
                        >
                          {item.label}
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                >
                  <Button icon={<IconMoreVertical />} />
                </Dropdown>
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
