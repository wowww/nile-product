import cn from 'classnames';
import Image from 'next/image';
import { Popover } from 'antd';
import Tag from '@/components/tag/Tag';
import ShareButton from '../button/ShareButton';
import BgButton from '../button/BgButton';
import PaymentModal from '../modal/PaymentModal';
import { nftCardData } from '@/components/marketplace/cardData';
import MarketplaceDetailPriceInfo from './detail/MarketplaceDetailPriceInfo';
import { ReactNode, useState } from 'react';
import MarketplaceDetailFloatingBar from './detail/MarketplaceDetailFloatingBar';
import OutlineButton from '../button/OutlineButton';
import BidHistoryModal from '../modal/BidHistoryModal';
import { NileCDNLoader } from '../../utils/image/loader';
import { ReactSVG } from 'react-svg';

export default {
  title: 'Marketplace/DetailTopSell',
  parameters: {
    componentSubtitle: 'detail top - 판매',
  },
};

const cardData = nftCardData[0];
const stateTag = (state: string) => {
  switch (state) {
    case 'upcoming':
      return (
        <Tag size="md-m" color="black">
          Upcoming
        </Tag>
      );
    case 'auction':
      return (
        <Tag type="market" size="md-m" color="negative">
          On Action
        </Tag>
      );
    case 'closed':
      return (
        <Tag size="md-m" color="gray" bg>
          Closed
        </Tag>
      );
    case 'buy-now':
      return (
        <Tag size="md-m" color="black">
          Buy Now
        </Tag>
      );
    case 'offer-open':
      return (
        <Tag size="md-m" color="black">
          Open for Offers
        </Tag>
      );
    case 'not-sale':
      return (
        <Tag size="md-m" bg disabled>
          Not for Sale
        </Tag>
      );
    default:
      return false;
  }
};

const Layout = ({ children, height }: { children: ReactNode; height: number }) => {
  return (
    <>
      <div style={{ minHeight: height }}>{children}</div>;
    </>
  );
};

export const BeforeSellOpenForBid = () => {
  const [modalType, setModalType] = useState<string>('');
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };
  const modalEvent = () => {
    console.log('모달 내 버튼 클릭');
    setIsPaymentModal(false);
  };

  return (
    <Layout height={1000}>
      <div className={cn('common-name')}>판매 등록 전 상태 (Open for Bid)</div>
      <div className={cn('marketplace-top-section')}>
        <div className={cn('img-block')}>
          <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
        </div>
        <div className={cn('info-block')}>
          <div className={cn('top-info-wrap')}>
            <div className={cn('status-wrap')}>
              {stateTag('offer-open')}
              <ul className={cn('utils')}>
                <div className={cn('watch')}>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg' />
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
              <MarketplaceDetailPriceInfo type="text" detailType="price" title="Last Sale" value="870,000" unit="WEMIX$" />

              {/* 아바타 타입 : 사용자 */}
              <MarketplaceDetailPriceInfo type="avatar" detailType="user" title="Owner" userName="beeple_crap" avatarClass="type1" />
            </div>

            <div className={cn('button-block')}>
              <BgButton buttonText="List for Sale" color="black" size="lg" />
            </div>

            <div className={cn('etc-wrap')}>
              <div className={cn('setting-btn-wrap')}>
                <button
                  type="button"
                  className={cn('btn-setting')}
                  onClick={() => {
                    openPaymentModal('changeNotSale');
                  }}
                >
                  I don’t want to get offer
                </button>
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <div className={cn('tooltip-contents')}>
                        판매를 위해 Listing하지 않더라도, 내가 보유한 NFT에 관심이 있는 사용자가 자유롭게 가격을 제안할 수 있습니다. 가격 제안을 받고
                        싶지 않다면 미판매 상태로 변경해 주세요. 상태 변경 시 Gas Fee를 지불해야 합니다.
                      </div>
                    }
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceDetailFloatingBar data={cardData} dealType="sell" type="listing" progress="before" activate />
      <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} />
    </Layout>
  );
};

