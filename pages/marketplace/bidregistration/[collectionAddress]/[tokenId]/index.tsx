import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { nftCardData } from '@/components/marketplace/cardData';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MarketplaceProfileCard from '@/components/marketplace/MarketplaceProfileCard';
import ContentTitle from '@/components/marketplace/ContentTitle';
import MarketPlaceListing from '@/components/marketplace/MarketPlaceListing';
/* 22.11.02 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { NileApiService } from '@/services/nile/api';
import NileNft from '@/models/nile/marketplace/NileNft';

type MarketplaceBidProps = {
  nft: NileNft;
}

const MarketplaceBid = ({ data }: { data: MarketplaceBidProps }) => {
  const { t } = useTranslation(['marketplace', 'common']);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body />
      </Helmet>
      <div className={cn('marketplace-listing-wrap')}>
        {/* 22.10.11 수정: props 명 title로 변경 */}
        <ContentTitle title={t('listing.title')} />
        <div className={cn('listing-section')}>
          <MarketplaceProfileCard cardData={data.nft} />
          <MarketPlaceListing
            oneTitle={t('listing.txt')}
            twoTitle={t('listing.txt2')}
            btn={[
              {
                mode: 'BgButton',
                buttonText: t('createListing', { ns: 'common' }),
                color: 'black',
                size: 'md',
                wallet: true,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['marketplace', 'common']);

  const api = NileApiService();
  const { collectionAddress, tokenId } = query;

  const nft: NileNft = await api.marketplace.nft
    .getItem({
      collectionAddress: String(collectionAddress),
      tokenId: Number(tokenId),
    })
    .then(({ data }) => data)
    .catch(() => null);

  if (!nft) {
    return {
      notFound: true,
    };
  }

  return { props: { ...translations, data: { nft } } };
};

export default MarketplaceBid;
