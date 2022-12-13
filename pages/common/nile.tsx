/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import * as Scroll from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import useWindowResize from '@/hook/useWindowResize';
import { windowResizeAtom } from '@/state/windowAtom';

import NileNews from '@/components/nile/NileNews';
import NileStoryCard from '@/components/cards/NileStoryCard';
import ContentTitle from '@/components/marketplace/ContentTitle';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';

// card-news용 임시 데이터

const cardNewsData = [
  {
    image: '/temp/@temp_bagel_news.png',
    ko: {
      title: 'Wemade’s partner Metascale unveils BI for XR Messenger service Bagel',
      cont: 'Metascale, a partner of Wemade, unveiled the XR messenger service Bagel and its brand identity (BI).',
    },
    en: {
      title: 'Wemade’s partner Metascale unveils BI for XR Messenger service Bagel',
      cont: 'Metascale, a partner of Wemade, unveiled the XR messenger service Bagel and its brand identity (BI).',
    },
    date: '2022-10-20',
    link: 'https://medium.com/nile-official/get-hyped-with-the-first-dao-nft-lineup-67ed3a1568ec',
  },
  {
    image: '/temp/@temp_rft_news.png',
    ko: {
      title: 'The First IMO of REFLECT(RFT) Alliance, LUX Completed',
      cont: 'As previously announced, The first REFLECT Alliance IMO(Initial Membership Offering) has taken place through the injection of LUX tokens…',
    },
    en: {
      title: 'The First IMO of REFLECT(RFT) Alliance, LUX Completed',
      cont: 'As previously announced, The first REFLECT Alliance IMO(Initial Membership Offering) has taken place through the injection of LUX tokens…',
    },
    date: '2022-10-20',
    link: 'https://medium.com/nile-official/get-hyped-with-the-first-dao-nft-lineup-67ed3a1568ec',
  },
  {
    image: '/temp/@temp_walk_news.png',
    ko: {
      title: 'WEMIX Investment — SuperWalk',
      cont: 'Wemade Co., Ltd. (CEO Henry Chang) made a strategic investment in an M2E (Move-to-Earn) project SuperWalk. SuperWalk users can exercise and ...',
    },
    en: {
      title: 'WEMIX Investment — SuperWalk',
      cont: 'Wemade Co., Ltd. (CEO Henry Chang) made a strategic investment in an M2E (Move-to-Earn) project SuperWalk. SuperWalk users can exercise and ...',
    },
    date: '2022-10-20',
    link: 'https://medium.com/nile-official/get-hyped-with-the-first-dao-nft-lineup-67ed3a1568ec',
  },
];

