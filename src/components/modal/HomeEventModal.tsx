import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import cn from 'classnames';
import { Checkbox, Modal } from 'antd';

import { ReactSVG } from 'react-svg';
import ModalSlideLayout from './ModalSlideLayout';
import HomeEventModalContents from '@components/modal/HomeEventModalContents';
import { eventModalAtom } from '@/state/modalAtom';
import { useUpdateAtom } from 'jotai/utils';

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

const HomeEventModal = ({ isModal, setIsModal }: Props) => {
  const { t } = useTranslation('common');
  const [termsCheck, setTermsCheck] = useState<boolean>(false);

  const swiperEvt = useRef<any>();
  const setVisibleEvent = useUpdateAtom(eventModalAtom);

  const onModalClose = () => {
    Modal.destroyAll();
    setIsModal(false);
    if (termsCheck) {
      setVisibleEvent('NEVER');
    }
  };

  const onContentClick = useCallback(() => {
    onModalClose();
    document.body.removeAttribute('style');
  }, []);

  return (
    <ModalSlideLayout
      maskClosable={false}
      wrapClassName={cn('home-event-modal modal-wrap')}
      isOpen={isModal}
      setIsOpen={setIsModal}
      destroyOnClose={true}
      onCancel={onModalClose}
    >
      <div className="mask-custom-wrap" onClick={() => setIsModal(false)}></div>
      <Swiper
        modules={[Pagination, Navigation]}
        className={cn('modal-slide')}
        slidesPerView={1}
        speed={1000}
        threshold={20}
        pagination={{
          el: '.modal-slide-pagination',
          clickable: true,
        }}
        navigation={{
          prevEl: '.btn-prev',
          nextEl: '.btn-next',
        }}
        onInit={(swiper) => {
          swiperEvt.current = swiper;
        }}
      >
        <SwiperSlide className={cn('modal-slide-content')}>
          <HomeEventModalContents
            hasTag
            state="UPCOMING"
            title={t('eventPopup.son2.title')}
            /* 22.11.21 수정: 다국어 적용 */
            desc={t('eventPopup.son2.desc')}
            /* 22.11.21 수정: 다국어 적용 */
            buttonText={t('aboutThisCollection')}
            /* 컨텐츠 오픈 후 버튼 */
            // buttonText={t('partiAuction')}
            url="/life/son"
            imgUrl="/images/img_sights_of_nile_son2.png"
            type="dark"
            classNames="nile"
            onClick={onContentClick}
            isImgFull
            imgDimmed
          />
        </SwiperSlide>
        <SwiperSlide className={cn('modal-slide-content')}>
          <HomeEventModalContents
            state="On Auction"
            title="London Underground Station(LUS) 264 Genesis"
            /* 22.11.21 수정: 다국어 적용 */
            desc={t('bottomBanner.soon', { collection: 'LUS 264' })}
            /* 22.11.21 수정: 다국어 적용 */
            buttonText={t('aboutThisCollection')}
            /* 컨텐츠 오픈 후 버튼 */
            // buttonText={t('partiAuction')}
            url="/life/lus"
            imgUrl="/images/bg_event_lus.png"
            type="white"
            classNames="lus"
            onClick={onContentClick}
          />
        </SwiperSlide>
      </Swiper>
      <div className={cn('modal-slide-bottom')}>
        <div className={cn('btn-wrap')}>
          <button type="button" className={cn('btn-swiper', 'btn-prev')}>
            <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
          </button>
          <div className={cn('modal-slide-pagination')} />
          <button type="button" className={cn('btn-swiper', 'btn-next')}>
            <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
          </button>
        </div>
        <div className={cn('check-wrap')}>
          <Checkbox checked={termsCheck} onChange={() => setTermsCheck((prev) => !prev)}>
            {t('notShowAgain')}
          </Checkbox>
        </div>
      </div>
    </ModalSlideLayout>
  );
};

export default HomeEventModal;
