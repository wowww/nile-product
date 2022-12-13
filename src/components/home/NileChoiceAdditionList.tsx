import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { MarketNftItemStatusType } from '@/services/nile/api';
import Web3 from 'web3';
import { useNumberFormatter } from '@utils/formatter/number';
import React, { useState } from 'react';
import { useCountdown } from '@utils/countdown';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import Tag from '@components/tag/Tag';
import { MarketCountdownText } from '@components/marketplace/countdown/text';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';

type NileChoiceAdditionList = {
  additionList?: NileCollection;
};

export const NileChoiceAdditionList = ({ additionList }: NileChoiceAdditionList) => {
  const { t } = useTranslation(['nile', 'common']);
  const marketNftTypeStatus = MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID;
  const { shorthanded } = useNumberFormatter();
  const nileWallet = useAtomValue(nileWalletAtom);
  const [state, setState] = useState(MarketNftItemStatusType.NONE);
  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const stateTag = (state?: string, remainSeconds?: number) => {
    switch (state) {
      case 'NONE':
        return (
          <Tag size="md-m" color="black">
            {t('upcoming', { ns: 'common' })}
          </Tag>
        );
      case 'AUCTION_LIVE_BEFORE_BID':
        return (
          <Tag type="market" size="md-m" color="negative">
            {t('onAuction', { ns: 'common' })}
          </Tag>
        );
      case 'AUCTION_LIVE_ONGOING':
        return (
          <Tag type="market border-none" size="md-m" bg>
            <MarketCountdownText expireTime={remainSeconds ?? 0} />
          </Tag>
        );
      case 'COMPLETE':
        return (
          <Tag size="md-m" color="gray" bg>
            {t('auctionClosed', { ns: 'common' })}
          </Tag>
        );
      case 'OPEN':
        return (
          <Tag size="md-m" color="black">
            {t('buyNow', { ns: 'common' })}
          </Tag>
        );
      case 'OPEN_OFFER_BEFORE_OFFER':
        return (
          <Tag size="md-m" color="black">
            {t('openForOffers', { ns: 'common' })}
          </Tag>
        );
      case 'OPEN_OFFER_ONGOING':
        return (
          <Tag size="md-m" color="black">
            {t('openForOffers', { ns: 'common' })}
          </Tag>
        );
      case 'CLOSED':
        return (
          <Tag size="md-m" bg disabled>
            {/*{t('notForSale', { ns: 'common' })}*/}
            {t('openForOffers', { ns: 'common' })}
          </Tag>
        );
      default:
        return false;
    }
  };

  return (
    <ul className={cn('pick-addition-list')}>
      {additionList?.items?.map((additionItem) => {
        return (
          <li key={`addition-list${additionItem.id}`} className={cn('addition-list')}>
            <a
              className={cn('card-link')}
              href={`/marketplace/${additionList.slug}/${additionItem.tokenId}`}
            >
              <div className={cn('img-block')}>
                <img src={additionItem.image} alt="" />
              </div>
              <div className={cn('product-info')}>
                <div className={cn('inner')}>
                  <div className={cn('product-name')}>{additionItem.name}</div>
                  <dl className={cn('price-info-wrap')}>
                    <dt className={cn('price-title')}></dt>
                    <dd>
                      <strong className={cn('price-value')}>{shorthanded(Number(Web3.utils.fromWei(String(additionItem.price), 'ether')))}</strong>
                      <span className={cn('price-unit')}>WEMIX$</span>
                    </dd>
                  </dl>
                </div>
                <div className={cn('status-wrap')}>
                  {stateTag(state, 10800)}
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
