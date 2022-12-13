import cn from 'classnames';
import { Input, Select } from 'antd';

import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import RefreshCountdownButton from '@/components/button/RefreshCountdownButton';
/* 22.11.02 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';
/* 22.11.21 수정: uid 추가 */
import { v4 as uid } from 'uuid';
import { ReactSVG } from 'react-svg';

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
}

const { Option } = Select;

const MakeOfferModal = ({ isOpen, setIsOpen }: Props) => {
  /* 22.11.02 수정: useTranslation, useRouter 추가 */
  const { t } = useTranslation(['marketplace', 'common']);

  /* 22.11.21 수정: uid 추가 */
  const Id = uid();

  const evtRefresh = () => {
    console.log('refresh');
  };

  return (
    <ModalLayout
      wrapClassName="makeoffer-modal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="md"
      title={t('makeOffer', { ns: 'common' })}
      footer
      destroyOnClose={true}
      footerContent={[
        <BgButton
          key="make offer"
          buttonText={t('makeOffer', { ns: 'common' })}
          color="black"
          size="md"
          onClick={() => {
            setIsOpen(false);
          }}
        />,
      ]}
    >
      <>
        <p>{t('makeOfferPopup.content', { ns: 'common' })}</p>
        <div className={cn('makeoffer-form')}>
          <dl>
            <dt>{t('makeOfferPopup.unit', { ns: 'common' })}</dt>
            <dd className={cn('input')}>
              <Select
                suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                popupClassName="select-size-md-dropdown"
                defaultValue="WEMIX$"
                disabled
                /* 22.11.21 수정: 셀렉트 키값 추가  */
                key={Id}
              >
                <Option value="WEMIX$">WEMIX$</Option>
                <Option value="WEMIX">WEMIX</Option>
              </Select>
              {/* 22.11.09 수정: 키패드 숫자 모드로 수정 */}
              <Input placeholder={t('makeOfferPopup.txt', { ns: 'common' })} inputMode={'decimal'} />
              {/* 22.11.21 수정: 공지 문구 추가 */}
              <p className={cn('makeoffer-notice')}>{t('makeOfferPopup.notice', {ns: 'common'})}</p>
            </dd>
          </dl>

          <dl>
            <dt>{t('makeOfferPopup.txt2', { ns: 'common' })}</dt>
            <dd className={cn('detail')}>
              7 <span>days</span>
            </dd>
            <dd className={cn('desc')}>{t('makeOfferPopup.txt3', { ns: 'common' })}</dd>
          </dl>
          <dl>
            <dt>
              {t('marketplaceModal.gasFee', { ns: 'common' })}
              <RefreshCountdownButton refresh={evtRefresh} />
            </dt>
            <dd className={cn('detail')}>
              15.1234 <span>WEMIX</span>
            </dd>
            <dd className={cn('desc')}>
              {t('marketplaceModal.gasFeeInfo', { ns: 'common' })}
              <br />
              {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
            </dd>
          </dl>
        </div>
        <div className={cn('payment-block')}>
          <dl>
            <dt>{t('marketplaceModal.paymentAmount', { ns: 'common' })}</dt>
            <dd>
              <div>
                <span className={cn('amount')}>1,200.1234</span>
                <span className={cn('unit')}>WEMIX$</span>
                <span className={cn('transfer-amount')}>($3,000)</span>
              </div>

              <div>
                <span className={cn('amount')}>15.1234</span>
                <span className={cn('unit')}>WEMIX</span>
                <span className={cn('transfer-amount')}>($10)</span>
              </div>
            </dd>
          </dl>
        </div>
      </>
    </ModalLayout>
  );
};

export default MakeOfferModal;
