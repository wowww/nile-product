import React, { ReactElement } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import InfiniteLoader from '@/components/loader/InfiniteLoader';

interface stateType {
  title?: string;
  cont: string;
  iconValue: string;
  buttons?: ReactElement;
}

const MarketplaceState = ({ title, cont, iconValue, buttons }: stateType) => {
  const viewIcon = () => {
    switch (iconValue) {
      case 'success': // success
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_success.svg' />;
      case 'loading': // loading
        return <InfiniteLoader size="lg" />;
      default:
        return <></>;
    }
  };

  return (
    <div className={cn('state-wrap')}>
      <div className={cn('state-logo')}>{viewIcon()}</div>
      {title && <strong className={cn('state-title')}>{title}</strong>}
      <p className={cn('state-cont')}>{cont}</p>
      <div className={cn('state-btn-wrap')}>
        {/* <MakeButton /> */}
        {buttons && buttons}
      </div>
    </div>
  );
};

export default MarketplaceState;
