import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResourceContext } from '../context/resource';
import { startCase } from 'lodash-es';

/**
 * Render i18n text with resources.<resource>.fields.<source>
 */
export const FieldTitle: React.FC<{
  source: string;
}> = React.memo((props) => {
  const { t } = useTranslation();
  const resource = useResourceContext();

  return (
    <>
      {t(`resources.${resource}.fields.${props.source}`, {
        defaultValue: startCase(props.source),
      })}
    </>
  );
});
FieldTitle.displayName = 'FieldTitle';
