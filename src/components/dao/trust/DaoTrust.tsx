import { useState } from 'react';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';

import { useTranslation } from 'next-i18next';

import { DaoBoxTitle } from '@/components/dao/DaoBoxLayout';
import SystemStation from '@/components/dao/station/protocol/SystemStation';
import SystemTreasury from '@/components/dao/station/protocol/SystemTreasury';
import SystemTrust from '@/components/dao/station/protocol/SystemTrust';
import SystemFurnace from '@/components/dao/station/protocol/SystemFurnace';
import SystemStakingPool from '@/components/dao/station/protocol/SystemStakingPool';
import SystemGovernance from '@/components/dao/station/protocol/SystemGovernance';
import DaoTrustGraph from '@/components/dao/trust/DaoTrustGraph';
import DaoTrustTab from '@/components/dao/trust/DaoTrustTab';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

const DaoTrust = () => {
  const { t } = useTranslation('dao');

  const size = useAtomValue(windowResizeAtom);
  const [currentTab, setCurrentTab] = useState<string>('station');
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

  return (
    <>
      <div className={cn('dao-trust-wrap')}>
        <DaoBoxTitle title={t('trust.title')} desc={t('trust.desc')} type="img">
          <div className={cn('img-wrap')}>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/img/img_dao_trust.svg' />
          </div>
        </DaoBoxTitle>
        <DaoTrustGraph />
        <DaoTrustTab />
      </div>
    </>
  );
};

export default DaoTrust;
