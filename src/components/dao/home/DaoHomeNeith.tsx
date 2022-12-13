import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useTranslation } from 'next-i18next';
import { message } from 'antd';

import OutlineButton from '@/components/button/OutlineButton';

import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

const DaoHomeNeith = () => {
  const offset = useAtomValue(windowResizeAtom);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation('daoHome');
  const neithList = ['station', 'trust', 'treasury', 'staking', 'furnace', 'governance', 'creator'];

  const neithImage = (neithType: string) => {
    switch (neithType) {
      case 'station':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_station.svg" />;
      case 'trust':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_trust.svg" />;
      case 'treasury':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_treasury.svg" />;
      case 'staking':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_staking_pool.svg" />;
      case 'furnace':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_furnace.svg" />;
      case 'governance':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_governance.svg" />;
      case 'creator':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_creator.svg" />;
      default:
        return false;
    }
  };

  /* 22.11.09 수정 start: 11일 오픈 컨텐츠 수정을 위해 추가 */
  const { i18n } = useTranslation('ko');
  const toast =
    i18n.language === 'en' ? 'Further details on the Neith Protocol will be disclosed soon.' : 'Neith Protocol의 자세한 내용은 추후 공개됩니다.';
  /* 22.11.09 수정 end: 11일 오픈 컨텐츠 수정을 위해 추가 */

  useEffect(() => {
    if (offset.width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [offset.width]);

  return (
    <div className={cn('neith-protocol')}>
      <div className={cn('neith-protocol-container')}>
        <div className={cn('title-wrap')}>
          <h2 className={cn('title-large')}>{t('neith.title')}</h2>
          <p className={cn('title-desc')}>
            <span>{t('neith.desc')}</span>
          </p>
        </div>
        <div className={cn('button-wrap disabled')}>
          {/* 22.11.09 수정: 버튼 사이즈 변경, 클릭 시 토스트 팝업 호출 */}
          <OutlineButton
            buttonText={t('neith.btn1')}
            color="black"
            size="md"
            type="primary"
            onClick={() => message.info({ content: toast, key: 'toast' })}
          />
        </div>

        {!isMobile ? (
          <div className={cn('neith-item-wrap')}>
            {neithList.map((item, idx) => (
              <div key={item} className={cn('neith-item', `item-${item}`)}>
                <div className={cn('item-image')}>{neithImage(item)}</div>
                <dl className={cn('item-desc')}>
                  <dt>{t(`neith.item.${idx}.title`)}</dt>
                  <dd>{t(`neith.item.${idx}.desc`)}</dd>
                </dl>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            className={cn('neith-slider')}
            modules={[Pagination]}
            loop
            centeredSlides
            slidesPerView={1.21}
            speed={300}
            threshold={10}
            pagination={{
              clickable: true,
            }}
            draggable
          >
            {neithList.map((item, idx) => (
              <SwiperSlide key={item}>
                <div className={cn('neith-slider-item')}>
                  <div className={cn('item-image')}>{neithImage(item)}</div>
                  <dl className={cn('item-desc')}>
                    <dt>{t(`neith.item.${idx}.title`)}</dt>
                    <dd>{t(`neith.item.${idx}.desc`)}</dd>
                  </dl>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default DaoHomeNeith;
