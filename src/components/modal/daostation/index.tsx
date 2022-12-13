import { useState } from 'react';
import cn from 'classnames';
import { Modal } from 'antd';
import useScrollLock from '@/hook/useScrollLock';
import Image from 'next/image';

import BgButton from '@components/button/BgButton';
import OutlineButton from '@components/button/OutlineButton';
import { IconLogo } from '@components/logo/IconLogo';
import StationStep1 from '@/components/modal/daostation/StationStep1';
import StationStep2 from '@/components/modal/daostation/StationStep2';
import StationStep3 from '@/components/modal/daostation/StationStep3';

import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  type: string;
  title: string;
  desc: string;
}

const DaoStationModal = ({ isOpen, setIsOpen, type, title, desc }: ModalProps) => {
  const scrollLock = useScrollLock(isOpen);
  const [stepCount, setStepCount] = useState<number>(1);

  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
    setTimeout(() => {
      setStepCount(1);
    }, 250);
  };

  const stepUp = () => {
    setStepCount(stepCount + 1);
  };

  const stepDown = () => {
    setStepCount(stepCount - 1);
  };
  return (
    <>
      <Modal
        wrapClassName={`step${stepCount}`}
        className={cn('dao-station-modal')}
        open={isOpen}
        onCancel={onCancel}
        centered={true}
        destroyOnClose={true}
        width={'none'}
        closeIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg' />}
        footer={false}
        maskClosable={false}
        keyboard={false}
      >
        <div className={cn('banner-block')}>
          <div className={cn('img-block')}>
            <Image src={`/images/img_dao_station_involve_${type}.png`} layout="fill" objectFit="cover" loader={NileCDNLoader} />
          </div>
          <div className={cn('text-block')}>
            <IconLogo type={type} size={50} fullType />
            <h2 className={cn('title')}>{title}</h2>
            <p className={cn('desc')}>{desc}</p>
          </div>
        </div>
        <div className={cn('contents-block')}>
          <div className={cn('modal-header')}>
            <h3 className={cn('title')}>참여하기</h3>
            <ol className={cn('steps')}>
              <li className={cn('step')} data-num="1">
                <span>자기소개</span>
              </li>
              <li className={cn('step')} data-num="2">
                <span>WEMIX 입력</span>
              </li>
              <li className={cn('step')} data-num="3">
                <span>유의사항 확인</span>
              </li>
            </ol>
          </div>
          <div className={cn('modal-body')}>
            {stepCount === 2 && (
              <div className={cn('available-amount-wrap')}>
                <dl>
                  <dt>
                    <IconLogo size={20} type="wemix_dark" />
                    <span>지갑 내 사용가능한 WEMIX</span>
                  </dt>
                  <dd>100,000,000.0000</dd>
                </dl>
                <a href="https://wemix.fi/" target="_blank" rel="noopener noreferrer" className={cn('link-fill')}>
                  채우기
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
                </a>
              </div>
            )}
            <div className={cn('modal-body-inner')}>
              {stepCount === 1 && <StationStep1 />}
              {stepCount === 2 && <StationStep2 />}
              {stepCount === 3 && <StationStep3 />}
            </div>
          </div>
          <div className={cn('modal-footer')}>
            {(stepCount === 2 || stepCount === 3) && <OutlineButton buttonText="이전" size="md" color="black" onClick={() => stepDown()} />}
            {stepCount === 3 ? (
              // TODO: 기획상으로는 gas fee 결제 페이지로 이동. page 이동을 위해서는 href값 설정 필요
              <BgButton
                buttonText="제출하기"
                size="md"
                color="black"
                onClick={() => {
                  onCancel();
                }}
              />
            ) : (
              <BgButton
                buttonText="다음"
                size="md"
                color="black"
                onClick={() => stepUp()}
                // disabled // disabled 상태일 경우
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DaoStationModal;
