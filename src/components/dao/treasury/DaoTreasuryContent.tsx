import React from 'react';
import cn from 'classnames';
import TreasuryGraph from '@/components/dao/treasury/contents/TreasuryGraph';
import TreasuryInformation from '@/components/dao/treasury/contents/TreasuryInformation';
import DaoActivity from '@/components/dao/DaoActivity';
import { DaoBoxTitle } from '@/components/dao/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';

export const DaoTreasuryContent = () => {
  const { t } = useTranslation('dao');
  return (
    <div className={cn('dao-treasury-wrap')}>
      <DaoBoxTitle title={t('treasury.title')} desc={t('treasury.desc')} type="img">
        <div className={cn('img-wrap')}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/img/img_dao_treasury.svg' />
        </div>
      </DaoBoxTitle>
      <TreasuryGraph />
      <div className={cn('treasury-table-area')}>
        <strong className={cn('treasury-table-title')}>{t('treasury.information.title')}</strong>
        <TreasuryInformation />
      </div>

      <div className={cn('treasury-table-area')}>
        <strong className={cn('treasury-table-title')}>{t('treasury.activity.title')}</strong>
        <DaoActivity />
      </div>
    </div>
  );
};

export default DaoTreasuryContent;
