import React, { useState } from 'react';
import cn from 'classnames';

import OutlineButton from '@/components/button/OutlineButton';
import AskToJoinModal from '@/components/modal/AskToJoinModal';
import MarqueeBanner from '../marquee/MarqueeBanner';
/* 22.11.02 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import dynamic from 'next/dynamic';
import { useAtom, useAtomValue } from 'jotai';
import { termAgreementAtom, termModalAtom } from '@/state/termAtom';

const TermsModal = dynamic(() => import('@components/modal/TermsModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

const MarketplaceApply = () => {
  /* 22.11.02 수정: useTranslation, useRouter 추가 */
  const { t } = useTranslation(['marketplace', 'common']);
  const [isModalTerm, setModalTerm] = useState(false);
  const [isModalTermAgree, setModalTermAgree] = useState(false);
  const [isAskToJoinModal, setIsAskToJoinModal] = useState<boolean>(false);
  const [visibleTerms, setVisibleTerms] = useAtom(termModalAtom);
  const termAgreement = useAtomValue(termAgreementAtom);
  /* 22.11.11 수정: 불필요한 코드 삭제 (팝업 닫을 때 토스트 메시지 나오는 현상 ) */
  const nftList = ['COLLECTIBLES', 'PIXEL ART', 'PFP', 'MOVE TO EARN', 'PLAY TO EARN', 'UTILITY', 'TALK TO EARN', 'RELAX TO EARN', 'SPORTS', 'MUSIC'];

  return (
    <div className={cn('marketplace-apply')}>
      <h2 className={cn('apply-title')}>{t('bottom.title')}</h2>
      <p className={cn('apply-desc')}>{t('bottom.notice')}</p>
      {/* 22.10.07 수정: 흐르는 배너 하드코딩 -> 컴포넌트로 변경 */}
      <MarqueeBanner itemList={nftList} loopTimes={4} />
      <div className={cn('apply-button-wrap')}>
        <OutlineButton
          /* 22.11.10 수정: 다국어 키값 수정 */
          buttonText={t('modalJoin.button', { ns: 'common' })}
          color="white"
          size="md"
          onClick={() => {
            if (termAgreement.agreement) {
              setIsAskToJoinModal(true);
            } else {
              setVisibleTerms(true);
            }
            /* 22.11.11 수정: 불필요한 코드 삭제 (팝업 닫을 때 토스트 메시지 나오는 현상 ) */
          }}
        ></OutlineButton>
      </div>
      <AskToJoinModal isModal={isAskToJoinModal} setIsModal={setIsAskToJoinModal} />
      <TermsModal isOpen={visibleTerms} setIsOpen={setVisibleTerms} setDisAgreeOpen={setModalTermAgree} onSuccess={() => setIsAskToJoinModal(true)} />
      <ModalLayout
        isOpen={isModalTermAgree}
        setIsOpen={setModalTermAgree}
        size="sm"
        title="이용약관 동의"
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton
            buttonText="OK"
            color="black"
            size="md"
            key="OK"
            onClick={() => {
              setModalTermAgree(false);
            }}
          />,
        ]}
      >
        <p>NILE 이용약관 및 개인정보 보호정책에 동의하지 않으면, 서비스를 이용할 수 없습니다.</p>
      </ModalLayout>
    </div>
  );
};

export default MarketplaceApply;
