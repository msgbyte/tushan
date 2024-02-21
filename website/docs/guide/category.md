---
sidebar_position: 10
title: Menu Categorization
---

When our menu items become too numerous, a single-level menu can no longer meet our needs. In backend applications, we often choose to categorize menus of the same type.

![](/img/docs/misc/category.png)

In `Tushan`, our method of categorizing menus is more intuitive:

```tsx
<Tushan>
  <Category name="detail">
    {/* ... */}
  </Category>
</Tushan>
```

We simply need to wrap the entries we want to place under a certain category with the `<Category />` component.

For example:
```tsx
<Tushan>
  <Category name="detail">
    <Resource name="model1" />

    <Resource name="model2" />
  </Category>
</Tushan>
```

In addition to the `<Resource />` component, the `<CustomRoute />` component is also supported.

### Multi-level Nesting

We can arbitrarily wrap our resources with the `<Category />` component to achieve more complex combinations.

For example:
```tsx
<Tushan>
  <Category name="category1">
    <Category name="category2">
      <Category name="category3">
        <Category name="category4">
          {/* ... */}
        </Category>
      </Category>
    </Category>
  </Category>
</Tushan>
```