export const BeforeSellNotSale = () => {
  const [modalType, setModalType] = useState<string>('');
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };
  const modalEvent = () => {
    console.log('모달 내 버튼 클릭');
    setIsPaymentModal(false);
  };
  return (
    <Layout height={1000}>
      <div className={cn('common-name')}>판매 등록 전 상태 (Not Sale)</div>
      <div className={cn('marketplace-top-section')}>
        <div className={cn('img-block')}>
          <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
        </div>
        <div className={cn('info-block')}>
          <div className={cn('top-info-wrap')}>
            <div className={cn('status-wrap')}>
              {stateTag('not-sale')}
              <ul className={cn('utils')}>
                <div className={cn('watch')}>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg' />
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
              <MarketplaceDetailPriceInfo type="text" detailType="price" title="Last Sale" value="870,000" unit="WEMIX$" />

              {/* 아바타 타입 : 사용자 */}
              <MarketplaceDetailPriceInfo type="avatar" detailType="user" title="Owner" userName="beeple_crap" />
            </div>
            <div className={cn('button-block')}>
              <BgButton buttonText="List for Sale" color="black" size="lg" />
            </div>
            <div className={cn('etc-wrap')}>
              <div className={cn('setting-btn-wrap')}>
                <button
                  type="button"
                  className={cn('btn-setting')}
                  onClick={() => {
                    openPaymentModal('changeOpenOffer');
                  }}
                >
                  I want to get offer
                </button>
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <div className={cn('tooltip-contents')}>
                        가격 제안을 받고 싶다면 Open for Offers 상태로 변경해 주세요. 판매를 위해 Listing하지 않더라도, 내가 보유한 NFT에 관심이 있는
                        사용자가 자유롭게 가격을 제안할 수 있게 됩니다. 상태 변경 시 Gas Fee를 지불해야 합니다.
                      </div>
                    }
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg'  />
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceDetailFloatingBar data={cardData} dealType="sell" type="listing" progress="before" activate />
      <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} />
    </Layout>
  );
};

export const FixedPriceIngNFTBeforeOffer = () => {
  const [modalType, setModalType] = useState<string>('');
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };
  const modalEvent = () => {
    console.log('모달 내 버튼 클릭');
    setIsPaymentModal(false);
  };
  return (
    <Layout height={1000}>
      <div className={cn('marketplace-top-section')}>
        <div className={cn('img-block')}>
          <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
        </div>
        <div className={cn('info-block')}>
          <div className={cn('top-info-wrap')}>
            <div className={cn('status-wrap')}>
              {stateTag('buy-now')}
              <ul className={cn('utils')}>
                <div className={cn('watch')}>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg' />
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
              <MarketplaceDetailPriceInfo type="text" detailType="price" title="Fixed Price" value="870,000" unit="WEMIX$" />

              {/* 아바타 타입 : 사용자 */}
              <MarketplaceDetailPriceInfo type="avatar" detailType="user" title="Owner" userName="beeple_crap" />
            </div>

            <div className={cn('button-block')}>
              <BgButton buttonText="Edit or Cancel Listing" color="black" size="lg" />
            </div>
            <div className={cn('etc-wrap')}>
              <div className={cn('setting-btn-wrap')}>
                <button
                  type="button"
                  className={cn('btn-setting')}
                  onClick={() => {
                    openPaymentModal('changeNotSale');
                  }}
                >
                  I don’t want to get offer
                </button>
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <div className={cn('tooltip-contents')}>
                        판매를 위해 Listing하지 않더라도, 내가 보유한 NFT에 관심이 있는 사용자가 자유롭게 가격을 제안할 수 있습니다. 가격 제안을 받고
                        싶지 않다면 미판매 상태로 변경해 주세요. 상태 변경 시 Gas Fee를 지불해야 합니다.
                      </div>
                    }
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg'  />
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceDetailFloatingBar data={cardData} dealType="sell" type="buyNow" progress="before" activate />
      <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} />
    </Layout>
  );
};

