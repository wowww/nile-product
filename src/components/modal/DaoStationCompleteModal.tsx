import cn from 'classnames';
import { Modal } from 'antd';
import useScrollLock from '@/hook/useScrollLock';
import Image from 'next/image';

import BgButton from '@components/button/BgButton';
import { IconLogo } from '@components/logo/IconLogo';
import StationStep4 from '@/components/modal/daostation/StationStep4';
import { NileCDNLoader } from '@utils/image/loader';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  type: string;
  title: string;
  desc: string;
}

const DaoStationCompleteModal = ({ isOpen, setIsOpen, type, title, desc }: ModalProps) => {
  const scrollLock = useScrollLock(isOpen);

  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
  };

  return (
    <Modal
      wrapClassName={'step4'}
      className={cn('dao-station-modal')}
      open={isOpen}
      onCancel={onCancel}
      centered={true}
      destroyOnClose={true}
      width={'none'}
      footer={false}
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
        <div className={cn('modal-body')}>
          <div className={cn('modal-body-inner')}>
            <StationStep4 />
          </div>
        </div>
        <div className={cn('modal-footer')}>
          <BgButton buttonText="예, 확인했습니다." size="md" color="black" onClick={() => onCancel()} />
        </div>
      </div>
    </Modal>
  );
};

export default DaoStationCompleteModal;
