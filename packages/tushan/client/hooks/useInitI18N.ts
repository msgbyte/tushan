import { useEffect } from 'react';
import { TushanContextProps } from '../context/tushan';
import { initI18N } from '../i18n';

export function useInitI18N(i18n?: TushanContextProps['i18n']) {
  useEffect(() => {
    if (i18n) {
      const resources = i18n.languages.reduce((prev, curr) => {
        return {
          ...prev,
          [curr.key]: { translation: curr.resource },
        };
      }, {});

      initI18N(resources);
    } else {
      initI18N();
    }
  }, []);
}
