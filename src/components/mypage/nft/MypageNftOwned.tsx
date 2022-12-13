import React, { useEffect, useState } from 'react';

import cn from 'classnames';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

import { Select } from 'antd';
import TextButton from '@/components/button/TextButton';
import Empty from '@/components/empty/Empty';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import PaginationCustom from '@/components/button/PaginationCustom';
/* 22.11.21 수정: uid 추가 */
import { NileApiService } from '@/services/nile/api';
import { PageInfoData } from '@components/marketplace/detail/MarketplaceNftTab';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';

const { Option } = Select;

const MypageNftOwned = () => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  const [activatePagination, setPaginationActivate] = useState(1);
  const [isModalNftAlbum, setModalNftAlbum] = useState(false);

  const [pageInfo, setPageInfo] = useState<PageInfoData>();
  const [nftList, setNftList] = useState<any>();
  const api = NileApiService();

  const nileWallet = useAtomValue(nileWalletAtom);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [collection, setCollection] = useState<any>();

  const onChange = (page: number) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    api.mypage.nft
      .getList(nileWallet ?? "", currentPage - 1, 12)
      .then(({ data }) => setNftList(data))
      .catch((err) => {
        return null;
      });
  }, [currentPage]);

  useEffect(() => {
    setPageInfo({
      ...nftList?.pageInfo,
    });
  }, [nftList]);

  return (
    <>
      <div className={cn('mypage-utils owned')}>
        {/*<div className={cn('filters-wrap')}>*/}
        {/*  <MypageFilter />*/}
        {/*</div>*/}
        {/*<div className={cn('utils-wrap')}>*/}
        {/*  <OutlineButton*/}
        {/*    buttonText={t('NFTAlbum')}*/}
        {/*    color="black"*/}
        {/*    size="md"*/}
        {/*    iconType*/}
        {/*    iconValue="album"*/}
        {/*    onClick={() => {*/}
        {/*      setModalNftAlbum(true);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <NftAlbumModal isModal={isModalNftAlbum} setIsModal={setModalNftAlbum} />*/}
        {/*  <Select*/}
        {/*    size="middle"*/}
        {/*    defaultValue={t('recently')}*/}
        {/* 22.11.21 수정: 셀렉트 키값 추가 */}
        {/*    key={Id}*/}
        {/*    suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}*/}
        {/*    popupClassName="select-size-md-dropdown"*/}
        {/*    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}*/}
        {/*  >*/}
        {/*    <Option value="recently">{t('sorting.1')}</Option>*/}
        {/*    <Option value="closing">{t('sorting.2')}</Option>*/}
        {/*    <Option value="recent">{t('sorting.3')}</Option>*/}
        {/*    <Option value="old">{t('sorting.4')}</Option>*/}
        {/*    <Option value="highest">{t('sorting.5')}</Option>*/}
        {/*    <Option value="lowest">{t('sorting.6')}</Option>*/}
        {/*  </Select>*/}
        {/*</div>*/}
      </div>
      <div className={cn('mypage-cards temporary')}>
        <span className={cn('total-num')}>{pageInfo?.total ?? '0'} NFT</span>
        {nftList?.results?.length > 0 ? (
          <>
            <MarketplaceCard cardData={nftList.results} avatarSize={20} />
            {pageInfo && pageInfo.total / pageInfo.size > 1 && (
              <PaginationCustom
                defaultCurrent={currentPage}
                defaultPageSize={pageInfo?.size}
                current={currentPage}
                total={pageInfo?.total}
                onChange={onChange}
                activate={currentPage}
              />
            )}
          </>
        ) : (
          <Empty
            subText={t('empty.ownedNft')}
            button={<TextButton buttonText={t('goToMarketplace', { ns: 'common' })} iconValue="arrow" size="sm" href="/marketplace" type="link" />}
          />
        )}
      </div>
    </>
  );
};

export default MypageNftOwned;
