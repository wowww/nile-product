import cn from 'classnames';

// components
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import Tag from '@/components/tag/Tag';

// images
import { ReactSVG } from 'react-svg';

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  kind: 'stake' | 'unstake';
}

const DaoStakeResultModal: React.FC<Props> = ({ isModal, setIsModal, kind }) => {
  const standardShort = kind === 'stake' ? 'WDR' : 'g.WDR';
  const stakeTargetShort = kind === 'stake' ? 'g.WDR' : 'WDR';
  return (
    <ModalLayout
      wrapClassName="dao-stake-modal"
      isOpen={isModal}
      setIsOpen={setIsModal}
      size="md"
      title="Staking Pool"
      footer
      destroyOnClose={true}
      footerContent={[
        <BgButton
          buttonText="Approve"
          color="black"
          size="md"
          onClick={() => {
            setIsModal(false);
          }}
          key="approve"
        />,
      ]}
    >
      <div className={cn('dao-stake-modal-inner')}>
        <div className={cn('summary')}>
          <div className={cn('summary-header')}>
            <strong>{kind === 'stake' ? 'Staking' : 'Unstaking'} is Complete!</strong>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_success_circle.svg' />
          </div>
          <div className={cn('summary-info')}>
            <div className={cn('info-row')}>
              <Tag color="positive">GET</Tag>
              <span className={cn('figure')}>
                150,000.0000
                <span className={cn('unit')}>{stakeTargetShort}</span>
              </span>
            </div>
            <div className={cn('info-row')}>
              <Tag color="negative">GET</Tag>
              <span className={cn('figure')}>
                151,320.0000
                <span className={cn('unit')}>{standardShort}</span>
              </span>
            </div>
          </div>
        </div>
        <div className={cn('dt-info-area')}>
          <span className={cn('info-name')}>Transaction Fee</span>
          <ul className={cn('list-dot')}>
            <li>$ 12.50</li>
          </ul>
          <div className={cn('user-dt-info')}>
            <div className={cn('info-box')}>
              <span>Your holding Tokens in Wallet</span>
              <ul className={cn('list-dot')}>
                <li>12,000.0000 WDR</li>
                <li>10,230.0000 g.WDR</li>
              </ul>
            </div>
            <div className={cn('info-box')}>
              <span>Your staking Tokens in Pool</span>
              <ul className={cn('list-dot')}>
                <li>5,230.0000 WDR</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DaoStakeResultModal;
