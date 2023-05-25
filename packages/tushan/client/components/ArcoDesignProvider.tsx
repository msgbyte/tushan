import React from 'react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { ConfigProvider } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { useAsync } from '../hooks/useAsync';
import { Locale } from '@arco-design/web-react/es/locale/interface';

export const ArcoDesignProvider: React.FC<React.PropsWithChildren> = React.memo(
  (props) => {
    const { i18n } = useTranslation();
    const language = i18n.language;

    const { value: locale } = useAsync(async (): Promise<Locale> => {
      if (language === 'zh-CN' || language === 'zh' || language === 'zh-Hans') {
        return import('@arco-design/web-react/es/locale/zh-CN').then(
          (m) => m.default
        );
      } else if (language === 'zh-TW') {
        return import('@arco-design/web-react/es/locale/zh-TW').then(
          (m) => m.default
        );
      } else if (language === 'zh-HK') {
        return import('@arco-design/web-react/es/locale/zh-HK').then(
          (m) => m.default
        );
      } else if (language === 'ja-JP' || language === 'ja') {
        return import('@arco-design/web-react/es/locale/ja-JP').then(
          (m) => m.default
        );
      }

      return enUS;
    }, [language]);

    return (
      <ConfigProvider locale={locale ?? enUS}>{props.children}</ConfigProvider>
    );
  }
);
ArcoDesignProvider.displayName = 'ArcoDesignProvider';
