/**
 * @param data 플롯팅바 내부 데이터
 * @param dealType 'buy' | 'sell' -> 거래 타입
 * @param type 'auction' | 'buyNow' | 'openForBid' | 'notForSale' | 'listing'
 * @param progress 'before' | 'after' | 'success' | 'fail' | 'expired' | 'normal' | 'highest' | 'first'
 * @param activate boolean (플롯팅바 노출상태)
 * @param watching boolean (작품 확인 중 툴팁)
 */

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { message } from 'antd';
import { Trans, useTranslation } from 'next-i18next';

// components
import BgButton from '@/components/button/BgButton';
import NumberInput from '@/components/input/NumberInput';
import OutlineButton from '@/components/button/OutlineButton';
import { useAuctionBiddingCalculator } from '@utils/auction/bidding/calculator';
import { useNumberFormatter } from '@utils/formatter/number';
import { NileCDNLoader } from '@utils/image/loader';
import NileNft, { NileNftOrder } from '@/models/nile/marketplace/NileNft';
import { MarketNftItemStatusType } from '@/services/nile/api';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';

interface Props {
  data?: NileNft;
  dealType: 'buy' | 'sell';
  type: 'auction' | 'buyNow' | 'openForBid' | 'notForSale' | 'listing';
  progress: 'before' | 'after' | 'success' | 'fail' | 'expired' | 'normal' | 'highest' | 'first';
  status?: MarketNftItemStatusType;
  minValue?: number;
  value?: number;
  setValue?: (value: number) => void;
  activate: boolean;
  disabled?: boolean;
  watching?: boolean;
  currentPrice?: number;
  /* 22.11.16 수정: 종류별 modal 관련 prop 추가 */
  setPaymentModal?: Function;
  setMakeOfferModal?: Function;
  setBidHistoryModal?: Function;
  setPaymentModalType?: Function;
  setBidHistoryModalType?: Function;
}

