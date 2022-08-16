import type { TushanCustom } from '../../types/custom';

export function getTushanCustomInfo(): TushanCustom {
  return (window as any).Tushan;
}
