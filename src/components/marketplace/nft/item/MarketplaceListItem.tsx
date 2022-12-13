import Link from 'next/link';
import cn from 'classnames';
import { message } from 'antd';
import { useTranslation } from 'next-i18next';
import { useNumberFormatter } from '@utils/formatter/number';
import Web3 from 'web3';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { getNileNftStatus, NileNftOrder, NileNftToken } from '@/models/nile/marketplace/NileNft';
import React, { useMemo } from 'react';
import Tag from '@components/tag/Tag';
import { MarketCountdownText } from '@components/marketplace/countdown/text';
import dayjs from 'dayjs';
import { MarketNftItemStatusType } from '@/services/nile/api';
import { useUnitFormatter } from '@utils/formatter/unit';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';

export type MarketplaceListItemProps = {
  item: NileNftToken;
};

export const MarketplaceListItem = ({ item }: MarketplaceListItemProps) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const { shorthanded, isValidNumber } = useNumberFormatter();
  const nileWallet = useAtomValue(nileWalletAtom);
  const { getPaymentUnit } = useUnitFormatter();

  const status = useMemo(() => {
    return getNileNftStatus(item, nileWallet);
  }, [item]);

  const order: NileNftOrder | undefined = useMemo(() => {
    return item.orderList?.at(0);
  }, [item]);

  const targetDate = useMemo(() => {
    if ([MarketNftItemStatusType.NONE].includes(status)) {
      return dayjs.utc(item.orderStartAt);
    }
    if ([MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status)) {
      return dayjs.utc(order?.endAt);
    }
    return dayjs();
  }, [order, status]);

  const itemPrice = useMemo(() => item.price && isValidNumber(item.price) && shorthanded(Number(Web3.utils.fromWei(String(item.price), 'ether'))), [item]);

  const remainSeconds = useMemo(() => Math.abs(targetDate.diff(dayjs(), 'seconds')), [targetDate]);

  const stateTag = (state?: string) => {
    switch (state) {
      case 'NONE':
        return (
          <Tag size="md-m" color="black">
            {t('upcoming', { ns: 'common' })}
          </Tag>
        );
      case 'AUCTION_LIVE_BEFORE_BID':
        return (
          <Tag type="market" size="md-m" color="negative">
            {t('onAuction', { ns: 'common' })}
          </Tag>
        );
      case 'AUCTION_LIVE_ONGOING':
        return (
          <Tag type="market border-none" size="md-m" bg>
            <MarketCountdownText expireTime={remainSeconds} />
          </Tag>
        );
      case 'COMPLETE':
        return (
          <Tag size="md-m" color="gray" bg>
            {t('auctionClosed', { ns: 'common' })}
          </Tag>
        );
      case 'OPEN':
        return (
          <Tag size="md-m" color="black">
            {t('buyNow', { ns: 'common' })}
          </Tag>
        );
      case 'OPEN_OFFER_BEFORE_OFFER':
        return (
          <Tag size="md-m" color="black">
            {t('openForOffers', { ns: 'common' })}
          </Tag>
        );
      case 'OPEN_OFFER_ONGOING':
        return (
          <Tag size="md-m" color="black">
            {t('openForOffers', { ns: 'common' })}
          </Tag>
        );
      case 'CLOSED':
        return (
          <Tag size="md-m" bg disabled>
            {t('openForOffers', { ns: 'common' })}
            {/*{t('notForSale', { ns: 'common' })}*/}
          </Tag>
        );
      default:
        return false;
    }
  };

  return (
    <>
      <Link href={item.collection?.slug === 'Tangled' ? '' : `/marketplace/${item.collection?.slug}/${item.tokenId}`} scroll={false}>
        {/* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */}
        <a
          className={cn('card-link')}
          onClick={() => {
            if (item.collection?.slug === 'Tangled') {
              message.info({
                content: t('NFTOpenMessage', { ns: 'common' }),
                key: 'toast',
              });
            }
          }}
        >
          <div className={cn('img-block', { mine: false /* TODO */ })}>
            {/* 22.11.10 수정 start: 이미지 케이스, video 케이스 분리 */}
            {item.image ? (
              <Image src={item.image} alt="" layout="fill" loader={NileCDNLoader} />
            ) : (
              <span className={cn('video-wrap')}>
                <video autoPlay loop muted playsInline disablePictureInPicture>
                  <source src={item.videoUrl} type="video/mp4" />
                </video>
              </span>
            )}
          </div>
          <div className={cn('info-block')}>
            {stateTag(status)}
            {/*<StatusTag status={status} remain={remainSeconds} />*/}
            <div className={cn('info-top')}>
              <span className={cn('collection-name')}>{item.collection?.name}</span>
              <strong className={cn('product-name')}>{item.name}</strong>
            </div>
            <div className={cn('info-bottom')}>
              <dl>
                {/*<dt>{priceState(item.status, item.type)}</dt>*/}
                <dd>
                  {itemPrice}
                  {/*{item.price && shorthanded(Number(Web3.utils.fromWei(String(item.price), 'ether')))}*/}
                  {/*{new Intl.NumberFormat('ko-KR').format(item.price)}*/}
                  <span className={cn('unit')}>{item.unitFormat ?? getPaymentUnit(item?.orderList?.at(0)?.payment)}</span>
                </dd>
              </dl>
              {/* 22.11.17 수정: 11/22기준 데이터 값에 따라 나오는 마크업 수정 */}
              {/*{item.status === 'auction-start' && item.startDate && (*/}
              {/*  <dl>*/}
              {/*    <dt>{t('opensOn', { ns: 'common' })}</dt>*/}
              {/*    /!*<dd>{item.startDate}</dd>*!/*/}
              {/*  </dl>*/}
              {/*)}*/}
              {/*{item.status === 'auction-ing' && item.bidders && (*/}
              {/*  <dl>*/}
              {/*    <dt>{t('bidders', { ns: 'common' })}</dt>*/}
              {/*    <dd className={cn('column')}>*/}
              {/*      <IconBidders />*/}
              {/*      <span>{item.bidders} people</span>*/}
              {/*    </dd>*/}
              {/*  </dl>*/}
              {/*)}*/}
              {/*{item.status === 'closed' && item.winnerName && (*/}
              {/*  <dl>*/}
              {/*    <dt>{t('winner', { ns: 'common' })}</dt>*/}
              {/*    <dd className={cn('user-info')}>*/}
              {/*      <Avatar className={cn('user-image type1')} size={28} />*/}
              {/*      <span className={cn('name')}>{item.winnerName}</span>*/}
              {/*    </dd>*/}
              {/*  </dl>*/}
              {/*)}*/}
              {/*{item.secondAuction && item.ownerName && (*/}
              {/*  <dl>*/}
              {/*    <dt>{t('owner', { ns: 'common' })}</dt>*/}
              {/*    <dd className={cn('user-info')}>*/}
              {/*      <Avatar className={cn('user-image type1')} size={28} />*/}
              {/*      <span className={cn('name')}>{item.owner.name}</span>*/}
              {/*    </dd>*/}
              {/*  </dl>*/}
              {/*)}*/}
            </div>
          </div>
        </a>
      </Link>
      {/*<LikeButton count={item.likeCount} />*/}
    </>
  );
};
