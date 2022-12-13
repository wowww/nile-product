import cn from 'classnames';
import MarketplaceSubBanner from '@components/marketplace/MarketplaceSubBanner';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import { dataListItem } from '@components/marketplace/MarketplaceSubBannerInfo';
import { useTranslation } from 'next-i18next';
import { windowResizeAtom } from '@/state/windowAtom';
import marketplaceNftList from '@/mocks/marketplace/nft/list.json';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import { useAtomValue } from 'jotai';

type MarketplaceCollectionTabProps = {
  son?: NileCollection;
  lus?: NileCollection;
};

export const MarketPlaceCollectionTab = ({ lus, son }: MarketplaceCollectionTabProps) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const offset = useAtomValue(windowResizeAtom);

  const [tangledList]: NileCollection[] = marketplaceNftList;

  const subBannerInfoList: {
    [key: string]: dataListItem[];
  } = {
    nile: [
      {
        name: 'Next Auction',
        figure: '2022-12-14',
      },
    ],
  };

  return (
    <div className={cn('marketplace-inner')}>
      {/* 22.11.03 수정 start: story, snkrz 추가 */}
      <MarketplaceSubBanner
        collectionSlug={son?.slug}
        salesStatus={`${t('auctionClosed', { ns: 'common' })}`}
        title={son?.name ?? 'Sights of NILE(SON) by Rokkan Kim'}
        collectionLink={`/life/${(son?.slug ?? 'SON').toLowerCase()}`}
        imgUrl={`/images/bg_market_collection_story.png`}
        infoData={subBannerInfoList.nile}
        infoColor="white"
      />

      <div className={cn('marketplace-collections-section')}>
        <MarketplaceCard cardData={son?.items} />
      </div>

      <MarketplaceSubBanner
        collectionSlug={'LUS'}
        salesStatus={`${t('onAuction', { ns: 'common' })}`}
        title={lus?.name ?? 'London Underground Station(LUS) 264 Genesis'}
        nftLink={`/marketplace/${lus?.slug ?? 'LUS'}`}
        collectionLink={`/life/${lus?.slug?.toLowerCase() ?? 'lus'}`}
        imgUrl={`/images/bg_market_collection_lus.png`}
        infoColor="black"
      />
      {
        <div className={cn('marketplace-collections-section')}>
          {/* 22.11.07 수정: TODO nftCardData -> nftCardOpenData 오픈 임시 데이터 변경 */}
          <MarketplaceCard cardData={offset.width < 1280 ? lus?.items?.slice(0, 4) : lus?.items?.slice(0, 6)} />
        </div>
      }

      <MarketplaceSubBanner
        salesStatus={`Unfolding Soon`}
        title={'Tangled Timepieces'}
        collectionLink="/life/tangled"
        imgUrl={`/images/bg_market_collection_tangled.png`}
      />
      <div className={cn('marketplace-collections-section')}>
        {/* 22.11.07 수정: TODO tangledCardData -> tangledCardOpenData 오픈 임시 데이터 변경 */}
        <MarketplaceCard cardData={offset.width < 1280 ? tangledList.items?.slice(0, 2) : tangledList.items?.slice(0, 3)} likeHidden={false} />
      </div>
    </div>
  );
};
