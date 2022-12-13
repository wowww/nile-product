import React from 'react';
import cn from 'classnames';

import { IconLogo } from '@/components/logo/IconLogo';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

interface DaoHeaderType {
  classnames: string;
}

export const DaoHeader: React.FC<DaoHeaderType> = ({ classnames }) => {
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);

  const daoTitle = (daoType: string) => {
    switch (daoType) {
      case 'wonder':
        return (
          <>
            <i>
              <IconLogo size={40} type="wonder" fullType />
            </i>
            Wonder DAO
          </>
        );
      default:
        return false;
    }
  };

  return (
    <div className={cn('dao-header', classnames)}>
      <div className={cn('dao-header-inner')}>
        <h2 className={cn('dao-header-title')}>{daoTitle(activeDao.value)}</h2>
        <div>
          <dl className={cn('doa-header-info')}>
            <div>
              <dt>Rewards</dt>
              <dd>
                12,985,234.0000
                <span className={cn('unit')}>WEMIX</span>
              </dd>
            </div>
            <div>
              <dt>Proposal</dt>
              <dd>120</dd>
            </div>
            <div>
              <dt>Members</dt>
              <dd>1,251</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default DaoHeader;
