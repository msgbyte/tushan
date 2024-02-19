export type DBCurdOperation<RecordType> = {
  getList: (resource: string, query: Record<string, string>) => RecordType[];
  getOne: (resource: string, id: string) => RecordType;
  getMany: (resource: string, ids: string[]) => RecordType;
  update: (
    resource: string,
    id: string,
    data: Record<string, string>
  ) => RecordType;
  create: (resource: string, data: Record<string, string>) => RecordType;
  delete: (resource: string, id: string) => RecordType;
};
