import { Button, Drawer } from '@arco-design/web-react';
import React, { useMemo, useRef, useState } from 'react';
import { useResourcePropertiesMeta } from '../../model/resource/meta';
import { useResourceName } from '../../router/hooks';
import { WebFastifyForm } from '../form';
import _noop from 'lodash/noop';
import { useAsyncFormRequest } from '../../model/utils';
import { addResource } from '../../model/resource/edit';
import { useTableStore } from './store';
import {
  createFastifyFormSchema,
  FastifyFormInstance,
  fieldSchema,
} from 'react-fastify-form';

export const TushanTableController: React.FC = React.memo(() => {
  const resourceName = useResourceName();
  const { data: resourceMeta } = useResourcePropertiesMeta(resourceName);
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [values, setValues] = useState({});
  const { refresh } = useTableStore();
  const formRef = useRef<FastifyFormInstance>();

  const [{ loading }, handleAddResource] = useAsyncFormRequest(
    formRef.current,
    async () => {
      await addResource(resourceName, values);
      setAddDrawerVisible(false);
      refresh();
    }
  );

  const displayedMetaList = useMemo(
    () => resourceMeta.filter((meta) => !meta.isPrimary),
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

  return (
    <div className="text-right py-2">
      <Button type="primary" onClick={() => setAddDrawerVisible(true)}>
        Add
      </Button>

      {/* Add Drawer */}
      <Drawer
        title={`Add ${resourceName}`}
        width={600}
        visible={addDrawerVisible}
        closable={true}
        maskClosable={false}
        okButtonProps={{ loading }}
        onOk={handleAddResource}
        onCancel={() => setAddDrawerVisible(false)}
      >
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
      </Drawer>
    </div>
  );
});
TushanTableController.displayName = 'TushanTableController';
