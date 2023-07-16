import { parse, stringify } from 'qs';
import type { IParseOptions, IStringifyOptions } from 'qs';
import { useMemo, useRef } from 'react';
import type React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useForceUpdate } from './useForceUpdate';
import { useEvent } from './useEvent';
import { get, set } from 'lodash-es';

export interface UseUrlStateOptions {
  navigateMode?: 'push' | 'replace';
  /**
   * useful if manager nested data
   */
  nestedKey?: string;
  parseOptions?: IParseOptions;
  stringifyOptions?: IStringifyOptions;
}

const baseParseConfig: IParseOptions = {
  ignoreQueryPrefix: true,
};

const baseStringifyConfig: IStringifyOptions = {
  skipNulls: false,
};

type UrlState = Record<string, any> | undefined;

export const useUrlState = <S extends UrlState = UrlState>(
  initialState?: S | (() => S),
  options?: UseUrlStateOptions
) => {
  type State = Partial<{ [key in keyof S]: any }>;
  const {
    navigateMode = 'push',
    parseOptions,
    stringifyOptions,
  } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };
  const mergedStringifyOptions = {
    ...baseStringifyConfig,
    ...stringifyOptions,
  };

  const location = useLocation();
  const navigate = useNavigate();
  const update = useForceUpdate();

  const initialStateRef = useRef(
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState || {}
  );

  const fullQueryFromUrl = useMemo(
    () => parse(location.search, mergedParseOptions),
    [location.search]
  );

  const queryFromUrl = useMemo(() => {
    if (options?.nestedKey) {
      return get(fullQueryFromUrl, options.nestedKey, {}) as Record<
        string,
        unknown
      >;
    } else {
      return fullQueryFromUrl;
    }
  }, [fullQueryFromUrl, options?.nestedKey]);

  const targetQuery: State = useMemo(
    () => ({
      ...initialStateRef.current,
      ...queryFromUrl,
    }),
    [queryFromUrl]
  );

  const generateQueryToUrl = useEvent((newQuery: Record<string, unknown>) => {
    if (options?.nestedKey) {
      const query = { ...fullQueryFromUrl };
      set(query, options.nestedKey, { ...queryFromUrl, ...newQuery });

      return stringify(query, mergedStringifyOptions);
    } else {
      return stringify(
        { ...queryFromUrl, ...newQuery },
        mergedStringifyOptions
      );
    }
  });

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();

    navigate(
      {
        hash: location.hash,
        search: generateQueryToUrl(newQuery) || '?',
      },
      {
        replace: navigateMode === 'replace',
        state: location.state,
      }
    );
  };

  return [targetQuery, useEvent(setState)] as const;
};
