import { useState } from 'react';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';
import { Collapse } from 'antd';
import { useTranslation } from 'next-i18next';

// components
import TextButton from '../button/TextButton';

import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

const ExchangeList = () => {
  const { t } = useTranslation(['tokens', 'common']);
  const { Panel } = Collapse;
  const size = useAtomValue(windowResizeAtom);
  const imgSize = { width: 186, height: 80 };
  const exchangeList = [
    /* 22.10.26 수정: 데이터 순서 변경 */
    {
      icon: <ReactSVG src='images/icon/exchange/icon_upbit.svg' {...imgSize} />,
      link: 'https://upbit.com/exchange?code=CRIX.UPBIT.KRW-WEMIX',
    },
    {
      icon: <ReactSVG src='images/icon/exchange/icon_bithumb.svg' {...imgSize} />,
      link: 'https://www.bithumb.com/trade/order/WEMIX_KRW',
    },
    {
      icon: <ReactSVG src='images/icon/exchange/icon_gateio.svg' {...imgSize} />,
      link: '',
    },
    {
      icon:  <ReactSVG src='images/icon/exchange/icon_lbank.svg' {...imgSize} />,
      link: '',
    },
    {
      icon: <ReactSVG src='images/icon/exchange/icon_lbank.svg' {...imgSize} />,
      link: '',
    },
    {
      icon: <ReactSVG src='images/icon/exchange/icon_bybit.svg' {...imgSize} />,
      link: '',
    },
    {
      icon: <ReactSVG src='images/icon/exchange/icon_MEXC.svg' MEXC {...imgSize} />,
      link: '',
    },
    {
      icon: <ReactSVG src='images/icon/exchange/icon_korbit.svg' Korbit {...imgSize} />,
      link: '',
    },
    {
      icon: <ReactSVG src='images/icon/exchange/icon_coinone.svg' {...imgSize} />,
      link: '',
    },
    {
      icon:  <ReactSVG src='images/icon/exchange/icon_kucoin.svg' {...imgSize} />,
      link: '',
    },
    {
      icon: <ReactSVG src='images/icon/exchange/icon_probit.svg' {...imgSize} />,
      link: '',
    },
  ];
  const [list, setList] = useState(exchangeList);
  const [activateShowMore, setActivateShowMore] = useState(false);

  return (
    <div className={cn('exchange-wrap')}>
      <div className={cn('exchange-inner')}>
        <h2 className={cn('tokens-title')}>Buy WEMIX</h2>
        <p className={cn('desc')}>{t('exchangeList.desc')}</p>
        <ul className={cn('exchange-list', activateShowMore && 'active')}>
          {list.map((e, idx) => {
            return (
              <li key={idx}>
                <a href={e.link} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
                  {e.icon}
                </a>
              </li>
            );
          })}
        </ul>
        <div className={cn('more-btn-wrap', activateShowMore && 'active')}>
          <TextButton
            buttonText={activateShowMore ? 'Show less' : 'Show More'}
            iconValue="arrow"
            size="sm"
            direction="bottom"
            onClick={() => setActivateShowMore(!activateShowMore)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeList;
