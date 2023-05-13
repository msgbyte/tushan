import { ReactNode } from 'react';

export type FieldValidator<FieldValue = any> = (
  value: FieldValue | undefined,
  callback: (error?: ReactNode) => void
) => void;
