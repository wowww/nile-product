/**
 * @param isModal boolean : 모달 show, hide 상태
 * @param setIsModal isModal 값 제어
 * @param modalEvent 모달 내 버튼 이벤트
 * @param type: 'placeBid': 응찰금 결제, 결제 확인 | 'retractingBid' : 응찰 취소 | 'completeCheckout' : 작품 수령 | 'changeNotSale' : Not for sale 로 상태 변화 | 'changeOpenOffer' : open for offer로 상태 변화  | 'acceptOffer' : 오퍼 수락 | 'getBidBack' : 환불 확인
 */

import cn from 'classnames';
import Image from 'next/image';
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import RefreshCountdownButton from '@/components/button/RefreshCountdownButton';
import Tag from '@/components/tag/Tag';
import { useTranslation } from 'next-i18next';
import NileNft from '@/models/nile/marketplace/NileNft';
import { useEffect, useMemo, useState } from 'react';
import { NileCDNLoader } from '@utils/image/loader';
import { useNumberFormatter } from '@utils/formatter/number';
import { fromWei, toBN } from 'web3-utils';
import { useAtom, useAtomValue } from 'jotai';
import { nileWalletAtom, nileWalletMetaAtom, provider } from '@/state/nileWalletAtom';
import { addressListAtom, contractsAtom, tokensAtom } from '@/state/web3Atom';
import { TOKEN_MAX_APPROVE_AMOUNT, weiToEther } from '@utils/web3Utils';
import { types } from 'sass';

interface ModalProps {
  nft?: NileNft;
  price?: number;
  offsetPrice?: string;
  lastBidPrice?: number;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  modalEvent: () => void;
  type: string;
  approved?: boolean,
  approve?: () => void;
  orderId?: number;
}

