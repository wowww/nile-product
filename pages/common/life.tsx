/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import * as Scroll from 'react-scroll';
import LifeCommunityCard from '@/components/life/LifeCommunityCard';
import LifeTheTeam from '@/components/life/LifeTheTeam';
import TangledMarquee from '@/components/life/tangled/TangledMarquee';
import TangledInformation from '@/components/life/tangled/TangledInformation';
import LifeFloatingBar from '@/components/life/LifeFloatingBar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { windowResizeAtom } from '@/state/windowAtom';
import { useAtomValue } from 'jotai';

// 라이프 카드 임시 데이터
const cardNewsData = [
  {
    image: '/images/img_life_community01.png',
    title: 'Web3 라이브 커뮤니티',
    cont: '사용자는 랜덤 라이브 채팅을 통해 새로운 사용자를 발견하고 대화할 수 있으며, 대화의 보상으로 Time 포인트를 획득할 수 있습니다.',
  },
  {
    image: '/images/img_life_community02.png',
    title: 'NFT',
    cont: '앱에서 획득한 Time 포인트는 사용자의 시계에 저장됩니다.사용자는 인 앱에서 무료로 Basic Watch를 획득해 사용하거나, NFT 마켓에서 NFT Watch를 구매해 사용할 수도 있습니다.',
  },
  {
    image: '/images/img_life_community03.png',
    title: 'TIPO',
    cont: '시계에 저장된 Time 포인트는 앱 내 다양한 소비처에서 사용하거나, 크립토 토큰인 TIPO로 전환해 현금화 할 수 있습니다.',
  },
];

const Common = () => {
  const router = useRouter();

  if (process.env.NODE_ENV === 'production') {
    useEffect(() => {
      router.replace('/');
    }, [router]);

    return null;
  }

  const offset = useAtomValue(windowResizeAtom);
  const [size, setSize] = useState('lg');
  const [sectionLinks, setSectionLinks] = useState<boolean>();
  const sectionLinkAll = useRef<any>([]);

  useEffect(() => {
    const links = document.querySelectorAll('section > h1');
    if (sectionLinks === undefined) {
      links.forEach((link, index) => {
        sectionLinkAll.current[index] = link;
      });
      setSectionLinks(true);
    }
  }, [sectionLinks]);

  useEffect(() => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  }, [offset.width]);
  return (
    <>
      {/*
        * common 파일 작성 법!
        *
        * section 추가시 title id로 링크(Scroll.Link)도 함께 추가 되게 작업 되어 있음
        * 기본 구조
        * <section className={cn('common-section')}>
            <h1 className={cn('common-title')} id="아이디 추가">
              title 추가
            </h1>
            <div>
              * 공지로 작성할 글이 있을때는 common-notice 이용해서 작성
              * li 목록으로 작성하면 되며 strong은 bold, b는 negative 색상, span은 highlight 색상이 추가 되어 있음
              <ul className={cn('common-notice')}>
                <li>공지 1</li>
                <li>공지 2</li>
              </ul>
              * 여기서부터 공통 컴포넌트 작성 div 생성 후 div 안에 작성
              * button, icon, image 같이 일렬로 나열해서 넣을 경우 common-display-flex 클래스 사용
              * sub title을 사용해야 할 경우 이 단계에 추가
              * <h2 className={cn('common-sub-title')}>sub title</h2>
              <div>
                component 추가
                <div className={cn('common-name')}>component name 추가</div>
              </div>
            </div>
          </section>
      */}
      <Helmet>
        <title>Common &gt; NILE &gt; Life</title>
        <body className={cn('common-wrap')} />
      </Helmet>
      <div className={cn('common-content-wrap')}>
        <div className={cn('common-links')}>
          <a href="/common">Common</a>
          <a href="/common/dao">Dao</a>
          <a href="/common/marketplace">Marketplace</a>
          <a href="/common/marketplace2">MarketplaceDetail</a>
          <a href="/common/mypage">Mypage</a>
          <a href="/common/nile">Nile</a>
          <a href="/common/life">Life</a>
        </div>
        <div className={cn('common-links')}>
          {sectionLinks
            ? sectionLinkAll.current?.map((link: HTMLElement, index: number) => {
                return (
                  <Scroll.Link to={link.id} offset={-57} key={`link-${index}`}>
                    {link.textContent}
                  </Scroll.Link>
                );
              })
            : ''}
        </div>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="life-community">
            life-community 영역
          </h1>
          <div style={{ background: 'black' }}>
            <div className={cn('life-community-area')}>
              <LifeCommunityCard data={cardNewsData} />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="life-team">
            The Team 영역
          </h1>
          <div style={{ background: 'black' }}>
            <LifeTheTeam />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Tangled">
            Tangled
          </h1>
          <div style={{ background: 'black' }}>
            <TangledMarquee itemLength={11} type="luxury" />
            <TangledMarquee itemLength={11} type="highend" />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="LifeMoreInfo">
            TangledMoreInfo
          </h1>
          <div style={{ padding: 0 }}>
            <TangledInformation />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="FloatingBar">
            판매 시작 전 Floating
          </h1>
          <div>
            <div>
              <div className={cn('common-name')}>옥션 판매</div>
              <LifeFloatingBar time="upcoming" sellType="auction" downloadLink="/" nftLink="/" tokensLink="/" />
            </div>
            <div>
              <div className={cn('common-name')}>고정가 판매</div>
              <LifeFloatingBar time="upcoming" sellType="fixed" downloadLink="/" nftLink="/" tokensLink="/" />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="FloatingBar2">
            판매 중 Floating
          </h1>
          <div>
            <div>
              <div className={cn('common-name')}>옥션 판매 (버튼 2개)</div>
              <LifeFloatingBar time="buy-now" sellType="auction" downloadLink="/" nftLink="/" />
            </div>
            <div>
              <div className={cn('common-name')}>옥션 판매 (버튼 1개)</div>
              <LifeFloatingBar time="buy-now" sellType="auction" nftLink="/" />
            </div>
            <div>
              <div className={cn('common-name')}>고정가 판매 (콜렉션 내 동일 가격)</div>
              <LifeFloatingBar time="buy-now" sellType="fixed" downloadLink="/" nftLink="/" samePrice />
            </div>
            <div>
              <div className={cn('common-name')}>고정가 판매 (콜렉션 내 다른 가격)</div>
              <LifeFloatingBar time="buy-now" sellType="fixed" downloadLink="/" nftLink="/" />
            </div>
            <div>
              <div className={cn('common-name')}>추첨식 판매 (콜렉션 내 동일 가격)</div>
              <LifeFloatingBar time="buy-now" sellType="raffle" downloadLink="/" nftLink="/" samePrice />
            </div>
            <div>
              <div className={cn('common-name')}>추첨식 판매 (콜렉션 내 다른 가격)</div>
              <LifeFloatingBar time="buy-now" sellType="raffle" downloadLink="/" nftLink="/" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['life', 'common'])),
    },
  };
};

export default Common;
