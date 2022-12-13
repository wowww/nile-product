import { useEffect, useState } from 'react';
import { NileNftOrder, NileOrderType } from '@/models/nile/marketplace/NileNft';
import dayjs from 'dayjs';
import { MarketNftItemStatusType } from '@/services/nile/api';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';

export const useDefineTokenStatus = ({ order }: { order?: NileNftOrder }) => {
  const [targetDate, setTargetDate] = useState<dayjs.Dayjs>(dayjs());
  const [remainSeconds, setRemainSeconds] = useState<number>(0);
  const [status, setStatue] = useState<MarketNftItemStatusType>(MarketNftItemStatusType.NONE);
  const nileWallet = useAtomValue(nileWalletAtom);

  const now = dayjs();

  useEffect(() => {
    if (order) {
      const startAt = dayjs.utc(order.startAt);
      if (order.biddingList?.find((order) => order.address && order.address?.toLowerCase() === nileWallet.toLowerCase())?.status === 'CLOSE') {
        setStatue(MarketNftItemStatusType.CLOSED);
      }
      if (order.orderStatus === 'COMPLETE') {
        setStatue(MarketNftItemStatusType.COMPLETE);
      }
      if (now.isBefore(startAt)) {
        setStatue(MarketNftItemStatusType.NONE);
      }
      console.log(now.format('L LT'), startAt.format('L LT'));
      if (order?.type === 'AUCTION') {
        if (order.endAt) {
          const endAt = dayjs.utc(order.endAt);

          if (now.isAfter(endAt)) {
            setStatue(MarketNftItemStatusType.COMPLETE);
          }
        }
        if ((order.biddingList?.length ?? 0) > 0) {
          setStatue(MarketNftItemStatusType.AUCTION_LIVE_ONGOING);
        }
        setStatue(MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID);
      }

      if (order?.type === NileOrderType.FIXED_PRICE) {
        setStatue(MarketNftItemStatusType.OPEN);
      }
    }
  }, [order]);

  useEffect(() => {
    if ([MarketNftItemStatusType.NONE].includes(status)) {
      setTargetDate(dayjs.utc(order?.startAt));
    }
    if ([MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status)) {
      setTargetDate(dayjs.utc(order?.endAt));
    }
  }, [order, status]);

  useEffect(() => {
    setRemainSeconds(Math.abs(targetDate.diff(dayjs(), 'seconds')));
  }, [targetDate]);

  return {
    status,
    remainSeconds,
    targetDate,
  };
};
