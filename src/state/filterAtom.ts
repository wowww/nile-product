import { atom } from 'jotai';

export type FilterType = {
  page?: number;
  collections?: {
    [key: string]: string[];
  },
  sorting?: string;
  status?: string[];
}

export const tokenFilterAtom = atom<FilterType>({ sorting: 'orderEndAt,asc', status: ['OPEN'] });

export const collectionFilterAtom = atom<FilterType>({})

export const visibleMyPageFilterAtom = atom<boolean>(false);