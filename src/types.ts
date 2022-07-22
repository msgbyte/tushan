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
}

export interface TushanResource {
  entity: Function;
  options: TushanResourceOptions;
}

export interface TushanOptions {
  datasourceOptions: Omit<DataSourceOptions, 'entities'>;
  resources: (Function | TushanResource)[];
}
