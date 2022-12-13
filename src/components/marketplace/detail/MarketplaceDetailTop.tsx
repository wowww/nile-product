/**
 * @param type: 'placeBid': 응찰금 결제 | 'retractingBid' : 응찰 취소, 환불 확인 | 'completeCheckout' : 작품 수령 | 'changeNotSale' : Not for sale 로 상태 변화 | 'changeOpenOffer' : open for offer로 상태 변화  | 'acceptOffer' : 오퍼 수락 | 'buyNow' : 결제 확인
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketNftItemStatusType } from '@/services/nile/api';
import cn from 'classnames';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import NumberInput from '@/components/input/NumberInput';
import ShareButton from '@/components/button/ShareButton';
import MarketplaceDetailPriceInfo from '@components/marketplace/detail/MarketplaceDetailPriceInfo';
import PaymentModal from '@/components/modal/PaymentModal';
import MakeOfferModal from '@/components/modal/MakeOfferModal';
import BidHistoryModal from '@/components/modal/BidHistoryModal';
import MarketPlaceDetailFloatingBar from '@/components/marketplace/detail/MarketplaceDetailFloatingBar';
import { useTranslation } from 'next-i18next';
import { useAuctionBiddingCalculator } from '@utils/auction/bidding/calculator';
import MarketplaceDetailBidList from '@/components/marketplace/detail/MarketplaceDetailBidList';
import MarketplaceDetailBidResult from './MarketplaceDetailBidResult';
import MarketplaceDetailLink from '@/components/marketplace/detail/MarketplaceDetailLink';
import { MarketCountdownText } from '@components/marketplace/countdown/text';
import NileNft, {
  getNileNftStatus,
  NileBiddingStatusType,
  NileNftMetadata,
  NileNftOrder,
  NileOrderStatusType,
} from '@/models/nile/marketplace/NileNft';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import WalletModal from '@components/modal/WalletModal';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import { fromWei, toBN, toWei } from 'web3-utils';
import dayjs from 'dayjs';
import Tag from '@components/tag/Tag';
import { useCountdown } from '@utils/countdown';
import ModalLayout from '@components/modal/ModalLayout';
import { useUnitFormatter } from '@utils/formatter/unit';
import { useNumberFormatter } from '@utils/formatter/number';
import { useAtom, useAtomValue } from 'jotai';
import { nileWalletAtom, nileWalletMetaAtom, NileWalletProviderType, provider } from '@/state/nileWalletAtom';
import { addressListAtom, contractsAtom } from '@/state/web3Atom';
import { jsonAbiAddresses } from '@/web3/abis';
import { web3Init } from '@/web3/contracts';
import { isMobile } from 'react-device-detect';
import { checkTokenApprove, estimateGas, TOKEN_MAX_APPROVE_AMOUNT } from '@utils/web3Utils';
import { actionBarAtom } from '@/state/modalAtom';

interface cardDataType {
  nft?: NileNft;
  metadata?: NileNftMetadata;
}

const MarketDetailTop = ({ nft, metadata }: cardDataType) => {
  // const tokenAddress = String(process.env.NEXT_PUBLIC_ENV_WEMIX_DOLLAR_CONTRACT_ADDRESS);

  // const status = MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID;
  const router = useRouter();
  const { t, i18n } = useTranslation(['marketplace', 'common']);

  const { shorthanded, isValidNumber } = useNumberFormatter();
  const nileWallet = useAtomValue(nileWalletAtom);
  const nileWalletMeta = useAtomValue(nileWalletMetaAtom);
  const [addressList, setAddressList] = useAtom(addressListAtom);

  const [contracts, setContractAtom] = useAtom(contractsAtom);

  useEffect(() => {
    web3Init().then((data) => {
      const { contracts, addresses } = data;
      setContractAtom(contracts);
      setAddressList(addresses);
      // setEtcContracts(etc);
    });
  }, []);

  // 비딩 히스토리 정보 영역 제어용
  const [showHistory, setShowHistory] = useState<boolean>(true);
  // 유의사항 영역 제어용
  const [showNotice, setShowNotice] = useState<boolean>(true);
  // 유의사항 툴팁 제어용
  const [showNoticeTooltip, setShowNoticeTooltip] = useState<boolean>(false);
  // 금액 입력 영역 제어용
  const [showAmount, setShowAmount] = useState<boolean>(false);
  // 버튼 영역 제어용
  const [showButton, setShowButton] = useState<boolean>(false);
  // 기타 영역 (기준시간, 비딩 취소 버튼 등) 제어용
  const [showEtc, setShowEtc] = useState<boolean>(true);
  // 기타 영역 텍스트와 버튼 제어용
  const [showEtcText, setShowEtcText] = useState<boolean>(false);

  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const [isMakeOfferModal, setIsMakeOfferModal] = useState<boolean>(false);
  const [isBidHistoryModal, setIsBidHistoryModal] = useState<boolean>(false);
  const [isPendingModal, setPendingModal] = useState<boolean>(false);
  const [isErrorModal, setErrorModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [historyModalType, setHistoryModalType] = useState<string>('');
  /* 22.11.16 수정: 작품 확인 중 툴팁 제어 */
  const [isWatching, setIsWatching] = useState(false);

  const { getNextPrice, getPrevPrice } = useAuctionBiddingCalculator();
  const { getPaymentUnit } = useUnitFormatter();

  const [approvePending, setApprovePending] = useState(false);
  const [transactionPending, setTranactionPending] = useState(false);

  const [status, setStatus] = useState(MarketNftItemStatusType.NONE);
  const [approved, setApproved] = useState(false);

  const openApp = useCallback(() => {
    if (isMobile && [String(NileWalletProviderType.WEMIX_WALLET_MOBILE_APP_DESC), String(NileWalletProviderType.WEMIX_WALLET_MOBILE_APP)].includes(nileWalletMeta?.description ?? '')) {
      const link = `https://walletapi.wemix.com/open`;
      const openUri = `https://wemixwallet.page.link?link=${encodeURIComponent(
        link,
      )}&apn=com.wemixfoundation.wemixwallet&ibi=com.wemixfoundation.wemixwallet&isi=1628230003`;
      console.log('link to', openUri);
      setTimeout(() => window.open(openUri, '_self'));
    }
  }, [provider, nileWalletMeta]);

  const nftName = useMemo(() => {
    return metadata?.name.find(({ language }) => language === i18n.language)?.value ?? nft?.token?.name;
  }, [metadata, nft, i18n]);

  const order: NileNftOrder | undefined = useMemo(() => {
    return nft?.token?.orderList?.at(0);
  }, [nft]);

  const closedOrder = useMemo(() => {
    return nft?.token?.orderList?.find(
      (order) => order.orderStatus && [NileOrderStatusType.COMPLETE].includes(order.orderStatus as NileOrderStatusType),
    );
  }, [nft]);

  const visibleActionBar = useAtomValue(actionBarAtom);

  const isSeller = useMemo(() => {
    return nileWallet.toLowerCase() === order?.seller?.toLowerCase();
  }, [nileWallet, order?.seller]);


  const isCurrentAuctionLive = useMemo(() => {
    return [MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID, MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status);
  }, [status]);

  const isCurrentAuctionWinner = useMemo(() => {
    if (nileWallet) {
      return order?.biddingList?.at(0)?.address?.toLowerCase() === nileWallet.toLowerCase();
    }
    return false;
  }, [order, nileWallet]);

  const isAuctionWinner: boolean = useMemo(() => {
    if ([MarketNftItemStatusType.COMPLETE].includes(status)) {
      if (nileWallet) {
        return order?.biddingList?.at(0)?.address?.toLowerCase() === nileWallet.toLowerCase();
      }
    }
    return false;
  }, [status, order, nileWallet]);

  const isAuctionHasJoined = useMemo(() => {
    return (
      (nileWallet.length ?? 0) > 0 &&
      order?.biddingList?.map(({ address }) => address?.toLowerCase()).includes(nileWallet.toLowerCase()) === true
    );
  }, [status, closedOrder, nileWallet]);

  const targetDate = useMemo(() => {
    if ([MarketNftItemStatusType.NONE].includes(status)) {
      return dayjs.utc(nft?.token?.orderStartAt);
    }
    if ([MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status)) {
      return dayjs.utc(order?.endAt);
    }
    return dayjs();
  }, [order, status]);

  const remainSeconds = useMemo(() => Math.abs(targetDate.diff(dayjs(), 'seconds')), [targetDate]);

  const { remainTime } = useCountdown({ seconds: remainSeconds, activeUnderZero: true });

  const canWithdraw = useMemo(() => {
    if (isSeller) {
      return false;
    }
    if (!isAuctionHasJoined) {
      return false;
    }
    const joinedBidding = order?.biddingList?.find(({ address }) => address?.toLowerCase() === nileWallet.toLowerCase());
    if (!joinedBidding) {
      return false;
    }
    return joinedBidding.status === NileBiddingStatusType.FAILURE && !joinedBidding.received;
  }, [isSeller, isAuctionHasJoined, order]);

  const lastBidPrice = useMemo(() => {
    if (!nileWallet) {
      return 0;
    }
    const joinedBidding = order?.biddingList?.find(({ address }) => address?.toLowerCase() === nileWallet.toLowerCase());
    if (!joinedBidding) {
      return 0;
    }
    if (joinedBidding.status === NileBiddingStatusType.FAILURE && !joinedBidding.received) {
      if (isValidNumber(joinedBidding.price)) {
        return Number(Web3.utils.fromWei(joinedBidding.price, 'ether'));
      }
    }
    return 0;
  }, [nileWallet, order]);

  useEffect(() => {
    if (nft?.token) {
      const newStatus = getNileNftStatus(nft?.token, nileWallet);
      setStatus(newStatus);
    }
  }, [nft?.token, nileWallet, remainTime]);

  const currentPrice = useMemo(() => {
    if (order?.biddingList?.at(0)?.price) {
      if ([MarketNftItemStatusType.COMPLETE, MarketNftItemStatusType.CLOSED].includes(status)) {
        return Number(Web3.utils.fromWei(String(order?.biddingList?.at(0)?.price ?? '0'), 'ether'));
      }
      return getNextPrice(Number(Web3.utils.fromWei(String(order?.biddingList?.at(0)?.price ?? '0'), 'ether')));
    }
    return Number(Web3.utils.fromWei(String(order?.price ?? 0), 'ether'));
  }, [order, status]);

  const [price, setPrice] = useState<number>(1);
  const [offsetPrice, setOffsetPrice] = useState('0');

  const checkApproved = useCallback(async () => {
    const maxAmount = await contracts.ERC20?.methods.allowance(nileWallet, addressList['EnglishAuctionOrder']).call();
    setApproved(maxAmount === TOKEN_MAX_APPROVE_AMOUNT);
  }, []);

  useEffect(() => {
    if (order) {
      const myLastBidding = order?.biddingList?.find((bidding) => bidding.address?.toLowerCase() === nileWallet.toLowerCase() && !bidding.received);
      const priceWei = toWei(String(price), 'ether');
      const offsetWei = myLastBidding
        ? toBN(priceWei)
          .sub(toBN(myLastBidding.price))
          .toString()
        : priceWei;
      console.log('calc offset', myLastBidding, priceWei, offsetWei);
      setOffsetPrice(offsetWei);

      checkApproved();
    }
  }, [order, price]);

  useEffect(() => {
    setPrice(currentPrice);
  }, [currentPrice]);

  const showFloating = useMemo(() => {
    return [MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID, MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status);
  }, [status]);

  const afterBidding = useMemo(() => {
    if ([MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status)) {
      return (
        <div className={cn('bidders')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_bidders.svg" />{' '}
          <span className={cn('bidders-number')}>{nft?.orderList?.at(0)?.biddingList?.length} Bidders</span>
        </div>
      );
    }
  }, [status]);

  const beforeAuctionStarts = useMemo(() => {
    if ([MarketNftItemStatusType.NONE].includes(status)) {
      return (
        <div className={cn('price-info-wrap')}>
          <MarketplaceDetailPriceInfo
            type={
              'text'
              /*고정가 판매 중인 NFT 상세 (Offer 발생 후)*/
              // "avatar"
            }
            title={t('startIn', { ns: 'common' })}
            timeText
            value={<MarketCountdownText expireTime={remainSeconds} />}
            /*고정가 판매 중인 NFT 상세 (Offer 발생 후)*/
            // title={t('currentHighestOfferPrice', { ns: 'common' })}
            // detailType="price"
            // value="870,000"
            // unit="WEMIX$"

            setBidHistoryModal={setIsBidHistoryModal}
            setBidHistoryModalType={setHistoryModalType}
            unit={getPaymentUnit(order?.payment)}
          />
        </div>
      );
    }
  }, [status, remainSeconds]);

  const actionBid = useMemo(() => {
    if ([
      MarketNftItemStatusType.AUCTION_LIVE_ONGOING,
      MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID,
    ].includes(status)) {
      return (
        <>
          <div
            className={String(status) === MarketNftItemStatusType.AUCTION_LIVE_ONGOING ? 'amount-block reverse' : 'amount-block'}>
            {/*
              본인이 최고 응찰자일 경우 (Place Bid/ 내 응찰 철회하기 버튼 비활성화) 하려면 NumberInput에
              inputDisabled plusDisabled minusDisabled 속성 추가
            */}
            <NumberInput
              unit="WEMIX$"
              plusDisabled={status === MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID || isCurrentAuctionWinner}
              minusDisabled={price === currentPrice}
              value={price}
              setValue={setPrice}
              onClickMinus={(prev) => setPrice(getPrevPrice(prev))}
              onClickPlus={(prev) => setPrice(getNextPrice(prev))}
              parentName={'top-bid'}
            />

            <BgButton
              buttonText={t('placeBid', { ns: 'common' })}
              color="black"
              size="xl"
              disabled={isCurrentAuctionWinner}
              onClick={() => {
                openPaymentModal('placeBid');
              }}
            />
          </div>
        </>
      );
    }
  }, [status, price, nileWallet, t, remainSeconds]);

  const showLink = useMemo(() => {
    if (
      [
        MarketNftItemStatusType.NONE,
        MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID,
        MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID,
      ].includes(status)
    ) {
      return <MarketplaceDetailLink />;
    }
  }, [status]);

  // 낙찰 후 영역 노출
  const showResult = useMemo(() => {
    if (String(status) === MarketNftItemStatusType.COMPLETE) {
      const lastbidding = nft?.orderList?.at(0)?.biddingList?.at(0);
      const status =
        lastbidding?.address?.toLowerCase() === nileWallet.toLowerCase()
          ? 'success'
          : order?.biddingList?.map(({ address }) => address?.toLowerCase()).includes(nileWallet.toLowerCase() ?? '')
            ? 'fail'
            : 'no-bid';

      console.log(lastbidding?.timestamp);
      return (
        <MarketplaceDetailBidResult
          status={status}
          name={lastbidding?.address ?? ''}
          price={Web3.utils.fromWei(String(lastbidding?.price ?? 0), 'ether')}
          time={dayjs.utc(lastbidding?.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}
        />
      );
    }
  }, [status, order, nileWallet, remainSeconds]);

  // 고정가 판매 중인 NFT 상세 (Offer 발생 후)
  const upcomingOfferButtons = useMemo(() => {
    if (String(status) === MarketNftItemStatusType.NONE) {
      return (
        <div className={cn('button-block')}>
          <OutlineButton buttonText={t('editOrCancel', { ns: 'common' })} color="black" size="xl"
                         href="/marketplace/listing" />
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
    }
  }, [t]);

  const actionClosedButtons = useMemo(() => {
    if ([MarketNftItemStatusType.COMPLETE].includes(status)) {
      const joinedBid = order?.biddingList?.find((bid) => bid.address?.toLowerCase() === nileWallet.toLowerCase() ?? '');
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
    }
  }, [status, order, isAuctionWinner, t]);

  const buyNowAvatar = useMemo(() => {
    if (String(status) === MarketNftItemStatusType.OPEN) {
      return (
        <div className={cn('price-info-wrap')}>
          <MarketplaceDetailPriceInfo
            type="avatar"
            detailType="user"
            title={
              // 고정가 판매 중인 NFT 상세 - 1차 판매인 경우,
              // Offer 시간 만료된 화면
              'Owner'

              // 고정가 판매 중인 NFT 상세 - 2차 판매인 경우 (제안 전)
              // "Current Best price"

              // 고정가 판매 중인 NFT 상세 - 2차 판매인 경우 (제안 후)
              // "Current Best price"
            }
            userName="beeple_carp"
            // 고정가 판매 중인 NFT 상세 - 2차 판매인 경우 (제안 전),
            // 고정가 판매 중인 NFT 상세 - 2차 판매인 경우 (제안 후) userName 삭제, 아래 value, unit 추가
            // value="870,000"
            // unit="WEMIX$"

            setBidHistoryModal={setIsBidHistoryModal}
            setBidHistoryModalType={setHistoryModalType}
            unit={getPaymentUnit(order?.payment)}
          />
        </div>
      );
    }
  }, [status, remainTime]);

  const offerBeforeAvatar = useMemo(() => {
    if (
      String(status) === MarketNftItemStatusType.OPEN_OFFER_BEFORE_OFFER ||
      String(status) === MarketNftItemStatusType.OPEN_OFFER_ONGOING
      // 미판매 상태의 NotForSale
      // || String(status) === MarketNftItemStatusType.CLOSED
    ) {
      return (
        <div className={cn('price-info-wrap')}>
          <MarketplaceDetailPriceInfo
            type="avatar"
            detailType="user"
            title="Owner"
            userName="beeple_crap"
            setBidHistoryModal={setIsBidHistoryModal}
            setBidHistoryModalType={setHistoryModalType}
            unit={getPaymentUnit(order?.payment)}
            // Todo "제안 받는 중인 NFT 상세 (제안 후)" 아래 history 활성화
            // hasHistory
            // hasHistoryType="offer"
          />
        </div>
      );
    }
  }, []);

  const buyNowButton = useMemo(() => {
    if (String(status) === MarketNftItemStatusType.OPEN) {
      return (
        <>
          <div className={cn('button-block')}>
            {/*고정가 판매 중인 NFT 상세 - 2차 판매인 경우 (제안 전, 후)일 때, OutlineButton 버튼 추가*/}
            <OutlineButton
              buttonText={t('makeOffer', { ns: 'common' })}
              color="black"
              size="xl"
              onClick={() => {
                openMakeOfferModal();
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
          </div>
        </>
      );
    }
  }, [status, t]);

  const offerBeforeButton = useMemo(() => {
    if (String(status) === MarketNftItemStatusType.OPEN_OFFER_BEFORE_OFFER) {
      return (
        <div className={cn('button-block')}>
          {/*제안 받는 중인 NFT 상세 (비딩 전), 제안 받는 중인 NFT 상세 (제안 후) 버튼*/}
          <BgButton
            buttonText={t('makeOffer', { ns: 'common' })}
            color="black"
            size="xl"
            onClick={() => {
              openMakeOfferModal();
            }}
          />
        </div>
      );
    }
  }, [status, t]);

  const offerOngoing = useMemo(() => {
    if (String(status) === MarketNftItemStatusType.OPEN_OFFER_ONGOING) {
      return (
        <div className={cn('button-block reverse')}>
          <OutlineButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl"
                         href="/marketplace/listing" />
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
    }
  }, [status, t]);

  const notForSaleButton = useMemo(() => {
    if ([MarketNftItemStatusType.CLOSED].includes(status)) {
      if (nft?.token.ownerAddress?.toLowerCase() === nileWallet.toLowerCase()) {
        return (
          <div className={cn('button-block')}>
            <BgButton
              disabled
              buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" />
          </div>
        );
      }

      return (
        <div className={cn('button-block')}>
          <BgButton
            buttonText={t('makeOffer', { ns: 'common' })}
            color="black"
            size="xl"
            disabled
            onClick={() => {
              openMakeOfferModal();
            }}
          />

          {/*판매 등록 전 상태 (Not Sale)*/}
          {/*<BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />*/}

          {/*미판매 상태          */}
          {/*<BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />*/}
        </div>
      );
    }
  }, [status, t]);

  const onSuccess = () => {
    router
      .push(`/marketplace/bid/${nft?.token?.collection?.address}/${nft?.token?.tokenId}?modalType=${modalType}`)
      .then(() => {
        setIsPaymentModal(false);
        setPendingModal(false);
      });
  };

  const claimOrder = async () => {
    const offerMethodAbi = contracts.CurateMarket?.methods.claimAuction(order?.orderId).encodeABI();
    // const estimatedGasFee = await estimateGas(nileWallet, jsonAbiAddresses().current.CurateMarket, '0', toWei('101', 'gwei'), offerMethodAbi);
    const estimatedGasFee = await provider.web3.eth.getGasPrice();
    provider.web3.eth
      .sendTransaction(
        {
          from: nileWallet,
          to: jsonAbiAddresses().current.CurateMarket,
          value: '0',
          data: offerMethodAbi,
          gasPrice: estimatedGasFee,
          maxPriorityFeePerGas: toWei('100', 'gwei'),
          maxFeePerGas: toWei('101', 'gwei'),
        },
        (error, hash) => {
          console.log(error, hash);
          if (error) {
            setErrorModal(true);
            setPendingModal(false);
          } else {
            router.push(`/marketplace/complete/${nft?.token?.collection?.address}/${nft?.token?.tokenId}`).then(() => {
              setIsPaymentModal(false);
              setPendingModal(false);
            });
          }
        },
      );
  };

  const closeOrder = async () => {
    const offerMethodAbi = contracts.CurateMarket?.methods.closeOrder(order?.orderId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();
    // const estimatedGasFee = await estimateGas(nileWallet, jsonAbiAddresses().current.CurateMarket, '0', toWei('101', 'gwei'), offerMethodAbi);
    provider.web3.eth
      .sendTransaction(
        {
          from: nileWallet,
          to: jsonAbiAddresses().current.CurateMarket,
          value: '0',
          data: offerMethodAbi,
          gasPrice: estimatedGasFee,
          maxPriorityFeePerGas: toWei('100', 'gwei'),
          maxFeePerGas: toWei('101', 'gwei'),
        },
        (error, hash) => {
          console.log(error, hash);
          if (error) {
            setPendingModal(false);
          } else {
            router.push(`/marketplace/bid/${nft?.token?.collection?.address}/${nft?.token?.tokenId}?modalType=getBidBack`).then(() => {
              setIsPaymentModal(false);
              setPendingModal(false);
            });
          }
        },
      );
    openApp();
  };

  const offerSellOrder = async () => {
    const collectionAddress = nft?.token?.collection?.address;
    if (!collectionAddress) {
      return;
    }
    console.log(`offerSellOrder`);
    const myLastBidding = order?.biddingList?.find((bidding) => bidding.address?.toLowerCase() === nileWallet.toLowerCase());
    const priceWei = toWei(String(price), 'ether');
    console.log('last bidding price', myLastBidding?.price);
    const offsetWei = myLastBidding?.price
      ? toBN(String(priceWei))
        .sub(toBN(String(myLastBidding.price)))
        .toString()
      : priceWei;

    if (!contracts.ERC20) {
      console.log('ERC 20 Contract is empty');
      return;
    }

    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    if (approvePending) {
      return;
    }

    const offerMethodAbi = contracts.CurateMarket?.methods.offerSellOrder(order?.orderId, priceWei).encodeABI();
    const offerEstimatedGasFee = await estimateGas(nileWallet, jsonAbiAddresses().current.CurateMarket, '0', toWei('101', 'gwei'), offerMethodAbi);

    setTranactionPending(true);
    provider.web3.eth
      .sendTransaction(
        {
          from: nileWallet,
          to: jsonAbiAddresses().current.CurateMarket,
          value: '0',
          data: offerMethodAbi,
          gasPrice: estimatedGasFee,
          maxPriorityFeePerGas: toWei('100', 'gwei'),
          maxFeePerGas: toWei('101', 'gwei'),
        },
        (txError, txRes) => {
          setTranactionPending(false);
          if (txError) {
            setErrorModal(true);
            setPendingModal(false);
            return;
          }

          onSuccess();
        },
      );

    openApp();
  };

  const sendApproved = async () => {
    const data = await contracts.ERC20?.methods.approve(addressList['EnglishAuctionOrder'], TOKEN_MAX_APPROVE_AMOUNT).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    setPendingModal(true);
    provider.web3.eth.sendTransaction({
      from: nileWallet,
      to: addressList['ERC20'],
      value: '0',
      data,
      gasPrice: estimatedGasFee,
      maxPriorityFeePerGas: toWei('100', 'gwei'),
      maxFeePerGas: toWei('101', 'gwei'),
    }, (err, hash) => {
      setPendingModal(false);
      if (err) {
        setErrorModal(true);
      }

      if (hash) {
        setApproved(true);
      }
    });
  };

  const modalEvent = useCallback(async () => {
    console.log('order', order);
    const orderId = order?.orderId ?? -1;

    if (orderId == -1) {
      return;
    }

    const contract = contracts?.CurateMarket;
    setPendingModal(true);
    if ([MarketNftItemStatusType.COMPLETE].includes(status)) {
      if (isCurrentAuctionWinner) {
        await claimOrder();
      } else {
        await closeOrder();
      }
    }
    if ([MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID, MarketNftItemStatusType.AUCTION_LIVE_ONGOING]) {
      console.log('request bidding', modalType);
      if (modalType === 'retractingBid') {
        await closeOrder();
      } else {
        await offerSellOrder();
      }
    }
    // console.log('모달 내 버튼 클릭');
  }, [order, nileWallet, price, contracts, modalType]);

  const openPaymentModal = (type: string) => {
    if (nileWallet) {
      setModalType(type);
      setIsPaymentModal(true);
    } else {
      provider.connect();
    }
  };

  const openHistoryModal = (type: string) => {
    setIsBidHistoryModal(true);
    setHistoryModalType(type);
  };

  const openMakeOfferModal = () => {
    setIsMakeOfferModal(true);
  };

  const stateTag = (state?: string) => {
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
            <MarketCountdownText expireTime={remainSeconds} />
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
            {/* {t('notForSale', { ns: 'common' })} */}
            {t('openForOffers', { ns: 'common' })}
          </Tag>
        );
      default:
        return false;
    }
  };

  const titles = {
    [MarketNftItemStatusType.NONE]: 'Starting Bid',
    [MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID]: 'Starting Bid',
    [MarketNftItemStatusType.AUCTION_LIVE_ONGOING]: 'Current Bid',
    [MarketNftItemStatusType.COMPLETE]: 'Final Bid',
    [MarketNftItemStatusType.OPEN]: 'Fixed Price',
    [MarketNftItemStatusType.OPEN_OFFER_BEFORE_OFFER]: 'Last Sale Price',
    [MarketNftItemStatusType.OPEN_OFFER_ONGOING]: 'Last Sale Price',
    [MarketNftItemStatusType.CLOSED]: 'Last Sale Price',
  };

  return (
    <>
      {/* 22.11.16 수정: MarketPlaceDetailFloatingBar 컴포넌트 추가로 인해 마크업 수정 */}
      <div className={cn('marketplace-top-section')}>
        <div className={cn('img-block')}>
          {nft?.token?.videoUrl ? (
            <span className={cn('video-wrap')}>
              <video className={cn('video-control marketplace-video')} autoPlay loop muted playsInline disablePictureInPicture controls
                     controlsList="nodownload nofullscreen" src={nft?.token?.videoUrl ?? ''}>
                <source src={nft?.token?.videoUrl ?? ''} type="video/mp4" />
              </video>
            </span>
          ) : (
            <Image src={nft?.token?.image ?? ''} alt="" className="item-image" layout="fill" loader={NileCDNLoader} />
          )}
        </div>
        <div className={cn('info-block')}>
          <div className={cn('top-info-wrap')}>
            <div className={cn('status-wrap')}>
              {stateTag(status)}
              <div className={cn('utils')}>
                {afterBidding}
                <div className={cn('watch')}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg" />
                  <span className={cn('watch-number')}>{nft?.token?.viewCount}</span>
                </div>
                {/*<LikeButton count={nft.likeCount} />*/}
                <ShareButton facebook telegram />
              </div>
            </div>
            <div className={cn('title-wrap')}>
              <h2>
                <span className={cn('collection-name')}>{nft?.token?.collection?.name}</span>
                <strong className={cn('product-title')}>{nftName}</strong>
              </h2>
              <p className={cn('edition-info')}>#Edition 1 of 1</p>
            </div>
          </div>
          <div className={cn('bottom-info-wrap')}>
            {/* 22.11.16 수정: 낙찰 후 컴포넌트(MarketplaceDetailBidResult) 추가 */}
            {showResult}
            <div className={cn('price-info-block')}>
              <div className={cn('price-info-wrap')}>
                {/* 텍스트 타입 : 가격 */}
                {/* TODO: bid history, offer history 버튼이 들어가는 경우 hasHistory props 들어가야 합니다. */}
                <MarketplaceDetailPriceInfo
                  type="text"
                  detailType="price"
                  title={titles[status]}
                  value={Number(fromWei(toBN(order?.biddingList?.at(0)?.price ?? order?.price ?? '0'), 'ether'))}
                  unit={getPaymentUnit(order?.payment)}
                  hasHistory={[MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status) && isAuctionHasJoined}
                  setBidHistoryModal={setIsBidHistoryModal}
                  setBidHistoryModalType={setHistoryModalType}
                />
              </div>

              {/* 텍스트 타입 : 시간 (판매 전) */}
              {beforeAuctionStarts}

              {buyNowAvatar}
              {offerBeforeAvatar}
            </div>
            {/* 22.11.16 수정: 비딩 후 리스트 컴포넌트(MarketplaceDetailBidList) 추가  */}
            {afterBidding && nft?.orderList?.at(0)?.biddingList &&
              <MarketplaceDetailBidList data={nft?.orderList?.at(0)?.biddingList} />}

            {/*고정가 판매 중인 NFT 상세 (Offer 발생 후) 아래 버튼 활성화*/}
            {/*{upcomingOfferButtons}*/}

            {actionClosedButtons}

            <div className={cn('contents-wrapper')}>
              {String(status) === MarketNftItemStatusType.NONE && (
                <ul className={cn('notice-block list-type-dot')}>
                  <li>{t('marketPlaceDetailTop.infoTxt1', { ns: 'common' })}</li>
                  <li>{t('marketPlaceDetailTop.infoTxt2', { ns: 'common' })}</li>
                  <li>
                    {t('marketPlaceDetailTop.infoTxt3', {
                      ns: 'common',
                      time: dayjs.utc(order?.startAt).local().format('YYYY-MM-DD HH:mm'),
                    })}
                    {/* <Trans */}
                    {/*   i18nKey="marketPlaceDetailTop.infoTxt3" */}
                    {/*   ns="common" */}
                    {/*   values={{ */}
                    {/*     time: dayjs.utc(order?.startAt).local().format('YYYY-MM-DD HH:mm:ss'), */}
                    {/*   }} */}
                    {/* /> */}
                  </li>
                </ul>
              )}
              {String(status) === MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID && (
                <ul className={cn('notice-block list-type-dot border-top-gray')}>
                  <li>{t('marketPlaceDetailTop.infoTxt1', { ns: 'common' })}</li>
                  <li>{t('marketPlaceDetailTop.infoTxt2', { ns: 'common' })}</li>
                </ul>
              )}
              {String(status) === MarketNftItemStatusType.AUCTION_LIVE_ONGOING && (
                <ul className={cn('notice-block list-type-dot')}>
                  <li>
                    {/* 22.11.14 수정: 툴팁 없이 풀어쓰는 것으로 기획 변경된 것 확인 */}
                    {t('marketPlaceDetailTop.infoTxt1', { ns: 'common' })}
                  </li>
                  <li>
                    {t('marketPlaceDetailTop.infoTxt3', { ns: 'common', time: targetDate.format('YYYY-MM-DD HH:mm') })}
                    {/* <Trans */}
                    {/*   i18nKey="marketPlaceDetailTop.infoTxt4" */}
                    {/*   ns="common" */}
                    {/*   values={{ */}
                    {/*     time: targetDate.format('YYYY-MM-DD HH:mm:ss'), */}
                    {/*   }} */}
                    {/* /> */}
                  </li>
                  <li className={cn('has-popup')}>
                    {t('marketPlaceDetailTop.infoTxt5', { ns: 'common' })}
                    {
                      canWithdraw && (
                        <button
                          type="button"
                          className={cn('btn-setting')}
                          onClick={() => {
                            openPaymentModal('retractingBid');
                          }}
                        >
                          {t('marketplaceModal.withdrawMyBid', { ns: 'common' })}
                        </button>
                      )
                    }
                  </li>
                </ul>
              )}

              {String(status) === MarketNftItemStatusType.COMPLETE && (
                <ul className={cn('notice-block list-type-dot')}>
                  {order?.biddingList?.at(0)?.address === nileWallet ? (
                    <li>{t('marketPlaceDetailTop.infoTxt6', { ns: 'common' })}</li>
                  ) : (
                    <li>{t('marketPlaceDetailTop.infoTxt7', { ns: 'common' })}</li>
                  )}
                </ul>
              )}
              {String(status) === MarketNftItemStatusType.OPEN && (
                <ul className={cn('notice-block list-type-dot border-top-gray')}>
                  {/* 고정가 판매 중인 NFT 상세 - 1차 판매인 경우 */}
                  <li>{t('marketPlaceDetailTop.infoTxt11', { ns: 'common' })}</li>
                </ul>
              )}
              {String(status) === MarketNftItemStatusType.OPEN_OFFER_BEFORE_OFFER && (
                <ul className={cn('notice-block list-type-dot border-top-gray')}>
                  {/* 제안 받는 중인 NFT 상세 (제안 후)에 아래 li 리스트 활성화 */}
                  <li className={cn('has-popup')}>
                    {t('marketPlaceDetailTop.infoTxt5', { ns: 'common' })}{' '}
                    <button
                      type="button"
                      className={cn('btn-setting')}
                      onClick={() => {
                        openPaymentModal('retractingBid');
                      }}
                    >
                      {t('marketplaceModal.cancelMyOffer', { ns: 'common' })}
                    </button>
                  </li>
                </ul>
              )}
              {String(status) === MarketNftItemStatusType.OPEN_OFFER_ONGOING && (
                <ul className={cn('notice-block list-type-dot border-top-gray')}>
                  {/*제안 받는 중인 NFT 상세 (비딩 후)*/}
                  <li className={cn('has-popup')}>
                    {t('marketPlaceDetailTop.infoTxt9', { ns: 'common' })}{' '}
                    <button
                      type="button"
                      className={cn('btn-setting')}
                      onClick={() => {
                        openPaymentModal('changeNotSale');
                      }}
                    >
                      {t('dontMakeOfferBtn', { ns: 'common' })}
                    </button>
                  </li>
                </ul>
              )}
              {String(status) === MarketNftItemStatusType.CLOSED && (
                <>
                  {/*미판매 상태*/}
                  {nft?.token.ownerAddress === nileWallet ? (
                    <ul className={cn('notice-block list-type-dot border-top-gray')}>
                      <li className={cn('has-popup')}>
                        {t('marketPlaceDetailTop.infoTxt10', { ns: 'common' })}{' '}
                        {/*<button*/}
                        {/*  type="button"*/}
                        {/*  className={cn('btn-setting')}*/}
                        {/*  onClick={() => {*/}
                        {/*    openPaymentModal('changeOpenOffer');*/}
                        {/*  }}*/}
                        {/*>*/}
                        {/*  {t('getMakeOfferBtn', { ns: 'common' })}*/}
                        {/*</button>*/}
                      </li>
                      <li className={cn('has-popup')}>
                        <button
                          type="button"
                          className={cn('btn-setting')}
                          disabled
                        >
                          {t('detailTop.saleFeatureMessage', { ns: 'marketplace' })}
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <>
                      <ul className={cn('notice-block list-type-dot border-top-gray')}>
                        <li className={cn('has-popup')}>{t('marketPlaceDetailTop.infoTxt13', { ns: 'common' })}</li>
                        <li className={cn('has-popup')}>
                          <button
                            type="button"
                            className={cn('btn-setting')}
                            disabled
                          >
                            {t('detailTop.offerFeatureMessage', { ns: 'marketplace' })}
                          </button>
                        </li>
                      </ul>
                      <MarketplaceDetailLink />
                    </>
                  )}
                </>
              )}
              {showLink}
              {actionBid}
            </div>
            {buyNowButton}
            {offerBeforeButton}
            {notForSaleButton}
            {offerOngoing}
          </div>
        </div>

        {/* 22.11.16 수정: MarketPlaceDetailFloatingBar 컴포넌트 추가 */}
        <MarketPlaceDetailFloatingBar
          data={nft}
          dealType="buy"
          type="auction"
          progress="before"
          activate={showFloating && visibleActionBar}
          watching={isWatching}
          minValue={currentPrice}
          status={status}
          value={price}
          setValue={setPrice}
          disabled={isCurrentAuctionLive && isCurrentAuctionWinner}
          currentPrice={currentPrice}
          setPaymentModal={setIsPaymentModal}
          setMakeOfferModal={setIsMakeOfferModal}
          setBidHistoryModal={setIsBidHistoryModal}
          setPaymentModalType={setModalType}
          setBidHistoryModalType={setHistoryModalType}
        />

        <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType}
                      nft={nft} price={price} offsetPrice={offsetPrice}
                      lastBidPrice={lastBidPrice} approved={approved} approve={sendApproved} />
        <MakeOfferModal isOpen={isMakeOfferModal} setIsOpen={setIsMakeOfferModal} />
        <BidHistoryModal
          isOpen={isBidHistoryModal}
          setIsOpen={setIsBidHistoryModal}
          type={historyModalType}
          biddingHistory={order?.biddingList}
          payment={order?.payment}
        />
        <WalletModal
          isOpen={isPendingModal}
          setIsOpen={setPendingModal}
          type={nileWalletMeta?.description !== NileWalletProviderType.METAMASK_BROWSER_EXTENSION ? 'process01' : 'process02'}
          progressText="payment"
        />
        <ModalLayout
          isOpen={isErrorModal}
          setIsOpen={setErrorModal}
          size="sm"
          title={t('failedPopup.txt', { ns: 'common' })}
          footer={true}
          destroyOnClose={true}
          footerContent={[
            <BgButton
              buttonText={t('failedPopup.btn', { ns: 'common' })}
              color="black"
              size="md"

              key="Save"
              onClick={() => {
                setErrorModal(false);
              }}
            />,
          ]}
        >
          {t('failedPopup.txt3', { ns: 'common' })}
        </ModalLayout>
      </div>
    </>
  );
};

export default MarketDetailTop;
