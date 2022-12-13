import { jsonAbiName } from '@/web3/abis';

export interface pairDepositType {
  depositAmount0: string;
  depositAmount1: string;
  percent0: string;
  percent1: string;
  poolShareRatio: string;
  recvLPTokenAmount: string;
  recvLPTokenAmountWd?: string;
  swapFee: string;
  swapFeeWd?: string;
  swapFromAddrees: string | undefined;
  displayDepositAmount0?: string;
}

export interface pairType {
  tokenAddress0: string;
  tokenAddress1: string;
  tokenSymbol0: string;
  tokenSymbol1: string;
  icon: string;
  name: string;
  symbol: string;
  decimal: number;
  address: string;
  balance: string;
  getBalance: (walletAddress: string) => Promise<string>;
  swapContract: any;
  displayTokenAddress0?: string;
  displayTokenAddress1?: string;
}

export interface pairsType {
  [key: string]: pairType;
}

export interface contractDataType {
  address: string;
  type: "token" | "pool";
  contract_type: string;
  data: contractType;
}

export interface contractInfoType {
  name: jsonAbiName;
  address: string;
}

export interface contractType extends tokenType {
  token0: string;
  token1: string;
}

export interface tokenType {
  icon: string;
  name: string;
  symbol: string;
  decimal: number;
  address: string;
  balance: string;
  getBalance: (walletAddress: string) => Promise<string>;
  address_seq_by_pool_name?: string[];
}

export interface tokensType {
  [key: string]: tokenType;
}

export type allTokenType = tokenType | pairType;

export type contractsAtomType = {
  [key in jsonAbiName]?: any;
};
