import {
  createAvatarField,
  createEmailField,
  createImageField,
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
  createEmailField('email'),
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

export const comments = [
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
