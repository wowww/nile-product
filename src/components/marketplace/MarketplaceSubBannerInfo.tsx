import cn from 'classnames';
import { OrderStatType } from '@components/marketplace/MarketplaceSubBanner';

export interface dataListItem {
  name: string;
  figure: number | string;
  isLive?: boolean;
}

interface OrderStatOptions {
  hideTotal?: boolean;
  hideOngoing?: boolean;
  hideClose?: boolean;
}

interface Props {
  color?: 'white' | 'black';
  infoData?: dataListItem[];
  orderStat?: OrderStatType;
  orderStatOptions?: OrderStatOptions;
}

const MarketplaceSubBannerInfo: React.FC<Props> = ({ color = 'white', infoData, orderStat,orderStatOptions }) => {
  return (
    <div className={cn('marketplace-sub-banner-info-wrap', color === 'white' ? 'white' : 'black')}>
      {orderStat && (
        <ul>
          {!orderStatOptions?.hideTotal && (<li>
            <strong className={cn('item-name')}>Item</strong>
            <span className={cn('figure')}>{orderStat.total}</span>
          </li>)}
          {!orderStatOptions?.hideOngoing && (<li>
            <strong className={cn('item-name', 'live')}>On Auction</strong>
            <span className={cn('figure')}>{orderStat.ongoing}</span>
          </li>)}
          {!orderStatOptions?.hideClose && (<li>
            <strong className={cn('item-name')}>Auction Closed</strong>
            <span className={cn('figure')}>{orderStat.closed}</span>
          </li>)}
          {infoData?.map((item, index) => {
            return (
              <li key={item.name + '-' + index}>
                <strong className={cn('item-name', item.isLive ? 'live' : '')}>{item.name}</strong>
                <span className={cn('figure')}>{item.figure}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

MarketplaceSubBannerInfo.defaultProps = {
  orderStatOptions: {
    hideTotal: false,
    hideOngoing: false,
    hideClose: false,
  }
}

export default MarketplaceSubBannerInfo;


