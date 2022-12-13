import cn from 'classnames';

import { Tabs } from 'antd';

import MarketplaceCollectionNft from '@/components/marketplace/collection/MarketplaceCollectionNft';
import MarketplaceCollectionActivity from '@/components/marketplace/collection/MarketplaceCollectionActivity';
import { useMoveScroll } from '@/hook/useMoveScroll';

const MarketplaceCollectionBottom = ({ slug, address }: { slug?: string, address?: string, }) => {
  const { element, onMoveToElement } = useMoveScroll();

  const marketplaceDetailTabs = [
    {
      label: 'NFT',
      key: 'nft',
      children: (
        <div className={cn('collection-inner filter-type temporary')}>
          <MarketplaceCollectionNft slug={slug} address={address} onMoveToElement={onMoveToElement} />
        </div>
      ),
    },
    {
      label: 'Activity',
      key: 'activity',
      children: (
        <div className={cn('collection-inner')}>
          <MarketplaceCollectionActivity />
        </div>
      ),
      disabled: true,
    },
  ];

  return (
    <div className={cn('collection-bottom-section')} ref={element}>
      <Tabs defaultActiveKey="about" className={cn('tab-type tab-lg tab-full')} items={marketplaceDetailTabs} />
    </div>
  );
};

export default MarketplaceCollectionBottom;
