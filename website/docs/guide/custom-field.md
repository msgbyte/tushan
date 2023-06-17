---
sidebar_position: 3.5
title: 自定义字段
---

`Tushan` 默认预设了大量的字段类型。形如: `createXXXField()`

但是作为开发者往往会有希望实现自己的组件。本章将会学习如何开发自己的自定义组件。

在 `Tushan` 中，一个字段会被归纳为两大类，即**编辑态(edit)**与**展示态(detail)**。因此，我们只需要实现一个字段的两种状态就可以用于我们几乎所有的场景。

`Tushan` 提供了开箱即用的工具函数`createFieldFactory`来帮助开发者快速实现字段的两种状态:

```tsx
import { createFieldFactory } from 'tushan';

export const createTextField = createFieldFactory({
  detail: MyFieldDetail,
  edit: MyFieldEdit,
});
```

比如我们实现一个富文本编辑器。那么我们的伪代码可能会是这样的:

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

在这个示例中，我们假设有一个`richeditor`库，然后分别实现这个字段的 edit 和 detail 两种形式，通过这个我们假设的`richeditor`库来处理数据(value)和修改的回调

同时我们还可以通过 `props.options` 来获取当我们创建是的外部输入, 来进行差异化的配置

当我们使用我们的组件时，就可以类似其他的基础字段一样使用 `createRichEditorField(source, options)` 来调用
