import { useState } from 'react';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';

import { useTranslation } from 'next-i18next';

import { Tabs } from 'antd';
import { DaoBox, DaoBoxLayout, DaoBoxTitle } from '@/components/dao/DaoBoxLayout';
import SystemStation from '@/components/dao/station/protocol/SystemStation';
import SystemTreasury from '@/components/dao/station/protocol/SystemTreasury';
import SystemTrust from '@/components/dao/station/protocol/SystemTrust';
import SystemFurnace from '@/components/dao/station/protocol/SystemFurnace';
import SystemStakingPool from '@/components/dao/station/protocol/SystemStakingPool';
import SystemGovernance from '@/components/dao/station/protocol/SystemGovernance';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

const DaoStationProtocol = () => {
  const size = useAtomValue(windowResizeAtom);
  const [currentTab, setCurrentTab] = useState<string>('station');
  const { t } = useTranslation('dao');

  const tangledTabs = [
    {
      label: 'Station',
      key: 'station',
      children: <SystemStation />,
    },
    {
      label: 'Treasury',
      key: 'treasury',
      children: <SystemTreasury />,
    },
    {
      label: 'Trust',
      key: 'trust',
      children: <SystemTrust />,
    },
    {
      label: 'Furnace',
      key: 'furnace',
      children: <SystemFurnace />,
    },
    {
      label: 'Staking Pool',
      key: 'staking-pool',
      children: <SystemStakingPool />,
    },
    {
      label: 'Governance',
      key: 'governance',
      children: <SystemGovernance />,
    },
  ];

  const systemImage = () => {
    if (size.width >= 768 && size.width <= 1279) {
      return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system_md.svg' />;
    } else if (size.width < 768) {
      return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system_sm.svg' />;
    } else {
      return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system.svg' />;
    }
  };

  return (
    <div className={cn('dao-protocol-container')}>
      <div className={cn('protocol-inner')}>
        <DaoBoxTitle title={t('station.title')} />
        <DaoBoxLayout type="half">
          <DaoBox className={cn('protocol-info')}>
            <h4>{t('station.neithProtocol.title')}</h4>
            <p>{t('station.neithProtocol.desc')} </p>
          </DaoBox>
          <DaoBox className={cn('protocol-info')}>
            <h4>{t('station.smartContract.title')}</h4>
            <p>{t('station.smartContract.desc')} </p>
          </DaoBox>
        </DaoBoxLayout>
        <DaoBoxLayout>
          <DaoBox className={cn('protocol-info')}>
            <h4>{t('station.operationSystem.title')}</h4>
            <div className={cn('protocol-system-image')}>
              {systemImage()}
              <span className={cn('a11y')}>Station, Treasury, Trust, Furnace, Staking Pool, Governance</span>
            </div>
            <div className={cn('protocol-system-tab')}>
              <Tabs
                destroyInactiveTabPane
                activeKey={currentTab}
                className={cn('tab-type', 'tab-md', 'tab-underline')}
                items={tangledTabs}
                onTabClick={(key: string) => {
                  setCurrentTab(key);
                }}
              />
            </div>
          </DaoBox>
        </DaoBoxLayout>
      </div>
    </div>
  );
};

export default DaoStationProtocol;