export const FixedPriceIngNFTAfterOffer = () => {
  const [modalType, setModalType] = useState<string>('');
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const [isBidHistoryModal, setIsBidHistoryModal] = useState<boolean>(false);
  const [historyModalType, setHistoryModalType] = useState<string>('');
  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };
  const modalEvent = () => {
    console.log('모달 내 버튼 클릭');
    setIsPaymentModal(false);
  };
  const openHistoryModal = (type: string) => {
    setIsBidHistoryModal(true);
    setHistoryModalType(type);
  };
  return (
    <Layout height={1000}>
      <div className={cn('common-name')}>고정가 판매 중인 NFT 상세 (Offer 발생 후)</div>
      <div className={cn('marketplace-top-section')}>
        <div className={cn('img-block')}>
          <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" loading="eager" />
        </div>
        <div className={cn('info-block')}>
          <div className={cn('top-info-wrap')}>
            <div className={cn('status-wrap')}>
              {stateTag('upcoming')}
              <ul className={cn('utils')}>
                <div className={cn('watch')}>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg' />
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
              <MarketplaceDetailPriceInfo type="text" detailType="price" title="Fixed Price" value="870,000" unit="WEMIX$" />

              {/* 아바타 타입 : 가격 */}
              <MarketplaceDetailPriceInfo type="avatar" detailType="price" title="Highst Offer Now" value="870,000" unit="WE" />
            </div>

            <div className={cn('button-block')}>
              <OutlineButton buttonText="Edit or Cancel Listing" color="black" size="lg" />
              <BgButton
                buttonText="Sell at Offer price"
                color="black"
                size="lg"
                onClick={() => {
                  openHistoryModal('sell');
                }}
              />
            </div>

            <div className={cn('etc-wrap')}>
              <div className={cn('setting-btn-wrap')}>
                <button
                  type="button"
                  className={cn('btn-setting')}
                  onClick={() => {
                    openPaymentModal('changeNotSale');
                  }}
                >
                  I don’t want to get offer
                </button>
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <div className={cn('tooltip-contents')}>
                        판매를 위해 Listing하지 않더라도, 내가 보유한 NFT에 관심이 있는 사용자가 자유롭게 가격을 제안할 수 있습니다. 가격 제안을 받고
                        싶지 않다면 미판매 상태로 변경해 주세요. 상태 변경 시 Gas Fee를 지불해야 합니다.
                      </div>
                    }
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg'  />
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceDetailFloatingBar data={cardData} dealType="sell" type="buyNow" progress="after" activate />
      <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} />
      <BidHistoryModal isOpen={isBidHistoryModal} setIsOpen={setIsBidHistoryModal} type={historyModalType} />
    </Layout>
  );
};

export const ProposalIngNFTBeforeBid = () => {
  const [modalType, setModalType] = useState<string>('');
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };

  const modalEvent = () => {
    console.log('모달 내 버튼 클릭');
    setIsPaymentModal(false);
  };

  return (
    <Layout height={1000}>
      <div className={cn('marketplace-top-section')}>
        <div className={cn('img-block')}>
          <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" loading="eager" />
        </div>
        <div className={cn('info-block')}>
          <div className={cn('top-info-wrap')}>
            <div className={cn('status-wrap')}>
              {stateTag('offer-open')}
              <ul className={cn('utils')}>
                <div className={cn('watch')}>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg' />
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
              <MarketplaceDetailPriceInfo type="text" detailType="price" title="Last Price" value="870,000" unit="WEMIX$" />

              {/* 아바타 타입 : 사용자 */}
              <MarketplaceDetailPriceInfo type="avatar" detailType="user" title="Owner" userName="beeple_crap" />
            </div>

            <div className={cn('button-block')}>
              <BgButton buttonText="List for Sale" color="black" size="lg" />
            </div>

            <div className={cn('etc-wrap')}>
              <div className={cn('setting-btn-wrap')}>
                <button
                  type="button"
                  className={cn('btn-setting')}
                  onClick={() => {
                    openPaymentModal('changeNotSale');
                  }}
                >
                  I don’t want to get offer
                </button>
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <div className={cn('tooltip-contents')}>
                        판매를 위해 Listing하지 않더라도, 내가 보유한 NFT에 관심이 있는 사용자가 자유롭게 가격을 제안할 수 있습니다. 가격 제안을 받고
                        싶지 않다면 미판매 상태로 변경해 주세요. 상태 변경 시 Gas Fee를 지불해야 합니다.
                      </div>
                    }
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg'  />
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceDetailFloatingBar data={cardData} dealType="sell" type="openForBid" progress="before" activate />
      <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} />
    </Layout>
  );
};

