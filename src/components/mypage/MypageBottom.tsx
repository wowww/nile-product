import { useRef } from 'react';
import { useTabScroll } from '@/hook/useTabScroll';

import cn from 'classnames';

import { Tabs } from 'antd';
import MypageNft from '@/components/mypage/nft/MypageNft';
import MypageDao from '@/components/mypage/dao/MypageDao';
import { useAtom } from 'jotai';
import { visibleMyPageFilterAtom } from '@/state/filterAtom';
import { myPageTabAtom } from '@/state/tabAtom';

const MypageBottom = () => {
  const myPageBottomRef = useRef<HTMLDivElement>(null);
  const [visibleMyPageFilter, setVisibleMyPageFilter] = useAtom(visibleMyPageFilterAtom);
  const [myPageTab, setMyPageTab] = useAtom(myPageTabAtom);

  const myPageTabs = [
    {
      label: 'DAO',
      key: 'dao',
      children: (
        <div className={cn('mypage-dao')}>
          <MypageDao />
        </div>
      ),
    },
    {
      label: 'NFT',
      key: 'nft',
      children: (
        <div className={cn('mypage-nft')}>
          <MypageNft ref={myPageBottomRef} />
        </div>
      ),
    },
  ];

  return (
    <div className={cn('mypage-bottom-section')} ref={myPageBottomRef}>
      <Tabs
        activeKey={myPageTab}
        className={cn('tab-type tab-lg tab-full')}
        items={myPageTabs}
        onTabClick={(key: string) => {
          useTabScroll(myPageBottomRef.current?.offsetTop);
          setMyPageTab(key);
          setVisibleMyPageFilter(true);
        }}
      />
    </div>
  );
};

export default MypageBottom;
