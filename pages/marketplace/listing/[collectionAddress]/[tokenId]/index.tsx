import React, { useMemo } from 'react';
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

const PlaceListingPage = ({ nft }: { nft: NileNft }) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const state = 'registered';
  /*
   * 'checking': 승인 대기,
   * 'registering': 리스팅 중,
   * 'registered': 완료 확인
   */

  const registeredButton = useMemo(()=> {
    if(String(state) === 'registered') {
      return (
        <>
          <OutlineButton buttonText={t('goToNFTs', { ns: 'common' })} color="black" size="md" href={`/marketplace/${nft.token.collection?.slug}/${nft.token.tokenId}`} />
          <ShareButton buttonType="bgButton" />
        </>
      )
    }
  },[state]);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body />
      </Helmet>

      <div className={cn('marketplace-bid-wrap')}>
        <ContentTitle title={{
            checking:  t('listProcess.waitingForConfirmation.contTitle'),
            registering: t('listProcess.waitingForListing.contTitle'),
            registered: t('listProcess.successfully.contTitle'),
          }[state]}
        />
        <div className={cn('bid-top-section')}>
          <div className={cn('bid-cont-wrap')}>
            <MarketplaceProfileCard cardData={nft} />
            <MarketplaceState
              iconValue={{
                checking: 'loading',
                registering: 'loading',
                registered: 'success'
              }[state]}
              title={{
                checking: t('listProcess.waitingForConfirmation.title'),
                registering: t('listProcess.waitingForListing.title'),
                registered: t('listProcess.successfully.title'),
              }[state]}
              cont={{
                checking: t('listProcess.waitingForConfirmation.desc'),
                registering: t('listProcess.waitingForListing.desc'),
                registered: t('listProcess.successfully.desc'),
              }[state]}
              buttons={registeredButton}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['marketplace', 'common']);

  const api = NileApiService();
  const { collectionAddress, tokenId } = query;

  const nft: NileNft = await api.marketplace.nft.getItem({ collectionAddress: String(collectionAddress), tokenId: Number(tokenId) })
    .then(({ data }) => data)
    .catch(() => null);

  if (!nft) {
    return {
      notFound: true,
    };
  }

  return { props: { ...translations, nft } };
};

export default PlaceListingPage;
