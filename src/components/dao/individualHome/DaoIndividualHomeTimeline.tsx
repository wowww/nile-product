import { ReactElement, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Timeline } from 'antd';

import Tag from '@/components/tag/Tag';
import { ReactSVG } from 'react-svg';

interface protocolListProps {
  name: string;
  new: boolean;
  img: ReactElement;
  amount?: string;
  newCount?: number;
}

const DaoIndividualHomeTimeline = () => {
  const protocolList: protocolListProps[] = [
    { name: 'Station', new: true, newCount: 12, img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_station.svg" /> },
    { name: 'Treasury', new: true, newCount: 12, img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_treasury.svg" />, amount: '120,293,482' },
    { name: 'Trust', new: true, newCount: 12, img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_trust.svg" /> },
    { name: 'Furnace', new: true, newCount: 12, img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_furnace.svg" /> },
    { name: 'Staking Pool', new: true, newCount: 12, img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_staking_pool.svg" /> },
    { name: 'Governance', new: true, newCount: 12, img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_governance.svg" /> },
  ];
  const { t } = useTranslation('dao');

  const [isProtocol, setProtocol] = useState<string>('');

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setProtocol(target.value);
  };

  return (
    <div className={cn('dao-box-wrap full dao-timeline')}>
      <div className={cn('dao-box')}>
        <div className={cn('title-wrap')}>
          <h2 className={cn('title')}>{t('individualHome.timeline.title')}</h2>
          <p className={cn('desc')}>{t('individualHome.timeline.desc')}</p>
        </div>
        <div className={cn('dao-timeline-wrap')}>
          <ul className={cn('protocol-list')}>
            {protocolList.map((item) => (
              <li
                key={item.name}
                className={cn(
                  'protocol-item',
                  item.name.split(' ').join('-').toLocaleLowerCase(),
                  isProtocol === item.name.split(' ').join('-').toLocaleLowerCase() && 'active',
                  item.name === 'Treasury' && 'protocol-item-lg',
                  (item.name === 'Trust' || item.name === 'Furnace') && 'protocol-item-md'
                )}
              >
                <button type="button" value={item.name.split(' ').join('-').toLocaleLowerCase()} onClick={handleButton}>
                  <span className={cn('protocol-name')}>{item.name}</span>
                  {item.new && (
                    <Tag size="s" type="primary">
                      {item.newCount}
                    </Tag>
                  )}
                  {item.amount && (
                    <div className={cn('amount-wrap')}>
                      <span className={cn('unit')}>$</span>
                      <span className={cn('amount')}>{item.amount}</span>
                    </div>
                  )}
                  {item.img}
                </button>
              </li>
            ))}
          </ul>
          <div className={cn('timeline')}>
            <Timeline>
              <Timeline.Item>
                <div className={cn('timeline-wrap')}>
                  <div className={cn('timeline-tit-wrap')}>
                    <strong className={cn('timeline-tit')}>Treasury</strong>
                    <span className={cn('timeline-date')}>2022-07-01 13:30:04</span>
                    <Tag size="xs" color="positive">
                      NEW
                    </Tag>
                  </div>
                  <div className={cn('timeline-content')}>
                    <ul className={cn('list-type-dot')}>
                      <li>200,000 WEMIX is kept in Treasury.</li>
                      <li>200,000 WEMIX is kept in Treasury.</li>
                    </ul>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item>
                <div className={cn('timeline-wrap')}>
                  <div className={cn('timeline-tit-wrap')}>
                    <strong className={cn('timeline-tit')}>Treasury</strong>
                    <span className={cn('timeline-date')}>2022-07-01 13:30:04</span>
                    <Tag size="xs" color="positive">
                      NEW
                    </Tag>
                  </div>
                  <div className={cn('timeline-content')}>
                    <div className={cn('timeline-desc')}>200,000 WEMIX is kept in Treasury.</div>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item>
                <div className={cn('timeline-wrap')}>
                  <div className={cn('timeline-tit-wrap')}>
                    <strong className={cn('timeline-tit')}>Treasury</strong>
                    <span className={cn('timeline-date')}>2022-07-01 13:30:04</span>
                    <Tag size="xs" color="positive">
                      NEW
                    </Tag>
                  </div>
                  <div className={cn('timeline-content')}>
                    <div className={cn('timeline-desc')}>200,000 WEMIX is kept in Treasury.</div>
                    <ul className={cn('list-type-dot')}>
                      <li>200,000 WEMIX is kept in Treasury.</li>
                      <li>200,000 WEMIX is kept in Treasury.</li>
                    </ul>
                  </div>
                </div>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaoIndividualHomeTimeline;
