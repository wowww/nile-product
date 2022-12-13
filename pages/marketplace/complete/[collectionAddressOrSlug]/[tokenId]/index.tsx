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
import { nftCardData } from '@components/marketplace/cardData';
import React from 'react';
import Web3 from 'web3';

const PlaceBidPage = ({ nft }: { nft: NileNft }) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const {
    query: { type, txHash },
  } = useRouter();

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body />
      </Helmet>
      <div className={cn('marketplace-bid-wrap')}>
        <ContentTitle title={t('marketplaceModal.completeCheckout', { ns: 'common' })} />
        <div className={cn('bid-top-section')}>
          <div className={cn('bid-cont-wrap')}>
            <MarketplaceProfileCard cardData={nft} />
            <MarketplaceState
              iconValue="success"
              title={t('bidResultPage.checkoutCompleteTitle')}
              cont={t('bidResultPage.checkoutCompleteDesc')}
              buttons={
                <>
                  <OutlineButton
                    buttonText={t('viewNft', { ns: 'common' })}
                    color="black"
                    size="md"
                    href={`/marketplace/${nft?.token?.collection?.slug}/${nft?.token?.tokenId}`}
                  />
                  <ShareButton buttonType="bgButton" customPath={`/marketplace/${nft.token?.collection?.slug}/${nft?.token?.tokenId}`} />
                </>
              }
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
  const { collectionAddressOrSlug, tokenId } = query;
  const { collectionSlug, collectionAddress } = {
    collectionSlug: Web3.utils.isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
    collectionAddress: Web3.utils.isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
  };

  const nft: NileNft = await api.marketplace.nft
    .getItem({
      collectionAddress: String(collectionAddress),
      collectionSlug: String(collectionSlug),
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
