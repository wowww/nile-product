import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { nftCardData } from '@/components/marketplace/cardData';
import { useTranslation } from 'next-i18next';

import MarketplaceProfileCard from '@/components/marketplace/MarketplaceProfileCard';
import MarketplaceState from '@/components/marketplace/MarketplaceState';
import ContentTitle from '@/components/marketplace/ContentTitle';
import OutlineButton from '@/components/button/OutlineButton';
import ShareButton from '@/components/button/ShareButton';

const MarketplaceBid = () => {
  const { t } = useTranslation(['marketplace', 'common']);
  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body />
      </Helmet>
      <div className={cn('marketplace-bid-wrap')}>
        {/* 22.10.11 수정: props 명 title로 변경 */}
        <ContentTitle title={t('placeBid', { ns: 'common' })} />
        <div className={cn('bid-top-section')}>
          <div className={cn('bid-cont-wrap')}>
            <MarketplaceProfileCard cardData={nftCardData[0]} />
            <MarketplaceState
              title={t('bidResultPage.successTitle')}
              iconValue="success"
              cont={t('bidResultPage.successDesc')}
              buttons={
                <>
                  <OutlineButton buttonText={t('viewNft', { ns: 'common' })} color="black" size="md" href="" />
                  <ShareButton buttonType="bgButton" />
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['marketplace', 'common'])),
    },
  };
};

export default MarketplaceBid;
