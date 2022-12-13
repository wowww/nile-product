import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import lottie from 'lottie-web';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import lottieLusAuction from '@/assets/lottie/lottie_lus_auction.json';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

interface Props {
  status?: 'default' | 'guide' | 'onAuction';
  text?: string;
  hasLottie?: boolean;
  auctionList?: {
    text: string;
    buttonText?: string;
    buttonUrl?: string;
  }[];
  buttonText?: string;
  buttonUrl?: string;
  target?: string;
  active?: boolean;
}

const BottomBanner: React.FC<Props> = ({ status = 'default', text, hasLottie = false, auctionList, buttonText, buttonUrl = '/', active = false }) => {
  const { t } = useTranslation('common');
  const offset = useAtomValue(windowResizeAtom);
  const lottieContainer = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const swiperEvt = useRef<any>();

  const lottieData = useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: lottieContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieLusAuction,
    });
  }, []);

  const Status = () => {
    switch (status) {
      case 'default':
        return (
          <div className={cn('status', 'default')}>
            <span>WEMIX Mainnet</span>
          </div>
        );
      case 'guide':
        return (
          <div className={cn('status')}>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_question.svg' />
            <span>GUIDE</span>
          </div>
        );
      case 'onAuction':
        return (
          <div className={cn('status', 'live')}>
            <span>On Auction</span>
          </div>
        );
    }
  };
  const Contents = () => {
    switch (status) {
      case 'default':
        return (
          <>
            {offset.width < 360 ? (
              <Marquee gradient={false} delay={0.5}>
                <span>1 WEMIX$ = 0.99 USDC</span>
              </Marquee>
            ) : (
              <>
                <span>1 WEMIX$ = 0.99 USDC</span>
              </>
            )}
          </>
        );
      case 'guide':
        return (
          <>
            {offset.width < 768 ? (
              <Marquee gradient={false} delay={0.5}>
                <span>{t('bottomBanner.guide')}</span>
              </Marquee>
            ) : (
              <span>{t('bottomBanner.guide')}</span>
            )}
            <Button buttonUrl={buttonUrl} buttonText={buttonText} />
          </>
        );
      case 'onAuction':
        if (auctionList) {
          if (auctionList.length > 1) {
            return (
              <Swiper
                direction={'vertical'}
                modules={[Autoplay]}
                loop={true}
                className="my-swiper"
                autoplay={{
                  delay: 5000,
                }}
                onInit={(swiper) => {
                  swiperEvt.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setSelectedIndex(swiper.realIndex);
                }}
                allowTouchMove={false}
              >
                {auctionList.map((item, index) => {
                  if (offset.width < 768) {
                    return (
                      <SwiperSlide key={index}>
                        {index === selectedIndex ? (
                          <Marquee gradient={false} play={index === selectedIndex} delay={0.5}>
                            <span>{item.text}</span>
                          </Marquee>
                        ) : (
                          <span>{item.text}</span>
                        )}

                        <Button buttonUrl={buttonUrl} buttonText={item.buttonText} />
                      </SwiperSlide>
                    );
                  }
                  return (
                    <SwiperSlide key={item.text + '-' + index}>
                      <span>{item.text}</span>
                      <Button buttonUrl={buttonUrl} buttonText={item.buttonText} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            );
          } else if (auctionList.length === 1) {
            return (
              <>
                <span>{auctionList[0].text}</span>;
                <Button buttonUrl={buttonUrl} buttonText={buttonText} />
              </>
            );
          }
        }
        if (offset.width > 767) {
          return (
            <>
              <span>{text}</span>
              <Button buttonUrl={buttonUrl} buttonText={buttonText} />
            </>
          );
        } else {
          return (
            <>
              <Marquee gradient={false} delay={0.5}>
                <span>{text}</span>
              </Marquee>
              <Button buttonUrl={buttonUrl} buttonText={buttonText} />
            </>
          );
        }
    }
  };
  return (
    <div className={cn('bottom-banner-wrap', active && 'active')}>
      <div className={cn('bottom-banner-inner')}>
        {hasLottie && <div ref={lottieContainer} className={cn('lottie')}></div>}
        {Status()}
        <div className={cn('content', !auctionList && (status === 'onAuction' || status === 'guide') ? 'only-one' : '')}>{Contents()}</div>
      </div>
    </div>
  );
};

// 향후 이동 목적지 인자값으로
interface buttonProps {
  buttonUrl?: string | undefined;
  buttonText?: string;
}

const Button = ({ buttonUrl, buttonText }: buttonProps) => {
  return (
    <div className={cn('button-wrap')}>
      {buttonUrl !== undefined ? (
        <Link href={buttonUrl}>
          <a>
            <span>{buttonText}</span>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
          </a>
        </Link>
      ) : (
        <button>
          <span>{buttonText}</span>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
        </button>
      )}
    </div>
  );
};

export default BottomBanner;
