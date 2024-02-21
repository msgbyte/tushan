---
sidebar_position: 4
title: Reference Types (Foreign Keys)
---

In actual database structures, it's rare to store all data within a single table. Depending on the relationships between data, we often choose to maintain the relationships between different fields across multiple tables, linked by IDs.

For example, consider two tables, Students and Classrooms, structured as follows:

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

Using a basic field, such as a numeric field, would clearly result in a series of numbers displayed on our page, and editing would also involve editing a series of numbers. This is obviously not the desired outcome.

Therefore, we should use reference types. The usage is as follows:

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

Here, `reference` specifies the name of the resource to map (also known as the database table name or ORM model name), and `displayField` specifies the name of the field for display purposes. This is because we expect the classroom name in the student table to display the name of the classroom.

In edit mode, the current database's existing classroom items will be displayed in a dropdown box format. This also supports a search functionality, where the searchable field can be specified with `searchField`. If not specified, `q` is used by default as the search condition.

In this case, we can specify `name` as the search field, like so:
```ts
createReferenceField('classroom', {
  reference: 'classroom',
  displayField: 'name',
  searchField: 'name',
})
```