export const ProposalIngNFTAfterBid = () => {
  const [modalType, setModalType] = useState<string>('');
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const [isBidHistoryModal, setIsBidHistoryModal] = useState<boolean>(false);
  const [historyModalType, setHistoryModalType] = useState<string>('');
  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };

  const modalEvent = () => {
    console.log('모달 내 버튼 클릭');
    setIsPaymentModal(false);
  };

  const openHistoryModal = (type: string) => {
    setIsBidHistoryModal(true);
    setHistoryModalType(type);
  };
  return (
    <Layout height={1000}>
      <div className={cn('marketplace-top-section')}>
        <div className={cn('img-block')}>
          <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" loading="eager" />
        </div>
        <div className={cn('info-block')}>
          <div className={cn('top-info-wrap')}>
            <div className={cn('status-wrap')}>
              {stateTag('offer-open')}
              <ul className={cn('utils')}>
                <div className={cn('watch')}>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg' />
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
              {/* 
                      아바타 타입 : 가격 
                      TODO: 프로필 팝업 적용 필요
                    */}
              <MarketplaceDetailPriceInfo
                type="avatar"
                detailType="price"
                title="Highst Offer Now"
                value="870,000"
                unit="WEMEX$"
                avatarBackground='url("https://picsum.photos/32/32/?image=1")'
              />
              {/* 아바타 타입 : 사용자 */}
              <MarketplaceDetailPriceInfo type="avatar" detailType="user" title="Owner" userName="beeple_crap" avatarClass="type4" />
            </div>

            <div className={cn('button-block')}>
              <OutlineButton buttonText="List for Sale" color="black" size="lg" />
              <BgButton
                buttonText="Sell at Offer price"
                color="black"
                size="lg"
                onClick={() => {
                  openHistoryModal('sell');
                }}
              />
            </div>

            <div className={cn('etc-wrap')}>
              <div className={cn('setting-btn-wrap')}>
                <button
                  type="button"
                  className={cn('btn-setting')}
                  onClick={() => {
                    openPaymentModal('changeNotSale');
                  }}
                >
                  I don’t want to get offer
                </button>
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <div className={cn('tooltip-contents')}>
                        판매를 위해 Listing하지 않더라도, 내가 보유한 NFT에 관심이 있는 사용자가 자유롭게 가격을 제안할 수 있습니다. 가격 제안을 받고
                        싶지 않다면 미판매 상태로 변경해 주세요. 상태 변경 시 Gas Fee를 지불해야 합니다.
                      </div>
                    }
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg'  />
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceDetailFloatingBar data={cardData} dealType="sell" type="openForBid" progress="after" activate />
      <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} />
      <BidHistoryModal isOpen={isBidHistoryModal} setIsOpen={setIsBidHistoryModal} type={historyModalType} />
    </Layout>
  );
};

export const UnSold = () => {
  const [modalType, setModalType] = useState<string>('');
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const openPaymentModal = (type: string) => {
    setIsPaymentModal(true);
    setModalType(type);
  };

  const modalEvent = () => {
    console.log('모달 내 버튼 클릭');
    setIsPaymentModal(false);
  };

  return (
    <Layout height={1000}>
      <div className={cn('marketplace-top-section')}>
        <div className={cn('img-block')}>
          <Image src={cardData.imgUrl} alt="" layout="fill" quality="100" loading="eager" />
        </div>
        <div className={cn('info-block')}>
          <div className={cn('top-info-wrap')}>
            <div className={cn('status-wrap')}>
              {stateTag('not-sale')}
              <ul className={cn('utils')}>
                <div className={cn('watch')}>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg' />
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
              <MarketplaceDetailPriceInfo type="text" detailType="price" title="Last Sale" value="870,000" unit="WEMIX$" />

              {/* 아바타 타입 : 사용자 */}
              <MarketplaceDetailPriceInfo type="avatar" detailType="user" title="Owner" userName="beeple_crap" avatarClass="type3" />
            </div>

            <div className={cn('button-block')}>
              <BgButton buttonText="List for Sale" color="black" size="lg" />
            </div>

            <div className={cn('etc-wrap')}>
              <div className={cn('setting-btn-wrap')}>
                <button
                  type="button"
                  className={cn('btn-setting')}
                  onClick={() => {
                    openPaymentModal('changeOpenOffer');
                  }}
                >
                  I want to get offer
                </button>
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <div className={cn('tooltip-contents')}>
                        가격 제안을 받고 싶다면 Open for Offers 상태로 변경해 주세요. 판매를 위해 Listing하지 않더라도, 내가 보유한 NFT에 관심이 있는
                        사용자가 자유롭게 가격을 제안할 수 있게 됩니다. 상태 변경 시 Gas Fee를 지불해야 합니다.
                      </div>
                    }
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg'  />
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceDetailFloatingBar data={cardData} dealType="sell" type="notForSale" progress="after" activate />
      <PaymentModal isModal={isPaymentModal} setIsModal={setIsPaymentModal} modalEvent={modalEvent} type={modalType} />
    </Layout>
  );
};
