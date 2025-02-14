import React from 'react';
import ReactJson, { ReactJsonViewProps } from 'react-json-view';

const defaultJSONViewProps: Partial<ReactJsonViewProps> = {
  name: false,
  displayDataTypes: false,
  iconStyle: 'square',
};

/**
 * Render i18n text with resources.<resource>.fields.<source>
 */
export const JSONView: React.FC<{
  data: any;
  options?: Omit<ReactJsonViewProps, 'src'>;
}> = React.memo((props) => {
  return (
    <ReactJson {...defaultJSONViewProps} {...props.options} src={props.data} />
  );
});
JSONView.displayName = 'JSONView';