const cardPickData = [
  {
    tag: 'NFT',
    imgUrl: '/temp/@temp_pick_thumbnail1.png',
    /* 22.11.11 수정: 문구 수정 */
    pickTitle: 'LUS264\nNile에서 엄선한 첫 번째 Collectible Art Auction',
    pickDescription:
      '‘London Tube’라고 더 많이 알려져 있는 London Underground는 수많은 ‘Londoners’와 여행객이 이용하는 교통수단이자, 그들을 추억의 장소로 연결해 주는 통로입니다. 높이도 넓이도 다른 다양한 크기의 역들을 320px의 정사각형안에 표현한 LUS는 2013년 King’s cross역을 시작으로 2017년 Paddington역까지 약 5년 동안 진행된 장기 프로젝트입니다.',
    buttonType: [
      { buttonText: 'Look Project', link: '/marketplace/nft' },
      {
        buttonText: 'Go Marketplace',
        link: '/marketplace/nft',
      },
    ],
    additionLink: [
      {
        imgUrl: '/temp/@temp_collection_lus.png',
        productTitle: '246: Blackfriars station',
        priceTitle: 'Starting Bid',
        priceValue: '1,200',
        priceUnit: 'WEMIX$',
        statusTag: '',
      },
      {
        imgUrl: '/temp/@temp_collection_lus.png',
        productTitle: '246: Blackfriars Blackfriars station',
        priceTitle: 'Current Bid',
        priceValue: '1,200',
        priceUnit: 'WEMIX$',
        statusTag: '01h : 23m : 33s',
      },
    ],
  },
  {
    tag: 'Life',
    imgUrl: '/temp/@temp_pick_thumbnail2.png',
    pickTitle: ' Web3 생태계의 새로운 Talk to Earn 라이프의 시작, Tangled Timepieces',
    pickDescription:
      'Tangled는 라이브 비디오채팅 기반의 Web3 소셜 앱 입니다. 사용자는 랜덤 라이브 채팅을 통해 새로운 사용자를 발견하고 대화할 수 있으며, 대화의 보상으로 Time 포인트를 획득할 수 있습니다. 앱에서 획득한 Time 포인트는 사용자의 시계에 저장됩니다. ',
    buttonType: [
      { buttonText: 'Look Project', link: '/mypage' },
      {
        buttonText: 'Go Marketplace',
        link: '/marketplace',
      },
    ],
  },
  {
    tag: 'DAO',
    imgUrl: '/temp/@temp_pick_thumbnail3.png',
    pickTitle: ' WONDER DAO로의 초대. WEMIX 블록체인의 토크노믹스, 기술과 정책 결정과정에 참여할 수 있는 방법',
    pickDescription:
      'WEMIX3.0 운영을 위한 Node Council Partner로 구성된 40개의 의사결정 중의 한 자리에 여러분들이 참여할 수 있습니다. WONDER DAO에 참여하는 것은 위믹스 생태계 운영을 위한 중요의사결정에 참여하는 것입니다. ',
    buttonType: [
      {
        buttonText: 'Go DAO',
        link: '/dao',
      },
    ],
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

  const resizeEvtInit = useWindowResize();
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
        <title>Common &gt; NILE &gt; Home</title>
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
          <h1 className={cn('common-title')} id="card">
            Card
          </h1>
          <div>
            <div className={cn('story-card-wrap')}>
              <NileStoryCard
                image="/temp/@temp_sample.jpg"
                tags={[`Walk to Earn`]}
                title="Web3 시대의 새로운 문화 Walk to Earn을 소개합니다Web3 시대의 새로운 문화 Walk to Earn을 소개합니다Web3 시대의 새로운 문화 Walk to Earn을 소개합니다Web3 시대의 새로운 문화 Walk to Earn을 소개합니다."
                content="2021년 Crypto 시장을 뜨겁게 달군 키워드는 'Play to Earn(P2E)' 이었습니다. 말 그대로 '놀면서 돈을 번다'라는 의미로 주로 게임과 접목하여 게임을 할 수록 보상 코인이 지급되는 서비스들을 일컫었습니다. ‘ Walk to Earn’은 말 그대로 '걸을수록 돈을 번다'라는 의미로, 참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해"
                link="#"
                date="2022-10-20"
                work="Rokkan Kim(김종혁), <SON #1 New World>"
                info="2160x2704 MP4 with sound (00:30)"
              />
              <NileStoryCard
                image="/temp/@temp_sample.jpg"
                tags={['Walk to Earn', 'another tag']}
                title="Web3 시대의 새로운 문화 Walk to Earn을 소개합니다."
                content="2021년 Crypto 시장을 뜨겁게 달군 키워드는 'Play to Earn(P2E)' 이었습니다. 말 그대로 '놀면서 돈을 번다'라는 의미로 주로 게임과 접목하여 게임을 할 수록 보상 코인이 지급되는 서비스들을 일컫었습니다. ‘ Walk to Earn’은 말 그대로 '걸을수록 돈을 번다'라는 의미로, 참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해참여자들은 걸으면서 이에 해"
                link="#"
                date="2022-10-20"
                work="Rokkan Kim(김종혁), <SON #1 New World>"
                info="2160x2704 MP4 with sound (00:30)"
              />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="NileCardNews">
            나일홈 뉴스 영역
          </h1>
          <div>
            <ContentTitle title="Latest News" serif href="#" />
            <NileNews newsData={cardNewsData} />
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Pick">
            Pick
          </h1>
          <div>
            <ContentTitle title="Our Choice" serif />
            {/*<NilePick pickData={cardPickData} />*/}
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['nile', 'story', 'common'])),
    },
  };
};

export default Common;
