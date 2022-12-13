import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type NileEntity = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
}

export type SnsLink = {
  service?: string;
  link?: string;
} & NileEntity;

export type UserProfile = {
  address?: string;
  nickname?: string;
  description?: string;
  url?: string;
  country?: string;
  img?: string;
  nonce?: string;
  themeIndex?: number;
  displayAsset?: string;
  snsLinks?: SnsLink[]
} & NileEntity;


export const userProfileAtom = atom<UserProfile>({});

export const authTokenAtom = atomWithStorage<AuthToken| null>(
  'authTokenAtom',
  null,
);

export const cookieAgreementAtom = atomWithStorage<string>('cookieAgreementAtom', '');