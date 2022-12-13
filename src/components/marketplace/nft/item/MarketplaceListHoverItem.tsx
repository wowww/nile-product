import Link from 'next/link';
import cn from 'classnames';
import Tag from '@components/tag/Tag';
import { useTranslation } from 'next-i18next';
import { useNumberFormatter } from '@utils/formatter/number';
import Web3 from 'web3';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { MarketNftItemStatusType, NileApiService } from '@/services/nile/api';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { getNileNftStatus, NileNftToken, NileOrderType } from '@/models/nile/marketplace/NileNft';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';
import { MarketCountdownText } from '@components/marketplace/countdown/text';
import { useCountdown } from '@utils/countdown';
import dayjs from 'dayjs';
import { useUnitFormatter } from '@utils/formatter/unit';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import NileUserAccount from "@/models/nile/user/NileUserAccount";
import {Avatar} from "antd";

type ownerType = {
  address: string;
  nickname?: string;
};

export const MarketplaceListHoverItem = ({ item, avatarSize }: { item: NileNftToken, avatarSize: AvatarSize }) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const api = NileApiService();
  const nileWallet = useAtomValue(nileWalletAtom);
  const { shorten } = useWalletFormatter();

  const [owner, setOwner] = useState<ownerType>();
  const [creator, setCreator] = useState<ownerType>();
  const [userInfo, setUserInfo] = useState<NileUserAccount>();

  const { shorthanded, isValidNumber } = useNumberFormatter();

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

  const order = useMemo(() => {
    return item.orderList?.at(0);
  }, [item]);

  const [status, setStatus] = useState(MarketNftItemStatusType.NONE);

  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });
  const { getPaymentUnit } = useUnitFormatter();

  const itemPrice = useMemo(() => item.price && isValidNumber(item.price) && shorthanded(Number(Web3.utils.fromWei(String(item.price), 'ether'))), [item]);

  useEffect(() => {
    setStatus(getNileNftStatus(item, nileWallet));
  }, [item, nileWallet, remainTime]);

  const targetDate = useMemo(() => {
    if ([MarketNftItemStatusType.NONE].includes(status)) {
      return dayjs.utc(item.orderStartAt);
    }
    if ([MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status)) {
      return dayjs.utc(order?.endAt);
    }
    return dayjs();
  }, [order, status]);

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

  useEffect(() => {
    getProfile(nileWallet);
  }, []);

  const priceState = (state: string, type: string | undefined) => {
    switch (state) {
      case 'NONE':
        if (type === NileOrderType.FIXED_PRICE) {
          return t('fixedPrice', { ns: 'common' });
        } else {
          return t('startingBid', { ns: 'common' });
        }
      case 'AUCTION_LIVE_BEFORE_BID':
        return t('startingBid', { ns: 'common' });
      case 'AUCTION_LIVE_ONGOING':
        return t('currentBid', { ns: 'common' });
      case 'COMPLETE':
        return t('finalBid', { ns: 'common' });
      case 'OPEN':
        return t('fixedPrice', { ns: 'common' });
      case 'OPEN_OFFER_BEFORE_OFFER':
        return t('lastPrice', { ns: 'common' });
      case 'OPEN_OFFER_ONGOING':
        return t('currentOffer', { ns: 'common' });
      case 'CLOSED':
        return t('lastPrice', { ns: 'common' });
      default:
        return false;
    }
  };

  useEffect(() => {
    if (item?.ownerAddress) {
      api.user.account
        .getUserInfo(item.ownerAddress)
        .then(({ data }) =>
          setOwner({
            address: data.address,
            nickname: data.nickname,
          }),
        )
        .catch(() => {
          return null;
        });
    }
  }, [item]);

  useEffect(() => {
    if (item.collection?.ownerAddress) {
      api.user.account
        .getUserInfo(item.collection.ownerAddress)
        .then(({ data }) =>
          setCreator({
            address: data.address ?? '',
            nickname: data.nickname ?? undefined,
          }),
        )
        .catch(() => {
          return null;
        });
    }
  }, [item]);

  return (
    <>
      <Link href={`/marketplace/${item.collection?.slug ?? 'SON'}/1`} scroll={false}>
        <a className={cn('card-link')}>
          <div className={cn('img-block')}>
            <div className={cn('video-wrap')}>
              <video autoPlay loop muted playsInline disablePictureInPicture>
                <source src={item.videoUrl ?? 'https://nile.blob.core.windows.net/media/SON/1.mp4'} type="video/mp4" />
              </video>
            </div>
            <div className={cn('product-info')}>
              <div className={cn('product-info-top')}>
                <div className={cn('product-name')}>{item.collection?.name}</div>
              </div>
              <div className={cn('product-info-bottom')}>
                {(item.collection?.ownerName || item.collection?.ownerAddress) && (
                  <dl>
                    <dt>{t('creator', { ns: 'common' })}</dt>
                    <dd>
                      <Avatar size={24} className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} />
                      <span>{item.collection?.ownerName ?? shorten(item.collection?.ownerAddress)}</span>
                    </dd>
                  </dl>
                )}
                {(order?.round === 1 && item?.collection?.ownerAddress) && (
                  <dl>
                    <dt>{t('owner', { ns: 'common' })}</dt>
                    <dd>
                      <Avatar size={24} className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} />
                      <span>{item.collection?.ownerName ?? shorten(item.collection?.ownerAddress)}</span>
                    </dd>
                  </dl>
                )}
                {(order?.round === 0 && status === MarketNftItemStatusType.COMPLETE) && (
                  <dl>
                    {/* 22.11.11 수정: ': ' 추가 */}
                    <dt>{t('winner', { ns: 'common' })}</dt>
                    <dd>
                      {/* 작가 사진이 들어가면 해당 코드를 넣어주세요 style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} */}
                      <Avatar size={avatarSize} className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} />
                      <span>{shorten(item?.orderList?.at(-1)?.biddingList?.at(0)?.address)}</span>
                    </dd>
                  </dl>
                )}
                {(order?.round === 0 && status === MarketNftItemStatusType.CLOSED && item?.collection?.ownerAddress !== item?.ownerAddress) && (
                  <dl>
                    {/* 22.11.11 수정: ': ' 추가 */}
                    <dt>{t('owner', { ns: 'common' })}</dt>
                    <dd>
                      {/* 작가 사진이 들어가면 해당 코드를 넣어주세요 style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} */}
                      <Avatar size={avatarSize} className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} />
                      <span>{shorten(item?.ownerAddress) ?? ""}</span>
                    </dd>
                  </dl>
                )}
                {/*{item.status === 'auction-ing' && item.bidders && (*/}
                {/*  <dl>*/}
                {/*    <dt>{t('bidders', { ns: 'common' })}</dt>*/}
                {/*    <dd>*/}
                {/*      <IconBidders />*/}
                {/*      <span>{item.bidders} people</span>*/}
                {/*    </dd>*/}
                {/*  </dl>*/}
                {/*)}*/}
                {/*{item.status === 'closed' && item.winnerName && (*/}
                {/*  <dl>*/}
                {/*    <dt>{t('winner', { ns: 'common' })}</dt>*/}
                {/*    <dd>*/}
                {/*      <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={22} />*/}
                {/*      <span>{item.winnerName}</span>*/}
                {/*    </dd>*/}
                {/*  </dl>*/}
                {/*)}*/}
                {/*{item.secondAuction && item.owner.name && (*/}
                {/*  <dl>*/}
                {/*    <dt>{t('owner', { ns: 'common' })}</dt>*/}
                {/*    <dd>*/}
                {/*      <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={22} />*/}
                {/*      <span>{item.owner.name}</span>*/}
                {/*    </dd>*/}
                {/*  </dl>*/}
                {/*)}*/}
              </div>
            </div>
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
                <dt>{priceState(status, item.orderType)}</dt>
                <dd>
                  {itemPrice}
                  <span className={cn('unit')}>{item.unitFormat ?? getPaymentUnit(item?.orderList?.at(0)?.payment)}</span>
                </dd>
              </dl>
              {item.status === 'auction-start' && item.orderStartAt && (
                <dl>
                  <dt>{t('opensOn', { ns: 'common' })}</dt>
                  <dd>{item.orderStartAt}</dd>
                </dl>
              )}
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
              {/*      <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={28} />*/}
              {/*      <span className={cn('name')}>{item.winnerName}</span>*/}
              {/*    </dd>*/}
              {/*  </dl>*/}
              {/*)}*/}
              {/*{item.secondAuction && item.owner.name && (*/}
              {/*  <dl>*/}
              {/*    <dt>{t('owner', { ns: 'common' })}</dt>*/}
              {/*    <dd className={cn('user-info')}>*/}
              {/*      <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={28} />*/}
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
