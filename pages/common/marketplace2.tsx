import { useEffect, useRef, useState } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Helmet } from 'react-helmet-async';
import * as Scroll from 'react-scroll';
import Image from 'next/image';
import cn from 'classnames';

import IconWatch from '@images/icon/ico_watch.svg';
import IconInfo from '@images/icon/ico_info.svg';
import IconBidders from '@images/icon/ico_bidders.svg';

import { Popover, message } from 'antd';
import { nftCardData } from '@/components/marketplace/cardData';
import Tag from '@/components/tag/Tag';
import MarketplaceDetailFloatingBar from '@/components/marketplace/detail/MarketplaceDetailFloatingBar';
import LikeButton from '@/components/button/LikeButton';
import ShareButton from '@/components/button/ShareButton';
import MarketplaceDetailPriceInfo from '@/components/marketplace/detail/MarketplaceDetailPriceInfo';
import BgButton from '@/components/button/BgButton';
import PaymentModal from '@/components/modal/PaymentModal';
import MakeOfferModal from '@/components/modal/MakeOfferModal';
import BidHistoryModal from '@/components/modal/BidHistoryModal';
import OutlineButton from '@/components/button/OutlineButton';
import NumberInput from '@/components/input/NumberInput';
import MarketplaceDetailBidList from '@/components/marketplace/detail/MarketplaceDetailBidList';
import MarketplaceDetailBidResult from '@/components/marketplace/detail/MarketplaceDetailBidResult';
import MarketplaceDetailLink from '@/components/marketplace/detail/MarketplaceDetailLink';
import {useRouter} from "next/router";

