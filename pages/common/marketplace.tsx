/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import * as Scroll from 'react-scroll';
import { useRouter } from 'next/router';
import MarketplaceSubBanner from '@/components/marketplace/MarketplaceSubBanner';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import MarketplaceProfileCard from '@/components/marketplace/MarketplaceProfileCard';
import MarketplaceState from '@/components/marketplace/MarketplaceState';
import { nftCardData } from '@/components/marketplace/cardData';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import PaymentModal from '@/components/modal/PaymentModal';
import MakeOfferModal from '@/components/modal/MakeOfferModal';
import ShareButton from '@/components/button/ShareButton';
import BuyResultModal from '@/components/modal/BuyResultModal';
import useWindowResize from '@/hook/useWindowResize';
import { windowResizeAtom } from '@/state/windowAtom';
import BidHistoryModal from '@/components/modal/BidHistoryModal';
import ContentTitle from '@/components/marketplace/ContentTitle';
import MarketPlaceListing from '@/components/marketplace/MarketPlaceListing';
import WalletModal from '@/components/modal/WalletModal';
import { useTranslation } from 'next-i18next';
import marketplaceNftList from '@/mocks/marketplace/nft/list.json';
import { useAtomValue } from 'jotai';

const Common = () => {
  const router = useRouter();

  if (process.env.NODE_ENV === 'production') {
    useEffect(() => {
      router.replace('/');
    }, [router]);

    return null;
  }

  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);
  const [sectionLinks, setSectionLinks] = useState<boolean>();
  const sectionLinkAll = useRef<any>([]);
  const cardData = nftCardData[0];
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const [isMakeOfferModal, setIsMakeOfferModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [isBidHistoryModal, setIsBidHistoryModal] = useState<boolean>(false);
  const [historyModalType, setHistoryModalType] = useState<string>('');
  const [tangled] = marketplaceNftList;

  const { t } = useTranslation(['marketplace', 'common']);

  const modalEvent = () => {
    console.log('모달 내 버튼 클릭');
    setModalSm11(true);
    // setIsPaymentModal(false);
  };

  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };

  const openHistoryModal = (type: string) => {
    setIsBidHistoryModal(true);
    setHistoryModalType(type);
  };

  // 팝업 호출 데이터 Start
  const [isModalSm1, setModalSm1] = useState(false);
  const [isModalSm2, setModalSm2] = useState(false);
  const [isModalSm3, setModalSm3] = useState(false);
  const [isModalSm4, setModalSm4] = useState(false);
  const [isModalSm5, setModalSm5] = useState(false);
  const [isModalSm6, setModalSm6] = useState(false);
  const [isModalSm7, setModalSm7] = useState(false);
  const [isModalSm8, setModalSm8] = useState(false);
  const [isModalSm9, setModalSm9] = useState(false);
  const [isModalSm10, setModalSm10] = useState(false);
  const [isModalSm11, setModalSm11] = useState(false);
  const [isModalSm12, setModalSm12] = useState(false);
  const [isModalSm13, setModalSm13] = useState(false);
  const [isModalSm14, setModalSm14] = useState(false);
  const [isModalSm15, setModalSm15] = useState(false);
  const [isModalSm16, setModalSm16] = useState(false);
  const [isModalSm17, setModalSm17] = useState(false);
  const [isModalSm18, setModalSm18] = useState(false);

  // share용 정보
  const { pathname } = useRouter();
  const shareUrl = `https://www.nile.io${pathname}`;
  const shareTitle = 'NFT Is Life Evolution';
  const shareHashs = ['NILE'];
  const shareUsers = 'NILE_WM';

  useEffect(() => {
    const links = document.querySelectorAll('section > h1');
    if (sectionLinks === undefined) {
      links.forEach((link, index) => {
        sectionLinkAll.current[index] = link;
      });
      setSectionLinks(true);
    }
  }, [sectionLinks]);

  return (
    <>
      {/*
        * common 파일 작성 법!
        *
        * section 추가시 title id로 링크(Scroll.Link)도 함께 추가 되게 작업 되어 있음
        * 기본 구조
        * <section className={cn('common-section')}>
            <h1 className={cn('common-title')} id="아이디 추가">
              title 추가
            </h1>
            <div>
              * 공지로 작성할 글이 있을때는 common-notice 이용해서 작성
              * li 목록으로 작성하면 되며 strong은 bold, b는 negative 색상, span은 highlight 색상이 추가 되어 있음
              <ul className={cn('common-notice')}>
                <li>공지 1</li>
                <li>공지 2</li>
              </ul>
              * 여기서부터 공통 컴포넌트 작성 div 생성 후 div 안에 작성
              * button, icon, image 같이 일렬로 나열해서 넣을 경우 common-display-flex 클래스 사용
              * sub title을 사용해야 할 경우 이 단계에 추가
              * <h2 className={cn('common-sub-title')}>sub title</h2>
              <div>
                component 추가
                <div className={cn('common-name')}>component name 추가</div>
              </div>
            </div>
          </section>
      */}
      <Helmet>
        <title>Common &gt; NILE &gt; Marketplace</title>
        <body className={cn('common-wrap')} />
      </Helmet>
      <div className={cn('common-content-wrap')}>
        <div className={cn('common-links')}>
          <a href="/common">Common</a>
          <a href="/common/dao">Dao</a>
          <a href="/common/marketplace">Marketplace</a>
          <a href="/common/mypage">Mypage</a>
          <a href="/common/nile">Nile</a>
          <a href="/common/life">Life</a>
        </div>
        <div className={cn('common-links')}>
          {sectionLinks
            ? sectionLinkAll.current?.map((link: HTMLElement, index: number) => {
                return (
                  <Scroll.Link to={link.id} offset={-57} key={`link-${index}`}>
                    {link.textContent}
                  </Scroll.Link>
                );
              })
            : ''}
        </div>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="collectionsSubBanner">
            collections sub banner
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>
                <span>collections sub banner</span>의 props는 다음과 같습니다.
                <ul>
                  <li>
                    <b>salesStatus</b> : 판매 상태
                  </li>
                  <li>
                    <b>title</b> : nft(콜랙션) 명
                  </li>
                  <li>
                    <b>nftLink</b> : View NFT 버튼에 들어가는 경로
                  </li>
                  <li>
                    <b>collectionLink</b> (<span>optional</span>) : View Collection Info 버튼에 들어가는 경로
                  </li>
                  <li>
                    <b>imgUrl</b> : 백그라운드 이미지 경로 (백그라운드 이미지의 경우 <span>/public/images/</span> 에 넣어준 후 경로 넘겨주어야
                    합니다.)
                  </li>
                </ul>
              </li>
            </ul>
            <div style={{ maxWidth: '1200px' }}>
              <MarketplaceSubBanner
                salesStatus="on sale"
                title={'London Underground Station(LUS) 264 Genesis'}
                nftLink="/"
                collectionLink="/"
                imgUrl={'/images/bg_market_collection_lus.png'}
              />
              <MarketplaceSubBanner
                salesStatus="on sale"
                title={'Tangled Timepieces'}
                nftLink="/"
                collectionLink="/"
                imgUrl={'/images/bg_market_collection_tangled.png'}
              />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="CardComponent">
            card component
          </h1>
          <div>
            <div className={cn('common-name')}>card component - Small Thumb Type</div>
            {/* gap 삭제 후 3행 정렬 기준으로 여백 작업 221027 */}
            <div style={{ maxWidth: '1200px' }}>
              <MarketplaceCard cardData={tangled.items} />
            </div>
            <MarketplaceCard cardData={tangled.items} viewType="list" />
            <MarketplaceProfileCard cardData={nftCardData[0]} />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="CollectionBannerComponent">
            collection banner
          </h1>
          <div>
            <div className={cn('common-name')}>collection banner component</div>
            <div className={cn('collection-banner-section')}>
              <div className={cn('collection-banner img-type')}>
                <div className={cn('img-wrap')} style={{ backgroundImage: 'url(https://file.mir4global.com/nile/resources/images/img_lus_banner.png)' }}></div>
              </div>
              <div className={cn('collection-banner bg-type')} style={{ backgroundColor: '#0E021C' }}>
                <div className={cn('img-wrap')} style={{ backgroundImage: 'url(/images/img_tangled_banner.png)' }}></div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="SmallPopup">
            Small Size Popup
          </h1>
          <div>
            <div className={cn('common-display-flex')}>
              {/* 팝업 호출 버튼 */}
              <OutlineButton
                buttonText="결제 실패 : 잔액 부족 시"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm1(true);
                }}
              />
              {/* 팝업 SM */}
              <ModalLayout
                isOpen={isModalSm1}
                setIsOpen={setModalSm1}
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
                      setModalSm1(false);
                    }}
                  />,
                ]}
              >
                <p>{t('failedPopup.txt2', { ns: 'common' })}</p>
              </ModalLayout>
              {/* 팝업 호출 버튼 */}
              <OutlineButton
                buttonText="결제 실패 : 다른 사용자가 먼저 결제 시"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm2(true);
                }}
              />
              {/* 팝업 SM */}
              <ModalLayout
                isOpen={isModalSm2}
                setIsOpen={setModalSm2}
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
                      setModalSm2(false);
                    }}
                  />,
                ]}
              >
                <p>{t('failedPopup.soldOut', { ns: 'common' })}</p>
              </ModalLayout>
              {/* 팝업 호출 버튼 */}
              {/* 5.2.7.2 NFT_Popup_Edit listing confirm */}
              <>
                <OutlineButton
                  buttonText="5.2.7.2 변경 확인 팝업"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalSm3(true);
                  }}
                />
                {/* 팝업 SM */}
                <ModalLayout
                  isOpen={isModalSm3}
                  setIsOpen={setModalSm3}
                  size="sm"
                  title="판매 변경 확인"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('close', { ns: 'common' })}
                      color="black"
                      size="md"
                      key="Cancel"
                      onClick={() => {
                        setModalSm3(false);
                      }}
                    />,
                    <BgButton
                      buttonText={t('modified', { ns: 'common' })}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setModalSm3(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('changeConfirmPopup.txt', { ns: 'common' })}</p>
                </ModalLayout>
              </>
              {/* 팝업 호출 버튼 */}
              {/* 5.2.7.3 NFT_Popup_Cancel listing confirm */}
              <>
                <OutlineButton
                  buttonText="5.2.7.3 취소 확인 팝업"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalSm4(true);
                  }}
                />
                {/* 팝업 SM */}
                <ModalLayout
                  isOpen={isModalSm4}
                  setIsOpen={setModalSm4}
                  size="sm"
                  title={t('nftConfirmMoal.cancelTitle', { ns: 'common' })}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('close', { ns: 'common' })}
                      color="black"
                      size="md"
                      key="Back"
                      onClick={() => {
                        setModalSm4(false);
                      }}
                    />,
                    <BgButton
                      buttonText={t('header.notification.confirmCancelButton', { ns: 'common' })}
                      color="black"
                      size="md"
                      key="Yes"
                      onClick={() => {
                        setModalSm4(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('nftConfirmMoal.cancelDesc', { ns: 'common' })}</p>
                </ModalLayout>
              </>
              {/* 팝업 호출 버튼 */}
              {/* 5.2.7.5 NFT_Popup_Not for sale confirm */}
              <>
                <OutlineButton
                  buttonText="5.2.7.5 미판매 상태로 변경"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalSm5(true);
                  }}
                />
                {/* 팝업 SM */}
                <ModalLayout
                  isOpen={isModalSm5}
                  setIsOpen={setModalSm5}
                  size="sm"
                  title={t('notForSaleopup.txt', { ns: 'common' })}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t(t('notForSaleopup.btn', { ns: 'common' }))}
                      color="black"
                      size="md"
                      key="OK"
                      onClick={() => {
                        setModalSm5(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('notForSaleopup.txt2', { ns: 'common' })}</p>
                </ModalLayout>
              </>
              {/* 팝업 호출 버튼 */}
              <OutlineButton
                buttonText="Open for Offers 상태로 변경"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm6(true);
                }}
              />
              {/* 팝업 SM */}
              <ModalLayout
                isOpen={isModalSm6}
                setIsOpen={setModalSm6}
                size="sm"
                title="Open for Offer"
                footer={true}
                destroyOnClose={true}
                footerContent={[
                  <BgButton
                    buttonText="OK"
                    color="black"
                    size="md"
                    key="Back"
                    onClick={() => {
                      setModalSm6(false);
                    }}
                  />,
                ]}
              >
                <p>{t('offersConfirm', { ns: 'common' })}</p>
              </ModalLayout>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="makeOfferPopup">
            Make Offer 팝업
          </h1>
          <div>
            <OutlineButton
              buttonText="5.2.4.3 Make Offer : 응찰금 입력 팝업"
              color="black"
              size="md"
              onClick={() => {
                setIsMakeOfferModal(true);
              }}
            />
            <MakeOfferModal isOpen={isMakeOfferModal} setIsOpen={setIsMakeOfferModal} />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="successFailPopup">
            성공/실패 팝업
          </h1>
          <div>
            {/* 5.2.5 NFT_Popup_Buy_Auction_Success */}
            <>
              {/* 팝업 호출 버튼 */}
              <OutlineButton
                buttonText="5.2.5 낙찰 성공 안내 팝업 (NFT 상세 첫 진입 시)"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm8(true);
                }}
              />
              {/* 성공 팝업 */}
              <BuyResultModal
                isOpen={isModalSm8}
                setIsOpen={setModalSm8}
                resultCase="auctionSuccess"
                userName="user_name"
                buyer="buyer"
                seller="seller"
                price={1440}
                imgUrl={nftCardData[0].imgUrl}
              />
            </>

            {/* 5.2.5.1 NFT_Popup_Buy_Auction_Fail */}
            <>
              {/* 팝업 호출 버튼 */}
              <OutlineButton
                buttonText="5.2.5.1 낙찰 실패 안내 팝업 (NFT 상세 첫 진입 시)"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm9(true);
                }}
              />
              {/* 거래 실패 팝업 */}
              <BuyResultModal
                isOpen={isModalSm9}
                setIsOpen={setModalSm9}
                resultCase="auctionFail"
                userName="user_name"
                buyer="buyer"
                seller="seller"
                price={1440}
                imgUrl={nftCardData[0].imgUrl}
              />
            </>

            {/* 5.2.5.7 NFT_Popup_Buy_Offer expired */}
            <>
              <OutlineButton
                buttonText="5.2.5.7 제안시간 만료 안내 팝업"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm12(true);
                }}
              />
              {/* 제안시간 만료 안내 팝업 */}
              <BuyResultModal
                isOpen={isModalSm12}
                setIsOpen={setModalSm12}
                resultCase="offerExpired"
                userName="user_name"
                buyer="buyer"
                seller="seller"
                imgUrl={nftCardData[0].imgUrl}
              />
            </>

            {/* 5.2.5.2 NFT_Popup_Buy_Open for Offers_Success */}
            <>
              <OutlineButton
                buttonText="5.2.5.2 낙찰 성공 안내 팝업"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm13(true);
                }}
              />
              {/* 낙찰 성공 안내 팝업 */}
              <BuyResultModal
                isOpen={isModalSm13}
                setIsOpen={setModalSm13}
                resultCase="openForOffersSuccess"
                userName="user_name"
                buyer="buyer"
                seller="seller"
                price={1440}
                imgUrl={nftCardData[0].imgUrl}
              />
            </>

            {/* 5.2.5.3 NFT_Popup_Buy_Open for Offers_Fail */}
            <>
              <OutlineButton
                buttonText="5.2.5.3 낙찰 실패 안내 팝업"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm14(true);
                }}
              />
              {/* 낙찰 실패 안내 팝업 */}
              <BuyResultModal
                isOpen={isModalSm14}
                setIsOpen={setModalSm14}
                resultCase="openForOffersFail"
                userName="user_name"
                buyer="buyer"
                seller="seller"
                imgUrl={nftCardData[0].imgUrl}
              />
            </>

            {/* 5.2.5.6 NFT_Popup_Sell_Buy Now */}
            <>
              <OutlineButton
                buttonText="5.2.5.6 판매 성공 안내 팝업"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm15(true);
                }}
              />
              {/* 낙찰 실패 안내 팝업 */}
              <BuyResultModal
                isOpen={isModalSm15}
                setIsOpen={setModalSm15}
                resultCase="sellBuyNow"
                userName="user_name"
                buyer="buyer"
                seller="seller"
                price={1440}
                imgUrl={nftCardData[0].imgUrl}
              />
            </>
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="paymentPopup">
            결제 팝업
          </h1>
          <div>
            {/* 5.2.4.4 NFT_Popup_payment_Place Bid */}
            <OutlineButton
              buttonText="5.2.4.4 Place Bid : 응찰금 결제 팝업"
              color="black"
              size="md"
              onClick={() => {
                openPaymentModal('placeBid');
              }}
            />

            {/* 5.2.4 NFT_Popup_payment_Retracting my bid */}
            <OutlineButton
              buttonText="5.2.4 응찰 취소 확인 팝업"
              color="black"
              size="md"
              onClick={() => {
                openPaymentModal('retractingBid');
              }}
            />

            {/* 5.2.4.1 NFT_Popup_payment_Complete Checkout */}
            <OutlineButton
              buttonText="5.2.4.1 작품 수령 확인"
              color="black"
              size="md"
              onClick={() => {
                openPaymentModal('completeCheckout');
              }}
            />

            {/* 5.2.4.2 NFT_Popup_payment_Getting Refund */}
            <OutlineButton
              buttonText="5.2.4.2 환불 확인 팝업"
              color="black"
              size="md"
              onClick={() => {
                openPaymentModal('getBidBack');
              }}
            />

            {/* 5.2.4.5 NFT_Popup_payment_Buy Now Comfirmation */}
            <OutlineButton
              buttonText="5.2.4.5 고정가 결제 확인 팝업"
              color="black"
              size="md"
              onClick={() => {
                openPaymentModal('buyNow');
              }}
            />

            {/* 5.2.4.6 NFT_Popup_payment_Change to Not for Sale */}
            <OutlineButton
              buttonText="5.2.4.6 Not for Sale 상태로 변경 확인 팝업"
              color="black"
              size="md"
              onClick={() => {
                openPaymentModal('changeNotSale');
              }}
            />

            {/* 5.2.4.7 NFT_Popup_payment_Accept offer */}
            <OutlineButton
              buttonText="5.2.4.7 Offer 수락 확인 팝업"
              color="black"
              size="md"
              onClick={() => {
                openPaymentModal('acceptOffer');
              }}
            />

            {/* 5.2.4.6 NFT_Popup_payment_Change to Open for offer */}
            <OutlineButton
              buttonText="5.2.4.6 Open for Offers 상태로 변경 확인 팝업"
              color="black"
              size="md"
              onClick={() => {
                openPaymentModal('changeOpenOffer');
              }}
            />

            <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} approved={true} approve={() => console.log('approve')} />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="bidHistoryPopup">
            Bid History 팝업
          </h1>
          <div>
            {/* 5.2.1.4.1 NFT_Buy_Buy Now_After bidding_bid history */}
            <OutlineButton
              buttonText="5.2.1.4.1 NFT 상세 > 구매"
              color="black"
              size="md"
              onClick={() => {
                openHistoryModal('buy');
              }}
            />

            {/* 5.2.2.2.1 NFT_Sell_Buy Now_After bidding_Bid history popup */}
            <OutlineButton
              buttonText="NFT 상세 > 판매"
              color="black"
              size="md"
              onClick={() => {
                openHistoryModal('sell');
              }}
            />

            <BidHistoryModal isOpen={isBidHistoryModal} setIsOpen={setIsBidHistoryModal} type={historyModalType} />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="popUP">
            기타 팝업 모음
          </h1>
          <div>
            {/* 팝업 호출 버튼 */}
            <OutlineButton
              buttonText="판매 알림 신청"
              color="black"
              size="md"
              onClick={() => {
                setModalSm7(true);
              }}
            />
            {/* 팝업 SM */}
            <ModalLayout
              isOpen={isModalSm7}
              setIsOpen={setModalSm7}
              size="sm"
              title="판매 알림 신청"
              footer={true}
              destroyOnClose={true}
              footerContent={[
                <OutlineButton
                  buttonText="Cancel"
                  color="black"
                  size="md"
                  key="Cancel"
                  onClick={() => {
                    setModalSm7(false);
                  }}
                />,
                <BgButton
                  buttonText="Save"
                  color="black"
                  size="md"
                  key="Back"
                  onClick={() => {
                    setModalSm7(false);
                  }}
                />,
              ]}
            >
              <p>
                해당 NFT가 가격 제안을 받을 수 있는 상태로 변경되었습니다.
                <br />
                지금부터 다른 이용자들이 자유롭게 입찰할 수 있습니다.
              </p>
            </ModalLayout>

            {/* 팝업 호출 버튼 */}
            <OutlineButton
              buttonText="월렛 팝업 - 승인 대기 중"
              color="black"
              size="md"
              onClick={() => {
                setModalSm10(true);
              }}
            />
            {/* 월렛 팝업 */}
            <WalletModal isOpen={isModalSm10} setIsOpen={setModalSm10} type="process01" progressText="approve" />
            {/* 팝업 호출 버튼 */}
            <OutlineButton
              buttonText="월렛 팝업 - 결제 중"
              color="black"
              size="md"
              onClick={() => {
                setModalSm11(true);
              }}
            />
            {/* 월렛 팝업 */}
            <WalletModal isOpen={isModalSm11} setIsOpen={setModalSm11} type="process02" progressText="payment" />

            {/* 1.1.11 프로파일 서명 팝업 */}

            {/* 팝업 호출 버튼 */}
            <OutlineButton
              buttonText=" 1.1.11 프로파일 서명 위믹스 월렛일 경우"
              color="black"
              size="md"
              onClick={() => {
                setModalSm16(true);
              }}
            />
            {/* 위믹스일 경우 팝업 */}
            <WalletModal
              isOpen={isModalSm16}
              setIsOpen={setModalSm16}
              type="process03"
              progressText="profile"
              closable={false}
              maskClosable={false}
            />

            {/* 팝업 호출 버튼 */}
            <OutlineButton
              buttonText="1.1.11 프로파일 서명 메타마스크일 경우"
              color="black"
              size="md"
              onClick={() => {
                setModalSm17(true);
              }}
            />
            {/* 메타마스크 경우 팝업 */}
            <WalletModal
              isOpen={isModalSm17}
              setIsOpen={setModalSm17}
              type="process04"
              progressText="profile"
              closable={false}
              maskClosable={false}
            />

            {/* 1.1.12 프로파일 서명 거절 팝업 */}
            <OutlineButton
              buttonText="1.1.12 profile 서명 거절"
              color="black"
              size="md"
              onClick={() => {
                setModalSm18(true);
              }}
            />
            {/* 팝업 SM */}
            <ModalLayout
              isOpen={isModalSm18}
              setIsOpen={setModalSm18}
              size="sm"
              title={t('walletModal.cancel.title', { ns: 'common' })}
              footer={true}
              destroyOnClose={true}
              footerContent={[
                <BgButton
                  buttonText={t(t('walletModal.cancel.btn', { ns: 'common' }))}
                  color="black"
                  size="md"
                  key="OK"
                  onClick={() => {
                    setModalSm18(false);
                  }}
                />,
              ]}
            >
              <p>{t('walletModal.cancel.desc', { ns: 'common' })}</p>
            </ModalLayout>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="nftDetailBuy">
            NFT 상세 &gt; 구매
          </h1>
          <div>
            <div className={cn('common-name')}>5.2.6.6 응찰금 결제 완료</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('placeBid', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    title={t('bidResultPage.successTitle')}
                    iconValue="success"
                    cont={t('bidResultPage.successDesc')}
                    buttons={
                      <>
                        <OutlineButton buttonText={t('viewNft', { ns: 'common' })} color="black" size="md" href="" />
                        <ShareButton buttonType="bgButton" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6 응찰 취소</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('cancelBid', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    iconValue="success"
                    title={t('bidResultPage.cancelTitle')}
                    cont={t('bidResultPage.cancelDesc')}
                    buttons={
                      <>
                        <OutlineButton buttonText={t('viewNft', { ns: 'common' })} color="black" size="md" href="" />
                        <OutlineButton buttonText={t('goToMarketplace', { ns: 'common' })} color="black" size="md" href="" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6.1 수령 완료</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('marketplaceModal.completeCheckout', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    iconValue="success"
                    title={t('bidResultPage.checkoutCompleteTitle')}
                    cont={t('bidResultPage.checkoutCompleteDesc')}
                    buttons={
                      <>
                        <OutlineButton buttonText={t('viewNft', { ns: 'common' })} color="black" size="md" href="" />
                        <ShareButton buttonType="bgButton" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6.2 환불 완료</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('getRefund', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    iconValue="success"
                    title={t('bidResultPage.refundTitle')}
                    cont={t('bidResultPage.refundDesc')}
                    buttons={
                      <>
                        <OutlineButton buttonText={t('viewNft', { ns: 'common' })} color="black" size="md" href="" />
                        <ShareButton buttonType="bgButton" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6.3 구매 완료</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('buyNow', { ns: 'common' })} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    title={t('bidResultPage.purchaseTitle')}
                    iconValue="success"
                    cont={t('bidResultPage.purchaseDesc')}
                    buttons={
                      <>
                        <OutlineButton buttonText={t('viewNft', { ns: 'common' })} color="black" size="md" href="" />
                        <ShareButton buttonType="bgButton" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="nftDetailSell">
            NFT 상세 &gt; 판매
          </h1>
          <div>
            <div className={cn('common-name')}>5.2.3 리스팅 방식 선택 : 고정가</div>
            <div className={cn('marketplace-listing-wrap')}>
              <ContentTitle title={'Listing'} />
              <div className={cn('listing-section')}>
                <MarketplaceProfileCard cardData={nftCardData[0]} />
                <MarketPlaceListing
                  oneTitle={t('listing.txt')}
                  twoTitle={t('listing.txt2')}
                  btn={[{ mode: 'BgButton', buttonText: t('createListing', { ns: 'common' }), color: 'black', size: 'md', wallet: true }]}
                />
              </div>
            </div>

            <div className={cn('common-name')}>5.2.3.2 승인 대기</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={'Listing'} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    iconValue="loading"
                    title={t('listProcess.waitingForConfirmation.title')}
                    cont={t('listProcess.waitingForConfirmation.desc')}
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.3.3 리스팅 중</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('listProcess.waitingForListing.contTitle')} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    iconValue="loading"
                    title={t('listProcess.waitingForListing.title')}
                    cont={t('listProcess.waitingForListing.desc')}
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.3.4 완료 확인</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={'Listing'} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    title={t('listProcess.successfully.title')}
                    cont={t('listProcess.successfully.desc')}
                    iconValue="success"
                    buttons={
                      <>
                        <OutlineButton buttonText={t('goToNFTs', { ns: 'common' })} color="black" size="md" href="" />
                        <ShareButton buttonType="bgButton" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.3.5 판매 방식 수정</div>
            <div className={cn('marketplace-listing-wrap')}>
              <ContentTitle title={'Listing'} />
              <div className={cn('listing-section')}>
                <MarketplaceProfileCard cardData={nftCardData[0]} />
                <MarketPlaceListing
                  oneTitle={t('listing.txt')}
                  twoTitle={t('listing.txt2-1')}
                  btn={[
                    { mode: 'OutlineButton', buttonText: t('cancelLisiting', { ns: 'common' }), color: 'black', size: 'md', href: '' },
                    { mode: 'BgButton', buttonText: t('editLisiting', { ns: 'common' }), color: 'black', size: 'md', href: '' },
                  ]}
                />
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6.4 변경 완료 확인</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('listProcess.resultEdit.contTitle')} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    title={t('listProcess.resultEdit.title')}
                    cont={t('listProcess.resultEdit.desc')}
                    iconValue="success"
                    buttons={
                      <>
                        <OutlineButton buttonText={t('goToNFTs', { ns: 'common' })} color="black" size="md" href="" />
                        <ShareButton buttonType="bgButton" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6.5 취소 완료 확인</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={t('listProcess.resultCancel.contTitle')} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    title={t('listProcess.resultCancel.title')}
                    cont={t('listProcess.resultCancel.desc')}
                    iconValue="success"
                    buttons={
                      <>
                        <OutlineButton buttonText={t('goToNFTs', { ns: 'common' })} color="black" size="md" href="" />
                        <OutlineButton buttonText={t('goToMarketplace', { ns: 'common' })} color="black" size="md" href="" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6.7 상태 변경 완료</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={'Change Status'} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    title={t('listProcess.resultChangeNotForSale.title')}
                    cont={t('listProcess.resultChangeNotForSale.desc')}
                    iconValue="success"
                    buttons={
                      <>
                        <OutlineButton buttonText={t('goToNFTs', { ns: 'common' })} color="black" size="md" href="" />
                        <ShareButton buttonType="bgButton" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6.8 Offer 수락 완료</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={'Accept Offer'} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    title={t('listProcess.resultAccept.title')}
                    cont={t('listProcess.resultAccept.desc')}
                    iconValue="success"
                    buttons={
                      <>
                        <OutlineButton buttonText={t('goToNFTs', { ns: 'common' })} color="black" size="md" href="" />
                        <OutlineButton buttonText={t('goToMarketplace', { ns: 'common' })} color="black" size="md" href="" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>5.2.6.9 상태 변경 완료</div>
            <div className={cn('marketplace-bid-wrap')}>
              <ContentTitle title={'Change Status'} />
              <div className={cn('bid-top-section')}>
                <div className={cn('bid-cont-wrap')}>
                  <MarketplaceProfileCard cardData={nftCardData[0]} />
                  <MarketplaceState
                    title={t('listProcess.resultChange.title')}
                    cont={t('listProcess.resultChange.desc')}
                    iconValue="success"
                    buttons={
                      <>
                        <OutlineButton buttonText={t('goToNFTs', { ns: 'common' })} color="black" size="md" href="" />
                        <ShareButton buttonType="bgButton" />
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'marketplace'])),
    },
  };
};

export default Common;
