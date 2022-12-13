import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';

// components
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { IconLogo } from '@components/logo/IconLogo';
import { TinyChartData } from '@/components/chart/tokensChartDummyData';
import { useAtomValue } from 'jotai';

const TinyChart = dynamic(() => import('@/components/chart/TinyChart'), { ssr: false });

const WemixMarketPrice = () => {
  const tinyChartInit = useAtomValue(TinyChartData);

  return (
    <div className={cn('market-price-wrap')}>
      <div className={cn('market-price-inner')}>
        <div className={cn('token-info-box')}>
          <IconLogo type="wemix" size={40} />
          <div className={cn('text-box')}>
            <span className={cn('coin-name')}>WEMIX</span>
            <div className={cn('row')}>
              <span className={cn('figure')}>$2.35</span>
              <TagFluctuationRate figure={9.66} />
            </div>
          </div>
          <div className={cn('chart-area')}>
            <TinyChart dataItems={tinyChartInit} height={46} isPeriod />
          </div>
        </div>
        <div className={cn('token-info-box')}>
          <IconLogo type="wemix$" size={40} />
          <div className={cn('text-box')}>
            <span className={cn('coin-name')}>WEMIX$</span>
            <div className={cn('row')}>
              <span className={cn('figure')}>$999,999.00</span>
              <TagFluctuationRate figure={-3.66} />
            </div>
          </div>
          <div className={cn('chart-area')}>
            <TinyChart dataItems={tinyChartInit} height={46} isPeriod />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WemixMarketPrice;
