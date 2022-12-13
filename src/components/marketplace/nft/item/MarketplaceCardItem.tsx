import cn from 'classnames';
import Link from 'next/link';
import { Avatar, message } from 'antd';
import { useTranslation } from 'next-i18next';
import Tag from '@components/tag/Tag';
import Web3 from 'web3';
import { useNumberFormatter } from '@utils/formatter/number';
import { NileCDNLoader } from '@utils/image/loader';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketNftItemStatusType, NileApiService } from '@/services/nile/api';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { getNileNftStatus, NileNftOrder, NileNftToken, NileOrderType } from '@/models/nile/marketplace/NileNft';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';
import dayjs from 'dayjs';
import { useCountdown } from '@utils/countdown';
import { MarketCountdownText } from '@components/marketplace/countdown/text';
import { useUnitFormatter } from '@utils/formatter/unit';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import NileUserAccount from '@/models/nile/user/NileUserAccount';

type ownerType = {
  address: string;
  nickname?: string;
};

export type MarketplaceCardItem = {
  item: NileNftToken;
  avatarSize: AvatarSize;
};

export const MarketplaceCardItem = ({ item, avatarSize }: MarketplaceCardItem) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const { shorthanded, isValidNumber } = useNumberFormatter();
  const [owner, setOwner] = useState<ownerType>();
  const [userInfo, setUserInfo] = useState<NileUserAccount>();
  const nileWallet = useAtomValue(nileWalletAtom);
  const api = NileApiService();

  const [nft, setNft] = useState<any>(item);

  const { shorten } = useWalletFormatter();

  const [status, setStatus] = useState(MarketNftItemStatusType.NONE);

  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const { getPaymentUnit } = useUnitFormatter();

  const itemPrice = useMemo(
    () => item.price && isValidNumber(item.price) && shorthanded(Number(Web3.utils.fromWei(String(item.price), 'ether'))),
    [item]
  );

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

  useEffect(() => {
    setStatus(getNileNftStatus(item, nileWallet));
  }, [item, nileWallet, remainTime]);

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
            {/*{t('notForSale', { ns: 'common' })}*/}
            {t('openForOffers', { ns: 'common' })}
          </Tag>
        );
      default:
        return false;
    }
  };

  const priceState = (state?: string, type?: string) => {
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
        .getUserInfo(item?.ownerAddress)
        .then(({ data }) =>
          setOwner({
            address: data.address ?? '',
            nickname: data.nickname ?? undefined,
          })
        )
        .catch(() => {
          return null;
        });
    }
    if (!item.collection) {
      api.marketplace.collection
        .getItem({ address: item?.collectionAddress })
        .then(({ data }) => {
          setNft({
            ...nft,
            collection: {
              slug: data.result.collection.slug,
              name: data.result.collection.name,
              ownerAddress: data.result.collection.ownerAddress,
            },
          });

          return data;
        })
        .catch(() => {
          return null;
        });
    }
  }, [item]);

  return (
    <Link href={item.collection?.slug === 'Tangled' ? '' : `/marketplace/${nft?.collection?.slug}/${item.tokenId}`} scroll={false}>
      <a className='link-tag'>
        <div className="card-view-link">
          <div className={cn('img-block', { mine: false })}>
            <a
              className={cn('card-link')}
              onClick={() => {
                if (item.collection?.slug === 'Tangled') {
                  message.info({
                    content: t('NFTOpenMessage', { ns: 'common' }),
                    key: 'toast',
                    className: 'custom-message',
                  });
                }
              }}
            >
              {item.image ? (
                <Image src={item.image} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} />
              ) : (
                <span className={cn('video-wrap')}>
                <video autoPlay loop muted playsInline disablePictureInPicture>
                  <source src={item.videoUrl} type="video/mp4" />
                </video>
              </span>
              )}
              <div className={cn('product-info')}>
                <div className={cn('product-info-top')}>
                  {/* 22.11.11 수정: 시간 양식 수정 */}
                  {item.status === 'auction-start' && <div className={cn('open-time')}>KST {dayjs(item.orderList?.at(0)?.startAt).format()} Open</div>}
                  <div className={cn('product-name')}>{nft?.collection?.name}</div>
                </div>
                <div className={cn('product-info-bottom')}>
                  {(nft.collection?.ownerName || nft.collection?.ownerAddress) && (
                    <dl>
                      <dt>{t('creator', { ns: 'common' })}</dt>
                      <dd>
                        <Avatar size={24} className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} />
                        <span>{nft.collection?.ownerName ?? shorten(nft.collection?.ownerAddress)}</span>
                      </dd>
                    </dl>
                  )}
                  {order?.round === 1 && nft?.collection?.ownerAddress && (
                    <dl>
                      <dt>{t('owner', { ns: 'common' })}</dt>
                      <dd>
                        <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={24} />
                        <span>{nft.collection?.ownerName ?? shorten(nft.collection?.ownerAddress)}</span>
                      </dd>
                    </dl>
                  )}
                  {order?.round === 0 && status === MarketNftItemStatusType.COMPLETE && (
                    <dl>
                      {/* 22.11.11 수정: ': ' 추가 */}
                      <dt>{t('winner', { ns: 'common' })}</dt>
                      <dd>
                        {/* 작가 사진이 들어가면 해당 코드를 넣어주세요 style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} */}
                        <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={24} />
                        <span>{shorten(order?.biddingList?.at(0)?.address)}</span>
                      </dd>
                    </dl>
                  )}
                  {order?.round === 0 && status === MarketNftItemStatusType.CLOSED && nft?.collection?.ownerAddress !== nft?.ownerAddress && (
                    <dl>
                      {/* 22.11.11 수정: ': ' 추가 */}
                      <dt>{t('owner', { ns: 'common' })}</dt>
                      <dd>
                        {/* 작가 사진이 들어가면 해당 코드를 넣어주세요 style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} */}
                        <Avatar size={avatarSize} className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} />
                        <span>{shorten(nft?.ownerAddress) ?? ''}</span>
                      </dd>
                    </dl>
                  )}
                  {/*{item.status === 'auction-ing' && item.bidders && (*/}
                  {/*  <dl>*/}
                  {/*    <dt>{t('bidders', { ns: 'common' })}</dt>*/}
                  {/*    <dd>*/}
                  {/*      <IconBidders style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }} />*/}
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
            </a>
          </div>
          <div className={cn('info-block')}>
            <div className={cn('info-top')}>
              <strong className={cn('product-name')}>{item.name}</strong>
              {/* 22.11.18 수정: 22일 탱글드 히든으로이한 라이크 버튼 히든 */}
              {/*<LikeButton count={item.likeCount} />*/}
            </div>
            <div className={cn('info-bottom')}>
              <dl className="price-info">
                <dt>{priceState(status, item.orderType)}</dt>
                <dd>
                  {itemPrice}
                  {/*{item.price && shorthanded(Number(Web3.utils.fromWei(String(item.price), 'ether')))}*/}
                  {/* 22.11.09 수정: 단위 변경 */}
                  <span className={cn('unit')}>{item.unitFormat ?? getPaymentUnit(item?.orderList?.at(0)?.payment)}</span>
                </dd>
              </dl>
              <dl>{stateTag(status)}</dl>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
