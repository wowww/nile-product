import React, { useEffect, useState } from 'react';
import cn from 'classnames';
/* 22.11.02 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';
import { message } from 'antd';
/* 22.11.17 수정: type 추가 */
/* 22.11.17 수정: sub banner info component 추가 */
import MarketplaceSubBannerInfo, { dataListItem } from './MarketplaceSubBannerInfo';

import OutlineButton from '@/components/button/OutlineButton';
import { NileApiService } from '@/services/nile/api';

interface bannerPropsType {
  collectionSlug?: string;
  salesStatus: string;
  title: string;
  /* 22.11.03 수정: nftLink 옵셔널로 변경 */
  nftLink?: string;
  collectionLink?: string;
  imgUrl: string;
  /* 22.11.09 수정: 신규 props 추가 */
  nftButtonText?: string;
  collectionLinkText?: string;
  nftDisable?: boolean;
  collectionDisable?: boolean;
  classNames?: string;
  infoData?: dataListItem[];
  infoColor?: 'white' | 'black';
  /* 22.11.21 수정: 신규 props 추가 */
  buttonText?: string;
  buttonLink?: string;
}

export type OrderStatType = {
  total?: number;
  ongoing?: number;
  closed?: number;
};

export type PriceStatType = {
  floorPrice?: number;
  totalPrice?: number;
};

const MarketplaceSubBanner: React.FC<bannerPropsType> = ({
  collectionSlug,
  salesStatus,
  title,
  nftLink,
  collectionLink,
  imgUrl,
  nftButtonText,
  collectionLinkText,
  nftDisable,
  collectionDisable,
  classNames,
  infoData,
  infoColor,
  buttonText,
  buttonLink,
}) => {
  const api = NileApiService();
  /* 22.11.02 수정: useTranslation 추가 */
  const { t } = useTranslation(['marketplace', 'common']);
  const [orderStat, setOrderStat] = useState<OrderStatType>();

  useEffect(() => {
    if (collectionSlug) {
      api.marketplace.collection
        .getOrderStat(collectionSlug)
        .then(({ data }) => {
          setOrderStat(data.result);
        })
        .catch(() => {
          setOrderStat({
            total: 0,
            ongoing: 0,
            closed: 0,
          });
        });
    }
  }, [collectionSlug]);

  return (
    /* 22.11.09 수정: 신규 props 추가 */
    <div
      className={cn('marketplace-sub-banner', infoData || orderStat ? 'hasInfo' : '', classNames)}
      style={{ background: `url(${imgUrl}) 50% 100% / cover no-repeat` }}
    >
      <div className={cn('title-wrap')}>
        {/*<strong className={cn('sales-status')}>*/}
        {/*  {orderStat?.ongoing && orderStat?.ongoing > 0 ? salesStatus.toUpperCase() : t('auctionClosed', { ns: 'common' })}*/}
        {/*</strong>*/}
        <h3 className={cn('title')}>{title}</h3>
      </div>
      {/* {infoData && <MarketplaceSubBannerInfo color={infoColor} infoData={infoData} />} */}
      {orderStat && (
        <MarketplaceSubBannerInfo
          color={infoColor}
          infoData={infoData}
          orderStat={orderStat}
          orderStatOptions={{
            hideTotal: collectionSlug === 'SON',
            hideClose: collectionSlug === 'SON',
            hideOngoing: true,
          }}
        />
      )}
      <div className={cn('button-wrap')}>
        {/* 22.11.03 수정: nft 버튼 링크 있을때만 보이도록 수정 */}
        {nftLink && (
          <OutlineButton
            /* 22.11.09 수정: 신규 props 추가 및 기존 값 변경 */
            /* 22.11.17 수정: 옥션 보러가기로 명칭 변경 */
            buttonText={nftButtonText === undefined ? t('goAuction', { ns: 'common' }) : nftButtonText}
            color="white"
            size="md"
            type="link"
            href={nftDisable ? undefined : nftLink}
            onClick={() => nftDisable && message.info({ content: t('snkrzInfo'), key: 'toast' })}
          />
        )}
        {collectionLink && (
          <OutlineButton
            /* 22.11.21 수정: 동적 버튼 문구 적용 */
            buttonText={collectionLinkText ? collectionLinkText : t('aboutThisCollection', { ns: 'common' })}
            color="white"
            size="md"
            type="link"
            href={collectionLink}
          />
        )}
        {buttonLink && (
          <OutlineButton
            /* 22.11.21 수정: 동적 버튼 문구 적용 */
            buttonText={buttonText ? buttonText : t('aboutThisCollection', { ns: 'common' })}
            color="white"
            size="md"
            type="link"
            href={buttonLink}
          />
        )}
      </div>
    </div>
  );
};

export default MarketplaceSubBanner;
