import { useState } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'next-i18next';
/* 22.11.04 수정: useRouter 추가 */
import { useRouter } from 'next/router';

// components
import RadioTab from '@/components/tokens/RadioTab';
import { StackChartData, StackedChartData, TinyChartHourData } from '@/components/chart/tokensChartDummyData';
import { useAtomValue } from 'jotai';

// 오픈 전
const StackLineChart = dynamic(() => import('@/components/chart/StackLineChart'), { ssr: false });
// 오픈 후
const StackedLineChart = dynamic(() => import('@/components/chart/StackedLineChart'), { ssr: false });
const BarChartHour = dynamic(() => import('@/components/chart/BarChartHour'), { ssr: false });

const TotalCapValue = () => {
  const { t } = useTranslation('tokens');
  /* 22.11.04 수정: useRouter 추가 */
  const { locale } = useRouter();
  const stackChartInit = useAtomValue(StackChartData);
  const stackedChartInit = useAtomValue(StackedChartData);
  const tinyChartInit = useAtomValue(TinyChartHourData);
  const [nowTab, setNowTab] = useState<string>('cap');
  const TabItems = [
    {
      value: 'cap',
      name: t('totalCapValue.tabItems.cap'),
    },
    {
      value: 'volume',
      name: t('totalCapValue.tabItems.volume'),
    },
  ];

  return (
    <div className={cn('tokens-inner', 'total-cap-value')}>
      <strong className={cn('tokens-header-text')}>
        {2} Token on NILE
        <br />
        are changing our life
      </strong>
      <div className={cn('tokens-overview')}>
        <div className={cn('left')}>
          <RadioTab btnList={TabItems} nowTab={nowTab} setNowTab={setNowTab} />
          <div className={cn('info-wrap')}>
            <strong className={cn('info-name')}>{t('totalCapValue.infoName')}</strong>
            <span className={cn('figure')}>$4,841,012,349</span>
            <span className={cn('date')}>
              {locale === 'ko' ? `2022-08-16 13:53 ${t('totalCapValue.dateText')}` : `${t('totalCapValue.dateText')} 2022-08-16 13:53`}
            </span>
          </div>
        </div>
        <div className={cn('right')}>
          {/* 오픈 전 */}
          {/* {nowTab === 'cap' ? <StackLineChart data={stackChartInit} /> : <BarChart dataItems={tinyChartInit} />} */}
          {/* 오픈 후 */}
          {nowTab === 'cap' ? (
            <StackedLineChart data={stackedChartInit} category={['Total', 'WBNB', 'USDT', 'BUSD', 'etc']} />
          ) : (
            <BarChartHour dataItems={tinyChartInit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalCapValue;
