import { Image } from '@arco-design/web-react';
import React from 'react';
import { createFieldFactory } from './factory';
import { TextFieldEdit } from './text';
import type { FieldDetailComponent } from './types';

export interface ImageFieldOptions {
  width?: number;
  height?: number;
}

export const ImageFieldDetail: FieldDetailComponent<string, ImageFieldOptions> =
  React.memo((props) => {
    const { height = 80, width = undefined } = props.options;

    return <Image height={height} width={width} src={props.value} />;
  });
ImageFieldDetail.displayName = 'ImageFieldDetail';

export const createImageField = createFieldFactory<ImageFieldOptions>({
  detail: ImageFieldDetail,
  edit: TextFieldEdit,
});
