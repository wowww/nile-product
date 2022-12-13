/* 22.10.06 수정: infinite loader 관련 제거 */
import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PriceHistoryDataType } from '@/components/chart/chartDummyData';

import cn from 'classnames';

import { ReactSVG } from 'react-svg';

import { Avatar } from 'antd';
/* 22.10.06 수정: InfiniteLoader 추가 */
import NileNft from '@/models/nile/marketplace/NileNft';
import { useTranslation } from 'next-i18next';
import { NileApiService } from '@/services/nile/api';
import dayjs from 'dayjs';
import { fromWei } from 'web3-utils';
import { useWalletFormatter } from '@utils/formatter/wallet';
import Empty from '@components/empty/Empty';
import { jsonAbiAddresses } from '@/web3/abis';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { useAtom } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';

const PriceHistoryChart = dynamic(() => import('@/components/chart/PriceHistoryChart'), {
  ssr: false,
});

export type MarketplaceDetailHistoryProps = {
  item?: NileNft;
};

export type TokenTransaction = {
  id: string;
  type: string;
  hash: string;
  from?: string;
  to?: string;
  timestamp: string;
};

export type TokenPrice = {
  id: string;
  payment: string;
  price: string;
  timestamp: string;
};

const MarketplaceDetailHistory = ({ item }: MarketplaceDetailHistoryProps) => {
  /* 22.11.21 수정: 다국어 추가 */
  const { t } = useTranslation('marketplace');
  // const priceHistoryInit = useRecoilValue(PriceHistoryData);
  console.log(item);
  const api = NileApiService();
  const { shorten } = useWalletFormatter();

  const [transactions, setTransactions] = useState<TokenTransaction[]>();
  const [prices, setPrices] = useState<TokenPrice[]>();
  const [priceChartData, setPriceChartData] = useState<PriceHistoryDataType[]>([]);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();
  const [nileWallet, setNileWallet] = useAtom(nileWalletAtom);

  const nileAddress = [
    jsonAbiAddresses().current['CurateMarket'],
    jsonAbiAddresses().current['OpenMarket'],
    jsonAbiAddresses().current['EnglishAuctionOrder'],
  ];

  useEffect(() => {
    if (item) {
      api.marketplace.nft
        .getTransactionHistory({
          collectionAddress: item.token.collectionAddress,
          tokenId: item.token.tokenId,
        })
        .then(({ data }) => {
          setTransactions(data.results);
        })
        .catch((e) => {
          console.log(e);
        });

      api.marketplace.nft
        .getPriceHistory({
          collectionAddress: item.token.collectionAddress,
          tokenId: item.token.tokenId,
        })
        .then(({ data }) => {
          console.log(data);
          setPrices(data.results);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [item]);

  useEffect(() => {
    if (prices) {
      const datas = prices.map((price) => {
        return {
          date: dayjs.utc(price.timestamp).local().toDate().getTime(),
          value: Number(fromWei(price.price, 'ether')),
          bullet: false,
        };
      });
      console.log(datas);
      setPriceChartData(datas);
    }
  }, [prices]);

  const makeTransactionMessage = (tx: TokenTransaction) => {
    let messageId = '';

    if (tx.type === 'MINT') {
      return t(`detailHistory.1`, { 1: item?.token.name });
    } else if (tx.type === 'AUCTION_START') {
      return t(`detailHistory.2`, { 1: shorten(tx.from) });
    } else if (tx.type === 'AUCTION_BID') {
      return t('detailHistory.3', { 1: shorten(tx.from) });
    } else if (tx.type === 'AUCTION_CLAIM') {
      return t('detailHistory.5', { 1: shorten(tx.from) });
    } else if (tx.type === 'TRANSFER') {
      return t('detailHistory.12', {
        1: nileAddress.includes(`${tx.from}`) ? 'NILE' : shorten(tx.from),
        2: nileAddress.includes(`${tx.to}`) ? 'NILE' : shorten(tx.to),
      });
    }

    return '';
  };

  /* 22.10.06 수정: infinite loader 관련 제거 */
  const historyList = [
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.1', { 1: 'user_name' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.2', { 1: 'user_name' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.3', { 1: 'user_name', 2: 'user_name2' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.4', { 1: 'user_name', 2: 'user_name2' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.5', { 1: 'user_name', 2: 'user_name2' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.6', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.7', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.8', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.9', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.10', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.11', { 1: 'user_name' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.12', { 1: 'user_name', 2: 'user_name2' }),
    },
  ];

  /* 22.10.06 수정: infinite loader 관련 제거 */

  const loginToApiServer = (address: string, nonce?: number) => {
    const message = `Welcome to NILE\n\nWallet address:\n${address.toLowerCase()}\n\nNonce:\n${nonce?.toString().padStart(10, '0')}`;
  };

  const signup = (account: string) => {
    api.user
      .signup(account)
      .then(({ data }) => loginToApiServer(account, data.nonce))
      .catch(({ response }) => console.log(response));
  };
  const getProfile = useCallback(
    (account: string) => {
      return api.user.account
        .getUserInfo(account)
        .then(({ data }) => {
          if (data.errorCode === 11000) {
            return signup(account);
          } else {
            setUserInfo(data);
            return loginToApiServer(account, data?.nonce);
          }
        })
        .catch(({ response }) => {
          switch (response?.status) {
            case 404:
              return signup(account);
            default:
              break;
          }
        });
    },
    [api]
  );

  useEffect(() => {
    getProfile(nileWallet);
  }, []);

  return (
    <div className={cn('marketplace-history')}>
      <div className={cn('chart-wrap')}>
        <PriceHistoryChart data={priceChartData} />
      </div>
      <div className={cn('history-wrap')}>
        <strong>Transaction History</strong>
        <div className={cn('history-list-wrap')}>
          <ul className={cn('history-list')}>
            {transactions && transactions?.length > 0 ? (
              transactions?.map((tx) => (
                <li key={`history-item-${tx.id}`} className={cn('history-item')}>
                  <button type="button" className={cn('btn-user-open')}>
                    <Avatar
                      className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}
                      size={32}
                      // style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }}
                    />
                  </button>
                  <a href={`https://explorer.test.wemix.com/tx/${tx.hash}`} target={`_blank`}>
                    <span className={cn('text')}>{makeTransactionMessage(tx)}</span>
                    <span className={cn('time')}>{dayjs.utc(tx.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                  </a>
                </li>
              ))
            ) : (
              <Empty subText={t('noTransaction')} iconType="account" />
            )}
            {/* {historyList.map((item, index) => ( */}
            {/*   <li key={`history-item-${index}`} className={cn('history-item')}> */}
            {/*     <button type="button" className={cn('btn-user-open')}> */}
            {/*       <Avatar item={item} size={32} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} /> */}
            {/*     </button> */}
            {/*     <Link href={item.link}> */}
            {/*       <a> */}
            {/*         <span className={cn('text')}>{item.text}</span> */}
            {/*         <span className={cn('time')}>2022-08-11 15:32</span> */}
            {/*         <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' /> */}
            {/*       </a> */}
            {/*     </Link> */}
            {/*   </li> */}
            {/* ))} */}
          </ul>
          {/* 22.10.06 수정: InfiniteLoader 컴포넌트로 수정 */}
          {/* <InfiniteLoader /> */}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDetailHistory;
