import { forwardRef, useMemo, useState } from 'react';
import cn from 'classnames';

import { Tabs } from 'antd';
import MarketplaceDetailAbout from '@/components/marketplace/detail/MarketplaceDetailAbout';
import MarketplaceDetailHistory from '@/components/marketplace/detail/MarketplaceDetailHistory';
import NileNft, { NileNftMetadata } from '@/models/nile/marketplace/NileNft';
import { useTranslation } from 'next-i18next';

export type MarketplaceDetailBottomProps = {
  item?: NileNft;
  metadata?: NileNftMetadata;
  recommendList: any;
}

const MarketplaceDetailBottom = forwardRef<HTMLDivElement, MarketplaceDetailBottomProps>(({ item, metadata, recommendList }, ref) => {
  /* 22.11.21 수정: currentTab 추가 */
  const [currentTab, setCurrentTab] = useState<string>('about');
  const { t } = useTranslation('')
  const recommends = useMemo(() => {
    return {
      ...(recommendList?.collection ?? {}),
      items: recommendList?.collection?.items?.map((item: any) => ({ ...item, collection: recommendList.collection })) ?? [],
    };
  }, [recommendList]);

  const marketplaceDetailTabs = [
    {
      label: 'About',
      key: 'about',
      children: (
        <div className={cn('marketplace-detail-inner')}>
          <MarketplaceDetailAbout item={item} metadata={metadata} recommends={recommends} />
        </div>
      ),
    },
    {
      label: 'History',
      key: 'history',
      children: (
        <div className={cn('marketplace-detail-inner')}>
          <MarketplaceDetailHistory item={item} />
        </div>
      ),
      disabled: true,
    },
  ];

  return (
    <div className={cn('marketplace-bottom-section')} ref={ref}>
      <Tabs
        activeKey={currentTab}
        className={cn('tab-type tab-lg tab-full')}
        items={marketplaceDetailTabs}
        onTabClick={(key: string) => {
          setCurrentTab(key);
        }}
      />
    </div>
  );
});

export default MarketplaceDetailBottom;
