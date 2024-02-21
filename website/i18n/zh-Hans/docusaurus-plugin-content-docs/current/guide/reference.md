---
sidebar_position: 4
title: 引用类型(外键)
---

在实际的数据库结构中，我们很少会有简单的在一个表中把所有的内容都放在一起的。根据数据与数据之间的组合情况我们往往会选择用多个表维护不同字段之间的关系。两者之间用id来进行联系。

如我们有两个表，学生和教室，他们的结构如下:

```ts
interface Classroom {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
  classroom: number;
}
```

如果我们使用一般的字段，比如数字字段，那么很明显的在我们的页面中会得到一串数字，编辑的时候也是编辑一串数字。这明显是不符合预期的。

因此我们应该使用引用类型. 用法如下:

```ts
export const studentFields = [
  createTextField('id'),
  createTextField('name'),
  createReferenceField('classroom', {
    reference: 'classroom',
    displayField: 'name',
  }),
];
```

其中 `reference` 指明要映射的资源名(或称数据库表名、ORM模型名), `displayField` 则指明用于展示的字段名称。因为我们预期在学生表中的教室名显示教室的名称。

而在编辑状态中，则会以下拉框的形式显示当前数据库已有的教室项。同时支持搜索功能，搜索的字段可以以`searchField` 指定，如果没有指定则默认使用 `q` 作为搜索条件

在这里我们可以指定 `name` 作为搜索字段，如:
```ts
createReferenceField('classroom', {
  reference: 'classroom',
  displayField: 'name',
  searchField: 'name',
})
```
