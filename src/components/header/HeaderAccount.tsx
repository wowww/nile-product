import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Avatar, Button, Modal, Popover, Tabs } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'next-i18next';

import ModalLayout from '@components/modal/ModalLayout';
import { IconLogo } from '@components/logo/IconLogo';
import Tag from '@components/tag/Tag';
/* 22.11.04 수정: empty 컴포넌트 추가 */
import Empty from '@/components/empty/Empty';

import { ReactSVG } from 'react-svg';
import { useWalletFormatter } from '@utils/formatter/wallet';
import axios from 'axios';
import { useNumberFormatter } from '@utils/formatter/number';
import { fromWei, toBN } from 'web3-utils';
import { NileApiService } from '@/services/nile/api';
import { nileWalletAtom, nileWalletMetaAtom, NileWalletProviderType, provider } from '@/state/nileWalletAtom';
import { useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { contractsAtom, tokenListAtom, tokensAtom, updateBalanceAtom } from '@/state/web3Atom';
import { web3Init } from '@/web3/contracts';
import { windowResizeAtom } from '@/state/windowAtom';
import {NileNftToken} from "@/models/nile/marketplace/NileNft";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setOpenChange: (newVisible: boolean) => void;
  item?: NileNftToken;
}

interface coinListItem {
  coinName: string;
  amount: string | null;
  convertToWemix$?: string;
}

interface transactionListItem {
  type: string;
  date: string;
  content: string;
  status: string;
  statusText: string;
  statusDetail?: string;
  url: string;
}

const coinList: coinListItem[] = [
  {
    coinName: 'WEMIX',
    amount: '0',
    convertToWemix$: '0',
  },
  {
    coinName: 'WEMIX$',
    amount: '0',
  },
  /* 22.11.17 수정 start: wemix.fi 기준으로 수정 */
  {
    coinName: 'USDC',
    amount: '0',
    convertToWemix$: '0',
  },
  {
    coinName: 'KLAY',
    amount: '0',
    convertToWemix$: '0',
  },
  /* 22.11.17 수정 end: wemix.fi 기준으로 수정 */
  /* 22.11.16 수정 start: 17일 오픈 기준 삭제 */
  // {
  //   coinName: 'Wonder',
  //   amount: '43.876',
  // },
  // {
  //   coinName: 'g.Wonder',
  //   amount: '21.987',
  // },
];

const transactionList: transactionListItem[] = [
  {
    type: 'NFT',
    date: '2022-06-24 15:44:00',
    content: '{NFT명}에 대한 응찰금 63.90 WEMIX$와 가스비 10 WEMIX가 결제되었습니다.',
    status: 'success',
    statusText: 'Bid 완료',
    url: '/',
  },
  {
    type: 'NFT',
    date: '2022-06-24 15:44:00',
    content: '{NFT명}에 대한 응찰금 63.90 WEMIX$와 가스비 10 WEMIX 결제에 실패하였습니다.',
    status: 'fail',
    statusText: 'Bid 실패',
    statusDetail: 'Network Error',
    url: '/',
  },
  {
    type: 'NFT',
    date: '2022-06-24 15:44:00',
    content: '{NFT명}에 대한 응찰금 63.90 WEMIX$와 가스비 10 WEMIX가 결제되었습니다.',
    status: 'success',
    statusText: 'Bid 완료',
    url: '/',
  },
  {
    type: 'NFT',
    date: '2022-06-24 15:44:00',
    content: '{NFT명}에 대한 응찰금 63.90 WEMIX$와 가스비 10 WEMIX 결제에 실패하였습니다.',
    status: 'fail',
    statusText: 'Bid 실패',
    statusDetail: 'Network Error',
    url: '/',
  },
];

type TransactionType = {
  id: string;
  type: string;
  hash: string;
  from: string;
  to: string;
  timestamp: string;
  collection?: any;
  token?: any;
}

type TokenBalanceInfo = {
  name: string;
  balance: string;
}

