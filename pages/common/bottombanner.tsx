import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import * as Scroll from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import BottomBanner from '@/components/bottombanner/bottombanner';
import {useRouter} from "next/router";
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const Common = () => {
  const [sectionLinks, setSectionLinks] = useState<boolean>();
  const sectionLinkAll = useRef<any>([]);
  const swiperRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('common');

  const router = useRouter();

  if (process.env.NODE_ENV === 'production') {
    useEffect(() => {
      router.replace('/');
    }, [router]);

    return null;
  }

  const bottomBannerDataList = [
    {
      text: t('bottomBanner.nile', { collection: 'Sights of NILE' }),
      buttonText: t('viewNft'),
      buttonUrl: '/',
    },
    {
      text: t('bottomBanner.begin', { nft: '[NFT 작품명]' }),
      buttonText: '컬렉션 보러가기',
      buttonUrl: '/',
    },
    {
      text: 'LUS 264 Arsenal에서 최고가를 경신하였습니다. 지금 인기있는 NFT를 확인해보세요.',
      buttonText: t('viewNft'),
      buttonUrl: '/',
    },
  ];

  useEffect(() => {
    const links = document.querySelectorAll('section > h1');
    if (sectionLinks === undefined) {
      links.forEach((link, index) => {
        sectionLinkAll.current[index] = link;
      });
      setSectionLinks(true);
    }
  }, [sectionLinks]);

  return (
    <>
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
          <h1 className={cn('common-title')} id="banner">
            하단 배너
          </h1>
          <div>
            <div>
              <div>
                <BottomBanner />
              </div>
              <div style={{ marginTop: '40px' }}>
                <BottomBanner status="guide" buttonText={t('goToGuide')} buttonUrl="/" />
              </div>
              <div style={{ marginTop: '40px' }}>
                <BottomBanner
                  status="onAuction"
                  text={t('bottomBanner.nile', { collection: 'Sights of NILE' })}
                  buttonText={t('viewNft')}
                  buttonUrl="/"
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <BottomBanner
                  status="onAuction"
                  text={t('bottomBanner.soon', { collection: 'LUS 264' })}
                  buttonText={t('aboutThisCollection')}
                  buttonUrl="/marketplace/collection"
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <BottomBanner status="onAuction" text={t('bottomBanner.begin', { nft: '[NFT 작품명]' })} buttonText={t('viewNft')} buttonUrl="/" />
              </div>
              <div style={{ marginTop: '40px' }}>
                <BottomBanner status="onAuction" text={t('bottomBanner.bid')} hasLottie buttonText={t('viewNft')} buttonUrl="/" />
              </div>
              <div style={{ marginTop: '10px' }}>
                <BottomBanner
                  status="onAuction"
                  text={t('bottomBanner.appear', { n: '1', nft: 'LUS 264' })}
                  hasLottie
                  buttonText={t('viewNft')}
                  buttonUrl="/"
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <BottomBanner status="onAuction" text={t('bottomBanner.highest')} hasLottie buttonText={t('viewNft')} buttonUrl="/" />
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="banner">
            하단 배너 슬라이드
          </h1>
          <div>
            <BottomBanner status="onAuction" auctionList={bottomBannerDataList} />
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Common;
