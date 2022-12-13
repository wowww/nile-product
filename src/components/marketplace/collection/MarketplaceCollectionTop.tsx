import { useEffect, useState } from 'react';
import Image from 'next/image';

import cn from 'classnames';

import Tag from '@/components/tag/Tag';
import BgButton from '@/components/button/BgButton';
import ShareButton from '@/components/button/ShareButton';
import OutlineButton from '@/components/button/OutlineButton';
import { useTranslation } from 'next-i18next';
import CollectionBenefitModal from '@/components/modal/CollectionBenefitModal';
import { NileCDNLoader } from '@utils/image/loader';
import { NileApiService } from '@/services/nile/api';
import { OrderStatType, PriceStatType } from '@components/marketplace/MarketplaceSubBanner';
import Web3 from 'web3';
import { useNumberFormatter } from '@utils/formatter/number';

const MarketplaceCollectionTop = ({ collection }: any) => {
  const api = NileApiService();
  const { t } = useTranslation('marketplace', { keyPrefix: 'collectionPage' });
  const [isCollectionBenefitModal, setCollectionBenefitModal] = useState(false);

  const [orderStat, setOrderStat] = useState<OrderStatType>();
  const [priceStat, setPriceStat] = useState<PriceStatType>();

  const { shorthanded, isValidNumber } = useNumberFormatter();

  useEffect(() => {
    if (collection) {
      api.marketplace.collection
        .getOrderStat(collection.slug)
        .then(({ data }) => {
          setOrderStat(data.result);
        })
        .catch((e) => {
          setOrderStat({
            total: 0,
            ongoing: 0,
            closed: 0,
          });
        });

      api.marketplace.collection
        .getPriceStat(collection.slug)
        .then(({ data }) => {
          setPriceStat(data.result);
        })
        .catch((e) => {
          setPriceStat(undefined);
        });
    }
  }, [collection]);

  return (
    <div className={cn('collection-top-section')}>
      <div className="collection-img-wrap">
        <Image src={collection?.slug === 'LUS' ? '/temp/@temp_collection_represent.png' : ''} alt="" layout="fill" loader={NileCDNLoader} />
      </div>
      <div className={cn('collection-info-wrap')}>
        <h2>{collection?.name}</h2>
        <p>
          {/*description: 값 null로 하드 코딩으로 수정
          {collection?.description}
          */}
          {t('desc')}
        </p>
        <div className={cn('tag-list')}>
          {/*{collection?.categories.map((item: any) => (*/}
          {/*  <Tag size="sm" color="gray" bg>*/}
          {/*    {item}*/}
          {/*  </Tag>*/}
          {/*))}*/}
          <Tag size="sm" color="gray" bg>
            Pixel Art
          </Tag>
        </div>
      </div>
      <div className={cn('collection-data-wrap')}>
        <div>
          <dl>
            <dt>{t('head.data.1')}</dt>
            <dd>{orderStat && orderStat.total}</dd>
          </dl>
          <dl>
            <dt>{t('head.data.2')}</dt>
            <dd>{orderStat && orderStat.ongoing}</dd>
          </dl>
          <dl>
            <dt>{t('head.data.5')}</dt>
            <dd>{orderStat && orderStat.closed}</dd>
          </dl>
        </div>
        <dl>
          <dt>{t('head.data.3')}</dt>
          <dd>
            {priceStat && isValidNumber(priceStat.floorPrice) && shorthanded(Number(Web3.utils.fromWei(String(priceStat.floorPrice ?? "0"), 'ether')))} <span>WEMIX$</span>
          </dd>
        </dl>
        <dl>
          {/* 22.10.06 수정: Total volume -> Total Trading Volume 텍스트 수정 */}
          <dt>{t('head.data.4')}</dt>
          <dd>
            {/* 22.10.06 수정: 소수점 두자리 까지 표기로 변경 */}
            {priceStat && isValidNumber(priceStat.totalPrice) && shorthanded(Number(Web3.utils.fromWei(String(priceStat.totalPrice ?? "0"), 'ether')))} <span>WEMIX$</span>
          </dd>
        </dl>
      </div>
      <div className={cn('collection-utils-wrap')}>
        {/* 22.10.06 수정: href 추가 */}
        <BgButton buttonText={t('head.btn')} color="black" size="md" href={`/life/${collection?.slug.toLowerCase()}`}></BgButton>
        {collection?.slug === 'LUS' && (
          <OutlineButton
            buttonText={t('head.btn2')}
            color="black"
            size="md"
            onClick={() => {
              setCollectionBenefitModal(true);
            }}
          ></OutlineButton>
        )}
        {/*<LikeButton count={collection.likeCount} isLike={collection.favorite}/>*/}
        <ShareButton placement="bottomLeft" telegram facebook />
      </div>
      <CollectionBenefitModal isModal={isCollectionBenefitModal} setIsModal={setCollectionBenefitModal} />
    </div>
  );
};

export default MarketplaceCollectionTop;
