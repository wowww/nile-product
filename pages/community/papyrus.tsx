import React from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PapyrusInfo from '@/components/community/papyrus/PapyrusInfo';
import PapyrusAnchor from '@/components/community/papyrus/PapyrusAnchor';
import PapyrusHeroBanner from '@/components/community/papyrus/PapyrusHeroBanner';
import { useRouter } from 'next/router';

const Papyrus = () => {
  const { locale } = useRouter();
  return (
    <>
      <Helmet>
        <title>Papyrus &gt; Community &gt; NILE</title>
      </Helmet>
      <div className={cn('papyrus-wrap')}>
        <div className={cn('papyrus-hero-banner', locale === 'ko' ? 'ko-banner' : '')}>
          <div className={cn('papyrus-inner')}>
            <PapyrusHeroBanner />
          </div>
        </div>
        <div className={cn('papyrus-container')}>
          <div className={cn('papyrus-inner')}>
            <PapyrusInfo />
          </div>
        </div>
        <div className={cn('papyrus-anchor')}>
          <div className={cn('papyrus-inner')}>
            <PapyrusAnchor />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['community', 'common'])),
    },
  };
};

export default Papyrus;
