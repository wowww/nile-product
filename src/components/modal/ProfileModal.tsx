import cn from 'classnames';
/* 22.11.04 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';

import { Avatar, message } from 'antd';
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import { ReactSVG } from 'react-svg';

interface Profile {
  img?: string;
  nickname?: string;
  pocketAddress: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
  data: Profile;
}

const ProfileModal = ({ isOpen, setIsOpen, data }: Props) => {
  /* 22.11.04 수정: useTranslation */
  const { t } = useTranslation(['mypage', 'common']);
  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="sm"
      footer={true}
      destroyOnClose={true}
      footerContent={[
        <BgButton
          type="link"
          href="/"
          buttonText={t('profileModal.view', { ns: 'common' })}
          color="black"
          size="md"
          key="View Profile"
          onClick={() => {
            setIsOpen(false);
          }}
        />,
      ]}
    >
      <div className={cn('profile-popup-wrap')}>
        <div className={cn('profile-img-wrap')}>
          <Avatar className={cn('type0', data.img ? '' : 'user-image')} src={data.img} />
        </div>
        <strong className={cn('profile-nick-name')}>{data.nickname ? data.nickname : data.pocketAddress}</strong>
        <div className={cn('pocket-address-wrap')}>
          <a className={cn('profile-code-name')} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
            {data.pocketAddress}
          </a>
          {/* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */}
          <button className={cn('btn-copy-id')} onClick={() => message.info({ content: '복사 완료되었습니다.', key: 'toast' })}>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg' />
            <span className={cn('a11y')}>{t('profileModal.copy')}</span>
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ProfileModal;
