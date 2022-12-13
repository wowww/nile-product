import { MarketNftItemStatusType } from '@/services/nile/api';
import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import NumberInput from '@components/input/NumberInput';
import BgButton from '@components/button/BgButton';
import { useAuctionBiddingCalculator } from '@utils/auction/bidding/calculator';
import { NileNftOrder } from '@/models/nile/marketplace/NileNft';
import OutlineButton from '@components/button/OutlineButton';
import { message } from 'antd';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';

type MarketplaceDetailTopInfoProps = {
  status: MarketNftItemStatusType;
  remainSeconds?: number;
  price?: number;
  setPrice?: (n: number) => void;
  currentPrice?: number;
  orderList?: NileNftOrder[];
  setIsPaymentModal?: (t: boolean) => void;
  setIsBidHistoryModal?: (t: boolean) => void;
  setHistoryModalType?: (t: string) => void;
  setIsMakeOfferModal?: (t: boolean) => void;
  setModalType?: (t: string) => void;
};

export const MarketplaceDetailTopButton = ({
  status,
  remainSeconds,
  price,
  setPrice,
  currentPrice,
  orderList,
  setIsPaymentModal,
  setIsBidHistoryModal,
  setHistoryModalType,
  setIsMakeOfferModal,
  setModalType
}: MarketplaceDetailTopInfoProps) => {
  const { t, i18n } = useTranslation(['common', 'marketplace']);

  const nileWallet = useAtomValue(nileWalletAtom);

  const { getNextPrice, getPrevPrice } = useAuctionBiddingCalculator();

  const openPaymentModal = useCallback((type: string) => {
    setIsPaymentModal?.(true);
    setModalType?.(type);
  }, []);

  const openHistoryModal = useCallback((type: string) => {
    setIsBidHistoryModal?.(true);
    setHistoryModalType?.(type);
  }, []);

  const order = useMemo(() => {
    return orderList?.find((order) => !['COMPLETE', 'CLOSE'].includes(order.orderStatus ?? ''));
  }, [orderList]);

  const isAuctionWinner = useMemo(() => {
    return (
      [MarketNftItemStatusType.COMPLETE].includes(status) &&
      nileWallet &&
      order?.biddingList?.at(0)?.address?.toLowerCase() === nileWallet?.toLowerCase()
    );
  }, [status, order, nileWallet]);

  const stateButton = useMemo(() => {
    switch (status) {
      case MarketNftItemStatusType.NONE:
        return;
      case MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID:
      case MarketNftItemStatusType.AUCTION_LIVE_ONGOING:
        return (
          <>
            <div className={String(status) === MarketNftItemStatusType.AUCTION_LIVE_ONGOING ? 'amount-block reverse' : 'amount-block'}>
              {/*
              본인이 최고 응찰자일 경우 (Place Bid/ 내 응찰 철회하기 버튼 비활성화) 하려면 NumberInput에
              inputDisabled plusDisabled minusDisabled 속성 추가
            */}
              <NumberInput
                unit="WEMIX$"
                minusDisabled={price === currentPrice}
                value={price}
                setValue={setPrice}
                onClickMinus={(prev) => setPrice?.(getPrevPrice(prev))}
                onClickPlus={(prev) => {
                  console.log('on click plus', prev);
                  setPrice?.(getNextPrice(prev));
                }}
              />

              <BgButton
                buttonText={t('placeBid', { ns: 'common' })}
                color="black"
                size="xl"
                onClick={() => {
                  if ((nileWallet ?? '').length > 0) {
                    openPaymentModal('placeBid');
                  } else {
                    // login?.();
                  }
                }}
              />
            </div>
          </>
        );
      case MarketNftItemStatusType.COMPLETE:
        const joinedBid = order?.biddingList?.find((bid) => bid.address?.toLowerCase() === nileWallet?.toLowerCase() ?? '');
        if (joinedBid && !joinedBid.received) {
          return (
            <div className={cn('button-block')}>
              <OutlineButton
                buttonText={t('bidHistoryPopup.title', { ns: 'common' })}
                color="black"
                size="xl"
                onClick={() => openHistoryModal('buy')}
              />
              {isAuctionWinner ? (
                <BgButton
                  buttonText={t('marketplaceModal.completePayment', { ns: 'common' })}
                  color="black"
                  size="xl"
                  onClick={() => {
                    openPaymentModal('completeCheckout');
                  }}
                />
              ) : (
                <BgButton
                  buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })}
                  color="black"
                  size="xl"
                  onClick={() => {
                    openPaymentModal('retractingBid');
                  }}
                />
              )}
            </div>
          );
        } else {
          return (
            <OutlineButton
              buttonText={t('bidHistoryPopup.title', { ns: 'common' })}
              color="black"
              size="xl"
              onClick={() => openHistoryModal('buy')}
              block
            />
          );
        }
      case MarketNftItemStatusType.OPEN:
        return (
          <>
            <div className={cn('button-block')}>
              {/*고정가 판매 중인 NFT 상세 - 2차 판매인 경우 (제안 전, 후)일 때, OutlineButton 버튼 추가*/}
              <OutlineButton
                buttonText={t('makeOffer', { ns: 'common' })}
                color="black"
                size="xl"
                type="primary"
                // disabled
                onClick={() => {
                  // setIsMakeOfferModal?.(true);
                  message.info({
                    content: i18n.language === 'ko' ? '‘제안하기’ 기능은 추후 지원될 예정입니다.' : 'This feature will be available soon.',
                    key: 'toast',
                  });
                }}
              />

              <BgButton
                buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
                color="black"
                size="xl"
                onClick={() => {
                  openPaymentModal('buyNow');
                }}
              />

              {/* Offer 시간 만료된 화면일 때, 아래 버튼 추가 */}
              {/*
            <OutlineButton
              buttonText={t('marketplaceModal.getMyOfferBack', { ns: 'common' })}
              color="black"
              size="xl"
              onClick={() => {
                openPaymentModal('retractingBid');
              }}
            />
            */}

              {/*고정가 판매 중인 NFT 상세 (Offer 발생 전)*/}
              {/*<BgButton buttonText={t('editOrCancel', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />*/}
            </div>
          </>
        );
      case MarketNftItemStatusType.OPEN_OFFER_BEFORE_OFFER:
        return (
          <div className={cn('button-block')}>
            {/*제안 받는 중인 NFT 상세 (비딩 전), 제안 받는 중인 NFT 상세 (제안 후) 버튼*/}
            <BgButton
              buttonText={t('makeOffer', { ns: 'common' })}
              color="black"
              size="xl"
              type="primary"
              onClick={() => {
                // setIsMakeOfferModal?.(true);
                message.info({
                  content: i18n.language === 'ko' ? '‘제안하기’ 기능은 추후 지원될 예정입니다.' : 'This feature will be available soon.',
                  key: 'toast',
                });
              }}
            />

            {/* Offer 시간 만료된 화면 버튼 */}
            {/*<OutlineButton*/}
            {/*  buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}*/}
            {/*  color="black"*/}
            {/*  size="xl"*/}
            {/*  onClick={() => {*/}
            {/*    openPaymentModal('buyNow');*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<BgButton*/}
            {/*  buttonText={t('marketplaceModal.getMyOfferBack', { ns: 'common' })}*/}
            {/*  color="black"*/}
            {/*  size="xl"*/}
            {/*  onClick={() => {*/}
            {/*    openPaymentModal('retractingBid');*/}
            {/*  }}*/}
            {/*/>*/}

            {/*제안 실패 NFT 상세 화면 버튼*/}
            {/*<BgButton*/}
            {/*  buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })}*/}
            {/*  color="black"*/}
            {/*  size="xl"*/}
            {/*  onClick={() => {*/}
            {/*    openPaymentModal('retractingBid');*/}
            {/*  }}*/}
            {/*/>*/}

            {/*Open for Offers 상태로 변경 확인 팝업*/}
            {/*<BgButton*/}
            {/*  buttonText={t('openForOffers', { ns: 'common' })}*/}
            {/*  color="black"*/}
            {/*  size="xl"*/}
            {/*  onClick={() => {*/}
            {/*    openPaymentModal('changeOpenOffer');*/}
            {/*  }}*/}
            {/*/>*/}

            {/*Offer 수락 확인 팝업*/}
            {/*<BgButton
            buttonText={t('acceptOffer', { ns: 'common' })}
            color="black"
            size="xl"
            onClick={() => {
              openPaymentModal('acceptOffer');
            }}
          />*/}

            {/*판매 등록 전 상태 (Open for Bid)*/}
            {/*<BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />*/}

            {/*제안 받는 중인 NFT 상세 (비딩 전)*/}
            {/*<BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />*/}
          </div>
        );
      case MarketNftItemStatusType.OPEN_OFFER_ONGOING:
        return (
          <div className={cn('button-block reverse')}>
            <OutlineButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />
            <BgButton
              buttonText="Sell at Offer price"
              color="black"
              size="xl"
              onClick={() => {
                openHistoryModal('sell');
              }}
            />
          </div>
        );
      case MarketNftItemStatusType.CLOSED:
        return (
          <div className={cn('button-block')}>
            {/*미판매 상태 (알림 신청 전)*/}
            <OutlineButton
              buttonText={t('receiveNotification', { ns: 'common' })}
              color="black"
              size="xl"
              iconType
              iconValue="alarm"
              onClick={() => message.info({ content: '알림 신청되었습니다.', key: 'toast' })}
            />

            {/*미판매 상태 (알림 신청 후)*/}
            {/*<OutlineButton*/}
            {/*  buttonText={t('cancelNotification', { ns: 'common' })}*/}
            {/*  color="black"*/}
            {/*  size="xl"*/}
            {/*  iconType*/}
            {/*  iconValue="alarm"*/}
            {/*  onClick={() =>*/}
            {/*    message.info({ content: '알림 취소되었습니다.', key: 'toast' })*/}
            {/*  }*/}
            {/*/>*/}

            {/*판매 등록 전 상태 (Not Sale)*/}
            {/*<BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />*/}

            {/*미판매 상태          */}
            {/*<BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />*/}
          </div>
        );
    }
  }, [status, remainSeconds, t, price]);

  return <div>{stateButton}</div>;
};

MarketplaceDetailTopButton.defaultProps = {
  remainSeconds: 0,
  price: 0,
  setPrice: (value: string) => {
    //
  },
  currentPrice: 0,
  orderList: [],
}