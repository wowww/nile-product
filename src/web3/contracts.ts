import { AbiItem } from 'web3-utils';
import abis, { jsonAbiAddresses, jsonAbiNames } from './abis/index';
import { provider } from '@/state/nileWalletAtom';

const initContracts = async () => {
  // let contracts: any;
  // let addresses = new Map<string, string>();
  // for (const name in jsonAbiNames) {
  //   // @ts-ignore
  //   if (abis[name]) {
  //     contracts = {
  //       ...contracts,
  //       [name]: new provider.web3.eth.Contract((abis as any)[name] as AbiItem[], (jsonAbiAddresses().current as any)[name] as string),
  //     };
  //     addresses.set(name, (jsonAbiAddresses().current as any)[name]);
  //   }
  // }

  const contracts = jsonAbiNames
    .map((name) => {
      const abi = abis[name] as AbiItem[];
      return { [name]: new provider.web3.eth.Contract(abi, jsonAbiAddresses().current[name]) };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {})
  ;

  const addresses = jsonAbiNames
    .map((name) => {
      return { [name]: jsonAbiAddresses().current[name] };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {})
  ;

  return { contracts, addresses };
};

export const web3Init = async () => {
  const { contracts, addresses } = await initContracts();

  return { contracts , addresses };
};
