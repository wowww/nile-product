import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import { Avatar } from 'antd';
import MarketplaceSubBanner from '@/components/marketplace/MarketplaceSubBanner';
import MarketplaceDetailRecommend from '@/components/marketplace/detail/MarketplaceDetailRecommend';
import { PropertyCard } from '@components/marketplace/collection/PropertyCard';
import { useTranslation } from 'next-i18next';
import { useWalletFormatter } from '@utils/formatter/wallet';
import NileNft, { NileNftMetadata } from '@/models/nile/marketplace/NileNft';
import { NileApiService } from '@/services/nile/api';
import { useAtom } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import NileUserAccount from '@/models/nile/user/NileUserAccount';

export type MarketplaceDetailAbout = {
  item?: NileNft;
  metadata?: NileNftMetadata;
  recommends?: any[];
};

type CreatorData = {
  address: string;
  nickname: string;
};

type SnsData = {
  [index: string]: SnsLinkType[];
};

type SnsLinkType = {
  link: string;
  name: string;
  icon: ReactNode;
};

const MarketplaceDetailAbout = ({ item, metadata, recommends }: MarketplaceDetailAbout) => {
  const { i18n, t } = useTranslation('marketplace');
  const { shorten } = useWalletFormatter();
  const api = NileApiService();
  const [userInfo, setUserInfo] = useState<NileUserAccount>();

  const [nileWallet, setNileWallet] = useAtom(nileWalletAtom);

  const snsList: SnsData = useMemo(
    () => ({
      lus: [
        {
          link: 'https://picdotstudio.com',
          name: 'homepage',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_homepage.svg" />,
        },
        {
          link: 'https://twitter.com/PICDOT',
          name: 'twitter',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />,
        },
        {
          link: 'https://www.instagram.com/picdot_studio/',
          name: 'instagram',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_instagram.svg" />,
        },
      ],
      son: [
        {
          link: 'https://twitter.com/rokkankim',
          name: 'twitter',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />,
        },
        {
          link: 'https://www.instagram.com/rokkankim/',
          name: 'instagram',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_instagram.svg" />,
        },
        {
          link: 'https://www.youtube.com/channel/UCd_rQ3v_lftgiKFVgYS2CQg',
          name: 'youtube',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_youtube.svg" />,
        },
      ],
    }),
    [],
  );

  const description = useMemo(() => {
    const result =
      metadata?.description.find(({ language }: any) => language === i18n.language) ??
      metadata?.description.find(({ language }: any) => language === 'en');
    return result?.value;
  }, [metadata, i18n.language]);

  const properties = useMemo(() => {
    return (
      metadata?.attributes?.flatMap(({ type, value }: any) =>
        value.map((name: any) => ({
          type,
          name,
          rarity: 'NFT has this trait',
          collectionAddress: item?.token?.collectionAddress,
        })),
      ) ?? []
    );
  }, [item, metadata]);

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
    [api],
  );

  useEffect(() => {
    getProfile(nileWallet);
  }, []);

  return (
    <>
      <div className={cn('marketplace-about')}>
        <div className={cn('about-item profile')}>
          <strong className={cn('about-title')}>Creator</strong>
          <div className={cn('about-content')}>
            <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={64} />
            <span className={cn('type')}>Creator</span>
            <strong className={cn('name')}>{item?.token?.collection?.ownerName ?? shorten(item?.token?.collection?.ownerAddress)}</strong>
            <ul className={cn('sns-list')}>
              {item?.token?.collection?.slug &&
                snsList[item.token.collection?.slug.toLowerCase()]?.map((item, index: number) => (
                  <li key={`sns-list-${index}`}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" title="새창열림" className={item.name}>
                      {item.icon}
                      <span className={cn('a11y')}>{item.name}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className={cn('about-item')}>
          <strong className={cn('about-title')}>Collection</strong>
          <div className={cn('about-content')}>
            <MarketplaceSubBanner
              salesStatus="on sale"
              title={item?.token?.collection?.name ?? ''}
              buttonLink={item?.token?.collection?.slug !== 'SON2' ? `/life/${item?.token?.collection?.slug.toLowerCase()}` : '/life/son'}
              imgUrl={item?.token?.collection?.featuredImageUrl ?? 'https://nile.blob.core.windows.net/images/images/bg_market_collection_lus.png'}
              /* 22.11.22 수정: 이미지 경로 주석 추가 */
              // tangled : /images/bg_market_collection_tangled.png
              // lus : /images/bg_market_collection_story.png
              buttonText={t('discoverBtn')}
            />
          </div>
        </div>
        <div className={cn('about-item')}>
          {/* 22.10.06 수정: Utility -> Description 텍스트 변경 */}
          <strong className={cn('about-title')}>Description</strong>
          <div className={cn('about-content')}>
            <div className={cn('utility-wrap')}>
              {/* 22.10.06 수정: 텍스트 변경 및 서브텍스트 제거 */}
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className={cn('about-item')}>
          <strong className={cn('about-title')}>Properties</strong>
          <div className={cn('about-content')}>
            <ul className={cn('properties-list')}>
              {properties?.map((property: any, index: any) => (
                <li key={`properties-list-${index}`}>
                  <PropertyCard {...property} slug={item?.token?.collection?.slug} disabled />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <MarketplaceDetailRecommend recommends={recommends} />
    </>
  );
};

export default MarketplaceDetailAbout;
