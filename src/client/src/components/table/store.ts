import { PaginationProps, TableProps } from '@arco-design/web-react';
import create from 'zustand';
import { getResourceResource } from '../../model/resource/list';

type RequiredPart<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

interface TableState {
  resourceName: string;
  loading: boolean;
  pagination: RequiredPart<
    PaginationProps,
    'current' | 'total' | 'pageSize' | 'sizeCanChange'
  >;
  data: TableProps['data'];
  drawerStatus:
    | {
        type: 'add';
      }
    | {
        type: 'edit';
        defaultValues: any;
      }
    | {
        type: 'detail';
      }
    | false;
  init: (resourceName: string) => Promise<void>;
  refresh: () => Promise<void>;
  changePage: (page: number) => void;
  showAddDrawer: () => void;
  showEditDrawer: (defaultValues: any) => void;
  closeDrawer: () => void;
}

const defaultPagination: RequiredPart<
  PaginationProps,
  'current' | 'total' | 'pageSize' | 'sizeCanChange'
> = {
  current: 1,
  total: 0,
  pageSize: 20,
  sizeCanChange: false,
  showTotal: true,
};

export const useTableStore = create<TableState>((set, get) => ({
  resourceName: '',
  loading: false,
  pagination: {
    ...defaultPagination,
    onChange(pageNumber, pageSize) {
      get().changePage(pageNumber);
    },
  },
  data: [],
  drawerStatus: false,
  async init(resourceName: string) {
    set((state) => ({
      loading: true,
      resourceName,
      pagination: {
        ...state.pagination,
        ...defaultPagination,
      },
      data: [],
    }));

    const pagination = get().pagination;

    const { list, count } = await getResourceResource(
      resourceName,
      pagination.pageSize,
      (pagination.current - 1) * pagination.pageSize
    );

    set((state) => ({
      loading: false,
      pagination: {
        ...state.pagination,
        total: count,
      },
      data: list,
    }));
  },
  async refresh() {
    set((state) => ({
      loading: true,
    }));

    const resourceName = get().resourceName;
    const pagination = get().pagination;
    const { list, count } = await getResourceResource(
      resourceName,
      pagination.pageSize,
      (pagination.current - 1) * pagination.pageSize
    );

    set((state) => ({
      loading: false,
      pagination: {
        ...state.pagination,
        total: count,
      },
      data: list,
    }));
  },
  changePage(page: number) {
    set((state) => ({
      pagination: {
        ...state.pagination,
        current: page,
      },
    }));
  },
  showAddDrawer() {
    set({
      drawerStatus: { type: 'add' },
    });
  },
  showEditDrawer(defaultValues: any) {
    set({
      drawerStatus: {
        type: 'edit',
        defaultValues,
      },
    });
  },
  closeDrawer() {
    set({
      drawerStatus: false,
    });
  },
}));
