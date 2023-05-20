/**
 * Create Selector for zustand store hooks
 *
 * @example
 * const { userIdentity } = useUserStore(createSelector('userIdentity'));
 */
export function createSelector<T, K extends keyof T>(...keys: K[]) {
  return (state: T) => {
    const out: Pick<T, K> = {} as any;
    keys.forEach((key) => {
      out[key] = state[key];
    });

    return out;
  };
}
