import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { NileBidding } from '@/models/nile/marketplace/NileNft';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { useNumberFormatter } from '@utils/formatter/number';
import Web3 from 'web3';
import dayjs from 'dayjs';

interface Props {
  data?: NileBidding[];
}

const MarketplaceDetailBidList = ({ data }: Props) => {
  const { t } = useTranslation('common');
  const scrollRef = useRef<HTMLUListElement>(null);
  const { shorten } = useWalletFormatter();
  const { shorthanded } = useNumberFormatter();

  useEffect(() => {
    scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
  }, [data]);

  return (
    <ul className={cn('marketplace-bid-list')} ref={scrollRef}>
      {data?.slice(0, 3).reverse()?.map((item: NileBidding, index: number) => (
        <li key={`bid-list-${index}`} className={cn(`order-0${data.length - index}`)}>
          <div className={cn('profile')}>
            {/*<Avatar size={28} style={{ backgroundImage: item.image && item.image }} />*/}
            <div className={cn('info')}>
              <strong className={cn('name')}>{shorten(item.address)}</strong>
              <span className={cn('time')}>
                {dayjs.utc(item.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
          </div>
          <div className={cn('price')}>
            <strong>{item?.price ? Web3.utils.fromWei(`${item.price}`, 'ether') : '0'}</strong>
            <span className={cn('unit')}>WEMIX$</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MarketplaceDetailBidList;
