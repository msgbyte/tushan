import { ProcedureBuilder } from '@trpc/server';
import { DBCurdOperation } from './types';
import { z } from 'zod';

export function buildTushanTrpcRoute<RecordType>(
  dbCurdOperation: DBCurdOperation<RecordType>,
  procedure: ProcedureBuilder<any>
) {
  return (resource: string) => ({
    getList: procedure
      .input(z.object({}).passthrough())
      .query(({ input }) =>
        dbCurdOperation.getList(resource, input as Record<string, string>)
      ),
    getOne: procedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => dbCurdOperation.getOne(resource, input.id)),
    getMany: procedure
      .input(z.object({ ids: z.array(z.string()) }))
      .query(({ input }) => dbCurdOperation.getMany(resource, input.ids)),
    update: procedure
      .input(z.object({ id: z.string(), data: z.any() }))
      .mutation(({ input }) =>
        dbCurdOperation.update(resource, input.id, input.data)
      ),
    create: procedure
      .input(z.object({ data: z.any() }))
      .mutation(({ input }) => dbCurdOperation.create(resource, input.data)),
    delete: procedure
      .input(z.object({ id: z.string() }))
      .mutation(({ input }) => dbCurdOperation.delete(resource, input.id)),
  });
}
