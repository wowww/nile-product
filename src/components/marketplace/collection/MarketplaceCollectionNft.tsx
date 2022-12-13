import React, { useEffect, useMemo, useState } from 'react';

import cn from 'classnames';
/* 22.11.22 수정: 다국어 라이브러리 추가 */
import { useTranslation } from 'next-i18next';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import PaginationCustom from '@/components/button/PaginationCustom';
/* 22.10.06 수정: Empty 컴포넌트 추가 */
import Empty from '@/components/empty/Empty';
import { NileApiService } from '@/services/nile/api';
import { NileCollectionCategory } from '@/models/nile/marketplace/NileCollection';
import { useRouter } from 'next/router';
import { PageInfoData } from '@components/marketplace/detail/MarketplaceNftTab';
import { useAtom } from 'jotai';
import { collectionFilterAtom } from '@/state/filterAtom';

type creatorData = {
  address: string;
  nickname: string;
}

const MarketplaceCollectionNft = ({ slug, onMoveToElement }: { slug?: string, address?: string, onMoveToElement: () => void }) => {
  const { query } = useRouter();
  const [collectionFilter, setCollectionFilter] = useAtom(collectionFilterAtom);
  /* 22.11.22 수정: 다국어 추가 */
  const { t } = useTranslation(['common']);
  const [categories, setCategories] = useState<NileCollectionCategory[]>();
  const [pageInfo, setPageInfo] = useState<PageInfoData>();
  const [collection, setCollection] = useState<any>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [creator, setCreator] = useState<creatorData>();


  const api = NileApiService();
  const onChange = (page: number) => {
    setCurrentPage(page);
    onMoveToElement();
  };

  useEffect(() => {
    api.marketplace.collection.getCategories().then(({ data }) => {
      setCategories(data);
    });

    if (query) {
    }
  }, []);

  useEffect(() => {
    api.marketplace.collection
      .getTokens({ slug }, currentPage - 1, 12)
      .then(({ data }) => {
        setCollection({
          ...data.result,
          items: data.results,
        });

        setPageInfo(data.pageInfo);
      })
      .catch((err) => {
        console.log('error white get nfts', err);
        return null;
      });
  }, [currentPage]);

  useEffect(() => {
    setPageInfo({
      ...collection?.pageInfo,
    });
  }, []);

  useEffect(() => {
    if (collection?.ownerAddress) {
      api.user.account
        .getUserInfo(collection.ownerAddress)
        .then(({ data }) => {
          setCreator({
            address: data.address,
            nickname: data.nickname,
          })
          return data;
        })
        .catch(() => {
          return null;
        });
    }
  }, [collection]);

  const itemList = useMemo(() => {
    return {
      items: collection?.items?.map((item: any) => ({
        ...item,
        collection: {
          slug: collection.slug,
          name: collection.name,
          ownerAddress: collection.ownerAddress,
          ownerName: collection.ownerName,
        },
      })),
    };
  }, [collection]);

  return (
    <>
      {/*<Filter sharedFilter={filter} setSharedFilter={setFilter} categories={categories} />*/}
      <div className={cn('nft-wrap')}>
        {itemList?.items ? (
          <>
            <MarketplaceCard cardData={itemList.items ?? []} />
            <PaginationCustom
              defaultCurrent={currentPage}
              defaultPageSize={12}
              current={currentPage}
              total={pageInfo?.total}
              onChange={onChange}
              activate={currentPage}
            />
          </>
        ) : (
          <Empty subText={t('filterEmptyCase')} />
        )}
        {/* 22.10.06 수정 end: filter 시 리스트 없는 경우 추가 */}
      </div>
    </>
  );
};

export default MarketplaceCollectionNft;
