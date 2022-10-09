import type { TushanBanner, TushanOptions } from './index';

export interface TushanCustom {
  /**
   * 自定义组件
   */
  customComponent: Record<string, React.ComponentType>;

  /**
   * key: 路由
   * value: 自定义组件id
   */
  customPages: TushanOptions['pages'];

  customLoginBanner: TushanBanner[];
}
