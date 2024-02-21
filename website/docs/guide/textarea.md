---
sidebar_position: 8
title: Long Text Rendering
---

For text data that is too lengthy, as opposed to the simple `createTextField`, Tushan generally opts for the `createTextAreaField` method, which is more suited for rendering large text.

Some special optimizations have been made in `createTextAreaField` for handling large texts in lists.

## List State

To address the issue of long text causing poor table display in list states:

### Fixed Width

To allow excess content to be truncated rather than occupy a lot of space, it is recommended to fix the width of that row in the list. For example:

```tsx
createTextAreaField('content', {
  list: {
    width: 400,
  },
}),
```

### Ellipsis Mode

If the content is long, it is recommended to enable the list overflow ellipsis mode to improve performance.

```tsx
createTextAreaField('content', {
  list: {
    ellipsis: true,
  },
}),
```

Of course, you can also enable both fixed width and ellipsis:

```tsx
createTextAreaField('content', {
  list: {
    width: 400,
    ellipsis: true,
  },
}),
```

## Detail State

In the detail state, by default, a maximum of 5 lines of data is displayed, with the excess being collapsed.

## Edit State

In the edit state, a text area instead of an input box is used to facilitate user modifications of long texts.