const PaymentModal = (props: ModalProps) => {

  const { isModal, setIsModal, modalEvent, type, nft, price, offsetPrice, lastBidPrice, approve, orderId } = props;
  /* 22.11.03 수정: useTranslation 추가 */
  const { t } = useTranslation(['marketplace', 'common']);
  const { shorthanded } = useNumberFormatter();

  const nileWallet = useAtomValue(nileWalletAtom);
  const tokens = useAtomValue(tokensAtom);
  const nileWalletMeta = useAtomValue(nileWalletMetaAtom);
  const [addressList, setAddressList] = useAtom(addressListAtom);
  const contracts = useAtomValue(contractsAtom);

  const [coinBalance, setCoinBalance] = useState('0');
  const [balance, setBalance] = useState('0');

  const [notEnoughCoin, setNotEnoughCoin] = useState(false);
  const [notEnoughToken, setNotEnoughToken] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [estimatedGasFee, setEstimatedGasFee] = useState('0');
  const [etherGas, setEtherGas] = useState('0');

  const [approved, setApproved] = useState(false);

  const getBalance = () => {
    contracts.ERC20?.methods.balanceOf(nileWallet).call({}, (err: any, res: any) => {
      setBalance(res);
    });

    provider.web3.eth.getBalance(nileWallet).then((res)=> {
      setCoinBalance(res);
    });
  }

  const checkFee = async () => {
    const gasPrice = await provider.web3.eth.getGasPrice();
    setEstimatedGasFee(gasPrice);
    setEtherGas(weiToEther(gasPrice));
  }

  const checkApproved = async () => {
    const maxAmount = await contracts.ERC20?.methods.allowance(nileWallet, addressList['EnglishAuctionOrder']).call();
    console.log(maxAmount);
    console.log(TOKEN_MAX_APPROVE_AMOUNT);
    setApproved(maxAmount === TOKEN_MAX_APPROVE_AMOUNT);
  };


  useEffect(() => {
    console.log(offsetPrice, balance);
    setNotEnoughToken(toBN(balance).cmp(toBN(`${offsetPrice}`)) === -1);
    setNotEnoughCoin(toBN(coinBalance).cmp(toBN(estimatedGasFee)) === -1);
  }, [offsetPrice, balance, coinBalance, estimatedGasFee])

  const evtRefresh = async () => {
    console.log('refresh');

    getBalance();
    checkFee();
  };

  const changeTitle = () => {
    switch (type) {
      case 'placeBid':
        return t('placeBid', { ns: 'common' });
      case 'retractingBid':
        return t('marketplaceModal.withdrawMyBid', { ns: 'common' });
      case 'completeCheckout':
        return t('marketplaceModal.completeCheckout', { ns: 'common' });
      case 'changeNotSale':
        return t('notForSale', { ns: 'common' });
      case 'changeOpenOffer':
        return t('openForOffers', { ns: 'common' });
      case 'acceptOffer':
        return t('acceptOffer', { ns: 'common' });
      case 'buyNow':
        return t('marketplaceModal.buyNow', { ns: 'common' });
      case 'getBidBack':
        return t('marketplaceModal.getMyBidBack', { ns: 'common' });
      default:
        return '';
    }
  };

  const changeButtonText = () => {
    switch (type) {
      case 'placeBid':
        return approved ? t('placeBid', { ns: 'common' }) : t('approveButton', { ns: 'common' });
      case 'retractingBid':
        return t('refundPopup.btn', { ns: 'common' });
      case 'completeCheckout':
        return t('marketplaceModal.confirmCheckout', { ns: 'common' });
      case 'changeNotSale':
        return t('marketplaceModal.changeStatus', { ns: 'common' });
      case 'changeOpenOffer':
        return t('marketplaceModal.changeStatus', { ns: 'common' });
      case 'acceptOffer':
        return t('acceptOffer', { ns: 'common' });
      case 'buyNow':
        return t('marketplaceModal.buyNow', { ns: 'common' });
      case 'getBidBack':
        return t('refundPopup.btn', { ns: 'common' });
      default:
        return '';
    }
  };

  const value = useMemo(() => {
    if (type === 'retractingBid') {
      return lastBidPrice;
    }
    return price;
  }, [type, price]);

  useEffect(() => {
    if(isModal) {
      getBalance();
      checkApproved();
      checkFee();
    } else {
      setApproved(false);
      setDisabled(false);
      setBalance('0');
    }
  }, [isModal]);


  return (
    /* 22.10.14 수정: destroyOnClose props 추가 */
    <ModalLayout
      wrapClassName={cn("payment-modal-wrap", !approved ? "has-notice" : '')}
      isOpen={isModal}
      setIsOpen={setIsModal}
      size="lg"
      title={changeTitle()}
      footer
      footerContent={[
        !approved ? (
          <div className={cn('footer-content')}>
            <div>
            {(notEnoughCoin || notEnoughToken) && <p className={cn('notice', 'error')}>{ t('failedPopup.txt2', { ns: 'common' })}</p>}
            <p className={cn('notice')}>{approved ? '' : t('placeBidPopup.txt4', { ns: 'common' })}</p>
            </div>
            <BgButton key="payment" disabled={notEnoughCoin} buttonText={t('approveButton', { ns: 'common' })} color="black" size="lg" onClick={approve} />
          </div>
        ) :
          <div className={cn('footer-content', 'disabled')}>
            <p className={cn('notice', (notEnoughCoin || notEnoughToken) && 'error')}>{!(notEnoughCoin || notEnoughToken) ? '' : t('failedPopup.txt2', { ns: 'common' })}</p>
            <BgButton key="payment"  disabled={notEnoughCoin || notEnoughToken} buttonText={changeButtonText()} color="black" size="lg" onClick={modalEvent} />
          </div>
      ]}
      destroyOnClose={true}
    >
      <div className={cn('payment-modal-inner')}>
        <div className={cn('inner-top-wrap')}>
          <div className={cn('inner-top')}>
            <div className={cn('img-block')}>
              {nft?.token?.image ? (
                <Image src={nft?.token?.image ?? ''} alt="" layout="fill" loader={NileCDNLoader} />
              ) : (
                <video autoPlay loop muted playsInline disablePictureInPicture>
                  <source src={nft?.token?.videoUrl ?? ''} type="video/mp4" />
                </video>
              )}
            </div>
            <div className={cn('text-block')}>
              <h1 className={cn('title')}>
                <span className={cn('collection-name')}>{nft?.token?.collection?.name}</span>
                <strong className={cn('product-name')}>{nft?.token?.name}</strong>
              </h1>
              <div className={cn('amount-info')}>
                {(type === 'placeBid' || type === 'retractingBid' || type === 'completeCheckout' || type === 'buyNow' || type === 'getBidBack') && (
                  <dl>
                    <dt>{t('placeBidPopup.txt', { ns: 'common' })}</dt>
                    <dd>
                      {type === 'completeCheckout' && (
                        <Tag size="s" color="light-gray">
                          {t('marketplaceModal.paymentComplete', { ns: 'common' })}
                        </Tag>
                      )}
                      <strong
                        className={cn('amount', type === 'completeCheckout' && 'complete')}>{shorthanded(value)}</strong>
                      <span className={cn('unit')}>WEMIX$</span>
                    </dd>
                  </dl>
                )}
                <dl>
                  <dt>
                    {t('marketplaceModal.gasFee', { ns: 'common' })}
                    <RefreshCountdownButton refresh={evtRefresh} />
                  </dt>
                  <dd>
                    <strong className={cn('amount')}>
                      {etherGas}
                    </strong>
                    <span className={cn('unit')}>WEMIX</span>
                  </dd>
                </dl>
                <p className={cn('notice')}>
                  {type === 'placeBid' && (
                    <>
                      {t('marketplaceModal.gasFeeInfo', { ns: 'common' })}
                      <br />
                      {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
                    </>
                  )}
                  {type === 'buyNow' && (
                    <>
                      {t('marketplaceModal.buyNowInfo', { ns: 'common' })}
                      <br />
                      {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
                    </>
                  )}
                  {type === 'retractingBid' && (
                    <>
                      {t('marketplaceModal.retractingInfo', { ns: 'common' })} <br className={cn('blank')} />
                      {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
                    </>
                  )}
                  {type === 'getBidBack' && (
                    <>
                      {t('marketplaceModal.retractingInfo', { ns: 'common' })} <br className={cn('blank')} />
                      {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
                    </>
                  )}
                  {type === 'completeCheckout' && (
                    <>
                      {t('marketplaceModal.completeInfo', { ns: 'common' })}
                      <br className={cn('blank')} />
                      {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
                    </>
                  )}
                  {type === 'changeNotSale' && (
                    <>
                      {/* 22.11.18 수정: 다국어 적용 */}
                      {t('marketplaceModal.changeInfo', { ns: 'common' })} <br className={cn('blank')} />
                      {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
                    </>
                  )}
                  {type === 'changeOpenOffer' && (
                    <>
                      {/* 22.11.18 수정: 다국어 적용 */}
                      {t('marketplaceModal.changeInfo', { ns: 'common' })} <br className={cn('blank')} />
                      {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
                    </>
                  )}
                  {type === 'acceptOffer' && (
                    <>
                      {/* 22.11.18 수정: 다국어 적용 */}
                      {t('marketplaceModal.acceptInfo', { ns: 'common' })} <br className={cn('blank')} />
                      {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('payment-block')}>
          {(type === 'retractingBid' || type === 'getBidBack') && (
            <dl>
              <dt>{t('refundPopup.txt3', { ns: 'common' })}</dt>
              <dd>
                <div>
                  <span className={cn('amount')}>{shorthanded(value)}</span>
                  <span className={cn('unit')}>WEMIX$</span>
                  {/*<span className={cn('transfer-amount')}>($3,000)</span>*/}
                </div>
              </dd>
            </dl>
          )}
          <dl>
            <dt>
              {type === 'completeCheckout' ? t('refundPopup.txt2', { ns: 'common' }) : t('refundPopup.txt4', { ns: 'common' })}
              {type === 'placeBid' &&
                <span className={cn('pay-info')}> {t('placeBidPopup.txt5', { ns: 'common' })}</span>}
            </dt>
            <dd>
              {type === 'placeBid' || type === 'buyNow' || type === 'completeCheckout' ? (
                <>
                  <div>
                    <span className={cn('amount')}>{offsetPrice && fromWei(offsetPrice, 'ether')}</span>
                    <span className={cn('unit')}>WEMIX$</span>
                    {/*<span className={cn('transfer-amount')}>($10)</span>*/}
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <span className={cn('amount', 'gas-fee')}>{etherGas}</span>
                    <span className={cn('unit', 'gas-fee')}>WEMIX</span>
                    {/*<span className={cn('transfer-amount')}>($10)</span>*/}
                  </div>
                </>
              ) : (
                <div>
                  <span className={cn('amount')}>{shorthanded(value)}</span>
                  <span className={cn('unit')}>WEMIX$</span>
                  {/*<span className={cn('transfer-amount')}>($3,000)</span>*/}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </ModalLayout>
  );
};

export default PaymentModal;
