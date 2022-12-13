import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import DaoHomeHero from '@/components/dao/home/DaoHomeHero';
import DaoHomeCheckMore from '@/components/dao/home/DaoHomeCheckMore';
/* 22.11.02 수정: 전역 데이터 추가 */
import DaosLottie from '@/components/dao/home/DaoHomeLottie';
import DaoHomeType from '@/components/dao/home/DaoHomeType';
import DaoHomeNeith from '@/components/dao/home/DaoHomeNeith';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReactFullpage, { fullpageApi } from '@fullpage/react-fullpage';
import { Footer } from '@components';
import { throttle } from 'lodash';
/* 22.11.08 수정: dao floating 관련 추가 */
import { ReactSVG } from 'react-svg';
import { useAtom, useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import {
  daoThemeAtom,
  setFullPageAllowScrolling,
  setSwiperActiveIdxState,
  setSwiperDirectionState,
} from '@/state/daoAtom';
import { useUpdateAtom } from 'jotai/utils';
import {
  headerVisibleAccountAtom,
  headerVisibleLangAtom,
  headerVisibleMyPageAtom,
  headerVisibleNotificationAtom,
} from '@/state/layoutAtom';

const Dao = () => {
  // 개별 다오 컬러 커스텀을 위한 전역 변수 : default 'wonder' 원더다오
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  const offset = useAtomValue(windowResizeAtom);
  /* 22.11.02 수정 start: 전역 데이터 추가 */
  const [swiperActive, setSwiperActive] = useAtom(setSwiperActiveIdxState);
  const swiperDirection = useAtomValue(setSwiperDirectionState);
  /* 22.11.02 수정 end: 전역 데이터 추가 */
  const [swiperMousewheel, setSwiperMousewheel] = useState<boolean>(false);
  const [allowScrolling, setAllowScrolling] = useAtom(setFullPageAllowScrolling);
  // const [swiperActiveIdx, setSwiperActiveIdx] = useState<number>(0);
  const [sectionTopPageY, setSectionTopPageY] = useState<number>(0);
  const [sectionBottomPageY, setSectionBottomPageY] = useState<number>(0);
  const [fullpageActive, setFullpageActive] = useState<number>(0);
  const [hide, setHide] = useState(false);
  const [isHeaderTop, setIsHeaderTop] = useState(true);
  /* 22.11.08 수정: dao floating 관련 추가 */
  const [scrollBtn, setScrollBtn] = useState<'scroll' | 'top'>('scroll');
  const [footerOffset, setFooterOffset] = useState(0);

  // Header util Modal들 제어용
  const setMyPageVisible = useUpdateAtom(headerVisibleMyPageAtom);
  const setNotificationVisible = useUpdateAtom(headerVisibleNotificationAtom);
  const setLangVisible = useUpdateAtom(headerVisibleLangAtom);
  const setAccountVisible = useUpdateAtom(headerVisibleAccountAtom);

  const fullpage = useRef<fullpageApi>();
  const sectionAll = useRef<any>();
  // const sectionAll = useRef<NodeList>();
  /* 22.11.08 수정: dao floating 관련 추가 */
  const daoTypeRef = useRef<HTMLDivElement>(null);
  const daoFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fullpage.current !== null && fullpage.current !== undefined) {
      fullpage.current.setAllowScrolling(allowScrolling);
    }
  }, [allowScrolling]);

  useEffect(() => {
    sectionAll.current = document.querySelectorAll('.fp-section');
  }, []);

  // 첫번째 section inner scroll 시 헤더 동작
  const headerEvtTop = useMemo(
    () =>
      throttle(() => {
        const sectionYoffset = sectionAll.current[0].querySelector('.fp-overflow').scrollTop;
        const deltaY = sectionYoffset - sectionTopPageY;
        const hide = sectionYoffset >= 60 && deltaY >= 0;
        setHide(hide);
        setSectionTopPageY(sectionYoffset);
        setIsHeaderTop(sectionYoffset <= 60);
      }, 500),
    [sectionTopPageY]
  );

  // 세번째 section inner scroll 시 헤더 동작
  const headerEvtBottom = useMemo(
    () =>
      throttle(() => {
        const sectionYoffset = sectionAll.current[2].querySelector('.fp-overflow').scrollTop;
        const deltaY = sectionYoffset - sectionBottomPageY;
        const hide = deltaY >= 0;
        setHide(hide);
        setSectionBottomPageY(sectionYoffset);
      }, 500),
    [sectionBottomPageY]
  );

  // inner scroll이 생기지 않는 큰 화면 대응 코드
  const setHeightSize = (sections: any, height: number) => {
    sections.forEach((el: HTMLDivElement) => {
      const scrollHeight = el.querySelector('.section-inner')?.scrollHeight ?? 0;
      height >= scrollHeight ? el.classList.add('height-auto') : el.classList.remove('height-auto');
    });
  };

  useEffect(() => {
    sectionAll.current[0] !== undefined && sectionAll.current[0].querySelector('.fp-overflow').addEventListener('scroll', headerEvtTop);
    return () => {
      if (sectionAll.current[0].querySelector('.fp-overflow') !== null) {
        sectionAll.current[0].querySelector('.fp-overflow').removeEventListener('scroll', headerEvtTop);
      }
    };
  }, [sectionTopPageY]);
  useEffect(() => {
    sectionAll.current[2] !== undefined && sectionAll.current[2].querySelector('.fp-overflow').addEventListener('scroll', headerEvtBottom);
    return () => {
      if (sectionAll.current[2].querySelector('.fp-overflow') !== null) {
        sectionAll.current[2].querySelector('.fp-overflow').removeEventListener('scroll', headerEvtBottom);
      }
    };
  }, [sectionBottomPageY]);

  /* 22.11.08 수정: dao floating 추가 */
  useEffect(() => {
    if (daoTypeRef.current === null) return;
    if (daoFooterRef.current === null) return;
    const typeTop = offset.height - daoTypeRef.current.getBoundingClientRect().top - 100;
    // sectionAll.current[2].offsetTop - daoFooterRef.current.offsetTop + daoFooterRef.current.scrollHeight
    const footerTop = offset.height - daoFooterRef.current.getBoundingClientRect().top;

    if (typeTop >= 0) {
      setScrollBtn('top');
      if (footerTop >= 0) {
        setFooterOffset(footerTop);
      } else {
        setFooterOffset(0);
      }
    } else {
      setScrollBtn('scroll');
    }
  }, [sectionBottomPageY, footerOffset]);

  /* 22.11.02 수정 start: 동작 오류 수정 */
  useEffect(() => {
    if (swiperActive === 0) {
      swiperDirection === 'up' && fullpage.current?.moveSectionUp();
    } else if (swiperActive === 5) {
      swiperDirection === 'down' && fullpage.current?.moveSectionDown();
    }
  }, [swiperActive, swiperDirection]);
  /* 22.11.02 수정 end: 동작 오류 수정 */

  /* 22.11.10 수정 start: 라우터 이동 시 풀페이지 오류 방어 코드 */
  useEffect(() => {
    setTimeout(() => {
      fullpage.current?.silentMoveTo('top', 1);
    });
  }, [0]);
  /* 22.11.10 수정 end: 라우터 이동 시 풀페이지 오류 방어 코드 */
  return (
    <>
      <Helmet>
        <title>DAO &gt; NILE</title>
        <body className={cn('dao-main', `fp-viewing-${fullpageActive}`, { 'header-hide': hide }, { 'header-offset-top': isHeaderTop })} />
      </Helmet>
      <div className={cn('dao-home-wrap', `${activeDao.value}-wrap`)}>
        <ReactFullpage
          //fullpage options
          licenseKey={'3K4BI-R3K06-HKP97-J56AH-UNYZO'}
          scrollingSpeed={800} /* Options here */
          scrollOverflow={true}
          onLeave={(origin, destination, direction) => {
            if (origin.index === 0 && direction === 'down') {
              setSwiperActive(1); /* 22.11.02 수정: 전역 데이터로 변경 */
              setHide(true);
              setMyPageVisible(false);
              setNotificationVisible(false);
              setLangVisible(false);
              setAccountVisible(false);
              // swiper in
            } else if (origin.index === 1 && direction === 'up') {
              setSwiperActive(0); /* 22.11.02 수정: 전역 데이터로 변경 */
              // swiper up
            } else if (origin.index === 2 && direction === 'up') {
              setSwiperActive(1); /* 22.11.07 수정: 역방향으로 스크롤 시 첫번째 섹션으로 고정 */
              setHide(true);
              setMyPageVisible(false);
              setNotificationVisible(false);
              setLangVisible(false);
              setAccountVisible(false);
            }
          }}
          afterResize={(width, height) => {
            setHeightSize(sectionAll.current, height);
          }}
          afterLoad={(origin, destination, direction) => {
            setFullpageActive(destination.index);
            if (destination.index === 1) {
              if (fullpage.current !== null) {
                setAllowScrolling(false);
                setIsHeaderTop(false);
              }
            } else {
              setAllowScrolling(true);
              setSwiperMousewheel(true);
            }
            if (destination.index === 0 && direction === 'up') {
              destination.item.classList.contains('height-auto') && setHide(false);
            }
          }}
          render={({ state, fullpageApi }) => {
            fullpage.current = fullpageApi;
            state.initialized && setHeightSize(sectionAll.current, offset.height);
            return (
              <ReactFullpage.Wrapper>
                <div className={cn('section dao-top-section', 'dao-section')} data-anchor="top">
                  <div className={cn('section-inner')}>
                    <DaoHomeHero />
                    <DaoHomeCheckMore />
                  </div>
                </div>
                <div className="section">
                  <DaosLottie swiperMousewheelState={swiperMousewheel} />
                </div>
                <div className={cn('section dao-bottom-section', 'dao-section')}>
                  <div className={cn('section-inner')}>
                    <DaoHomeNeith />
                    <DaoHomeType ref={daoTypeRef} />
                    <Footer ref={daoFooterRef} />
                  </div>
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
        {/* 22.11.08 수정: dao floating 추가 */}
        <div className={cn('dao-floating', `active-${scrollBtn}`)} style={{ transform: `translateY(-${footerOffset}px)` }}>
          <div className={cn('scroll')}>
            <div className={cn('icon')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg" />
            </div>
            <span>SCROLL</span>
          </div>
          <button
            className={cn('top')}
            onClick={() => {
              fullpage.current?.moveTo('top', 1);
              sectionAll.current[0].querySelector('.fp-overflow').scrollTo(0, 0);
              sectionAll.current[2].querySelector('.fp-overflow').scrollTo(0, 0);
              setFooterOffset(0);
            }}
          >
            <div className={cn('icon')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg" />
            </div>
            <span>TOP</span>
          </button>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['daoHome', 'common'])) /* 22.11.02 수정: 다국어 공통 파일 추가 */,
    },
  };
};

export default Dao;
