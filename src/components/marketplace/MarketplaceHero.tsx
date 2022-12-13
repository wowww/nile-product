import Image from 'next/image';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import BgButton from '@/components/button/BgButton';
import Tag from '@/components/tag/Tag';
import EvolutionBanner from './banner/EvolutionBanner';
import NileBanner from './banner/NileBanner';
import { NileCDNLoader } from '@utils/image/loader';

const MarketplaceHero = () => {
  const { t } = useTranslation(['marketplace', 'common']);

  const siwperTime = 7; /* 22.11.08 수정 start: 자동 재생 시간 수정 */
  const lusImageList = [
    ['img_A02_Aldgate', 'img_H04_Hampstead', 'img_A09_Arsenal', 'img_B16_Borough'],
    ['img_B08_Bayswater', 'img_B24_Burnt_Oak', 'img_E05_East_Acton', 'img_B10_Belsize_Park'],
    ['img_D03_Dagenham_Heathway', 'img_B22_Bromley_by_Bow', 'img_C19_Cockfosters', 'img_M07_Millhill_East'],
    ['img_G09_Green_Park', 'img_F04_Finchley_Road', 'img_L09_London_Bridge', 'img_M11_Morden'],
    ['img_N05_North_Fields', 'img_R09_Ruislip', 'img_S07_South_Harrow', 'img_S08_South_Wimbledon'],
  ];
  const tangledImageList = [
    ['img_luxury_2', 'img_luxury_25', 'img_luxury_32', 'img_luxury_23'],
    ['img_luxury_17', 'img_luxury_29', 'img_luxury_31', 'img_luxury_33'],
    ['img_luxury_7', 'img_luxury_9', 'img_luxury_8', 'img_luxury_1'],
    ['img_luxury_26', 'img_luxury_06', 'img_luxury_24', 'img_luxury_11'],
    ['img_luxury_15', 'img_luxury_20', 'img_luxury_27', 'img_luxury_28'],
  ];

  const copyEvent = (times: number, list: string[]) => {
    let newList = [];

    for (let i = 0; i < times; i++) {
      newList.push(...list);
    }

    return (
      <>
        {newList.map((list, index) => (
          <div key={`banner-img-${index}`} className={cn('bg-box')}>
            <Image src={`/assets/images/img/banner/${list}.png`} alt="" layout="responsive" width="100%" height="100%" loader={NileCDNLoader} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={cn('marketplace-hero-section')}>
      <Swiper
        className={cn('marketplace-swiper')}
        style={{ '--swiper-time': `${siwperTime}s` } as React.CSSProperties}
        slidesPerView={1}
        speed={1000}
        modules={[Pagination, Autoplay]}
        pagination={{
          // el: '.marketplace-pagination',
          // renderBullet: (index, className) => {
          //   return '<span class="' + className + '"><span class="test"></span></span>';
          // },
          clickable: true,
        }}
        touchStartPreventDefault={false}
        loop={true}
        autoplay={{ delay: siwperTime * 1000, disableOnInteraction: false, waitForTransition: false }}
        onSlideChangeTransitionEnd={(swiper) => {}}
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
        {/* 22.10.24 수정: 슬라이드 유형 추가 */}
        {/* 22.11.10 수정: 11/11 오픈 기준 슬라이드 주석 */}
        {/* 22.11.17 수정: 11/22 오픈 기준 슬라이드 변경 및 순서 변경 */}
        {/* <SwiperSlide className={cn('marketplace-swiper-slide')}>
          <EvolutionBanner />
        </SwiperSlide> */}
        {/* 22.11.17 수정:  배너 순서 변경 */}
        <SwiperSlide className={cn('marketplace-swiper-slide')}>
          <NileBanner />
        </SwiperSlide>
        {/* <SwiperSlide className={cn('marketplace-swiper-slide')}>
          <div className={cn('marketplace-banner marketplace-banner-type1')}>
            <div className={cn('banner-inner')}>
              <div className={cn('text-wrap')}>
                <div className={cn('title-wrap')}>
                  <Tag size="md-m" color="black">
                    {t('upcoming', { ns: 'common' })}
                  </Tag>
                  <p>{t('hero.lus.desc')}</p>
                  <h2>
                    London Underground Station(LUS) <br /> 264 Genesis
                    264 Genesis
                  </h2>
                </div>
                <div className={cn('content-wrap')}>
                  <div className={cn('auction-wrap')}>
                    <strong className={cn('auction-title')}>{t('auctionStartsIn', { ns: 'common' })}</strong>
                     // 22.10.13 수정: TimeList 컴포넌트로 교체
                    <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_LUS_START_DATE} />
                    <div className={cn('auction-open')}>
                      <Tag size="s" color="transparent">
                        OPEN
                      </Tag>
                      // 22.11.10 수정: 시간 12:00 PM으로 변경
                      <span className={cn('open-time')}>KST 2022-11-22 15:00 PM</span>
                    </div>
                  </div>
                  // TODO: 11월 11일 오픈 기준으로 버튼 삭제
                  <div className={cn('button-wrap')}>
                    <BgButton buttonText={t('goToNFTs', { ns: 'common' })} color="white" size="lg" />
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('banner-bg')}>
              <div className={cn('bg-wrap')}>
                {lusImageList.map((images, index) => (
                  <div key={`images-1-${index}`} className={cn('bg-column')}>
                    <div className={cn('bg-rolling')}>{copyEvent(2, images)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>*/}

        {/* TODO: 11월 22일 오픈 기준으로 배너 오픈 */}
        <SwiperSlide className={cn('marketplace-swiper-slide')}>
          <div className={cn('marketplace-banner marketplace-banner-type1')}>
            <div className={cn('banner-inner')}>
              <div className={cn('text-wrap')}>
                <div className={cn('title-wrap')}>
                  <Tag type="market" size="md-m" color="negative">
                    {/* 22.11.21 수정: 영문 유지로 다국어 삭제 */}
                    On Auction
                  </Tag>
                  <p>{t('hero.lus.desc')}</p>
                  <h2>London Underground Station(LUS) 264 Genesis</h2>
                </div>
                <div className={cn('content-wrap')}>
                  <div className={cn('auction-wrap')}>
                    <div className={cn('auction-price')}>
                      <span className={cn('state')}>{t('startingFrom', { ns: 'common' })}</span>
                      <strong className={cn('price')}>
                        750 <span>WEMIX$</span>
                      </strong>
                    </div>
                  </div>
                  <div className={cn('button-wrap')}>
                    <BgButton href="/marketplace/LUS" buttonText={t('goAuction', { ns: 'common' })} color="white" size="xl" />
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('banner-bg')}>
              <div className={cn('bg-wrap')}>
                {lusImageList.map((images, index) => (
                  <div key={`images-1-${index}`} className={cn('bg-column')}>
                    <div className={cn('bg-rolling')}>{copyEvent(2, images)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* TODO: 11월 11일 오픈 기준으로 배너 주석 */}
        {/* <SwiperSlide className={cn('marketplace-swiper-slide')}>
          <div className={cn('marketplace-banner marketplace-banner-type1')}>
            <div className={cn('banner-inner')}>
              <div className={cn('text-wrap')}>
                <div className={cn('title-wrap')}>
                  <Tag size="md-m" color="black">
                    {t('buyNow', { ns: 'common' })}
                  </Tag>
                  <p>{t('hero.lus.desc')}</p>
                  <h2>London Underground Station 264 Genesis</h2>
                </div>
                <div className={cn('content-wrap')}>
                  <div className={cn('auction-wrap')}>
                    <div className={cn('auction-price')}>
                      <span className={cn('state')}>{t('fixedPrice', { ns: 'common' })}</span>
                      <strong className={cn('price')}>
                        1,000,000.0000 <span>WEMIX$</span>
                      </strong>
                    </div>
                  </div>
                  <div className={cn('button-wrap')}>
                    <BgButton buttonText={t('buyNft', { ns: 'common' })} color="white" size="lg" />
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('banner-bg')}>
              <div className={cn('bg-wrap')}>
                {lusImageList.map((images, index) => (
                  <div key={`images-1-${index}`} className={cn('bg-column')}>
                    <div className={cn('bg-rolling')}>{copyEvent(2, images)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide> */}
        {/* TODO: 11월 11일 오픈 기준으로 배너 주석 */}
        {/* <SwiperSlide className={cn('marketplace-swiper-slide')}>
          <div className={cn('marketplace-banner marketplace-banner-type1')}>
            <div className={cn('banner-inner')}>
              <div className={cn('text-wrap')}>
                <div className={cn('title-wrap')}>
                  <Tag size="md-m" color="black">
                    {t('upcoming', { ns: 'common' })}
                  </Tag>
                  <p>{t('hero.tangled.desc')}</p>
                  <h2>Tangled Timepieces</h2>
                </div>
                <div className={cn('content-wrap')}>
                  <div className={cn('auction-wrap')}>
                    <strong className={cn('auction-title')}>∂{t('startIn', { ns: 'common' })}</strong>
                    <TimeList time={{ day: 1, hours: 21, minutes: 32, seconds: 48 }} />
                    <div className={cn('auction-open')}>
                      <Tag size="s" color="transparent">
                        OPEN
                      </Tag>
                      <span className={cn('open-time')}>{locale === 'ko' ? 'KST 2022-12-01 12:00 PM' : '2022-12-01 12:00 PM KST'}</span>
                    </div>
                  </div>
                  <div className={cn('button-wrap')}>
                    <BgButton buttonText={t('goToNFTs', { ns: 'common' })} color="white" size="lg" />
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('banner-bg')}>
              <div className={cn('bg-wrap')}>
                {tangledImageList.map((images, index) => (
                  <div key={`images-2-${index}`} className={cn('bg-column')}>
                    <div className={cn('bg-rolling')}>{copyEvent(2, images)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide> */}
        {/* TODO: 11월 11일 오픈 기준으로 배너 주석 */}
        {/* <SwiperSlide className={cn('marketplace-swiper-slide')}>
          <div className={cn('marketplace-banner marketplace-banner-type2')}>
            <div className={cn('banner-inner')}>
              <div className={cn('text-wrap')}>
                <div className={cn('title-wrap')}>
                  <Tag size="md-m" color="black">
                    {t('buyNow', { ns: 'common' })}
                  </Tag>
                  <h2>
                    #024 :<br />
                    Wimbledon Park
                  </h2>
                  <p>London Underground Station 264 Genesis</p>
                </div>
                <div className={cn('content-wrap')}>
                  <dl className={cn('price-wrap')}>
                    <dt>{t('fixedPrice', { ns: 'common' })}</dt>
                    <dd>
                      12,985,234 <span className={cn('unit')}>WEMIX$</span>
                    </dd>
                  </dl>
                  <div className={cn('button-wrap')}>
                    <BgButton buttonText={t('buyNow', { ns: 'common' })} color="white" size="lg" />
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('banner-bg img-type')}>
              <div className={cn('bg-wrap')}>
                <div className={cn('img-wrap')}>
                  <Image src={ImgA02Aldgate} alt="" layout="responsive" quality="100" loading="eager" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
        {/* TODO: 11월 11일 오픈 기준으로 배너 주석 */}
        {/* <SwiperSlide className={cn('marketplace-swiper-slide')}>
          <div className={cn('marketplace-banner marketplace-banner-type2')}>
            <div className={cn('banner-inner')}>
              <div className={cn('text-wrap')}>
                <div className={cn('title-wrap')}>
                  <Tag size="md-m" color="black">
                    {t('openForOffers', { ns: 'common' })}
                  </Tag>
                  <h2>
                    #024 :<br />
                    Wimbledon Park
                  </h2>
                  <p>London Underground Station 264 Genesis London Underground Station 264 Genesis</p>
                </div>
                <div className={cn('content-wrap')}>
                  <dl className={cn('price-wrap')}>
                    <dt>{t('lastSale', { ns: 'common' })}</dt>
                    <dd>
                      12,985,234 <span className={cn('unit')}>WEMIX$</span>
                    </dd>
                  </dl>
                  <div className={cn('button-wrap')}>
                    <BgButton buttonText={t('makeOffer', { ns: 'common' })} color="white" size="lg" />
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('banner-bg bg-type')} style={{ backgroundColor: '#FFCD9E' }}>
              <div className={cn('bg-wrap')}>
                <div className={cn('img-wrap')}>
                  <Image src={ImgLuxury02} alt="" layout="responsive" quality="100" loading="eager" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
        {/* <div className={cn('marketplace-pagination')}></div> */}
      </Swiper>
    </div>
  );
};

export default MarketplaceHero;
