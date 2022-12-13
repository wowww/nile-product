import cn from 'classnames';
import ModalLayout from './ModalLayout';
import Image from 'next/image';
import InfiniteLoader from '../loader/InfiniteLoader';

import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import { useEffect } from 'react';

interface WalletModalProps {
  isOpen: boolean;
  setIsOpen: (isModal: boolean) => void;
  type: 'process01' | 'process02' | 'process03' | 'process04';
  progressText: 'approve' | 'payment' | 'profile';
  closable?: boolean;
  maskClosable?: boolean;
}

const WalletModal = ({ isOpen, setIsOpen, type, progressText, closable, maskClosable }: WalletModalProps) => {

  useEffect(() => {
    console.log('wallet modal type', type);
  }, [type]);

  const { t } = useTranslation('common');
  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="sm"
      wrapClassName={cn('wallet-modal-wrap')}
      footer={false}
      destroyOnClose={true}
      titleType="center"
      closable={closable}
      maskClosable={maskClosable}
    >
      <div className={cn('wallet-modal-content')}>
        <div className={cn('wallet-modal-bg')}>
          {type === 'process01' &&
            <Image src="/assets/images/img/img_wallet_confirm_modal_progress01.png" width={360} height={200} alt="거래요청 승인" layout="responsive"
                   loader={NileCDNLoader} />}
          {type === 'process02' &&
            <Image src="/assets/images/img/img_wallet_confirm_modal_progress02.png" width={360} height={200} alt="결제진행" layout="responsive"
                   loader={NileCDNLoader} />}
          {type === 'process03' &&
            <Image src="/assets/images/img/img_wallet_confirm_modal_progress01.png" width={360} height={200} alt="거래요청 승인" layout="responsive"
                   loader={NileCDNLoader} />}
          {type === 'process04' &&
            <Image src="/assets/images/img/img_wallet_confirm_modal_progress02.png" width={360} height={200} alt="결제진행" layout="responsive"
                   loader={NileCDNLoader} />}
        </div>
        <div className={cn('wallet-modal-text')}>
          {type === 'process01' && <p>{t('walletModal.process01')}</p>}
          {type === 'process02' && <p>{t('walletModal.process02')}</p>}
          {type === 'process03' && <p>{t('walletModal.process03')}</p>}
          {type === 'process04' && <p>{t('walletModal.process04')}</p>}
          <div className={cn('wallet-modal-progress-box')}>
            <span>
              {progressText === 'approve' && t('walletModal.progressText.1')}
              {progressText === 'payment' && t('walletModal.progressText.2')}
              {progressText === 'profile' && t('walletModal.progressText.3')}
            </span>
            <InfiniteLoader size="sm" />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default WalletModal;
