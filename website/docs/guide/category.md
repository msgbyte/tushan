---
sidebar_position: 10
title: 菜单分类
---

当我们的菜单过多的时候，仅一级的菜单将无法满足我们的要求，在后台应用中我们往往会选择将相同类型的菜单进行分类。

![](/img/docs/misc/category.png)

在`Tushan`中，我们的菜单分类方式更加符合直觉:

```tsx
<Tushan>
  <Category name="detail">
    {/* ... */}
  </Category>
</Tushan>
```

我们只需要将我们想要放在某个分类下的入口用`<Category />` 组件包裹起来即可。

如:
```tsx
<Tushan>
  <Category name="detail">
    <Resource name="model1" />

    <Resource name="model2" />
  </Category>
</Tushan>
```

除了 `<Resource />` 组件以外，还支持 `<CustomRoute />` 组件

### 多层嵌套

我们可以任意的在我们的资源外包裹 `<Category />` 组件以达到更加复杂的组合

如:
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
