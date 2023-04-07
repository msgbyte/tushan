import type { ResourcePropertyMeta } from '../../../model/resource/meta';

export interface MetaViewTypeProps {
  resourcePropertyMeta: ResourcePropertyMeta;
  value: any;
  record: Record<string, any>;
}
