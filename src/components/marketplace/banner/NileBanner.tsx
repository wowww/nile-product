import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import cn from 'classnames';
import Tag from '@/components/tag/Tag';
import TimeList from '@/components/list/TimeList';
import BgButton from '@/components/button/BgButton';
import { NileCDNLoader } from '@utils/image/loader';

const NileBanner = () => {
  const { t } = useTranslation(['marketplace', 'common']);
  const [state, setState] = useState<'upcoming' | 'auction-start' | 'auction-ing' | 'closed' | 'buy-now' | 'offer-open' | 'offer-ing' | 'not-sale'>(
    'upcoming'
  );
  const stateTag = (state: string) => {
    switch (state) {
      case 'upcoming':
        return (
          <Tag size="md-m" color="black">
            {/* 22.11.21 수정: 영문 유지로 다국어 삭제 */}
            Upcoming
          </Tag>
        );
      case 'auction-start':
        return (
          <Tag type="market" size="md-m" color="negative">
            {/* 22.11.21 수정: 영문 유지로 다국어 삭제 */}
            On Auction
          </Tag>
        );
      case 'auction-ing':
        return (
          <Tag type="market border-none" size="md-m" bg>
            01h : 23m : 33s
          </Tag>
        );
      case 'closed':
        return (
          <Tag size="md-m" color="gray" bg>
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Auction Closed
          </Tag>
        );
      case 'buy-now':
        return (
          <Tag size="md-m" color="black">
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Buy Now
          </Tag>
        );
      case 'offer-open':
        return (
          <Tag size="md-m" color="black">
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Open for Offers
          </Tag>
        );
      case 'offer-ing':
        return (
          <Tag size="md-m" color="black">
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Open for Offers
          </Tag>
        );
      case 'not-sale':
        return (
          <Tag size="md-m" bg disabled>
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Not for Sale
          </Tag>
        );
      default:
        return false;
    }
  };

  const copyEvent = (times: number, image: string) => {
    let newList = [];

    for (let i = 0; i < times; i++) {
      newList.push(image);
    }

    return (
      <>
        {newList.map((item, index) => (
          <div key={`star-${index}`} className={cn('img-box')}>
            <Image src={item} alt="" layout="fill" objectFit="contain" loader={NileCDNLoader} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={cn('marketplace-banner marketplace-banner-type1 nile')}>
      <div className={cn('banner-inner')}>
        <div className={cn('text-wrap')}>
          <div className={cn('title-wrap')}>
            {/* 22.11.17 수정: state 값에 따른 Tag 변환 */}
            {stateTag(state)}
            <p>Sights of NILE(SON)</p>
            <h2>{t('nileBannerTitle')}</h2>
          </div>
          <div className={cn('content-wrap')}>
            <div className={cn('auction-wrap')}>
              {/* 22.11.17 수정: state 값에 따른 내용 변화 */}
              {state === 'upcoming' && (
                <>
                  <strong className={cn('auction-title')}>{t('auctionStartsIn', { ns: 'common' })}</strong>
                  <TimeList target={'2022-12-14 12:00'} />
                  <div className={cn('auction-open')}>
                    <Tag size="s" color="transparent">
                      OPEN
                    </Tag>
                    {/* 22.11.10 수정: 시간 12:00 PM으로 변경 */}
                    <span className={cn('open-time')}>KST 2022-12-14 12:00 PM</span>
                  </div>
                </>
              )}
              {state === 'auction-start' && (
                <div className={cn('auction-price')}>
                  <span className={cn('state')}>{t('Starting Bid', { ns: 'common' })}</span>
                  <strong className={cn('price')}>
                    1,900 <span>WEMIX$</span>
                  </strong>
                </div>
              )}
            </div>
            {state === 'auction-start' && (
              <div className={cn('button-wrap')}>
                <BgButton href="/marketplace/SON/1" buttonText={t('goAuction', { ns: 'common' })} color="white" size="xl" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={cn('banner-bg')}>
        <div className={cn('bg-wrap')}>
          {/* <div className={cn('pyramid-wrap')}>
            <Image src="/assets/images/img/banner/img_nile_pyramid.png" alt="" layout="fill" objectFit="contain" loader={NileCDNLoader} />
          </div> */}
          {/* <span className={cn('star-wrap star1')}>{copyEvent(2, '/assets/images/img/img_nile_star1.png')}</span>
          <span className={cn('star-wrap star2')}>{copyEvent(2, '/assets/images/img/img_nile_star2.png')}</span>
          <span className={cn('star-wrap star3')}>{copyEvent(2, '/assets/images/img/img_nile_star3.png')}</span> */}
        </div>
        {/* <div className={cn('nile-gradient')}></div> */}
      </div>
    </div>
  );
};

export default NileBanner;
