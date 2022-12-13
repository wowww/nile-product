import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
/* 22.11.29 수정: 스와이퍼 적용을 위한 패키지 추가 */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { isAndroid, isIOS } from 'react-device-detect';

import LifeWhoNext from '@/components/life/LifeWhoNext';

import TextButton from '@/components/button/TextButton';
import React, { useMemo, useRef, useState } from 'react';

/* 22.11.29 수정: 스와이퍼 추가를 위한 컴포넌트 추가 */
import LifeSlideImageModal from '@/components/modal/LifeSlideImageModal';

import { ReactSVG } from 'react-svg';
import dayjs from 'dayjs';
import { MarketCountdownText } from '@components/marketplace/countdown/text';
import { useCountdown } from '@utils/countdown';
import moment from 'moment/moment';

interface Time {
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Url {
  [key: string]: string;
}

// 22.11.18 수정: 22일 오픈 컨텐츠 추가
const startBidValue = {
  price: '1,900',
  unit: 'WEMIX$',
};

const LifeNileNfts = () => {
  const { t } = useTranslation(['life', 'common']);
  const targetDate = dayjs(process.env.NEXT_PUBLIC_ENV_NFT_SALE_START_DATE).tz('Asia/Seoul');
  const remainSeconds = useMemo(() => Math.abs(targetDate.diff(dayjs(), 'seconds')), [targetDate]);

  const { remainTime } = useCountdown({ seconds: remainSeconds });

  const remainTimeText = useMemo(() => {
    const time = moment().startOf('day').seconds(remainTime);
    const day = time.days() - 1;
    const days = day >= 10 ? day : `0${day}`;
    return `${days} : ${time.format('HH : mm : ss')}`;
  }, [remainTime]);

  // 22.11.18 수정: 22일 오픈 컨텐츠 추가
  const [startBid, setStartBid] = useState(startBidValue);

  /* 22.11.29 수정: 스와이퍼 추가를 위한 값 추가 */
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperEvt = useRef<any>();

  /* 22.11.29 수정: 슬라이드 이미지(혹은 영상) 클릭 시 모달 노출하는 이벤트 */
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState('');
  const [isVideo, setIsVideo] = useState(false);

  const videoRef_1 = useRef<null | HTMLVideoElement>(null);
  const refList = [videoRef_1];

  const onOpen = (isVideo: boolean, src: string) => {
    // 모바일, 태블릿 기기에서 비디오 팝업 노출하지 않음
    if (isVideo && (isAndroid || isIOS)) {
      return;
    }

    setIsOpen(true);
    setSrc(src);
    setIsVideo(isVideo);

    if (isVideo) {
      refList.map((el) => {
        if (el.current !== null) el.current.pause();
      });
    }
  };

  const snsUrl = {
    rokkan: {
      twitter: 'https://twitter.com/rokkankim?s=20&t=hTVmHm-lknbKSsflD4JSsg',
      instagram: 'https://www.instagram.com/rokkankim/',
    },
    young: {
      homepage: 'https://www.326art.com',
      instagram: 'https://www.instagram.com/youaresoyoungxx/',
    },
  };

  const setSns = (creator: string) => {
    switch (creator) {
      case 'rokkan':
        return (
          <>
            {Object.entries(snsUrl.rokkan).map((item, index) => {
              return (
                <li key={`link${index}`}>
                  <a href={item[1]} target="_blank" rel="noopener noreferrer" title="새창열림">
                    {viewIcon(item[0])}
                  </a>
                </li>
              );
            })}
          </>
        );

      case 'young':
        return (
          <>
            {Object.entries(snsUrl.young).map((item, index) => {
              return (
                <li key={`link${index}`}>
                  <a href={item[1]} target="_blank" rel="noopener noreferrer" title="새창열림">
                    {viewIcon(item[0])}
                  </a>
                </li>
              );
            })}
          </>
        );
    }
  };

  const viewIcon = (iconValue: string) => {
    switch (iconValue) {
      case 'homepage':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_homepage.svg" />;
      case 'twitter':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />;
      case 'instagram':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_instagram.svg" />;
      default:
        return false;
    }
  };

  return (
    <div className={cn('life-nft-wrap')}>
      <Swiper
        autoHeight={true}
        modules={[Navigation]}
        centeredSlides
        slidesPerView="auto"
        speed={300}
        threshold={20}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiperEvt.current = swiper;
        }}
        className={cn('life-swiper')}
        onSlideChange={(swiper) => {
          if (swiper.isEnd) {
            swiper.$wrapperEl.addClass('last-slide');
          } else {
            swiper.$wrapperEl.removeClass('last-slide');
          }
        }}
        initialSlide={1}
        simulateTouch={false}
      >
        <SwiperSlide>
          <div className={cn('life-nft-content')}>
            <h3 className={cn('life-nft-title')}>SON #1</h3>
            <div className={cn('img-wrap')}>
              {/* 22.11.10 수정:  이미지 제거 및 비디오태그 삽입 */}
              <video
                className={cn('video-control')}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls
                controlsList="nodownload nofullscreen"
                ref={videoRef_1}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen(true, '/video/life_sights_of_nile.mp4');
                }}
              >
                <source src="/video/life_sights_of_nile.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={cn('contents-wrap')}>
              <div className={cn('content-header-wrap')}>
                <dl className={cn('content-header')}>
                  <dt className={cn('title')}>{t('nile.nft.piece.title')}</dt>
                  <dd className={cn('info')}>{t('nile.nft.piece.info')}</dd>
                </dl>
              </div>
              <div className={cn('content-inner-wrap')}>
                <div className={cn('content-inner')}>
                  <p className={cn('desc')}>{t('nile.nft.piece.desc')}</p>
                  <TextButton buttonText={t('nile.nft.button')} href="/nile/storydetail" iconValue="line-arrow" gapSpacing="lg" size="md" />
                </div>
                <div className={cn('creator-wrap')}>
                  <div className={cn('creator-name')}>
                    <strong>{t('creator', { ns: 'common' })}</strong>
                    <span>{t('nile.nft.creator.name')}</span>
                  </div>
                  <p className={cn('desc')}>{t('nile.nft.creator.desc')}</p>
                </div>
                <ul className={cn('btn-wrap')}>{setSns('rokkan')}</ul>

                {/* 22.11.10 수정 start: 이력 관련 컨텐츠 추가 */}
                <div className={cn('career-wrap')}>
                  <div className={cn('creator-career-wrap')}>
                    <strong className={cn('title')}>{t('nile.nft.career.title')}</strong>
                    <ul className={cn('career-list-wrap')}>
                      <li>{t('nile.nft.career.list.0')}</li>
                      <li>{t('nile.nft.career.list.1')}</li>
                      <li>{t('nile.nft.career.list.2')}</li>
                      <li>{t('nile.nft.career.list.3')}</li>
                    </ul>
                  </div>

                  <div className={cn('exhibition-career-wrap')}>
                    <strong className={cn('title')}>{t('nile.nft.exhibition.title')}</strong>
                    <div className={cn('exhibition-inner')}>
                      <div className={cn('exhibition-item-wrap')}>
                        <strong className={cn('item-title')}>{t('nile.nft.exhibition.item.0.title')}</strong>
                        <ul className={cn('career-list-wrap')}>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.0.list.0.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.exhibition.item.0.list.0.text')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.0.list.1.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.exhibition.item.0.list.1.text')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.0.list.2.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.exhibition.item.0.list.2.text')}</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className={cn('exhibition-item-wrap')}>
                        <strong className={cn('item-title')}>{t('nile.nft.exhibition.item.1.title')}</strong>
                        <ul className={cn('career-list-wrap')}>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.1.list.0.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.exhibition.item.1.list.0.text')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.1.list.1.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.exhibition.item.1.list.1.text')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.1.list.2.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.exhibition.item.1.list.2.text')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.1.list.3.year')}</span>
                            <span className={cn('text-box')}>
                              <span className="text">{t('nile.nft.exhibition.item.1.list.3.text1')}</span>
                              <span className="text">{t('nile.nft.exhibition.item.1.list.3.text2')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.1.list.4.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.exhibition.item.1.list.4.text')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.exhibition.item.1.list.5.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.exhibition.item.1.list.5.text')}</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 22.11.10 수정 end: 이력 관련 컨텐츠 추가 */}
              </div>
              <div className={cn('life-nft-time', 'bid')}>
                <span className={cn('nft-time')}>
                  {/* 22.11.11 수정: 문구 수정 */}
                  {/* 22.11.18 수정: 22일 오픈 문구 수정 */}
                  {t('lastSale', { ns: 'common' })}
                  {/* <button className={cn('time-notice')} onClick={() => message.info({ content: t('nile.nft.alarm'), key: 'toast' })}>
              <IconNotice />
            </button> */}
                </span>
                {/* 22.11.18 수정 start: 22일 오픈 컨텐츠 수정 */}
                {/* <span className={cn('time')}>
            {convertTime(remain.days())} : {convertTime(remain.hours())} : {convertTime(remain.minutes())} : {convertTime(remain.seconds())}
          </span> */}
                <p className={cn('bid-wrap')}>
                  <span className={cn('price')}>{startBid.price}</span>
                  <span className={cn('unit')}>{startBid.unit}</span>
                </p>
                {/* 22.11.18 수정 end: 22일 오픈 컨텐츠 수정 */}
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cn('life-nft-content')}>
            <h3 className={cn('life-nft-title')}>SON #2</h3>
            <div className={cn('img-wrap')} onClick={() => onOpen(false, '/images/img_sights_of_nile_son2.png')}>
              <Image src={'/images/img_sights_of_nile_son2.png'} layout="responsive" objectFit="contain" height="100%" width="100%" />
            </div>
            <div className={cn('contents-wrap')}>
              <div className={cn('content-header-wrap')}>
                <dl className={cn('content-header')}>
                  <dt className={cn('title')}>{t('nile.nft.2.piece.title')}</dt>
                  <dd className={cn('info')}>{t('nile.nft.2.piece.info')}</dd>
                </dl>
              </div>
              <div className={cn('content-inner-wrap')}>
                <div className={cn('content-inner')}>
                  <p className={cn('desc')}>{t('nile.nft.2.piece.desc')}</p>
                  <p className={cn('desc')}>{t('nile.nft.2.piece.desc2')}</p>
                  <p className={cn('desc')}>{t('nile.nft.2.piece.desc3')}</p>
                  <TextButton buttonText={t('nile.nft.button')} href="/nile/storydetail2" iconValue="line-arrow" gapSpacing="lg" size="md" />
                </div>
                <div className={cn('creator-wrap')}>
                  <div className={cn('creator-name')}>
                    <strong>{t('creator', { ns: 'common' })}</strong>
                    <span>{t('nile.nft.2.creator.name')}</span>
                  </div>
                  <p className={cn('desc')}>{t('nile.nft.2.creator.desc')}</p>
                </div>
                <ul className={cn('btn-wrap')}>{setSns('young')}</ul>

                {/* 22.11.10 수정 start: 이력 관련 컨텐츠 추가 */}
                <div className={cn('career-wrap')}>
                  <div className={cn('creator-career-wrap')}>
                    <strong className={cn('title')}>{t('nile.nft.career.title')}</strong>
                    <ul className={cn('career-list-wrap')}>
                      <li>{t('nile.nft.2.career.list.0')}</li>
                      <li>{t('nile.nft.2.career.list.1')}</li>
                    </ul>
                  </div>

                  <div className={cn('exhibition-career-wrap')}>
                    <strong className={cn('title')}>{t('nile.nft.exhibition.title')}</strong>
                    <div className={cn('exhibition-inner')}>
                      <div className={cn('exhibition-item-wrap')}>
                        <ul className={cn('career-list-wrap')}>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.2.exhibition.item.list.0.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.2.exhibition.item.list.0.text')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.2.exhibition.item.list.1.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.2.exhibition.item.list.1.text')}</span>
                            </span>
                          </li>
                          <li>
                            <span className={cn('year')}>{t('nile.nft.2.exhibition.item.list.2.year')}</span>
                            <span className={cn('text-box')}>
                              <span className={cn('text')}>{t('nile.nft.2.exhibition.item.list.2.text')}</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 22.11.10 수정 end: 이력 관련 컨텐츠 추가 */}
              </div>
              <div className={cn('life-nft-time', 'time')}>
                <span className={cn('nft-time')}>
                  {t('auctionStartsIn', { ns: 'common' })}
                  {/* <button className={cn('time-notice')} onClick={() => message.info({ content: t('nile.nft.alarm'), key: 'toast' })}>
              <IconNotice />
            </button> */}
                </span>

                <span className={cn('time')}>
                  {/* {convertTime(remain.days())} : {convertTime(remain.hours())} : {convertTime(remain.minutes())} : {convertTime(remain.seconds())} */}
                  {remainTimeText}
                  {/*<MarketCountdownText expireTime={remainSeconds} />*/}
                </span>
                {/* <p className={cn('bid-wrap')}>
                  <span className={cn('price')}>{startBid.price}</span>
                  <span className={cn('unit')}>{startBid.unit}</span>
                </p> */}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className={cn('swiper-button-wrap')}>
        <button type="button" ref={prevRef} className={cn('btn-swiper', 'btn-prev')}>
          <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
        <button type="button" ref={nextRef} className={cn('btn-swiper', 'btn-next')}>
          <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      </div>
      {/* 22.11.24 수정: 동영상 관련 속성 삭제 */}
      <LifeWhoNext desc={t('nile.nft.whoNext')} />

      {/* 이미지(비디오) 팝업 */}
      <LifeSlideImageModal isOpen={isOpen} setIsOpen={setIsOpen} src={src} refList={isVideo ? refList : null} isVideo={isVideo} />
    </div>
  );
};

export default LifeNileNfts;
