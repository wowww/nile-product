import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

const SnkrzOverview = () => {
  const { t } = useTranslation('life', { keyPrefix: 'snkrz.overview.list' });

  return (
    <div className={cn('life-snkrz-inner overview')}>
      <div className={cn('snkrz-overview-card')}>
        <div className={cn('img-area')}>
          <Image src='/assets/images/img/img_snkerz_overview_NFT.png' alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
        </div>
        <div className={cn('text-area')}>
          <strong className={cn('card-title')}>{t('1.title')}</strong>
          <p className={cn('content')}>{t('1.text')}</p>
        </div>
      </div>
      <div className={cn('snkrz-overview-card')}>
        <div className={cn('img-area')}>
          <Image src='/assets/images/img/img_snkerz_overview_APP.png' alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
        </div>
        <div className={cn('text-area')}>
          <strong className={cn('card-title')}>{t('2.title')}</strong>
          <p className={cn('content')}>{t('2.text')}</p>
        </div>
      </div>
      <div className={cn('snkrz-overview-card')}>
        <div className={cn('img-area')}>
          <Image src='/assets/images/img/img_snkerz_overview_tokenomics.png' alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
        </div>
        <div className={cn('text-area')}>
          <strong className={cn('card-title')}>{t('3.title')}</strong>
          <ul>
            <li className={cn('mini-card')}>
              <span className={cn('bold')}>{t('3.list.1.title')}</span>
              <span>{t('3.list.1.text')}</span>
            </li>
            <li className={cn('mini-card')}>
              <span className={cn('bold')}>{t('3.list.2.title')}</span>
              <span>{t('3.list.2.text')}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SnkrzOverview;
