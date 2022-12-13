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

const MarketplaceBid = () => {
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
          <MarketplaceProfileCard cardData={nftCardData[0]} />
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

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'marketplace'])),
    },
  };
};

export default MarketplaceBid;
