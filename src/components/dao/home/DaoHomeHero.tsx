/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useRef } from 'react';
import cn from 'classnames';
import lottie from 'lottie-web';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'next-i18next';
import lottieHeroWonderDao from '@/assets/lottie/lottie_dao_home_wonderdao.json';
import { IconLogo } from '@/components/logo/IconLogo';
/* 22.11.07 수정: 11일 오픈 컨텐츠 수정 */
import Tag from '@/components/tag/Tag';
import TextButton from '@/components/button/TextButton';

const DaoHomeHero = () => {
  const { t } = useTranslation('daoHome');
  const { i18n } = useTranslation('ko');
  // lottie div Element
  const daoLottieHeroWonder = useRef<HTMLDivElement>(null);

  const swiperHero = useRef<HTMLDivElement>(null);

  const swiperEvt = useRef<any>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: daoLottieHeroWonder.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieHeroWonderDao,
    });
  }, []);

  return (
    <div className={cn('hero-banner-section')} ref={swiperHero}>
      <Swiper
        // initialSlide={1}
        slidesPerView={1}
        speed={1000}
        threshold={20}
        onInit={(swiper) => {
          swiperEvt.current = swiper;
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          console.log(swiper.activeIndex, 'active index');
        }}
        onSlidePrevTransitionEnd={(swiper) => {
          //
        }}
        onSlidePrevTransitionStart={(swiper) => {
          //
        }}
        onSlideNextTransitionStart={(swiper) => {
          //
        }}
        onSlideNextTransitionEnd={(swiper) => {
          //
        }}
      >
        <SwiperSlide className={cn('wonder-dao')}>
          <div className={cn('hero-banner-wrap')}>
            {/* 22.11.02 수정 start: 11월 11일 오픈 임시 컨텐츠 */}
            <div className={cn('hero-banner-inner')}>
              <div className={cn('hero-text-container')}>
                <div className={cn('hero-logo')}>
                  <IconLogo type="wonder" size={60} fullType />
                </div>
                <h2>
                  <Tag size="md-m" color="tag-black">
                    Unfolding Soon!
                  </Tag>
                  <strong>WONDER DAO</strong>
                </h2>
                <div className={cn('hero-desc')}>
                  {/* 22.11.10 수정 start: 문구 수정 */}
                  {i18n.language === 'en'
                    ? 'WONDER DAO is one of the 40 WONDERS that expands the WEMIX blockchain ecosystem. Recruiting will begin soon. Stay tuned!'
                    : 'WONDER DAO는 WEMIX 블록체인 생태계 운영을 위한 40개의 WONDERS 중 하나의 권한을 위임받은 DAO입니다. 모집이 곧 시작될 예정입니다. 조금만 기다려주세요!'}
                  {/* 22.11.10 수정 end: 문구 수정 */}
                </div>

                {/* 22.11.10 수정 start: wonder 버튼 추가 */}
                <div className={cn('hero-wonder-btn')}>
                  <TextButton
                    buttonText={i18n.language === 'en' ? 'Browse 40 WONDERS' : '40 WONDERS 살펴보기'}
                    iconValue="line-arrow"
                    gapSpacing="lg"
                    size="md"
                    href={i18n.language === 'en' ? 'https://40wonders.wemix.com/' : 'https://40wonders.wemix.com/?lang=ko'}
                    target="_blank"
                  />
                </div>
                {/* 22.11.10 수정 end: wonder 버튼 추가 */}

                <div className={cn('hero-dashboard')}>
                  <div className={cn('hero-dash-column')}>
                    {i18n.language === 'en' ? (
                      <>
                        <span>Recruitment Schedule</span>
                        <strong>Unfolding Soon</strong>
                      </>
                    ) : (
                      <>
                        <span>모집 시작일</span>
                        <strong>오픈 예정</strong>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={cn('hero-lottie')} ref={daoLottieHeroWonder} />
            </div>
            {/* 22.11.02 수정 end: 11월 11일 오픈 임시 컨텐츠 */}

            {/* dao 오픈 컨텐츠 */}
            {/* <div className={cn('hero-banner-inner')}>
              <div className={cn('hero-text-container')}>
                <div className={cn('hero-logo')}>
                  <IconLogo type="wonder" size={60} fullType />
                </div>
                <h2>
                  <span>{t('hero.item.0.title1')}</span>
                  <strong>{t('hero.item.0.title2')}</strong>
                </h2>
                <div className={cn('hero-desc')}>{t('hero.item.0.desc')}</div>
                <div className={cn('hero-dashboard')}>
                  <div className={cn('hero-dash-column')}>
                    <span>{t('hero.item.0.station1')}</span>
                    <strong>{t('hero.item.0.station2')}</strong>
                  </div>
                  <div className={cn('hero-dash-column')}>
                    <span>{t('hero.item.0.member1')}</span>
                    <strong>{t('hero.item.0.member2')}</strong>
                  </div>
                </div>
                <div className={cn('hero-button-wrap')}>
                  <OutlineButton buttonText={t('hero.item.0.btn1')} color="white" size="lg" />
                </div>
              </div>
              <div className={cn('hero-lottie')} ref={daoLottieHeroWonder} />
            </div> */}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DaoHomeHero;
