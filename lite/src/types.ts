export interface TushanLiteConfig {
  header?: string;
  footer?: string;
  authProvider?: {
    loginUrl: string;
  };
  dataProvider: {
    url: string;
  };
  resources: TushanLiteResource[];
}

export interface TushanLiteResource {
  name: string;
  label?: string;
  filter?: TushanLiteField[];
  fields: TushanLiteField[];
  action?: {
    create?: boolean;
    detail?: boolean;
    edit?: boolean;
    delete?: boolean;
    export?: boolean;
    refresh?: boolean;
  };
}

export interface TushanLiteField {
  name: string;
  type: string;
  options?: any;
}
