import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { NileApiService } from '@/services/nile/api';
import { useTranslation } from 'next-i18next';
import ContentTitle from '@components/marketplace/ContentTitle';
import MarketplaceProfileCard from '@components/marketplace/MarketplaceProfileCard';
import MarketplaceState from '@components/marketplace/MarketplaceState';
import OutlineButton from '@components/button/OutlineButton';
import ShareButton from '@components/button/ShareButton';
import NileNft from '@/models/nile/marketplace/NileNft';
import { useRouter } from 'next/router';
import Web3 from 'web3';

const PlaceBidPage = ({ nft }: { nft: NileNft }) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const [type, setType] = useState<string>('placeBid');

  const { query } = useRouter();
  const { modalType } = query;

  useEffect(() => {
    if (modalType) {
      setType(String(modalType));
    }
  }, [modalType]);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body />
      </Helmet>
      {
        {
          placeBid: (
            <div className={cn('marketplace-bid-wrap')}>
              {/* 22.10.11 수정: props 명 title로 변경 */}
              <ContentTitle title={t('placeBid', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nft} />
                  <MarketplaceState
                    title={t('bidResultPage.successTitle')}
                    iconValue="success"
                    cont={t('bidResultPage.successDesc')}
                    buttons={
                      <>
                        <OutlineButton
                          buttonText={t('viewNft', { ns: 'common' })}
                          color="black"
                          size="md"
                          href={`/marketplace/${nft.token?.collection?.slug}/${nft.token?.tokenId}`}
                        />
                        <ShareButton buttonType="bgButton" customPath={`/marketplace/${nft.token?.collection?.slug}/${nft.token?.tokenId}`} />
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          ),
          retractingBid: (
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('cancelBid', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nft} />
                  <MarketplaceState
                    iconValue="success"
                    title={t('bidResultPage.cancelTitle')}
                    cont={t('bidResultPage.cancelDesc')}
                    buttons={
                      <>
                        <OutlineButton
                          buttonText={t('viewNft', { ns: 'common' })}
                          color="black"
                          size="md"
                          href={`/marketplace/${nft.token?.collection?.slug}/${nft.token?.tokenId}`}
                        />
                        <OutlineButton buttonText={t('goToMarketplace', { ns: 'common' })} color="black" size="md" href="/marketplace" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          ),
          getBidBack: (
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('getRefund', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nft} />
                  <MarketplaceState
                    iconValue="success"
                    title={t('bidResultPage.refundTitle')}
                    cont={t('bidResultPage.refundDesc')}
                    buttons={
                      <>
                        <OutlineButton
                          buttonText={t('viewNft', { ns: 'common' })}
                          color="black"
                          size="md"
                          href={`/marketplace/${nft.token?.collection?.slug}/${nft.token?.tokenId}`}
                        />
                        <ShareButton buttonType="bgButton" customPath={`/marketplace/${nft.token?.collection?.slug}/${nft.token?.tokenId}`} />
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          ),
          buyNow: (
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('buyNow', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nft} />
                  <MarketplaceState
                    title={t('bidResultPage.purchaseTitle')}
                    iconValue="success"
                    cont={t('bidResultPage.purchaseDesc')}
                    buttons={
                      <>
                        <OutlineButton
                          buttonText={t('viewNft', { ns: 'common' })}
                          color="black"
                          size="md"
                          href={`/marketplace/${nft.token?.collection?.slug}/${nft.token?.tokenId}`}
                        />
                        <ShareButton buttonType="bgButton" customPath={`/marketplace/${nft.token?.collection?.slug}/${nft.token?.tokenId}`} />
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          ),
        }[type]
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['marketplace', 'common']);

  const api = NileApiService();
  const { collectionAddressOrSlug, tokenId } = query;
  const { collectionSlug, collectionAddress } = {
    collectionSlug: Web3.utils.isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
    collectionAddress: Web3.utils.isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
  };

  const nft: NileNft = await api.marketplace.nft
    .getItem({
      collectionSlug,
      collectionAddress,
      tokenId: Number(tokenId),
    })
    .then(({ data }) => data)
    .catch(() => null);

  if (!nft) {
    return {
      notFound: true,
    };
  }

  return { props: { ...translations, nft } };
};

export default PlaceBidPage;
