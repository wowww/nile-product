/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

interface tagPropsType {
  rate: number;
  goalNum: number;
}

const Agora: React.FC<tagPropsType> = ({ goalNum, rate }) => {
  const [excess, setExcess] = useState<boolean>(false);
  useEffect(() => {
    if (rate >= 100) return setExcess(true);
  }, [rate]);
  return (
    <div className={cn('progress-type agora-wrap')}>
      <span className={cn('progress-line')}>
        <span className={cn('progress-rate')} style={{ width: `${rate}%` }}>
          <span className={cn(rate < 16 ? 'rate-align-left' : 'rate-align-right')}>Now : {rate}%</span>
        </span>
        <span className={cn('progress-pin')} style={{ left: `${goalNum}%` }}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_goal.svg' />
          <span>
            <span>Quorum {goalNum}%</span>
          </span>
        </span>
      </span>
    </div>
  );
};
export default Agora;
