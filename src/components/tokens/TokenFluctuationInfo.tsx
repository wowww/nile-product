import cn from 'classnames';
import { useTranslation } from 'next-i18next';

// components
import TagFluctuationRate from '../tag/TagFluctuationRate';

interface InfoItemProps {
  name: string;
  figure: string;
  fluctuationRate: number;
}

const TokenFluctuationInfo = () => {
  const { t } = useTranslation(['tokens']);
  const infoList: InfoItemProps[] = [
    {
      name: t('tokenFluctuationInfo.marketCap'),
      figure: '$1.66B',
      fluctuationRate: 9.66,
    },
    {
      name: t('tokenFluctuationInfo.transactions'),
      figure: '$1.66B',
      fluctuationRate: -9.66,
    },
    {
      name: t('tokenFluctuationInfo.volume24h'),
      figure: '$146.46M',
      fluctuationRate: 0,
    },
    {
      name: t('tokenFluctuationInfo.volume7d'),
      figure: '$875.31M',
      fluctuationRate: 9.66,
    },
  ];

  return (
    <div className={cn('fluc-info-box')}>
      <div className={cn('top')}>
        <span className={cn('figure')}>$258.09 </span>
        <TagFluctuationRate figure={9.66} />
      </div>
      <div className={cn('bottom')}>
        {infoList.map((el, idx) => (
          <InfoItem key={el.name} {...el} />
        ))}
      </div>
    </div>
  );
};

const InfoItem: React.FC<InfoItemProps> = ({ name, figure, fluctuationRate }) => {
  return (
    <div className={cn('item')}>
      <span className={cn('info-name')}>{name}</span>
      <span className={cn('figure')}>{figure}</span>
      <TagFluctuationRate figure={fluctuationRate} />
    </div>
  );
};

export default TokenFluctuationInfo;
