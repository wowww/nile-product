import dynamic from 'next/dynamic';
import cn from 'classnames';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import { LinChartFilterState } from '@/components/chart/chartDummyData';
import { DaoBox, DaoBoxLayout, DaoChartBox } from '@/components/dao/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { useAtom } from 'jotai';

const DaoLineChart = dynamic(() => import('@/components/chart/DaoLineChart'), {
  ssr: false,
});

export const DaoTrustGraph = () => {
  // const lineChartInit = useAtomValue(daoLineChartData);
  const [filter, setFilter] = useAtom(LinChartFilterState);
  const { t } = useTranslation('dao');

  const summaryObject = {
    name: t('trust.chart.name'),
    value: '5.10',
    unit: '%',
  };

  return (
    <DaoBoxLayout className="ratio">
      <DaoBox>
        <DaoChartBox title={t('trust.chart.name')} date="2022-07-01 13:30" summary={summaryObject}>
          <ChartPeriodTab setFilter={setFilter} defaultValue="week" filterData={['week', 'month', 'year']} />
        </DaoChartBox>
        {/* <DaoLineChart id="trust-line-chart" data={lineChartInit} /> */}
      </DaoBox>
      <DaoBox>
        <div className={cn('dao-common-card')}>
          <h4 className={cn('card-title')}>{t('trust.report.title')}</h4>
          <ul className={cn('card-item-list')}>
            <li className={cn('card-item')}>
              <p className={cn('card-notice')}>{t('trust.report.item.0')}</p>
              <strong className={cn('card-unit active')}>$8,482,912</strong>
            </li>
            <li className={cn('card-item')}>
              <p className={cn('card-notice')}>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_amount.svg' />
                {t('trust.report.item.1')}
              </p>
              <strong className={cn('card-unit')}>$8,482,912</strong>
            </li>
            <li className={cn('card-item')}>
              <p className={cn('card-notice outflow')}>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_amount.svg' />
                {t('trust.report.item.2')}
              </p>
              <strong className={cn('card-unit')}>$8,482,912</strong>
            </li>
            <li className={cn('card-item')}>
              <p className={cn('card-notice')}>{t('trust.report.item.3')}</p>
              <strong className={cn('card-unit')}>$8,482,912</strong>
            </li>
          </ul>
        </div>
      </DaoBox>
    </DaoBoxLayout>
  );
};

export default DaoTrustGraph;
