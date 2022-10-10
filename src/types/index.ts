import type { DataSourceOptions } from 'typeorm';

export interface TushanResourceOptions {
  properties?: {
    [key: string]: {
      view: string;
    };
  };
  order?: {
    direction: 'asc' | 'desc';
    orderBy: string;
  };
  limit?: number;
  label?: string;
}

export interface TushanResource {
  entity: Function;
  options: TushanResourceOptions;
}

export interface TushanPage {
  path: string;
  componentId: string;
  /**
   * 显示名称，用于在侧边栏展示
   *
   * 如果不填则不会在侧边栏展示
   */
  label?: string;
}

export interface TushanBanner {
  title: string;
  image: string;
}

export interface TushanOptions {
  datasourceOptions: Omit<DataSourceOptions, 'entities'>;
  resources: (Function | TushanResource)[];
  pages?: TushanPage[];
  loginBanner?: TushanBanner[];
}
