import { useState } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { StackChartData, TinyChartData } from '@/components/chart/tokensChartDummyData';
import { useTranslation } from 'next-i18next';

// components
import RadioTab from '@components/tokens/RadioTab';
import { useAtom } from 'jotai';

const NegativeLineChart = dynamic(() => import('@/components/chart/NegativeLineChart'), { ssr: false });
const BarChart = dynamic(() => import('@/components/chart/BarChart'), { ssr: false });
const FilledLineChart = dynamic(() => import('@/components/chart/FilledLineChart'), { ssr: false });

const DetailChartArea = () => {
  const { t } = useTranslation(['tokens']);
  const [nowTab, setNowTab] = useState<string>('price');
  const tinyChartInit = useAtom(TinyChartData);
  const filledChartInit = useAtom(StackChartData);
  const btnList = [
    {
      name: t('detailChartArea.price'),
      value: 'price',
    },
    {
      name: t('detailChartArea.volume'),
      value: 'volume',
    },
    {
      name: t('detailChartArea.marketCap'),
      value: 'cap',
    },
  ];
  return (
    <div className={cn('chart-area')}>
      <RadioTab btnList={btnList} nowTab={nowTab} setNowTab={setNowTab} />
      {nowTab === 'price' && <NegativeLineChart dataItems={tinyChartInit} />}
      {nowTab === 'volume' && <BarChart dataItems={tinyChartInit} isPeriod />}
      {/* {nowTab === 'cap' && <FilledLineChart data={filledChartInit} />} */}
    </div>
  );
};

export default DetailChartArea;
