import {
  createAvatarField,
  createBooleanField,
  createEmailField,
  createImageField,
  createReferenceField,
  createSelectField,
  createTextAreaField,
  createTextField,
  createUrlField,
} from 'tushan';

export const userFields = [
  createTextField('id', {
    label: 'ID',
  }),
  createTextField('name', {
    list: {
      sort: true,
    },
  }),
  createEmailField('email', {
    edit: {
      hidden: true,
    },
    create: {
      hidden: false,
    },
  }),
  createUrlField('website'),
];

export const photoFields = [
  createTextField('id', {
    label: 'ID',
  }),
  createTextField('albumId'),
  createTextField('title'),
  createImageField('url', {
    height: 300,
  }),
  createAvatarField('thumbnailUrl'),
];

export const commentFields = [
  createTextField('id', {
    list: {
      width: 100,
    },
  }),
  createTextField('name'),
  createEmailField('email'),
  createTextAreaField('body', {
    list: {
      ellipsis: true,
    },
  }),
];

export const todoFields = [
  createTextField('id', {
    list: {
      width: 100,
    },
  }),
  createReferenceField('userId', {
    label: 'User',
    reference: 'users',
    displayField: 'name',
  }),
  createTextField('title'),
  // createBooleanField('completed'),
  createSelectField('completed', {
    items: [
      {
        value: true,
        label: 'Completed',
        color: 'red',
      },
      {
        value: false,
        label: 'Processing',
        color: 'green',
      },
    ],
  }),
];
