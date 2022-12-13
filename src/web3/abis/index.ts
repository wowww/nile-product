import CFixedPriceOrder from './CFixedPriceOrder.json';
import CurateMarket from './CurateMarket.json';
import DeployRouter from './DeployRouter.json';
import DeployRouterProxy from './DeployRouterProxy.json';
import EnglishAuctionOrder from './EnglishAuctionOrder.json';
import ERC20 from './ERC20.json';
import ERC721Deployer from './ERC721Deployer.json';
import ERC1155Deployer from './ERC1155Deployer.json';
import FeeManager from './FeeManager.json';
import NileERC721 from './NileERC721.json';
import NileERC1155 from './NileERC1155.json';
import OFixedPriceOrder from './OFixedPriceOrder.json';
import OpenMarket from './OpenMarket.json';
import OpenPriceOrder from './OpenPriceOrder.json';
import Recipient from './Recipient.json';
import TokenManager from './TokenManager.json';
import TokenManagerProxy from './TokenManagerProxy.json';
import { AbiItem } from 'web3-utils';

export const jsonAbiNames = [
  'CFixedPriceOrder',
  'CurateMarket',
  'DeployRouter',
  'DeployRouterProxy',
  'EnglishAuctionOrder',
  'ERC20',
  'ERC721Deployer',
  'ERC1155Deployer',
  'FeeManager',
  'OFixedPriceOrder',
  'OpenMarket',
  'OpenPriceOrder',
  'Recipient',
  'TokenManager',
  'TokenManagerProxy',
];

export type jsonAbiName =
  | 'CFixedPriceOrder'
  | 'CurateMarket'
  | 'DeployRouter'
  | 'DeployRouterProxy'
  | 'EnglishAuctionOrder'
  | 'ERC20'
  | 'ERC721Deployer'
  | 'ERC1155Deployer'
  | 'FeeManager'
  | 'OFixedPriceOrder'
  | 'OpenMarket'
  | 'OpenPriceOrder'
  | 'Recipient'
  | 'TokenManager'
  | 'TokenManagerProxy'
  ;

export const jsonAbiAddresses = () => {
  const development: { [key: string]: string } = {
    Recipient: '0xe4fa16a2e83d431a37c542992588d07f924a955e',
    DeployRouter: '0xe89dd40d2f705c71f6f0c3ba86ea4d7964ce4ecd',
    DeployRouterProxy: '0x8faf1e7b8009be1c5a667b555b297e1ef1d7d4d6',
    ERC20: '0xAe81b9fFCde5Ab7673dD4B2f5c648a5579430B17',
    ERC721Deployer: '0x58624410b471141b77b98347459a2399220c5ff5',
    ERC1155Deployer: '0x24f04488855ca6a0e4ac3557a977d0f2ed9d3e54',
    TokenManager: '0xb1b0fd86704dfdeaf9694ae091e4d489aa5d544a',
    TokenManagerProxy: '0x512d53a1331a78fd20f4fbeb7084847da41f5cf6',
    CurateMarket: '0x67a23f1d115bb7a2600984e9b622f240217e313e',
    OpenMarket: '0x3a63a14e0c945581238ebe4c5417480b4dfc2a0e',
    CFixedPriceOrder: '0xd2df2ffff58d7c36e8c3b27b4db37fe568905f22',
    OFixedPriceOrder: '0x2cf6f42de7e9bb11a9055e05ac5b7684a1a46fde',
    EnglishAuctionOrder: '0xd1ffeef545a6551646c91847a1468b1ed5d0677e',
    OpenPriceOrder: '0xaa62aaea09503b49ce36d74a1768c585a2868ad6',
  };

  const production: { [key: string]: string } = {
    Recipient: '0x43D7f9C312d5e1dEc37c0b0cA6bfd04Ef762d7D0',
    DeployRouter: '0xe351d13D2103114a0add8Ad917d3aeBCdd0E906c',
    DeployRouterProxy: '0x11D83E4D91E12Ab7102c29917eD4aF54081A1703',
    ERC20: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
    ERC721Deployer: '0xd9903325535458036957373a5ec6239B0eB894f8',
    ERC1155Deployer: '0x6FA00cf754Fd6A408EdAA1606A7a76f9e9aa32A6',
    TokenManager: '0xC564e6Aa1907B18DeC30cB64a03a0fED96A733cb',
    TokenManagerProxy: '0x0e7CF92851F84fd745ebDf7672F326A931666Da9',
    CurateMarket: '0xf5c28a69892159f52286F66F9cDB1185A44B17e4',
    OpenMarket: '0xe1fC50C76D02C1bE64afD3C4639a5966d9c16cf5',
    CFixedPriceOrder: '0x4Fb64B7531e023d3C8D504abeDf53c067F32E907',
    OFixedPriceOrder: '0x807A529B977Fd3C6593bA1F5F53103d36fA52Dd6',
    EnglishAuctionOrder: '0x6B5850ed0cd08F60f0a92778Ece37F833501E86B',
    OpenPriceOrder: '0x45C195AAacAB9c0e34e2544ef99C5Cda3Cc63B98',
  };

  const current: { [key: string]: string } = {
    development,
    production,
  }[process.env.NEXT_PUBLIC_ENV_PROFILE as ('development' | 'production') ?? 'production'];

  return {
    development,
    production,
    current,
  };
};

const abis: { [key: string]: AbiItem[] } = {
  CFixedPriceOrder: CFixedPriceOrder as AbiItem[],
  CurateMarket: CurateMarket as AbiItem[],
  DeployRouter: DeployRouter as AbiItem[],
  DeployRouterProxy: DeployRouterProxy as AbiItem[],
  EnglishAuctionOrder: EnglishAuctionOrder as AbiItem[],
  ERC20: ERC20 as AbiItem[],
  ERC721Deployer: ERC721Deployer as AbiItem[],
  ERC1155Deployer: ERC1155Deployer as AbiItem[],
  FeeManager: FeeManager as AbiItem[],
  NileERC721: NileERC721 as AbiItem[],
  NileERC1155: NileERC1155 as AbiItem[],
  OFixedPriceOrder: OFixedPriceOrder as AbiItem[],
  OpenMarket: OpenMarket as AbiItem[],
  OpenPriceOrder: OpenPriceOrder as AbiItem[],
  Recipient: Recipient as AbiItem[],
  TokenManager: TokenManager as AbiItem[],
  TokenManagerProxy: TokenManagerProxy as AbiItem[],
};

export default abis;
