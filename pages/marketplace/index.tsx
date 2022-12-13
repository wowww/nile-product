import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { Tabs } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import MarketplaceApply from '@/components/marketplace/MarketplaceApply';
import { windowResizeAtom } from '@/state/windowAtom';
import { GetServerSideProps } from 'next';
import { NileApiService } from '@/services/nile/api';
import { MarketPlaceCollectionTab } from '@components/marketplace/detail/MarketplaceCollectionTab';
import { MarketplaceNftTab } from '@components/marketplace/detail/MarketplaceNftTab';
import { useMoveScroll } from '@/hook/useMoveScroll';
import NileCollection, { NileCollectionResult } from '@/models/nile/marketplace/NileCollection';
import { useAtomValue, useAtom } from 'jotai';
import { marketplaceTabAtom } from '@/state/tabAtom';

const Marketplace = () => {
  const offset = useAtomValue(windowResizeAtom);
  const [currentTab, setCurrentTab] = useAtom(marketplaceTabAtom);

  const { t } = useTranslation(['marketplace', 'common']);
  const { element, onMoveToElement } = useMoveScroll();

  const [tabOffsetTop, setTabOffsetTop] = useState<number>(0);

  const api = NileApiService();

  const [lus, setLus] = useState<NileCollectionResult | undefined>();
  const [son, setSon] = useState<NileCollectionResult | undefined>();
  const [secondSon, setSecondSon] = useState<NileCollectionResult | undefined>();

  const lusCollection = useMemo(() => {
    const collection = lus?.result?.collection;
    if (collection) {
      return {
        ...collection,
        items: collection.items?.map((item) => ({ ...item, collection })),
      };
    }
    return undefined;
  }, [lus]);

  const sonCollection: NileCollection | undefined = useMemo(() => {
    const collection = son?.result?.collection;
    const secondCollection = secondSon?.result?.collection;

    if (collection && secondCollection) {
      const son = collection?.items?.map((item) => ({ ...item, collection }));
      const secondSon = secondCollection.items?.map((item) => ({ ...item, collection: secondCollection }))

      const newList = son?.concat(secondSon ?? []);
      return {
        ...collection,
        items: newList,
      };
    }
    return undefined;
  }, [son, secondSon]);

  useEffect(() => {
    api.marketplace.collection
      .getItem(
        {
          slug: 'SON',
        },
        true,
        1
      )
      .then(({ data }) => setSon(data))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem(
        {
          slug: 'SON2',
        },
        true,
        1
      )
      .then(({ data }) => setSecondSon(data))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem(
        {
          slug: 'LUS',
        },
        true,
        6
      )
      .then(({ data }) => setLus(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const marketplaceTabs = [
    {
      label: t('collection'),
      key: 'collection',
      children: <MarketPlaceCollectionTab lus={lusCollection} son={sonCollection} />,
    },
    {
      label: t('nft'),
      key: 'nft',
      children: <MarketplaceNftTab onMoveToElement={onMoveToElement} />,
    },
  ];

  const onTabClick = (activeKey: string, e: any) => {
    if (typeof window !== 'undefined') {
      if (window.pageYOffset > tabOffsetTop + 30) {
        window.scrollTo(0, tabOffsetTop);
      }
    }
    setCurrentTab(activeKey);
  };

  useEffect(() => {
    setTabOffsetTop(element.current?.offsetTop ?? 0);
  }, [offset]);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
      </Helmet>
      <div className={cn('marketplace-wrap')}>
        <MarketplaceHero />
        <div className={cn('marketplace-container')} ref={element}>
          <Tabs defaultActiveKey={currentTab} className={cn('tab-type tab-lg tab-full')} items={marketplaceTabs} onTabClick={onTabClick} />
        </div>
        <MarketplaceApply />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['marketplace', 'common']);
  return { props: { ...translations } };
};

export default Marketplace;
