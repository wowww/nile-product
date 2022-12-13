import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import OutlineButton from '@components/button/OutlineButton';
import BgButton from '@components/button/BgButton';
import { useTranslation } from 'next-i18next';

interface Props {
  time: 'upcoming' | 'buy-now';
  sellType: 'auction' | 'fixed' | 'raffle';
  downloadLink?: string;
  nftLink?: string;
  tokensLink?: string;
  samePrice?: boolean;
  classNames?: string;
  multiPiece?: boolean;
}

const LifeFloatingBar = ({ time, sellType, downloadLink, nftLink, tokensLink, samePrice, classNames, multiPiece = false }: Props) => {
  const buttonWrap = useRef<null | HTMLDivElement>(null);
  const [buttonCount, setButtonCount] = useState<number>(0);
  const { t } = useTranslation('common');
  // 22.11.02 수정: 다국어 번역으로 인해 시간 변수처리
  const timeline = {
    day: '00',
    hour: '01',
    minutes: '02',
    seconds: '03',
  };

  useEffect(() => {
    if (buttonWrap.current !== null) {
      setButtonCount(buttonWrap.current?.childElementCount);
    }
  }, [buttonWrap.current]);

  return (
    <div className={cn('life-floating-bar', classNames)}>
      <div className={cn('floating-bar-inner', multiPiece ? 'multi-piece' : null)}>
        {!multiPiece && (
          <div className={cn('contents-wrap')}>
            <dl>
              <dt>
                {time === 'upcoming' && (
                  <>
                    {sellType === 'auction' && t('auctionStartIn')}
                    {sellType === 'fixed' && t('salesStartsIn')}
                  </>
                )}

                {time === 'buy-now' && (
                  <>
                    {sellType === 'auction' && t('startingFrom')}
                    {(sellType === 'fixed' || sellType === 'raffle') && (samePrice ? t('fixedPrice') : t('from'))}
                  </>
                )}
              </dt>
              <dd>
                <strong>
                  {/* 22.11.02 수정: 다국어 번역으로 인해 시간 변수처리 */}
                  {time === 'upcoming' && `${timeline.day}d : ${timeline.day}h : ${timeline.minutes}m : ${timeline.seconds}s`}
                  {time === 'buy-now' && '1,900 WEMIX$ '}
                </strong>
                {/* {time === 'upcoming' && (
                  <span className={cn('time-notice')}>
                    <IconNotice />
                  </span>
                )} */}
              </dd>
            </dl>
            {time === 'buy-now' && (
              <>
                {(sellType === 'fixed' || sellType === 'raffle') && (
                  <dl>
                    <dt>
                      {sellType === 'fixed' && t('nFTLeft')}
                      {sellType === 'raffle' && t('salesEndsIn')}
                    </dt>
                    <dd>
                      <strong>
                        {sellType === 'fixed' && '214/1,000'}
                        {/* 22.11.02 수정: 다국어 번역으로 인해 시간 변수처리 */}
                        {sellType === 'raffle' && `${timeline.day}d : ${timeline.day}h : ${timeline.minutes}m : ${timeline.seconds}s`}
                      </strong>
                    </dd>
                  </dl>
                )}
              </>
            )}
          </div>
        )}

        {/* 22.11.09 수정: 버튼 임의 주석 */}
        {/* 22.11.18: 수정: 버튼 주석 활성화 */}
        <div
          className={cn(
            'button-wrap',
            buttonCount === 1 && 'one-button-wrap',
            buttonCount === 2 && 'two-button-wrap',
            buttonCount === 3 && 'three-button-wrap'
          )}
          ref={buttonWrap}
        >
          {downloadLink !== undefined && (
            <OutlineButton buttonText={t('downloadApp')} size="lg-f" color="white" href={downloadLink} target="_blank" />
          )}
          {nftLink !== undefined && <BgButton buttonText={t('goAuction')} size="lg-f" color="white" href={nftLink} />}
          {tokensLink !== undefined && <BgButton buttonText={t('goToTokens')} size="lg-f" color="white" href={tokensLink} />}
        </div>
      </div>
    </div>
  );
};

export default LifeFloatingBar;
