import {
  createAvatarField,
  createBooleanField,
  createDateTimeField,
  createPasswordField,
  createSelectField,
  createReferenceField,
  createTextAreaField,
  createEmailField,
  createImageField,
  createJSONField,
  createNumberField,
  createTextField,
  createUrlField,
} from 'tushan';
import { TushanLiteField } from './types';

export function createFields(fieldConfigList: TushanLiteField[]) {
  return fieldConfigList.map((config) => {
    if (config.type === 'text') {
      return createTextField(config.name, config.options);
    }

    if (config.type === 'number') {
      return createNumberField(config.name, config.options);
    }

    if (config.type === 'avatar') {
      return createAvatarField(config.name, config.options);
    }

    if (config.type === 'json') {
      return createJSONField(config.name, config.options);
    }

    if (config.type === 'boolean') {
      return createBooleanField(config.name, config.options);
    }

    if (config.type === 'datetime') {
      return createDateTimeField(config.name, config.options);
    }

    if (config.type === 'password') {
      return createPasswordField(config.name, config.options);
    }

    if (config.type === 'select') {
      return createSelectField(config.name, config.options);
    }

    if (config.type === 'reference') {
      return createReferenceField(config.name, config.options);
    }

    if (config.type === 'textarea') {
      return createTextAreaField(config.name, config.options);
    }

    if (config.type === 'email') {
      return createEmailField(config.name, config.options);
    }

    if (config.type === 'image') {
      return createImageField(config.name, config.options);
    }

    if (config.type === 'url') {
      return createUrlField(config.name, config.options);
    }

    // fallback
    return createTextField(config.name, config.options);
  });
}
