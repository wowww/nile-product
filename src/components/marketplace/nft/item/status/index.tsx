import { useCountdown } from '@utils/countdown';
import { useMemo } from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import classNames from 'classnames';
import { MarketNftItemStatusType } from '@/services/nile/api';

export type AuctionNftItemProps = {
  status: MarketNftItemStatusType;
  remain?: number;
};

export const MarketNftItemStatus = ({ status, remain }: AuctionNftItemProps) => {
  const isCountdown = useMemo(() => {
    return [
      MarketNftItemStatusType.AUCTION_LIVE_ONGOING,
    ].includes(status);
  }, [status]);

  const { remainTime } = useCountdown({ seconds: remain ?? 0, active: isCountdown });

  const live = useMemo(() => {
    return [
      MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID,
      MarketNftItemStatusType.AUCTION_LIVE_ONGOING,
    ].includes(status);
  }, [status]);

  const inverted = useMemo(() => {
    return [
      MarketNftItemStatusType.AUCTION_LIVE_ONGOING,
    ].includes(status);
  }, [status]);

  const closed = useMemo(() => {
    return [
      MarketNftItemStatusType.CLOSED,
    ].includes(status);
  }, [status]);

  const disabled = useMemo(() => {
    return [
      MarketNftItemStatusType.CLOSED,
    ].includes(status);
  }, [status]);

  const remainTimeText = useMemo(() => {
    const time = moment().startOf('day').seconds(remainTime);
    return time.format('HH[h] : mm[m] : ss[s]');
  }, [remainTime]);

  const messages = ({
    [MarketNftItemStatusType.NONE]: 'Upcoming',
    [MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID]: 'Auction Now',
    [MarketNftItemStatusType.AUCTION_LIVE_ONGOING]: remainTimeText,
    [MarketNftItemStatusType.CLOSED]: 'Closed',
    [MarketNftItemStatusType.OPEN]: 'For Sale',
    [MarketNftItemStatusType.OPEN_OFFER_BEFORE_OFFER]: 'Open for Offers',
    [MarketNftItemStatusType.OPEN_OFFER_ONGOING]: 'Open for Offers',
    [MarketNftItemStatusType.COMPLETE]: 'Not Sale',
  });

  return (
    <Tag className={classNames({ live, inverted, closed, disabled })}>
      {messages[status]}
    </Tag>
  );
};

MarketNftItemStatus.defaultProps = {
  remain: 0,
};
