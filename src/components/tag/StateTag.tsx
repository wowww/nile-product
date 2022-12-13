import Tag from '@components/tag/Tag';
import { useTranslation } from 'next-i18next';
import { useCountdown } from '@utils/countdown';
import { useMemo } from 'react';
import moment from 'moment';
import { MarketNftItemStatusType } from '@/services/nile/api';

export type StateTagProps = {
  status?: MarketNftItemStatusType;
  remain?: number;
};

export const StatusTag = ({ status, remain }: StateTagProps) => {
  const { t } = useTranslation('common');
  const { remainTime } = useCountdown({ seconds: remain ?? 0, activeUnderZero: true });

  const remainTimeText = useMemo(() => {
    const time = moment().startOf('day').seconds(remainTime);
    return time.format('HH[h] : mm[m] : ss[s]');
  }, [remainTime]);

  const checkStatus = useMemo(() => {
    switch (status) {
      case MarketNftItemStatusType.NONE:
        return (
          <Tag size="md-m" color="black">
            {t('upcoming')}
          </Tag>
        );
      case MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID:
        return (
          <Tag type="market" size="md-m" color="negative">
            {t('onAuction')}
          </Tag>
        );
      case MarketNftItemStatusType.AUCTION_LIVE_ONGOING:
        return (
          <Tag type="market border-none" size="md-m" bg>
            {remainTimeText}
          </Tag>
        );
      case MarketNftItemStatusType.COMPLETE:
        return (
          <Tag size="md-m" color="gray" bg>
            {t('auctionClosed')}
          </Tag>
        );
      case MarketNftItemStatusType.OPEN:
        return (
          <Tag size="md-m" color="black">
            {t('buyNow')}
          </Tag>
        );
      case MarketNftItemStatusType.OPEN_OFFER_BEFORE_OFFER:
        return (
          <Tag size="md-m" bg disabled>
            {t('openForOffers')}
          </Tag>
        );
      case MarketNftItemStatusType.OPEN_OFFER_ONGOING:
        return (
          <Tag size="md-m" color="black">
            {t('openForOffers')}
          </Tag>
        );
      case MarketNftItemStatusType.CLOSED:
        return (
          <Tag size="md-m" bg disabled>
            {t('notForSale')}
          </Tag>
        );
    }
  }, []);

  return <>{checkStatus}</>;
};