const HeaderAccount = ({ isOpen, setIsOpen, setOpenChange, item }: ModalProps) => {
  const { t } = useTranslation('common');

  const { shorten } = useWalletFormatter();
  const { shorthanded } = useNumberFormatter();
  const offset = useAtomValue(windowResizeAtom);
  const api = NileApiService();

  const nileWallet = useAtomValue(nileWalletAtom);
  const nileWalletMeta = useAtomValue(nileWalletMetaAtom);
  const balanceUpdate = useUpdateAtom(updateBalanceAtom);
  const tokens = useAtomValue(tokensAtom);
  const [tokenList] = useAtom(tokenListAtom);

  const [contracts, setContractAtom] = useAtom(contractsAtom);

  const [tokenBalanceList, setTokenBalanceList] = useState<TokenBalanceInfo[]>();

  const [transactions, setTransactions] = useState<TransactionType[]>();

  const [isModalServiceAgree, setModalServiceAgree] = useState(false);
  const [isModalDisconnect, setModalDisconnect] = useState(false);

  const disconnect = useCallback(() => {
    provider.disconnect();
  }, [nileWallet]);

  useEffect(() => {
    web3Init().then((data) => {
      const { contracts } = data;
      setContractAtom(contracts);
      // setEtcContracts(etc);
    });
  }, []);

  const [tokenInfo, setTokenInfo] = useState();
  const [wemixPrice, setWemixPrice] = useState<number>(0);
  const [usdPrice, setUsdPrice] = useState<number>(0);
  const [wemixUsdPrice, setWemixUsdPrice] = useState<number>(0);

  const totalAmount = useMemo(() => {
    const bnTotal = tokenBalanceList
      ?.filter(({ balance }) => balance)
      ?.map(({ name, balance }) => toBN(`${balance}`).muln(name === 'wemix' ? wemixUsdPrice : 1))
      ?.reduce((prev, curr) => prev.add(curr), toBN(0));
    if (bnTotal) {
      const etherValue = fromWei(bnTotal, 'ether');
      return Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(etherValue));
    }
    return '0';
  }, [tokenBalanceList]);


  useEffect(() => {
    axios.get('/api/token').then(({ data }) => {
      console.log(data);
      setTokenInfo(data);
    }).catch((error) => {
      console.log(error);
    });

    axios.get('/api/marketcap').then(({ data }) => {
      // console.log(data);
      console.log(data.WEMIX[0]);
      setWemixUsdPrice(data.WEMIX[0].quote.USD.price)
      // setTokenInfo(data);

    }).catch((error) => {
      console.log(error);
    });

    // if(wallet.address) {
    //   api.mypage.nft.getTransactionHistory(wallet.address)
    //     .then(({ data }) => {
    //       console.log(data);
    //       setTransactions(data.result);
    //     })
    //     .catch((e) => console.log(e));
    // }
  }, []);

  const getBalanceAll = async () => {
    try {
      const wemixBalance = await provider.web3.eth.getBalance(nileWallet);
      const wemix$Balance = await contracts?.ERC20?.methods.balanceOf(nileWallet).call();

      setTokenBalanceList([{ name: 'wemix', balance: wemixBalance }, { name: 'wemix$', balance: wemix$Balance }]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(isOpen, nileWallet);

    if (isOpen && nileWallet) {
      balanceUpdate();
      api.mypage.nft.getTransactionHistory(nileWallet)
        .then(({ data }) => {
          console.log(data);
          setTransactions(data.results);
        })
        .catch((e) => console.log(e));

      getBalanceAll();
    }

    return () => {
      setTransactions([]);
    };
  }, [isOpen]);

  useEffect(() => {
    console.log('tokens => ', tokens);
  }, [tokens]);

  useEffect(() => {
    console.log('tokenList =>', tokenList);
  }, [tokenList]);

  // tab 콘텐츠
  const CoinComponent = () => {
    return (
      <div className={cn('total-balance')}>
        <dl>
          <dt>{t('header.account.totalAmount')}</dt>
          <dd>
            <strong>${totalAmount}</strong>
          </dd>
        </dl>
        <div className={cn('coin-list-wrap')}>
          <ul className={cn('coin-list')}>
            {tokenBalanceList
              ?.map(({ name, balance }): JSX.Element => {
                const bnValue = toBN(balance ?? '0');
                const etherValue = fromWei(bnValue, 'ether');
                const amount = Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(etherValue));

                const wemixUSDValue = bnValue.muln(wemixUsdPrice);
                const etherWemixUSDValue = fromWei(wemixUSDValue, 'ether');
                const formattedWemixUSDValue = Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(etherWemixUSDValue));

                return (
                  <li key={name}>
                    <span className={cn('coin-name')}>
                      <IconLogo
                        type={
                          name.toLowerCase() === 'wemix$' || name.toLowerCase() === 'wemix'
                            ? `${name.toLowerCase()}_dark`
                            : name.toLowerCase()
                        }
                        size={16}
                      />
                      <span>{name.toUpperCase()}</span>
                    </span>
                    {(
                      <div className={cn('amount-wrap')}>
                        <span className={cn('amount')}>{name.toLowerCase() === 'wemix$' ? `$${amount}` : amount}</span>
                        {name.toLowerCase() !== 'wemix$' &&
                          <span className={cn('converted')}>(${formattedWemixUSDValue})</span>}
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  };

  const TransactionComponent = () => {
    return (
      <div className={cn('transaction-area', transactionList.length === 0 && 'empty')}>
        {/* {(transactions?.length ?? 0) > 0 ? ( */}
        {/*   <ul className={cn('transaction-list')}> */}
        {/*     {transactions?.map((transaction) => ( */}
        {/*       <li key={transaction.id}> */}
        {/*         <div className="title-wrap"> */}
        {/*             <span className="title"> */}
        {/*               {transaction.type} */}
        {/*               <a href={`https://explorer.test.wemix.com/tx/${transaction?.hash}`} target="_blank" title={t('blank')} rel="noopener noreferrer"> */}
        {/*                 <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" /> */}
        {/*                 <span className="a11y">{t('seeMore')}</span> */}
        {/*               </a> */}
        {/*             </span> */}
        {/*           <span className="date">{dayjs.utc(transaction.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}</span> */}
        {/*         </div> */}
        {/*         <p className="desc">{transaction.collection?.name} {transaction.token?.name}</p> */}
        {/*         <p className="desc">{shorten(transaction.from)} - {shorten(transaction.to)}</p> */}
        {/*         <div className="status-wrap"> */}
        {/*           <strong className={cn('status', 'success')}>{transaction.type}</strong> */}
        {/*           /!* {!!item.statusDetail && <span className="status-detail">{item.statusDetail}</span>} *!/ */}
        {/*         </div> */}
        {/*       </li> */}
        {/*     ))} */}
        {/*   </ul> */}
        {/* ) : ( */}
        <Empty subText={t('header.account.noTransaction')} iconType="account" />
        {/* )} */}

        {/* 22.11.04 수정 start: empty 케이스 추가 */}
        {/* {transactionList.length > 0 ? ( */}
        {/*   <ul className={cn('transaction-list')}> */}
        {/*     {transactionList.map((item: transactionListItem, index: number) => { */}
        {/*       return ( */}
        {/*         <li key={item.type + index}> */}
        {/*           <div className="title-wrap"> */}
        {/*             <span className="title"> */}
        {/*               {item.type} */}
        {/*               <a href={item.url} target="_blank" title={t('blank')} rel="noopener noreferrer"> */}
        {/*                 <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" /> */}
        {/*                 <span className="a11y">{t('seeMore')}</span> */}
        {/*               </a> */}
        {/*             </span> */}
        {/*             <span className="date">{item.date}</span> */}
        {/*           </div> */}
        {/*           <p className="desc">{item.content}</p> */}
        {/*           <div className="status-wrap"> */}
        {/*             <strong className={cn('status', 'success')}>{item.statusText}</strong> */}
        {/*             {!!item.statusDetail && <span className="status-detail">{item.statusDetail}</span>} */}
        {/*           </div> */}
        {/*         </li> */}
        {/*       ); */}
        {/*     })} */}
        {/*   </ul> */}
        {/* ) : ( */}
        {/*   <Empty subText={t('header.account.noTransaction')} iconType="account" /> */}
        {/* )} */}
        {/* 22.11.04 수정 end: empty 케이스 추가 */}
      </div>
    );
  };

  useEffect(() => {
    if (nileWalletMeta) {
      console.log('wallet meta', nileWalletMeta.description);
    }
  }, [nileWalletMeta]);

  const walletProvider = useMemo(() => {
    if (!nileWalletMeta) {
      return '';
    }
    const { description } = nileWalletMeta;
    if (description === NileWalletProviderType.WEMIX_WALLET_MOBILE_APP) {
      return 'Wemix Wallet';
    }
    if (description === NileWalletProviderType.WEMIX_WALLET_MOBILE_APP_DESC) {
      return 'Wemix Wallet';
    }
    if (description === NileWalletProviderType.METAMASK_BROWSER_EXTENSION) {
      return 'Metamask';
    }
    if (description === NileWalletProviderType.METAMASK_MOBILE_APP) {
      return 'Metamask';
    }
    return '';
  }, [nileWalletMeta]);

  const AccountTabs = [
    {
      label: t('header.account.holdingCoin'),
      key: 'coin',
      children: CoinComponent(),
    },
    // {
    //   label: t('header.account.transaction'),
    //   key: 'transaction',
    //   children: TransactionComponent(),
    // },
  ];

  /* 22.11.17 수정: 복사 버튼 클릭 로직 추가 */
  const [isCopyPush, setIsCopyPush] = useState(false);

  const _handleCopy = () => {
    setIsCopyPush(true);
    setTimeout(() => setIsCopyPush(false), 2000);
  };

  // account 콘텐츠
  const AccountContents = (
    <>
      <div className={cn('account-top')}>
        <div className={cn('button-wrap')}>
          <button type="button" className={cn('btn-disconnect')} onClick={() => setModalDisconnect(true)}>
            <Tag size="s" color="light-gray">
              {t('disconnect')}
            </Tag>
          </button>
        </div>
        <div className={cn('user-info-wrap')}>
          {/* 22.11.17 수정: 메타마스크 연결 시 metamask 이미지로 추가 */}
          {walletProvider === 'Wemix Wallet' ? (
            <Avatar className='user-image wemix-wallet' size={40} />
          ) : (
            <Avatar className='user-image metamask' size={40} />
          )}
          <div>
            <span
              className={cn('btn-open-wallet')}>{walletProvider}</span>
            {/* <Dropdown
              overlayClassName="account-wallet-list"
              overlay={
                <ul>
                  <li>
                    <button
                      className={cn('wallet-item')}
                      onClick={() => {
                        setModalServiceAgree(true);
                      }}
                    >
                      WEMIX Wallet
                    </button>
                  </li>
                  <li>
                    <button
                      className={cn('wallet-item')}
                      onClick={() => {
                        setModalServiceAgree(true);
                      }}
                    >
                      MetaMask <IconCheck />
                    </button>
                  </li>
                </ul>
              }
              trigger={['click']}
              placement="bottomLeft"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button" className={cn('btn-open-wallet')}>
                MetaMask <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg'  />
              </button>
            </Dropdown> */}
            <div className={cn('user-id-wrap')}>
              <CopyToClipboard text={nileWallet}>
                <>
                  <button className={cn('btn-copy-id')} onClick={() => _handleCopy()}>
                    <span className={cn('user-id')}>{shorten(nileWallet)}</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                  </button>
                </>
              </CopyToClipboard>
              <div className={cn('account-tooltip', isCopyPush ? 'active' : '')}>{t('copyWalletAnnounce')}</div>
              <span className={cn('a11y')}>{t('copyWallet')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cn('account-body')}>
        <Tabs defaultActiveKey="coin" className={cn('tab-type tab-md tab-full tab-underline')} items={AccountTabs} />
      </div>
    </>
  );

  // 팝업 닫기 이벤트
  const onCancel = useCallback(() => {
    Modal.destroyAll();
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      {offset.width > 767 ? (
        <Popover
          destroyTooltipOnHide={true}
          overlayClassName={'header-account header-inner-popup'}
          placement="bottom"
          content={AccountContents}
          trigger="click"
          open={isOpen}
          onOpenChange={setOpenChange}
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        ></Popover>
      ) : (
        <Modal
          destroyOnClose={true}
          wrapClassName={`header-account-wrap ${isOpen && 'active'}`}
          className="header-account"
          open={isOpen}
          closable={true}
          onCancel={onCancel}
          width={'none'}
          footer={null}
          closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
          transitionName=""
        >
          {AccountContents}
        </Modal>
      )}

      {/* 월렛 변경 확인 팝업 */}
      <ModalLayout
        destroyOnClose={true}
        isOpen={isModalServiceAgree}
        setIsOpen={setModalServiceAgree}
        size="sm"
        title={t('header.account.confirmChangeWallet')}
        footer={true}
        footerContent={[
          <Button
            key="ok"
            className={cn('btn btn-bg bg-black btn-md')}
            onClick={() => {
              setModalServiceAgree(false);
              onCancel();
            }}
          >
            OK
          </Button>,
        ]}
      >
        {t('header.account.disconnectWalletMessage')}
      </ModalLayout>

      {/* 월렛 연결 해제 팝업 */}
      <ModalLayout
        destroyOnClose={true}
        isOpen={isModalDisconnect}
        setIsOpen={setModalDisconnect}
        size="sm"
        title={t('disconnectWallet')}
        footer={true}
        footerContent={[
          <Button
            key="cancel"
            className={cn('btn btn-outline outline-black btn-md')}
            onClick={() => {
              setModalDisconnect(false);
            }}
          >
            {t('cancel')}
          </Button>,
          <Button
            key="ok"
            className={cn('btn btn-bg bg-black btn-md')}
            onClick={() => {
              provider.disconnect();
              onCancel();
            }}
          >
            {t('clear')}
          </Button>,
        ]}
      >
        {t('header.account.clearWalletConnectMessage', { wallet: 'wallet' })}
      </ModalLayout>
    </>
  );
};

export default HeaderAccount;
