export type Identifier = string | number;

export interface BasicRecord {
  id: Identifier;
  [key: string]: any;
}

export interface SortPayload {
  field: string;
  order: string;
}
export interface FilterPayload {
  [k: string]: any;
}

export interface PaginationPayload {
  pageNum: number;
  pageSize: number;
}

export type DataProvider<ResourceType extends string = string> = {
  getList: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: GetListParams
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: GetOneParams
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: GetManyParams
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: GetManyReferenceParams
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: UpdateParams
  ) => Promise<UpdateResult<RecordType>>;

  updateMany: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: UpdateManyParams
  ) => Promise<UpdateManyResult<RecordType>>;

  create: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: CreateParams
  ) => Promise<CreateResult<RecordType>>;

  delete: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: DeleteParams<RecordType>
  ) => Promise<DeleteResult<RecordType>>;

  deleteMany: <RecordType extends BasicRecord = any>(
    resource: ResourceType,
    params: DeleteManyParams<RecordType>
  ) => Promise<DeleteManyResult<RecordType>>;

  [key: string]: any;
};

export interface GetListParams {
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: Record<string, any>;
  meta?: any;
}

export interface GetListResult<RecordType extends BasicRecord = any> {
  data: RecordType[];
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
}

export interface SortPayload {
  field: string;
  order: string;
}

export interface GetOneParams<RecordType extends BasicRecord = any> {
  id: RecordType['id'];
  meta?: any;
}

export interface GetOneResult<RecordType extends BasicRecord = any> {
  data: RecordType;
}

export interface GetManyParams {
  ids: Identifier[];
  meta?: any;
}

export interface GetManyResult<RecordType extends BasicRecord = any> {
  data: RecordType[];
}

export interface GetManyReferenceParams {
  target: string;
  id: Identifier;
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
  meta?: any;
}

export interface GetManyReferenceResult<RecordType extends BasicRecord = any> {
  data: RecordType[];
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
}

export interface UpdateParams<T = any> {
  id: Identifier;
  data: Partial<T>;
  previousData: T;
  meta?: any;
}

export interface UpdateResult<RecordType extends BasicRecord = any> {
  data: RecordType;
}

export interface UpdateManyParams<T = any> {
  ids: Identifier[];
  data: T;
  meta?: any;
}

export interface UpdateManyResult<RecordType extends BasicRecord = any> {
  data?: RecordType['id'][];
}

export interface CreateParams<T = any> {
  data: T;
  meta?: any;
}

export interface CreateResult<RecordType extends BasicRecord = any> {
  data: RecordType;
}

export interface DeleteParams<RecordType extends BasicRecord = any> {
  id: RecordType['id'];
  previousData?: RecordType;
  meta?: any;
}

export interface DeleteResult<RecordType extends BasicRecord = any> {
  data: RecordType;
}

export interface DeleteManyParams<RecordType extends BasicRecord = any> {
  ids: RecordType['id'][];
  meta?: any;
}

export interface DeleteManyResult<RecordType extends BasicRecord = any> {
  data?: RecordType['id'][];
}

/**
 * authProvider types
 */
export interface AuthProvider {
  login: (
    params: any
  ) => Promise<{ redirectTo?: string | boolean } | void | any>;
  logout: (params: any) => Promise<void | false | string>;
  checkAuth: (params: any) => Promise<void>;
  checkError: (error: any) => Promise<void>;
  getIdentity?: () => Promise<UserIdentity>;
  getPermissions: (params: any) => Promise<any>;
  handleCallback?: () => Promise<AuthRedirectResult | void | any>;
}

export interface UserIdentity {
  id: Identifier;
  fullName?: string;
  avatar?: string;
  [key: string]: any;
}

export type AuthRedirectResult = {
  redirectTo?: string | false;
  logoutOnFailure?: boolean;
};
