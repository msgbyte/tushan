export type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never;

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

interface TushanRenderResourceFuncProps {
  permissions?: any;
}

export type TushanChildren =
  | React.ReactNode
  | (({ permissions }: TushanRenderResourceFuncProps) => React.ReactNode);
