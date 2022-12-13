import { forwardRef, useState } from 'react';
import { useTabScroll } from '@/hook/useTabScroll';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

import cn from 'classnames';

import { Tabs } from 'antd';
import MypageNftOwned from '@components/mypage/nft/MypageNftOwned';
import { useUpdateAtom } from 'jotai/utils';
import { visibleMyPageFilterAtom } from '@/state/filterAtom';

const MypageNft = forwardRef(({}, ref: any) => {
  // 22.11.15 수정: useTranslation 추가
  const { t, i18n } = useTranslation(['mypage', 'common']);
  const setFilterOpen = useUpdateAtom(visibleMyPageFilterAtom);
  const [currentNftTab, setCurrentNftTab] = useState<string>('ownedNFT');

  const myPageNftTabs = [
    // {
    //   label: 'Created NFT',
    //   key: 'createdNFT',
    //   children: (
    //     <div className={cn('mypage-inner nft')}>
    //       <MypageNftCreated />
    //     </div>
    //   ),
    // },
    {
      label: 'Owned NFT',
      key: 'ownedNFT',
      children: (
        <div className={cn('mypage-inner nft')}>
          <MypageNftOwned />
        </div>
      ),
    },
    // {
    //   label: 'Favorites',
    //   key: 'favorites',
    //   children: (
    //     <div className={cn('mypage-inner nft')}>
    //       <MypageNftFavorites />
    //     </div>
    //   ),
    // },
    // {
    //   label: 'Activity',
    //   key: 'activity',
    //   children: (
    //     <div className={cn('mypage-inner nft')}>
    //       <MypageNftActivity />
    //     </div>
    //   ),
    // },
  ];

  return (
    <Tabs
      activeKey={currentNftTab}
      className={cn('tab-type', 'tab-round', 'tab-full')}
      animated={false}
      items={myPageNftTabs}
      tabPosition="top"
      onTabClick={(key: string) => {
        useTabScroll(ref.current.offsetTop);
        setCurrentNftTab(key);
        setFilterOpen(true);
      }}
    />

    /* 22.11.15 수정 start: 11/17 오픈 컨텐츠 */
    // <div className={cn('mypage-inner')}>
    //   <Empty
    //     subText={t('header.myMiniPage.noNFT', { ns: 'common' })}
    //     button={<TextButton buttonText={t('goToMarketplace', { ns: 'common' })} iconValue="arrow" size="sm" href="/marketplace" type="link" />}
    //   />
    // </div>
    /* 22.11.15 수정 end: 11/17 오픈 컨텐츠 */
  );
});

export default MypageNft;