const MarketplaceDetailFloatingBar: React.FC<Props> = ({
  data,
  dealType,
  type,
  progress,
  minValue,
  value,
  status,
  setValue,
  activate,
  disabled,
  watching = false,
  currentPrice,
  /* 22.11.16 수정: 종류별 modal 관련 prop 추가 */
  setPaymentModal,
  setMakeOfferModal,
  setBidHistoryModal,
  setPaymentModalType,
  setBidHistoryModalType,
}): JSX.Element => {
  const [restTimeRatio, setRestTimeRatio] = useState<number>(0);
  const { t, i18n } = useTranslation(['marketplace', 'common']);

  const [price, setPrice] = useState<number>(0);
  const { shorthanded } = useNumberFormatter();

  const nileWallet = useAtomValue(nileWalletAtom);

  const { getNextPrice, getPrevPrice } = useAuctionBiddingCalculator();

  const openPaymentModal = (type: string) => {
    /* 22.11.16 수정: 상속받은 prop으로 함수 교체 */
    setPaymentModal?.(true);
    setPaymentModalType?.(type);
  };

  /* 22.10.04 수정: 오퍼 히스토리 팝업 함수 추가 */
  const openHistoryModal = (type: string) => {
    /* 22.11.16 수정: 상속받은 prop으로 함수 교체 */
    setBidHistoryModal?.(true);
    setBidHistoryModalType?.(type);
  };

  /* 22.11.16 수정: openMakeOfferModal 함수 추가 */
  const openMakeOfferModal = () => {
    setMakeOfferModal?.(true);
  };

  const order: NileNftOrder | undefined = useMemo(() => {
    return data?.token.orderList?.at(0);
  }, [data]);

  const isCurrentAuctionWinner = useMemo(() => {
    if (nileWallet) {
      return order?.biddingList?.at(0)?.address?.toLowerCase() === nileWallet?.toLowerCase();
    }
    return false;
  }, [order, nileWallet]);

  useEffect(() => {
    if (data?.token.orderEndAt && data?.token.orderStartAt) {
      const start = dayjs(data?.token?.orderStartAt);
      const end = dayjs(data?.token?.orderEndAt);
      const now = dayjs();
      const totalTime = Math.abs(end.diff(start));
      const lateTime = Math.abs(now.diff(start));
      setRestTimeRatio((lateTime / totalTime) * 100);
    }
  }, []);

  return (
    <div className={cn('marketplace-floating-bar-wrap', activate && 'active')}>
      <div className={cn('marketplace-floating-bar-inner')}>
        <div className={cn('info-area')}>
          <div className={cn('img-block')}>
            {data?.token?.image ? (
              <Image src={data?.token?.image ?? ''} alt="" layout="fill" loader={NileCDNLoader} />
            ) : (
              <Image src='/temp/@temp_story_detail_post.jpg' alt="" layout="fill" loader={NileCDNLoader} />
              // <video autoPlay loop muted playsInline disablePictureInPicture>
              //   <source src={data?.token?.videoUrl} type="video/mp4" />
              // </video>
            )}
          </div>
          <div className={cn('info-detail')}>
            {/* 22.10.06 수정: 구매 옥션 중인 NFT 상세 (비딩 후) 플로팅바 애니메이션을 위한 클래스 추가 */}
            <strong className={cn(dealType === 'buy' && type === 'auction' && progress === 'after' && 'active')}>{data?.token?.name}</strong>
            <span>{shorthanded(currentPrice)} WEMIX$</span>
          </div>
        </div>
        <div className={cn('interactive-area')}>
          {dealType === 'buy' ? (
            <>
              {type === 'auction' ? (
                <>
                  {progress === 'before' ? (
                    <div className={cn('amount-block')}>
                      <NumberInput
                        plusDisabled={status === MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID || isCurrentAuctionWinner}
                        minusDisabled={minValue === (value ?? price)}
                        value={value ?? price}
                        setValue={setValue ?? setPrice}
                        unit="WEMIX$"
                        onClickPlus={(prev) => (setValue ?? setPrice)(getNextPrice(prev))}
                        onClickMinus={(prev) => (setValue ?? setPrice)(getPrevPrice(prev))}
                        bgBlack
                      />
                      <BgButton
                        buttonText={t('placeBid', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        disabled={disabled}
                        onClick={() => {
                          if ((nileWallet ?? '').length > 0) {
                            openPaymentModal('placeBid');
                          } else {
                            // login?.();
                            provider.connect();
                          }
                        }}
                      />
                    </div>
                  ) : progress === 'after' ? (
                    <>
                      <div className={cn('amount-block')}>
                        <NumberInput
                          minusDisabled={minValue === (value ?? price)}
                          unit="WEMIX$"
                          value={value ?? price}
                          setValue={setValue ?? setPrice}
                          bgBlack
                        />
                        <BgButton
                          buttonText={t('placeBid', { ns: 'common' })}
                          color="white"
                          size="lg-f"
                          disabled={disabled}
                          onClick={() => {
                            openPaymentModal('placeBid');
                          }}
                        />
                      </div>
                    </>
                  ) : progress === 'success' ? (
                    <>
                      <OutlineButton
                        buttonText={t('bidHistoryPopup.title', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => openHistoryModal('buy')}
                      />
                      <BgButton
                        buttonText={t('marketplaceModal.completePayment', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          openPaymentModal('completePayment');
                        }}
                      />
                    </>
                  ) : progress === 'fail' ? (
                    <>
                      <OutlineButton
                        buttonText={t('bidHistoryPopup.title', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => openHistoryModal('buy')}
                      />
                      <BgButton
                        buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          openPaymentModal('retractingBid');
                        }}
                      />
                    </>
                  ) : progress === 'normal' ? (
                    <OutlineButton
                      buttonText={t('bidHistoryPopup.title', { ns: 'common' })}
                      color="white"
                      size="lg-f"
                      onClick={() => openHistoryModal('buy')}
                    />
                  ) : progress === 'highest' ? (
                    <>
                      <div className={cn('amount-block')}>
                        {/* 22.11.16 수정: bgBlack prop 추가 */}
                        <NumberInput
                          minusDisabled={minValue === (value ?? price)}
                          unit="WEMIX$"
                          bgBlack
                          inputDisabled
                          value={value ?? price}
                          setValue={setValue ?? setPrice}
                          onClickMinus={getPrevPrice}
                          onClickPlus={getNextPrice}
                          parentName={'floating'}
                        />
                        <BgButton
                          buttonText={t('placeBid', { ns: 'common' })}
                          color="white"
                          size="lg-f"
                          onClick={() => {
                            openPaymentModal('placeBid');
                          }}
                          disabled={disabled}
                        />
                      </div>
                    </>
                  ) : (
                    <span>잘못된 progress 입력</span>
                  )}
                </>
              ) : type === 'buyNow' ? (
                <>
                  {progress === 'before' || progress === 'after' ? (
                    <>
                      <OutlineButton
                        buttonText={t('makeOffer', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        /* 22.11.24 수정 start: 딤 처리 + toast 팝업 호출 */
                        type="primary"
                        onClick={() => {
                          /* 22.11.16 수정: openMakeOfferModal 함수로 교체 */
                          // openMakeOfferModal();
                          message.info({
                            content: i18n.language === 'ko' ? '‘제안하기’ 기능은 추후 지원될 예정입니다.' : 'This feature will be available soon.',
                            key: 'toast',
                          });
                        }}
                        /* 22.11.24 수정 end: 딤 처리 + toast 팝업 호출 */
                      />
                      <BgButton
                        buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          openPaymentModal('placeBid');
                        }}
                      />
                    </>
                  ) : progress === 'expired' ? (
                    <>
                      <BgButton
                        buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          openPaymentModal('placeBid');
                        }}
                      />
                      <OutlineButton
                        buttonText={t('marketplaceModal.getMyOfferBack', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          openPaymentModal('retractingBid');
                        }}
                      />
                    </>
                  ) : progress === 'first' ? (
                    <BgButton
                      buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
                      color="white"
                      size="lg-f"
                      onClick={() => {
                        openPaymentModal('placeBid');
                      }}
                    />
                  ) : (
                    <span>잘못된 progress 입력</span>
                  )}
                </>
              ) : type === 'openForBid' ? (
                <>
                  {progress === 'before' || progress === 'after' ? (
                    <BgButton
                      buttonText={t('makeOffer', { ns: 'common' })}
                      color="white"
                      size="lg-f"
                      onClick={() => {
                        /* 22.11.16 수정: openMakeOfferModal 함수로 교체 */
                        openMakeOfferModal();
                      }}
                    />
                  ) : progress === 'expired' ? (
                    <>
                      <BgButton
                        buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          openPaymentModal('placeBid');
                        }}
                      />
                      <OutlineButton
                        buttonText={t('marketplaceModal.getMyOfferBack', { ns: 'common' })}
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          openPaymentModal('retractingBid');
                        }}
                      />
                    </>
                  ) : progress === 'fail' ? (
                    <BgButton
                      buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })}
                      color="white"
                      size="lg-f"
                      onClick={() => {
                        openPaymentModal('retractingBid');
                      }}
                    />
                  ) : progress === 'success' ? (
                    <BgButton
                      buttonText={t('marketplaceModal.completePayment', { ns: 'common' })}
                      color="white"
                      size="lg-f"
                      onClick={() => {
                        openPaymentModal('completePayment');
                      }}
                    />
                  ) : (
                    <span>잘못된 progress 입력</span>
                  )}
                </>
              ) : type === 'notForSale' ? (
                <>
                  {/* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */}
                  {progress === 'before' ? (
                    <OutlineButton
                      buttonText={t('receiveNotification', { ns: 'common' })}
                      color="white"
                      size="lg-f"
                      iconType
                      iconValue="alarm"
                      onClick={() => message.info({ content: '알림 신청되었습니다.', key: 'toast' })}
                    />
                  ) : progress === 'after' ? (
                    <OutlineButton
                      buttonText={t('cancelNotification', { ns: 'common' })}
                      color="white"
                      size="lg-f"
                      iconType
                      iconValue="alarm"
                      onClick={() => message.info({ content: '알림 취소되었습니다.', key: 'toast' })}
                    />
                  ) : progress === 'expired' ? (
                    <BgButton
                      buttonText={t('marketplaceModal.completePayment', { ns: 'common' })}
                      color="white"
                      size="lg-f"
                      onClick={() => {
                        openPaymentModal('completePayment');
                      }}
                    />
                  ) : (
                    <span>잘못된 progress 입력</span>
                  )}
                </>
              ) : (
                <span>잘못된 type 입력</span>
              )}
            </>
          ) : dealType === 'sell' ? (
            <>
              {type === 'listing' ? (
                <BgButton buttonText={t('createListing', { ns: 'common' })} color="white" size="lg-f" href="/marketplace/listing" />
              ) : type === 'buyNow' ? (
                <>
                  {progress === 'before' ? (
                    <BgButton buttonText={t('editOrCancel', { ns: 'common' })} color="white" size="lg-f" href="/marketplace/listing" />
                  ) : (
                    <>
                      <OutlineButton buttonText={t('editOrCancel', { ns: 'common' })} color="white" size="lg-f" href="/marketplace/listing" />
                      <BgButton
                        buttonText="Sell at Offer price"
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          /* 22.10.04 수정: 연동 팝업 변경 */
                          openHistoryModal('sell');
                        }}
                      />
                    </>
                  )}
                </>
              ) : type === 'openForBid' ? (
                <>
                  {progress === 'before' ? (
                    <BgButton buttonText={t('createListing', { ns: 'common' })} color="white" size="lg-f" href="/marketplace/listing" />
                  ) : (
                    /* 22.11.16 수정: two-btn-wrap 삭제 */
                    <>
                      <OutlineButton buttonText={t('createListing', { ns: 'common' })} color="white" size="lg-f" href="/marketplace/listing" />
                      <BgButton
                        buttonText="Sell at Offer price"
                        color="white"
                        size="lg-f"
                        onClick={() => {
                          /* 22.10.04 수정: 연동 팝업 변경 */
                          openHistoryModal('sell');
                        }}
                      />
                    </>
                  )}
                </>
              ) : type === 'notForSale' ? (
                <BgButton buttonText={t('createListing', { ns: 'common' })} color="white" size="lg-f" href="/marketplace/listing" />
              ) : (
                <span>wrong type</span>
              )}
            </>
          ) : (
            <span>wrong dealtype</span>
          )}
        </div>
        {watching && (
          <div className={cn('tooltip', activate && 'active')}>
            <div className={cn('profile-img')}>
              {/* TODO: 불러온 프로필 이미지로 변경 */}
              <Image src="" width={20} height={20} loader={NileCDNLoader} />
            </div>
            <Trans
              i18nKey="marketPlaceDetailTop.lookingNft"
              ns="common"
              values={{
                name: 'Username',
                price: '2,000',
                unit: 'WEMIX$',
              }}
            />
          </div>
        )}
      </div>
      {/* 남은 시간 표시 */}
      {dealType === 'buy' && type === 'auction' && progress === 'after' && (
        <div className={cn('progress-bar')}>
          <div className={cn('progress-filled')} style={{ width: `${restTimeRatio}%` }}></div>
        </div>
      )}
      {/* 22.11.16 수정: PaymentModal, MakeOfferModal, BidHistoryModal 모달 컴포넌트 제거 */}
    </div>
  );
};

export default MarketplaceDetailFloatingBar;
