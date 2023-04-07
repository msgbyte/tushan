import { Drawer, DrawerProps } from '@arco-design/web-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  createFastifyFormSchema,
  FastifyFormInstance,
  fieldSchema,
} from 'react-fastify-form';
import { addResource, patchResource } from '../../model/resource/edit';
import { useResourcePropertiesMeta } from '../../model/resource/meta';
import { useAsyncFormRequest } from '../../model/utils';
import { useResourceName } from '../../router/hooks';
import { WebFastifyForm } from '../form';
import { useTableStore } from './store';
import _noop from 'lodash/noop';

export const TableDrawer: React.FC = React.memo(() => {
  const resourceName = useResourceName();
  const { resourceMeta } = useResourcePropertiesMeta(resourceName);
  const [values, setValues] = useState({});
  const { refresh, drawerStatus, closeDrawer } = useTableStore();
  const formRef = useRef<FastifyFormInstance>();

  const [{ loading: addLoading }, handleAddResource] = useAsyncFormRequest(
    formRef.current,
    async () => {
      await addResource(resourceName, values);
      closeDrawer();
      refresh();
    }
  );

  const [{ loading: editLoading }, handleEditResource] = useAsyncFormRequest(
    formRef.current,
    async () => {
      await patchResource(resourceName, values);
      closeDrawer();
      refresh();
    }
  );

  const loading = addLoading || editLoading;

  const displayedMetaList = useMemo(
    () => resourceMeta.properties.filter((meta) => !meta.isPrimary),
    [resourceMeta]
  );

  const schema = useMemo(
    () =>
      createFastifyFormSchema(
        displayedMetaList.reduce((prevSchema, meta) => {
          let s = fieldSchema.string();

          if (!meta.isNullable) {
            s = s.required();
          }

          return {
            ...prevSchema,
            [meta.name]: s,
          };
        }, {})
      ),
    [displayedMetaList]
  );

  const drawerProps = useMemo<DrawerProps>(() => {
    if (!drawerStatus) {
      return {};
    }

    if (drawerStatus.type === 'add') {
      return { title: `Add ${resourceName}` };
    }

    if (drawerStatus.type === 'detail') {
      return {
        title: 'Detail',
        maskClosable: true,
        footer: null,
      };
    }

    if (drawerStatus.type === 'edit') {
      return { title: 'Edit' };
    }

    return {};
  }, [drawerStatus, resourceName]);

  const handleOk = useCallback(() => {
    if (!drawerStatus) {
      return;
    }

    if (drawerStatus.type === 'add') {
      handleAddResource();
    } else if (drawerStatus.type === 'edit') {
      handleEditResource();
    }
  }, [drawerStatus, handleAddResource]);

  return (
    <Drawer
      width={600}
      closable={true}
      maskClosable={false}
      {...drawerProps}
      visible={drawerStatus !== false}
      okButtonProps={{ loading }}
      onOk={handleOk}
      onCancel={closeDrawer}
    >
      {drawerStatus && drawerStatus.type === 'add' && (
        <WebFastifyForm
          layout="vertical"
          fields={displayedMetaList.map((meta) => ({
            type: meta.viewType,
            name: meta.name,
            label: meta.name,
            required: !meta.isNullable,
          }))}
          schema={schema}
          extraProps={{
            hiddenSubmit: true,
            onFormMount: (form) => (formRef.current = form),
          }}
          onChange={setValues}
          onSubmit={_noop}
        />
      )}

      {drawerStatus && drawerStatus.type === 'edit' && (
        <WebFastifyForm
          layout="vertical"
          initialValues={drawerStatus.defaultValues}
          fields={displayedMetaList.map((meta) => ({
            type: meta.viewType,
            name: meta.name,
            label: meta.name,
            required: !meta.isNullable,
          }))}
          schema={schema}
          extraProps={{
            hiddenSubmit: true,
            onFormMount: (form) => (formRef.current = form),
          }}
          onChange={setValues}
          onSubmit={_noop}
        />
      )}

      {drawerStatus && drawerStatus.type === 'detail' && (
        <WebFastifyForm
          layout="vertical"
          initialValues={drawerStatus.drawerRecord}
          fields={displayedMetaList.map((meta) => ({
            type: 'plain',
            name: meta.name,
            label: meta.name,
          }))}
          schema={schema}
          extraProps={{
            hiddenSubmit: true,
          }}
          onChange={_noop}
          onSubmit={_noop}
        />
      )}
    </Drawer>
  );
});
TableDrawer.displayName = 'TableDrawer';
