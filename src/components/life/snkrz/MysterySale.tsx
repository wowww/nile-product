import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { windowResizeAtom } from '@/state/windowAtom';
import cn from 'classnames';
import { useAtomValue } from 'jotai';

const MysterySale = () => {
  const [size, setSize] = useState('lg');

  const { t } = useTranslation('life');

  const offset = useAtomValue(windowResizeAtom);

  useEffect(() => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  }, [offset.width]);

  return (
    <div className={cn('mystery-box-sale')}>
      <div className={cn('mystery-img')}>
        <video autoPlay loop muted playsInline>
          <source src="/video/snkrz_mystery_box.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={cn('mystery-info')}>
        <div className={cn('mystery-info-text')}>
          <strong className={cn('mystery-info-title')}>{t('snkrz.mystery.sale.title')}</strong>
          <span className={cn('mystery-info-amount')}>{t('snkrz.mystery.sale.amount')}</span>
          <p className={cn('mystery-info-desc')}>{t('snkrz.mystery.sale.desc')}</p>
          <p className={cn('mystery-info-desc')}>{t('snkrz.mystery.sale.desc2')}</p>
        </div>
        <span className={cn('mystery-info-unit')}>
          <em className={cn('mystery-unit')}>30</em>
          {t('snkrz.mystery.sale.unit')}
        </span>
        {/* 22.11.24 수정: 타이머 삭제 */}
        {/* {size === 'lg' && (
          <div className={cn('info-timer')}>
            <span className={cn('info-timer-title')}>Sales starts in</span>
            <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_SNKRZ_START_DATE} />
          </div>
        )} */}
      </div>
      {/* 22.11.24 수정: 타이머 삭제 */}
      {/* {size !== 'lg' && (
        <div className={cn('info-timer')}>
          <span className={cn('info-timer-title')}>Sales starts in</span>
          <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_SNKRZ_START_DATE} />
        </div>
      )} */}
    </div>
  );
};

export default MysterySale;
