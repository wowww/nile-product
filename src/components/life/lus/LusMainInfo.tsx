/* 22.10.26 수정: useState 추가 */
/* 22.10.27 수정: forwardRef 추가 */
import { forwardRef, useState } from 'react';

import cn from 'classnames';
import Image from 'next/image';

// components
import TimeList from '@/components/list/TimeList';

import { NileCDNLoader } from '@utils/image/loader';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
/* 22.11.17 수정: 버튼 컴포넌트 추가 */
import BgButton from '@/components/button/BgButton';
/* 22.11.17 수정: scroll link 추가 */
import * as Scroll from 'react-scroll';
/* 22.11.17 수정: useRouter 추가 */
import { useRouter } from 'next/router';

/* 22.10.27 수정: forwardRef 추가 */
const LusMainInfo = forwardRef<HTMLDivElement>(({}, ref) => {
  /* 22.10.26 수정: currentState 추가 */
  // 22.11.18 수정 : 22일 3시 오픈 시 주석 표시
  // const [currentState, setCurrentState] = useState<string>('upcoming');
  // 22.11.18 수정 : 22일 3시 오픈 시 주석 활성화
  const [currentState, setCurrentState] = useState<string>('buy-now');
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['life', 'common']);
  /* 22.11.17 수정: locale 추가 */
  const { locale } = useRouter();

  const changeButtonText = (state: string) => {
    // 22.11.02 수정 start: 다국어 적용
    switch (state) {
      case 'upcoming':
        return t('goToNFTs', { ns: 'common' });
      case 'buyNow':
        return t('buyNft', { ns: 'common' });
      default:
        return '';
    }
    // 22.11.02 수정 end: 다국어 적용
  };

  return (
    <div className={cn('main-info-wrap')}>
      <div className={cn('main-info-inner')}>
        <div className={cn('contents-area')}>
          <h2>
            LONDON
            <br />
            UNDERGROUND
            <br />
            STATION(LUS)
            <br />
            264 GENESIS
          </h2>
          <div className={cn('artist-info')}>
            <strong>{t('creator', { ns: 'common' })}</strong>
            <div className={cn('artist-name')}>
              <div className={cn('artist-icon-wrap')}>
                {/* 22.11.09 수정: 이미지 속성 수정 */}
                <Image src="/assets/images/icon/ico_lus_artist_border_male.png" layout="fill" alt="Zeeha" quality="100" loading="eager" loader={NileCDNLoader} />
              </div>
              <div className={cn('artist-icon-wrap')}>
                {/* 22.11.09 수정: 이미지 속성 수정 */}
                <Image src="/assets/images/icon/ico_lus_artist_border_female.png" layout="fill" alt="Locho" quality="100" loading="eager" loader={NileCDNLoader} />
              </div>
              <span>Zeeha &amp; Locho</span>
            </div>
            {/* 22.11.02 수정: 오픈 컨텐츠에는 버튼 임의 삭제 */}
            {/* 22.11.17 수정: nft 미리 보기 버튼 추가 */}
            <div className={cn('btn-wrap', locale === 'en' ? 'en' : '')}>
              {/* 22.11.18 수정 : 22일 3시 오픈 시 주석 표기 */}
              {/* <BgButton buttonText={t('lus.btn')} color="black" size="lg" href={`/life/lusdetail`} /> */}
              {/* 22.11.18 수정 : 22일 3시 오픈 시 활성화 */}
              <BgButton buttonText={t('goAuction', { ns: 'common' })} color="black" size="lg" href="/marketplace/LUS"/>
              <div className={cn('only-mo')}></div>
              {/* 22.11.17 수정: 스크롤 이동 버튼 추가 */}
              <Scroll.Link to={'lus_benefit'} className={cn('scroll-btn')}>
                <BgButton buttonText={t('lus.btn1')} color="white" size="lg" />
              </Scroll.Link>
            </div>
            {/* 22.10.26 수정 start: Auction 판매 중 케이스 추가 */}

            {/* Auction 시작 전 */}
            {currentState === 'upcoming' && (
              /* 22.10.27 수정: ref 추가 */
              <div className={cn('lus-time')} ref={ref}>
                <strong>
                  {t('auctionStartIn', { ns: 'common' })}
                  {/* 22.11.09 수정 start: 11일 오픈 시 삭제 */}
                  {/* <button className={cn('time-notice')}>
                    <ReactSVG src="https://file.mir4global.com/nile/resources/images/icon/ico_notice.svg" />
                  </button> */}
                </strong>
                <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_LUS_START_DATE} />
              </div>
            )}

            {/* Auction 판매 중 */}
            {currentState === 'buy-now' && (
              /* 22.10.27 수정: ref 추가 */
              <div className={cn('lus-sale')} ref={ref}>
                <div className={cn('inner')}>
                  <strong className={t('title')}>{t('startingBid', { ns: 'common' })}</strong>
                  <ul>
                    <li>
                      <strong>Red</strong>
                      <span>
                        <span className={cn('price')}>2,200</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                    <li>
                      <strong>Orange</strong>
                      <span>
                        <span className={cn('price')}>1,800</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                    <li>
                      <strong>Yellow</strong>
                      <span>
                        <span className={cn('price')}>1,400</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                    <li>
                      <strong>Green</strong>
                      <span>
                        <span className={cn('price')}>1,100</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                    <li>
                      <strong>Blue</strong>
                      <span>
                        <span className={cn('price')}>750</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* 22.10.26 수정 end: Auction 판매 중 케이스 추가 */}
          </div>
        </div>
      </div>
      <div className={cn('bus-animation-wrap')}>
        <div className={cn('row')}>
          <div className={cn('gif-wrap', 'bus')}>
            <Image src="/images/ico_lus_bus.gif" layout="fill" loader={NileCDNLoader} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LusMainInfo;
