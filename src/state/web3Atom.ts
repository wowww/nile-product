import { atom } from 'jotai';
import { jsonAbiName } from '@/web3/abis';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import * as process from 'process';
import { Contract } from 'web3-eth-contract';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export type contractsAtomType = {
  [key in jsonAbiName]?: Contract;
}

export interface tokenType {
  // icon: string;
  name: string;
  symbol: string;
  // decimal: number;
  address: string;
  balance: string;
  // getBalance: (walletAddress: string) => Promise<string>;
  // address_seq_by_pool_name?: string[];
}

export const tokenSymbolSort = (a: tokenType, b: tokenType) => {
  const fa = a.symbol.toLowerCase();
  const fb = b.symbol.toLowerCase();

  if (fa < fb) {
    return 1;
  }
  if (fa > fb) {
    return -1;
  }
  return 0;
};

export const contractsAtom = atom<contractsAtomType>({});
export const tokensAtom = atom<Map<string, tokenType>>(new Map());
export const addressListAtom = atom<{ [key: string]: string }>({});

export const tokenListAtom = atom<tokenType[]>((get) => {
  return Array.from(get(tokensAtom).values()).sort(tokenSymbolSort);
});

export const balanceLoadingAtom = atom<boolean>(false);
export const updateBalanceAtom = atom(null, async (get, set) => {
  const { ERC20 } = get(contractsAtom);
  const nileWalletAddress = get(nileWalletAtom);
  console.log(`updateBalanceAtom`, nileWalletAddress);
  if (!nileWalletAddress) return;

  set(balanceLoadingAtom, true);
  const tokens = get(tokensAtom);

  provider.web3.eth.getBalance(nileWalletAddress).then((balance) => {
    tokens.set('wemix', {
      name: 'wemix',
      symbol: 'wemix',
      address: ZERO_ADDRESS,
      balance,
    });
  });

  ERC20?.methods.balanceOf(nileWalletAddress).call({}, (err: any, res: any) => {
    console.log(err, res);
    tokens.set('wemix$', {
      name: 'wemix$',
      symbol: 'wemix$',
      address: process.env.NEXT_PUBLIC_ENV_WEMIX_DOLLAR_CONTRACT_ADDRESS || '',
      balance: res,
    });
  });

  set(balanceLoadingAtom, false);
});
