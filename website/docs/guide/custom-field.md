---
sidebar_position: 3.5
title: Custom Fields
---

`Tushan` comes pre-equipped with a wide variety of field types, such as: `createXXXField()`

However, developers often wish to implement their own components. This chapter will guide you on how to develop your own custom components.

In `Tushan`, a field is categorized into two main states: **edit** and **detail**. Therefore, by implementing these two states for a field, it can be used in almost all scenarios.

`Tushan` provides an out-of-the-box utility function `createFieldFactory` to help developers quickly implement these two states of a field:

```tsx
import { createFieldFactory } from 'tushan';

export const createTextField = createFieldFactory({
  detail: MyFieldDetail,
  edit: MyFieldEdit,
});
```

For instance, if we want to implement a rich text editor, our pseudocode might look like this:

```tsx
import { RichEditor, RichEditorViewer } from 'richeditor';
import React from 'react';
import {
  createFieldFactory,
  FieldDetailComponent,
  FieldEditComponent,
} from 'tushan';

export const RichEditorFieldDetail: FieldDetailComponent<string> = React.memo(
  (props) => {
    return <RichEditorViewer>{props.value}</RichEditorViewer>;
  }
);
RichEditorFieldDetail.displayName = 'RichEditorFieldDetail';

export const RichEditorFieldEdit: FieldEditComponent<string> = React.memo(
  (props) => {
    return (
      <RichEditor
        placeholder={props.options.edit?.placeholder ?? props.options.label}
        value={props.value}
        onChange={(val) => props.onChange(val)}
      />
    );
  }
);
RichEditorFieldEdit.displayName = 'RichEditorFieldEdit';

export const createRichEditorField = createFieldFactory({
  detail: RichEditorFieldDetail,
  edit: RichEditorFieldEdit,
});
```

In this example, assuming there's a `richeditor` library, we implement both the edit and detail forms of the field, handling data (value) and change callbacks through this hypothetical `richeditor` library.

We can also use `props.options` to access external inputs provided during creation for differentiated configuration.

When using our component, it can be invoked like any other basic field using `createRichEditorField(source, options)`.

## Accessing Context Information

Sometimes, when customizing fields, it's not only the field's properties that matter but also the need to consider the content of other fields in the record for some interactivity.

### List and Detail Views

In `list` and `detail` views, we can use `useRecordContext` to access the context:

```tsx
import { useRecordContext } from 'tushan';

export const MyField: FieldDetailComponent<string> = React.memo(
  (props) => {
    const record = useRecordContext();
    
    return (
      <div>{props.value}({record.id})</div>
    );
  }
);
MyField.displayName = 'MyField';
```

### Edit View

In the edit view, we need to use the context provided by `Form`, a simple usage is as follows:

```tsx
import { Form } from 'tushan';

export const MyField: FieldEditComponent<string> = React.memo(
  (props) => {
    const { form } = Form.useFormContext();
    const id = Form.useWatch('id', form)
    
    return (
      <div>{props.value}({id})</div>
    );
  }
);
MyField.displayName = 'MyField';
```

### Filter View

Currently, this is not supported. If needed, you can open an Issue to inform the developers.
