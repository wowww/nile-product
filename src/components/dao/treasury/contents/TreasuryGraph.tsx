import dynamic from 'next/dynamic';
import cn from 'classnames';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import { ColumnLineMixChartData, PriceHistoryFilterState } from '@/components/chart/chartDummyData';
import { DaoBox, DaoBoxLayout, DaoChartBox } from '@/components/dao/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { useAtom } from 'jotai';

const ColumnLineMixChart = dynamic(() => import('@/components/chart/ColumnLineMixChart'), {
  ssr: false,
});

export const TreasuryGraph = () => {
  const [columnLineMixChartInit, setColumnLineMixChart] = useAtom(ColumnLineMixChartData);
  const [filter, setFilter] = useAtom(PriceHistoryFilterState);
  const { t } = useTranslation('dao');

  const summaryObject = {
    name: t('Treasury now'),
    value: '$ 1,200,000',
  };

  return (
    <div className={cn('treasury-graph-area')}>
      <DaoBoxLayout className="treasury-graph">
        <DaoBox>
          <DaoChartBox title={t('treasury.chart.title')} date="2022-07-01 13:30" summary={summaryObject} className={cn('treasury')}>
            <ChartPeriodTab setFilter={setFilter} defaultValue="week" filterData={['day', 'month', 'year']} />
            <div className={cn('btn-wrap')}>
              <button disabled>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
              </button>
              <button>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
              </button>
            </div>
          </DaoChartBox>
          <ColumnLineMixChart id="column-line-mix-chart" data={columnLineMixChartInit} />
          <ul className={cn('treasury-custom-legend')}>
            <li>{t('treasury.chart.legend.0')}</li>
            <li>{t('treasury.chart.legend.1')}</li>
            <li>{t('treasury.chart.legend.2')}</li>
          </ul>
        </DaoBox>
      </DaoBoxLayout>

      <DaoBoxLayout className="dao-common-card treasury">
        <DaoBox>
          <h4 className={cn('card-title')}>{t('treasury.report.title')}</h4>
          <ul className={cn('card-item-list')}>
            <li className={cn('card-item')}>
              <p className={cn('card-notice')}>{t('treasury.report.item.0')}</p>
              <strong className={cn('card-unit active')}>$8,482,912</strong>
            </li>
            <li className={cn('card-item')}>
              <p className={cn('card-notice')}>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_amount.svg' />
                {t('treasury.report.item.1')}
              </p>
              <strong className={cn('card-unit')}>$8,482,912</strong>
            </li>
            <li className={cn('card-item')}>
              <p className={cn('card-notice outflow')}>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_amount.svg' />
                {t('treasury.report.item.2')}
              </p>
              <strong className={cn('card-unit')}>$8,482,912</strong>
            </li>
          </ul>
        </DaoBox>
      </DaoBoxLayout>
    </div>
  );
};

export default TreasuryGraph;
