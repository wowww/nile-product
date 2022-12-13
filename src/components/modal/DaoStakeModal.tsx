import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Tabs } from 'antd';

// components
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import { ReactSVG } from 'react-svg';

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  disabled?: boolean;
}

interface TabContentsProps {
  kind: 'stake' | 'unstake';
  disabled: boolean;
}

const DaoStakeModal: React.FC<Props> = ({ isModal, setIsModal, disabled = false }) => {
  return (
    <ModalLayout
      wrapClassName="dao-stake-modal process"
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
        <Tabs defaultActiveKey="1" className={cn('tab-type', 'tab-lg', 'tab-full')}>
          <Tabs.TabPane tab="Stake" key="1">
            <TabContents kind="stake" disabled={disabled} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Unstake" key="2">
            <TabContents kind="unstake" disabled={disabled} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </ModalLayout>
  );
};

const TabContents: React.FC<TabContentsProps> = ({ kind, disabled }) => {
  const standard = kind === 'stake' ? 'Wonder' : 'g.Wonder';
  const stakeTarget = kind === 'stake' ? 'g.Wonder' : 'Wonder';
  const standardShort = kind === 'stake' ? 'WDR' : 'g.WDR';
  const stakeTargetShort = kind === 'stake' ? 'g.WDR' : 'WDR';
  const ratio = kind === 'stake' ? 0.842 : 1.138;
  const [wonderAmount, setWonderAmount] = useState(1234);
  const [poolAmount, setPoolAmount] = useState(12000);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [isError, setIsError] = useState<string | null>(null);
  const inputArea = useRef<HTMLDivElement>(null);
  const inputTag = useRef<HTMLInputElement>(null);

  const focusArea = () => {
    if (inputArea.current !== null) {
      inputArea.current.style.borderColor = '#1a1a1a';
    }
  };
  const blurArea = () => {
    if (inputArea.current !== null) {
      inputArea.current.style.borderColor = '#d9d9d9';
    }
  };

  useEffect(() => {
    if (inputValue !== null) {
      if (inputValue > poolAmount) setIsError('high');
      else if (inputValue > 0 && inputValue < ratio) setIsError('low');
      else setIsError(null);
    } else setIsError(null);
    if (inputTag.current !== null && inputValue) {
      inputTag.current.value = inputValue?.toString();
    }
  }, [inputValue]);

  const numberWithCommas = (num: string): string => {
    var parts = num.split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
  };

  const newLine = () => {
    return <br className={cn('new-line')} />;
  };

  return (
    <div className={cn('stake-tab-contents')}>
      <div className={cn('ratio-info-area')}>
        <span className={cn('desc')}>
          Ratio of {standard} : {stakeTarget}
        </span>
        <span className={cn('ratio')}>1 : {ratio}</span>
        <div className={cn('staking-pool-amount')}>
          <span className={cn('name')}>Staking Pool</span>
          <span className={cn('figure')}>{numberWithCommas(poolAmount.toFixed(4))}</span>
          <span className={cn('unit')}>WDR</span>
        </div>
      </div>
      <div className={cn('input-area')}>
        <div
          className={cn(
            'input-box',
            disabled && 'disabled',
            isError && 'error',
            isError === 'high' && 'error-high',
            isError === 'low' && 'error-low'
          )}
          ref={inputArea}
        >
          <span className={cn('unit')}>{standard}</span>
          <input
            ref={inputTag}
            type="text"
            placeholder={`You can enter up to ${poolAmount} ${standardShort}`}
            onChange={(e) => setInputValue(Number(e.target.value))}
            onFocus={() => focusArea()}
            onBlur={() => blurArea()}
          />
        </div>
        {isError && <p className={cn('error-message')}>{isError === 'high' ? 'Exceeded Wonder held' : `Please enter ${ratio} WDR or higher`}</p>}
        <div className={cn('max-btn-wrap', disabled && 'disabled')}>
          <OutlineButton
            buttonText="Max"
            color="black"
            size="sm"
            {...(disabled ? { disabled: disabled } : '')}
            onClick={() => setInputValue(poolAmount)}
          />
        </div>
        <div className={cn('arrow-icon-wrap')}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg' />
        </div>
        <div className={cn('input-box', 'target')}>
          <span className={cn('unit')}>{stakeTarget}</span>
          <input
            type="text"
            readOnly
            placeholder={`Check How much ${stakeTargetShort} you get`}
            value={inputValue === null ? undefined : String(inputValue)}
          />
        </div>
      </div>
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
  );
};

export default DaoStakeModal;
