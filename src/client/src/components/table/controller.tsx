import { Button, Drawer, Form, Input } from '@arco-design/web-react';
import React, { useState } from 'react';
import { useResourcePropertiesMeta } from '../../model/resource/meta';
import { useResourceName } from '../../router/hooks';

const FormItem = Form.Item;

export const TushanTableController: React.FC = React.memo(() => {
  const resourceName = useResourceName();
  const { data: resourceMeta } = useResourcePropertiesMeta(resourceName);

  const [addDrawerVisible, setAddDrawerVisible] = useState(false);

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
        onCancel={() => setAddDrawerVisible(false)}
      >
        <Form layout="vertical">
          {resourceMeta.map((meta) => (
            <FormItem key={meta.name} label={meta.name}>
              <Input placeholder={meta.name} />
            </FormItem>
          ))}
        </Form>
      </Drawer>
    </div>
  );
});
TushanTableController.displayName = 'TushanTableController';
