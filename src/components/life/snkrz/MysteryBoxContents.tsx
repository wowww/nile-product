import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';

type ItemImg = {
  imgUrl: string;
};

interface Props {
  imgUrl: string;
  title: string;
  probability: string;
  desc: string;
  item?: ItemImg[];
}

const MysteryBoxContents = () => {
  const { t } = useTranslation(['life', 'common']);

  const [swiperClassName, setSwiperClassName] = useState('first-slide');

  const mysteryBoxContents: Props[] = [
    {
      imgUrl: '/images/img_snkrz_mystery1.png',
      title: t('snkrz.mystery.contents.item.0.title'),
      probability: t('snkrz.mystery.contents.item.0.probability'),
      desc: t('snkrz.mystery.contents.item.0.desc'),
      item: [
        { imgUrl: '/images/img_snkrz_mystery1_1.png' },
        { imgUrl: '/images/img_snkrz_mystery1_2.png' },
        { imgUrl: '/images/img_snkrz_mystery1_3.png' },
        { imgUrl: '/images/img_snkrz_mystery1_4.png' },
        { imgUrl: '/images/img_snkrz_mystery1_5.png' },
      ],
    },
    {
      imgUrl: '/images/img_snkrz_mystery2.png',
      title: t('snkrz.mystery.contents.item.1.title'),
      probability: t('snkrz.mystery.contents.item.1.probability'),
      desc: t('snkrz.mystery.contents.item.1.desc'),
      item: [
        { imgUrl: '/images/img_snkrz_mystery2_1.png' },
        { imgUrl: '/images/img_snkrz_mystery2_2.png' },
        { imgUrl: '/images/img_snkrz_mystery2_3.png' },
        { imgUrl: '/images/img_snkrz_mystery2_4.png' },
        { imgUrl: '/images/img_snkrz_mystery2_5.png' },
      ],
    },
    {
      imgUrl: '/images/img_snkrz_mystery3.png',
      title: t('snkrz.mystery.contents.item.2.title'),
      probability: t('snkrz.mystery.contents.item.2.probability'),
      desc: t('snkrz.mystery.contents.item.2.desc'),
    },
    {
      imgUrl: '/images/img_snkrz_mystery4.png',
      title: t('snkrz.mystery.contents.item.3.title'),
      probability: t('snkrz.mystery.contents.item.3.probability'),
      desc: t('snkrz.mystery.contents.item.3.desc'),
    },
  ];
  return (
    <div className={cn('mystery-contents-wrap')}>
      <div className={cn('title-wrap')}>
        <h3 className="title">{t('snkrz.mystery.contents.title')}</h3>
        <p className={cn('desc')}>{t('snkrz.mystery.contents.desc')}</p>
      </div>
      <ul className="contents-list-wrap">
        {mysteryBoxContents.map((item, index) => {
          return (
            <li key={`list${index}`} className={cn('list', { full: !item.item })}>
              <div className={cn('list-img-wrap')}>
                <Image src={item.imgUrl} alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
              </div>
              <div className={cn('content-inner')}>
                <div className={cn('inner')}>
                  <span className="tag">Option {index + 1}</span>
                  <h4 className={cn('item-title')}>{item.title}</h4>
                  <p className={cn('detail-info')}>
                    <span>{item.probability}</span>
                  </p>
                  <p className={cn('item-desc')}>{item.desc}</p>
                </div>
              </div>
              {item.item && (
                <div className={cn('item-slide-wrap', swiperClassName)}>
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
                    onSlideChange={(swiper: SwiperCore) => {
                      if (swiper.isBeginning) {
                        setSwiperClassName('first-slide');
                      } else if (swiper.isEnd) {
                        setSwiperClassName('last-slide');
                      } else {
                        setSwiperClassName('');
                      }
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 3.3,
                        spaceBetween: 12,
                      },
                      360: {
                        slidesPerView: 3.3,
                        spaceBetween: 12,
                      },
                      768: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                      },
                    }}
                  >
                    {item.item.map((slideItem, slideIndex) => {
                      return (
                        <SwiperSlide key={`slide-item${slideIndex}`}>
                          <div className={cn('img-wrap')}>
                            <Image src={slideItem.imgUrl} alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MysteryBoxContents;
