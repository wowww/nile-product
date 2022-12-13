import React from 'react';
import cn from 'classnames';

import { IconLogo } from '@/components/logo/IconLogo';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

interface DaoHeaderType {
  // eslint-disable-next-line react/require-default-props
  classnames?: string;
}

export const DaoStationIngHeader: React.FC<DaoHeaderType> = ({ classnames }) => {
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);

  const daoTitle = (daoType: string) => {
    switch (daoType) {
      case 'wonder':
        return (
          <>
            <i>
              <IconLogo size={20} type="wonder" fullType />
            </i>
            Wonder DAO
          </>
        );
      default:
        return false;
    }
  };

  return (
    <div className={cn('dao-recruiting-header', classnames)}>
      <div className={cn('dao-recruiting-header-inner')}>
        <h2 className={cn('dao-recruiting-header-title')}>{daoTitle(activeDao.value)}</h2>
      </div>
    </div>
  );
};

export default DaoStationIngHeader;
