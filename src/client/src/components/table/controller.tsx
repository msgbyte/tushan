import { Button, Drawer } from '@arco-design/web-react';
import React, { useState } from 'react';
import { useResourcePropertiesMeta } from '../../model/resource/meta';
import { useResourceName } from '../../router/hooks';
import { WebFastifyForm } from '../form';
import _noop from 'lodash/noop';
import { useAsyncRequest } from '../../model/utils';
import { addResource } from '../../model/resource/edit';

export const TushanTableController: React.FC = React.memo(() => {
  const resourceName = useResourceName();
  const { data: resourceMeta } = useResourcePropertiesMeta(resourceName);
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [values, setValues] = useState({});

  const [{ loading }, handleAddResource] = useAsyncRequest(async () => {
    await addResource(resourceName, values);
    setAddDrawerVisible(false);
  });

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
          fields={resourceMeta.map((meta) => ({
            type: meta.viewType,
            name: meta.name,
            label: meta.name,
          }))}
          extraProps={{ hiddenSubmit: true }}
          onChange={setValues}
          onSubmit={_noop}
        />
      </Drawer>
    </div>
  );
});
TushanTableController.displayName = 'TushanTableController';
