import { atom } from 'jotai';

export type DaoTheme = {
  value: string;
}

export const daoThemeAtom = atom<DaoTheme>({ value: 'wonder' });

export const daoHeaderAtom = atom(false);

export const setFullPageAllowScrolling = atom(false);

/* 22.11.02 수정: 전역 데이터 값 추가 */
export const setSwiperActiveIdxState = atom(0);

export const setSwiperDirectionState = atom('uo');