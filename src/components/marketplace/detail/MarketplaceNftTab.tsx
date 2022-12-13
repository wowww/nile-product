import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import Filter from '@components/marketplace/filter';
import IconButton from '@components/button/IconButton';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import PaginationCustom from '@components/button/PaginationCustom';
import Empty from '@components/empty/Empty';
import { useTranslation } from 'next-i18next';
import { NileCollectionCategory } from '@/models/nile/marketplace/NileCollection';
import { NileApiService } from '@/services/nile/api';
import { useAtom, useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import { tokenFilterAtom } from '@/state/filterAtom';

export type PageInfoData = {
  hasNextPage: boolean;
  number: number;
  size: number;
  total: number;
};

export const MarketplaceNftTab = ({ onMoveToElement }: { onMoveToElement: () => void }) => {
  const offset = useAtomValue(windowResizeAtom);
  const { t } = useTranslation(['marketplace', 'common']);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<PageInfoData>();
  const [nftList, setNftList] = useState<any>();

  const api = NileApiService();

  const [filter, setFilter] = useAtom(tokenFilterAtom);
  const [categories, setCategories] = useState<NileCollectionCategory[]>();

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    api.marketplace.nft
      .getList(currentPage - 1, 12, undefined, filter?.sorting, filter?.status)
      .then(({ data }) => {
        setNftList(data);

        return data;
      })
      .catch((err) => {
        console.log('error white get nfts', err);
      });
  }, [currentPage, filter]);

  useEffect(() => {
    setPageInfo({
      ...nftList?.pageInfo,
    });
  }, [nftList]);

  const isMobile = useMemo(() => {
    return offset.width < 768;
  }, [offset]);

  useEffect(() => {
    api.marketplace.collection.getCategories().then(({ data }) => setCategories(data));
  }, []);

  const [toggleView, setToggleView] = useState<boolean>(true);
  const [viewType, setViewType] = useState<string>('list');

  const changeViewAction = (value: string) => {
    setViewType(value);
    value === 'list' ? setToggleView(true) : setToggleView(false);
  };

  const onChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    onMoveToElement();
  };

  return (
    <div className={cn('marketplace-inner filter-type temporary')}>
      <Filter sharedFilter={filter} setSharedFilter={setFilter} categories={categories} />
      <div className={cn('nft-wrap')}>
        <div className={cn('nft-view-change-wrap')}>
          <div className={cn('total-num')}>{pageInfo?.total} NFT</div>
          <div className={cn('view-switch-button-wrap')}>
            {isMobile ? (
              <>
                <IconButton
                  buttonText={t('viewCardType', { ns: 'common' })}
                  size="24"
                  iconValue="cardMo"
                  onClick={() => changeViewAction('list')}
                  activate={toggleView}
                  classnames={cn('view-switch')}
                />
                <IconButton
                  buttonText={t('viewListType', { ns: 'common' })}
                  size="24"
                  iconValue="list"
                  onClick={() => changeViewAction('card')}
                  activate={!toggleView}
                  classnames={cn('view-switch')}
                />
              </>
            ) : (
              <>
                <IconButton
                  buttonText={t('viewListType', { ns: 'common' })}
                  size="24"
                  iconValue="list"
                  onClick={() => changeViewAction('list')}
                  activate={toggleView}
                  classnames={cn('view-switch')}
                />
                <IconButton
                  buttonText={t('viewCardType', { ns: 'common' })}
                  size="24"
                  iconValue="card"
                  onClick={() => changeViewAction('card')}
                  activate={!toggleView}
                  classnames={cn('view-switch')}
                />
              </>
            )}
          </div>
        </div>
        {/* 22.10.06 수정 start: filter 시 리스트 없는 경우 추가 */}
        {nftList?.results.length > 0 ? (
          <div className={cn('marketplace-nft-section')}>
            <MarketplaceCard cardData={nftList?.results} viewType={viewType} />
            <PaginationCustom
              defaultCurrent={currentPage}
              defaultPageSize={12}
              current={currentPage}
              total={pageInfo?.total}
              onChange={onChange}
              activate={currentPage}
            />
          </div>
        ) : (
          <Empty subText={t('filterEmptyCase', { ns: 'common' })} />
        )}
      </div>
    </div>
  );
};
