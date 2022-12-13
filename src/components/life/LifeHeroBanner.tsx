import cn from 'classnames';
/* 22.11.09 수정 start: 슬라이드로 히어로 배너 수정 */
import { Swiper, SwiperSlide } from 'swiper/react';

const LifeHeroBanner = () => {
  return (
    <div className={cn('life-hero-banner-wrap')}>
      <Swiper
        // initialSlide={1}
        slidesPerView={1}
        speed={1000}
        threshold={20}
      >
        <SwiperSlide className={cn('life-hero-banner')}>
          <div className={cn('bg-hero')}></div>
          <div className={cn('title-wrap')}>
            {/* 22.11.09 수정 : 문구 변경 */}
            {/* 22.11.11 수정: 문구 변경 */}
            <h2 className={cn('title')}>Life Beyond Expectation</h2>
            <p className={cn('desc')}>
              {/* 22.11.11 수정: 문구 변경 */}
              Enjoy new experiences every day on Life.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
/* 22.11.09 수정 end: 슬라이드로 히어로 배너 수정 */
export default LifeHeroBanner;