const Common = () => {

  const router = useRouter();

  if (process.env.NODE_ENV === 'production') {
    useEffect(() => {
      router.replace('/');
    }, [router]);

    return null;
  }

  const { t } = useTranslation(['marketplace', 'common']);
  const cardData = nftCardData[0];
  const [sectionLinks, setSectionLinks] = useState<boolean>();
  const sectionLinkAll = useRef<any>([]);
  const [modalType, setModalType] = useState<string>('');
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const [isMakeOfferModal, setIsMakeOfferModal] = useState<boolean>(false);
  const [isBidHistoryModal, setIsBidHistoryModal] = useState<boolean>(false);
  const [historyModalType, setHistoryModalType] = useState<string>('');

  const infoTitleRef = useRef<HTMLElement | null>(null);
  const [infoTitleWidth, setInfoTitleWidth] = useState<number>(0);

  useEffect(() => {
    if (infoTitleRef.current === null) return;
    const width = infoTitleRef.current.getBoundingClientRect().width;
    setInfoTitleWidth(width);
  }, [infoTitleRef.current]);

  // 팝업 호출 데이터 Start
  const [isModalSm11, setModalSm11] = useState(false);

  const modalEvent = () => {
    setModalSm11(true);
  };

  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };

  const openHistoryModal = (type: string) => {
    setIsBidHistoryModal(true);
    setHistoryModalType(type);
  };

  const openMakeOfferModal = () => {
    setIsMakeOfferModal(true);
  };

  const stateTag = (state: string) => {
    switch (state) {
      case 'upcoming':
        return (
          <Tag size="md-m" color="black">
            Upcoming
          </Tag>
        );
      case 'auction-start':
        return (
          <Tag type="market" size="md-m" color="negative">
            On Auction
          </Tag>
        );
      case 'auction-ing':
        return (
          <Tag type="market" size="lg-m" color="black" bg>
            01h : 23m : 33s
          </Tag>
        );
      case 'closed':
        return (
          <Tag size="md-m" color="gray" bg>
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Auction Closed
          </Tag>
        );
      case 'buy-now':
        return (
          <Tag size="md-m" color="black">
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Buy Now
          </Tag>
        );
      case 'offer-open':
        return (
          <Tag size="md-m" color="black">
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Open for Offers
          </Tag>
        );
      case 'not-sale':
        return (
          <Tag size="md-m" bg disabled>
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Not for Sale
          </Tag>
        );
      default:
        return false;
    }
  };

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
        <title>Common &gt; NILE &gt; Marketplace2</title>
        <body className={cn('common-wrap')} />
      </Helmet>
      <div className={cn('common-content-wrap')}>
        <div className={cn('common-links')}>
          <a href="/common">Common</a>
          <a href="/common/dao">Dao</a>
          <a href="/common/marketplace">Marketplace</a>
          <a href="/common/marketplace2">MarketplaceDetail</a>
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
          <h1 className={cn('common-title')} id="DetailTopBuy">
            detail top - 구매 (Auction)
          </h1>
          <div>
            <div className={cn('common-name')}>옥션 시작 전 상세</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('upcoming')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      {/*<LikeButton count={cardData.likeCount} />*/}
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Starting Bid"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 텍스트 타입 : 시간 (판매 전) */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        title="Auction Starts In"
                        value="02d : 12h : 39m : 23s"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>
                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt1', { ns: 'common' })}</li>
                    <li>{t('marketPlaceDetailTop.infoTxt2', { ns: 'common' })}</li>
                    <li>
                      <Trans
                        i18nKey="marketPlaceDetailTop.infoTxt3"
                        ns="common"
                        values={{
                          time: '2022-11-22 12:00 PM',
                        }}
                      />
                    </li>
                  </ul>
                  <MarketplaceDetailLink />
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>옥션 중인 NFT 상세 (비딩 전)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('auction-start')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      {/*<LikeButton count={cardData.likeCount} />*/}
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Starting Bid"
                        value="1,500"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt1', { ns: 'common' })}</li>
                    <li>{t('marketPlaceDetailTop.infoTxt2', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink />

                  <div className={cn('amount-block')}>
                    <NumberInput unit="WEMIX$" minusDisabled />
                    <BgButton
                      buttonText={t('placeBid', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('placeBid');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="auction"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>옥션 중인 NFT 상세 (비딩 후)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('auction-ing')}
                    <ul className={cn('utils')}>
                      <div className={cn('bidders')}>
                        <IconBidders /> <span className={cn('bidders-number')}>{1} Bidders</span>
                      </div>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      {/*<LikeButton count={cardData.likeCount} />*/}
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 시간 (판매 중) */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Starting Bid"
                        value="1,100"
                        unit="WEMIX$"
                        hasHistory
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  {/*{cardData.bidList && <MarketplaceDetailBidList data={cardData.bidList} />}*/}

                  <div className={cn('amount-block')}>
                    <NumberInput unit="WEMIX$" minusDisabled />
                    <BgButton
                      buttonText={t('placeBid', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('placeBid');
                      }}
                    />
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>
                      {/* 22.11.14 수정: 툴팁 없이 풀어쓰는 것으로 기획 변경된 것 확인 */}
                      {t('marketPlaceDetailTop.infoTxt1', { ns: 'common' })}
                    </li>
                    <li>
                      <Trans
                        i18nKey="marketPlaceDetailTop.infoTxt4"
                        ns="common"
                        values={{
                          time: '2022.03.02 17:00',
                        }}
                      />
                    </li>
                    <li className={cn('has-popup')}>
                      {t('marketPlaceDetailTop.infoTxt5', { ns: 'common' })}{' '}
                      <button
                        type="button"
                        className={cn('btn-setting')}
                        onClick={() => {
                          openPaymentModal('retractingBid');
                        }}
                      >
                        {t('marketplaceModal.withdrawMyBid', { ns: 'common' })}
                      </button>
                    </li>
                  </ul>

                  <MarketplaceDetailLink />
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="auction"*/}
            {/*  progress="after"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>본인이 최고 응찰자일 경우 (Place Bid/ 내 응찰 철회하기 버튼 비활성화)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('auction-ing')}
                    <ul className={cn('utils')}>
                      <div className={cn('bidders')}>
                        <IconBidders /> <span className={cn('bidders-number')}>{1} Bidders</span>
                      </div>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      {/*<LikeButton count={cardData.likeCount} />*/}
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 시간 (판매 중) */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Starting Bid"
                        value="1,100"
                        unit="WEMIX$"
                        hasHistory
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  {/*{cardData.bidList && <MarketplaceDetailBidList data={cardData.bidList} />}*/}

                  <div className={cn('amount-block')}>
                    <NumberInput unit="WEMIX$" inputDisabled plusDisabled minusDisabled />
                    <BgButton
                      buttonText={t('placeBid', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('placeBid');
                      }}
                      disabled
                    />
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>
                      {/* 22.11.14 수정: 툴팁 없이 풀어쓰는 것으로 기획 변경된 것 확인 */}
                      {t('marketPlaceDetailTop.infoTxt1', { ns: 'common' })}
                    </li>
                    <li>
                      <Trans
                        i18nKey="marketPlaceDetailTop.infoTxt4"
                        ns="common"
                        values={{
                          time: '2022.03.02 17:00',
                        }}
                      />
                    </li>
                    <li className={cn('has-popup')}>
                      {t('marketPlaceDetailTop.infoTxt5', { ns: 'common' })}{' '}
                      <button
                        type="button"
                        className={cn('btn-setting')}
                        onClick={() => {
                          openPaymentModal('retractingBid');
                        }}
                      >
                        {t('marketplaceModal.withdrawMyBid', { ns: 'common' })}
                      </button>
                    </li>
                  </ul>

                  <MarketplaceDetailLink />
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="auction"*/}
            {/*  progress="highest"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>본인이 최고 응찰자가 아닌 경우 (Place Bid/ 내 응찰 철회하기 버튼 활성화) </div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('auction-ing')}
                    <ul className={cn('utils')}>
                      <div className={cn('bidders')}>
                        <IconBidders /> <span className={cn('bidders-number')}>{1} Bidders</span>
                      </div>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 시간 (판매 중) */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Starting Bid"
                        value="1,100"
                        unit="WEMIX$"
                        hasHistory
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  {/*{cardData.bidList && <MarketplaceDetailBidList data={cardData.bidList} />}*/}

                  <div className={cn('amount-block')}>
                    <NumberInput unit="WEMIX$" minusDisabled />
                    <BgButton
                      buttonText={t('placeBid', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('placeBid');
                      }}
                    />
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>
                      {/* 22.11.14 수정: 툴팁 없이 풀어쓰는 것으로 기획 변경된 것 확인 */}
                      {t('marketPlaceDetailTop.infoTxt1', { ns: 'common' })}
                    </li>
                    <li>
                      <Trans
                        i18nKey="marketPlaceDetailTop.infoTxt4"
                        ns="common"
                        values={{
                          time: '2022.03.02 17:00',
                        }}
                      />
                    </li>
                    <li className={cn('has-popup')}>
                      {t('marketPlaceDetailTop.infoTxt5', { ns: 'common' })}{' '}
                      <button
                        type="button"
                        className={cn('btn-setting')}
                        onClick={() => {
                          openPaymentModal('retractingBid');
                        }}
                      >
                        {t('marketplaceModal.withdrawMyBid', { ns: 'common' })}
                      </button>
                    </li>
                  </ul>

                  <MarketplaceDetailLink />
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="auction"*/}
            {/*  progress="after"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>낙찰 성공 NFT 상세 화면</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('closed')}
                    <ul className={cn('utils')}>
                      <div className={cn('bidders')}>
                        <IconBidders /> <span className={cn('bidders-number')}>{1} Bidders</span>
                      </div>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <MarketplaceDetailBidResult status="success" name="UserName" price="2000" time="KST 2022-09-10 14:32 PM" />
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Final Bid"
                        value="2,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <div className={cn('button-block')}>
                    <OutlineButton
                      buttonText={t('bidHistoryPopup.title', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => openHistoryModal('buy')}
                    />
                    <BgButton
                      buttonText={t('marketplaceModal.completePayment', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('completeCheckout');
                      }}
                    />
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt6', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink exchangeType="wemix" />
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="auction"*/}
            {/*  progress="success"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>낙찰 실패 NFT 상세 화면</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('closed')}
                    <ul className={cn('utils')}>
                      <div className={cn('bidders')}>
                        <IconBidders /> <span className={cn('bidders-number')}>{1} Bidders</span>
                      </div>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  {/* 여기는 옥션 실패 정보가 들어가는 영역입니다. */}
                  <MarketplaceDetailBidResult
                    status="fail"
                    image="url(https://picsum.photos/32/32/?image=1)"
                    name="UserName"
                    price="2000"
                    time="KST 2022-09-10 14:32 PM"
                  />

                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        title="Final Bid"
                        detailType="price"
                        value="2,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <div className={cn('button-block')}>
                    <OutlineButton
                      buttonText={t('bidHistoryPopup.title', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => openHistoryModal('buy')}
                    />
                    <BgButton
                      buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('retractingBid');
                      }}
                    />
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt7', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink exchangeType="wemix" />
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="auction"*/}
            {/*  progress="fail"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>참가하지 않은 유저 화면</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('closed')}
                    <ul className={cn('utils')}>
                      <div className={cn('bidders')}>
                        <IconBidders /> <span className={cn('bidders-number')}>{1} Bidders</span>
                      </div>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <MarketplaceDetailBidResult status="success" name="UserName" price="2000" time="KST 2022-09-10 14:32 PM" />

                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        title="Final Bid"
                        detailType="price"
                        value="2,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <div className={cn('button-block')}>
                    <OutlineButton
                      buttonText={t('bidHistoryPopup.title', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => openHistoryModal('buy')}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="auction"*/}
            {/*  progress="normal"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="DetailTopBuyNow">
            detail top - 구매(Buy Now)
          </h1>
          <div>
            <div className={cn('common-name')}>고정가 판매 중인 NFT 상세 - 1차 판매인 경우</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('buy-now')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Fixed Price"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_carp"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt11', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink />

                  <div className={cn('button-block')}>
                    <BgButton
                      buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('buyNow');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="buyNow"*/}
            {/*  progress="first"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>고정가 판매 중인 NFT 상세 - 2차 판매인 경우 (제안 전)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('buy-now')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Fixed Price"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="price"
                        title={t('currentHighestOfferPrice', { ns: 'common' })}
                        userName="beeple_carp"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt12', { ns: 'common' })}</li>
                    <li>{t('marketPlaceDetailTop.infoTxt13', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink />

                  <div className={cn('button-block')}>
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
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="buyNow"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>고정가 판매 중인 NFT 상세 - 2차 판매인 경우 (제안 후)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('buy-now')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Fixed Price"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="price"
                        title={t('currentHighestOfferPrice', { ns: 'common' })}
                        userName="beeple_carp"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt12', { ns: 'common' })}</li>
                    <li className={cn('has-popup')}>
                      {t('marketPlaceDetailTop.infoTxt13', { ns: 'common' })}{' '}
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

                  <MarketplaceDetailLink />

                  <div className={cn('button-block')}>
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
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="buyNow"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>Offer 시간 만료된 화면</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('buy-now')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Fixed Price"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarBackground='url("https://picsum.photos/32/32/?image=1")'
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt8', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
                    <BgButton
                      buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('placeBid');
                      }}
                    />
                    <OutlineButton
                      buttonText={t('marketplaceModal.getMyOfferBack', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('retractingBid');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="buyNow"*/}
            {/*  progress="expired"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="DetailTopBuyOpenForOffers">
            detaip top - 구매 (Open for Offers)
          </h1>
          <div>
            <div className={cn('common-name')}>제안 받는 중인 NFT 상세 (비딩 전)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt13', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink />

                  <div className={cn('button-block')}>
                    <BgButton
                      buttonText={t('makeOffer', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openMakeOfferModal();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="openForBid"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>제안 받는 중인 NFT 상세 (제안 후)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  {/* 텍스트 타입 : 가격 */}
                  <div className={cn('price-info-block')}>
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="price"
                        title={t('currentHighestOfferPrice', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        hasHistory
                        hasHistoryType="offer"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
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

                  <MarketplaceDetailLink />

                  <div className={cn('button-block')}>
                    <BgButton
                      buttonText={t('makeOffer', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openMakeOfferModal();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="openForBid"*/}
            {/*  progress="after"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>Offer 시간 만료된 화면</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarClass="type5"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt8', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink exchangeType="wemix" />
                  <div className={cn('button-block')}>
                    <OutlineButton
                      buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('buyNow');
                      }}
                    />
                    <BgButton
                      buttonText={t('marketplaceModal.getMyOfferBack', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('retractingBid');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="openForBid"*/}
            {/*  progress="expired"*/}
            {/*  activate*/}
            {/*  watching*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>제안 실패 NFT 상세 화면</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자  */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarClass="type1"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt8', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
                    <BgButton
                      buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('retractingBid');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="openForBid"*/}
            {/*  progress="fail"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>Open for Offers 상태로 변경 확인 팝업</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자  */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarClass="type1"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt8', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink />

                  <div className={cn('button-block')}>
                    <BgButton
                      buttonText={t('openForOffers', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('changeOpenOffer');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={cn('common-name')}>Offer 수락 확인 팝업</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자  */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarClass="type1"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>{t('marketPlaceDetailTop.infoTxt8', { ns: 'common' })}</li>
                  </ul>

                  <MarketplaceDetailLink />

                  <div className={cn('button-block')}>
                    <BgButton
                      buttonText={t('acceptOffer', { ns: 'common' })}
                      color="black"
                      size="xl"
                      onClick={() => {
                        openPaymentModal('acceptOffer');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="DetailTopBuyNotForSale">
            detail top - 구매 (Not for Sale)
          </h1>
          <div>
            <div className={cn('common-name')}>미판매 상태 (알림 신청 전)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('not-sale')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <div className={cn('button-block')}>
                    <OutlineButton
                      buttonText={t('receiveNotification', { ns: 'common' })}
                      color="black"
                      size="xl"
                      iconType
                      iconValue="alarm"
                      onClick={() =>
                        message.info({ content: '알림 신청되었습니다.', key: 'toast' })
                      } /* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="notForSale"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>미판매 상태 (알림 신청 후)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('not-sale')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarClass="type3"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <div className={cn('button-block')}>
                    <OutlineButton
                      buttonText={t('cancelNotification', { ns: 'common' })}
                      color="black"
                      size="xl"
                      iconType
                      iconValue="alarm"
                      onClick={() =>
                        message.info({ content: '알림 취소되었습니다.', key: 'toast' })
                      } /* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="buy"*/}
            {/*  type="notForSale"*/}
            {/*  progress="after"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="DetailTopSell">
            detail top - 판매
          </h1>
          <div>
            <div className={cn('common-name')}>판매 등록 전 상태 (Open for Bid)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarClass="type1"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
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

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
                    <BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="sell"*/}
            {/*  type="listing"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>판매 등록 전 상태 (Not Sale)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('not-sale')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>
                  <ul className={cn('notice-block list-type-dot')}>
                    <li className={cn('has-popup')}>
                      {t('marketPlaceDetailTop.infoTxt10', { ns: 'common' })}{' '}
                      <button
                        type="button"
                        className={cn('btn-setting')}
                        onClick={() => {
                          openPaymentModal('changeOpenOffer');
                        }}
                      >
                        {t('getMakeOfferBtn', { ns: 'common' })}
                      </button>
                    </li>
                  </ul>

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
                    <BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="sell"*/}
            {/*  type="listing"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>고정가 판매 중인 NFT 상세 (Offer 발생 전)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('buy-now')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Fixed Price"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
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

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
                    <BgButton buttonText={t('editOrCancel', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="sell"*/}
            {/*  type="buyNow"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>고정가 판매 중인 NFT 상세 (Offer 발생 후)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('upcoming')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Fixed Price"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="price"
                        title={t('currentHighestOfferPrice', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li>
                      {t('marketPlaceDetailTop.infoTxt9', { ns: 'common' })}
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

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
                    <OutlineButton buttonText={t('editOrCancel', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />
                    <BgButton
                      buttonText="Sell at Offer price"
                      color="black"
                      size="xl"
                      onClick={() => {
                        openHistoryModal('sell');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="sell"*/}
            {/*  type="buyNow"*/}
            {/*  progress="after"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>제안 받는 중인 NFT 상세 (비딩 전)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title="Last Price"
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
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

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
                    <BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="sell"*/}
            {/*  type="openForBid"*/}
            {/*  progress="before"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>제안 받는 중인 NFT 상세 (비딩 후)</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('offer-open')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/*
                      아바타 타입 : 가격
                      TODO: 프로필 팝업 적용 필요
                    */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="price"
                        title={t('currentHighestOfferPrice', { ns: 'common' })}
                        value="870,000"
                        unit="WEMEX$"
                        avatarBackground='url("https://picsum.photos/32/32/?image=1")'
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarClass="type4"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
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

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
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
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="sell"*/}
            {/*  type="openForBid"*/}
            {/*  progress="after"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}

            <div className={cn('common-name')}>미판매 상태</div>
            <div className={cn('marketplace-top-section')}>
              <div className={cn('img-block')}>
                <Image src={cardData.imgUrl} alt="" layout="fill" quality={100} />
              </div>
              <div className={cn('info-block')}>
                <div className={cn('top-info-wrap')}>
                  <div className={cn('status-wrap')}>
                    {stateTag('not-sale')}
                    <ul className={cn('utils')}>
                      <div className={cn('watch')}>
                        <IconWatch />
                        <span className={cn('watch-number')}>123</span>
                      </div>
                      <LikeButton count={cardData.likeCount} />
                      <ShareButton />
                    </ul>
                  </div>
                  <div className={cn('title-wrap')}>
                    <h2>
                      <span className={cn('collection-name')}>{cardData.collectionName}</span>
                      <strong className={cn('product-title')}>{cardData.productTitle}</strong>
                    </h2>
                    <p className={cn('edition-info')}>
                      #Edition {cardData.editionNum} of {cardData.editionTotalNum}
                    </p>
                  </div>
                </div>
                <div className={cn('bottom-info-wrap')}>
                  <div className={cn('price-info-block')}>
                    {/* 텍스트 타입 : 가격 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="text"
                        detailType="price"
                        title={t('lastSale', { ns: 'common' })}
                        value="870,000"
                        unit="WEMIX$"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>

                    {/* 아바타 타입 : 사용자 */}
                    <div className={cn('price-info-wrap')}>
                      <MarketplaceDetailPriceInfo
                        type="avatar"
                        detailType="user"
                        title="Owner"
                        userName="beeple_crap"
                        avatarClass="type3"
                        setBidHistoryModal={setIsBidHistoryModal}
                        setBidHistoryModalType={setHistoryModalType}
                      />
                    </div>
                  </div>

                  <ul className={cn('notice-block list-type-dot')}>
                    <li className={cn('has-popup')}>
                      {t('marketPlaceDetailTop.infoTxt10', { ns: 'common' })}{' '}
                      <button
                        type="button"
                        className={cn('btn-setting')}
                        onClick={() => {
                          openPaymentModal('changeOpenOffer');
                        }}
                      >
                        {t('getMakeOfferBtn', { ns: 'common' })}
                      </button>
                    </li>
                  </ul>

                  <MarketplaceDetailLink exchangeType="wemix" />

                  <div className={cn('button-block')}>
                    <BgButton buttonText={t('createListing', { ns: 'common' })} color="black" size="xl" href="/marketplace/listing" />
                  </div>
                </div>
              </div>
            </div>
            {/*<MarketplaceDetailFloatingBar*/}
            {/*  data={cardData}*/}
            {/*  dealType="sell"*/}
            {/*  type="notForSale"*/}
            {/*  progress="after"*/}
            {/*  activate*/}
            {/*  setPaymentModal={setIsPaymentModal}*/}
            {/*  setMakeOfferModal={setIsMakeOfferModal}*/}
            {/*  setBidHistoryModal={setIsBidHistoryModal}*/}
            {/*  setPaymentModalType={setModalType}*/}
            {/*  setBidHistoryModalType={setHistoryModalType}*/}
            {/*/>*/}
          </div>

          <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} approve={() => console.log('approve')} approved={true} />
          <MakeOfferModal isOpen={isMakeOfferModal} setIsOpen={setIsMakeOfferModal} />
          <BidHistoryModal isOpen={isBidHistoryModal} setIsOpen={setIsBidHistoryModal} type={historyModalType} />
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
